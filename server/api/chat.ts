import { createAzure } from "@ai-sdk/azure";
// import { openai } from "@ai-sdk/openai";
import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';
import {
  convertToModelMessages,
  experimental_createMCPClient as createMCPClient,
  streamText,
  // tool,
  // readUIMessageStream,
} from "ai";

export default defineLazyEventHandler(async () => {
  const { azureResourceName, mcpUrl } = useRuntimeConfig();
  const credential = new DefaultAzureCredential();
  const scope = 'https://cognitiveservices.azure.com/.default';
  const getAccessToken = getBearerTokenProvider(credential, scope);
  const token = await getAccessToken();
  if (!token) throw new Error('Missing Azure OpenAI token');
  const openai = createAzure({
    resourceName: azureResourceName, // Azure resource name
    apiKey: '',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return defineEventHandler(async (event) => {
    const { messages } = await readBody(event);
    const mcpClient = await createMCPClient({
      transport: {
        type: 'sse',
        url: mcpUrl,
      },
    });
    const nuxtTools = await mcpClient.tools();
    try {
      const result = streamText({
        model: openai("gpt-4.1-mini"),
        messages: convertToModelMessages(messages),
        onError: (error) => {
          // Log streaming errors - in production use proper logging
          console.error(error);
        },
        // providerOptions: { openai: { include: ['reasoning.encrypted_content'] } },
        system: "You are a helpful assistant. Always return the response to a tool call in markdown format. Mention the tool you used in the response. You can use the following tools to help you: list-nuxt-components",
        tools: nuxtTools,
        // prepareStep: (step) => {
        // },
        // onStep: (step) => {
        //   console.log("onStep", step);
        // },
      });
      // for await (const uiMessage of readUIMessageStream({
      //   stream: result.toUIMessageStream(),
      // })) {
      //   console.log("Current message state:", uiMessage);
      // }
      return result.toUIMessageStreamResponse({
        // onError: errorHandler,
        sendReasoning: false,
      });
    } catch (error) {
      console.error(error);
    }
  });
});