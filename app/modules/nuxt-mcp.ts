import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@dmarr/ai'
  },
  setup (options, nuxt) {
    nuxt.hook('mcp:setup', ({ mcp }) => {
      mcp.tool('create_assistant', 'Create a new assistant', {}, async () => {
        return {
          content: [
            {
              type: 'text',
              text: 'Create a new assistant using the CxlAI component.',
            },
          ],
        };
      });
    });
  }
})
