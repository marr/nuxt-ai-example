import { generateText } from 'ai';
import { defineNuxtModule } from 'nuxt/kit';
import { ollama } from 'ollama-ai-provider-v2';

export default defineNuxtModule({
  async setup() {
    // const { text } = await generateText({
    //   // model: ollama('qwen3:4b'),
    //   model: ollama('hf.co/unsloth/DeepSeek-R1-0528-Qwen3-8B-GGUF:Q4_K_XL'),
    //   providerOptions: { ollama: { think: true } },
    //   prompt: 'Write a meaty lasagna recipe for 4 people, but really think about it',
    // });
    // console.log(text)
  }

})