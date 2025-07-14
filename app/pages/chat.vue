<script setup lang="ts">
import { Chat } from "@ai-sdk/vue";
const chat = new Chat({
  maxSteps: 100,
  messages: [
    {
      id: "message-0",
      role: "assistant",
      parts: [{ type: "text", text: "Hello, how are you?" }],
    },
  ],
  onError: (error) => {
    console.error(error);
  },
});
const input = ref("");

const disabled = computed(() => chat.status === "submitted");

const handleSubmit = (e: Event) => {
  e.preventDefault();
  chat.sendMessage({ text: input.value });
  input.value = "";
};

</script>

<template>
  <div class="flex flex-col w-full max-w-md py-24 mx-auto stretch">
    <div v-for="m in chat.messages" :key="m.id" class="whitespace-pre-wrap">
      <div class="text-gray-500">{{ m.role === "user" ? "User: " : "AI: " }}</div>
      <div
        v-for="(part, index) in m.parts"
        :key="`${m.id}-${part.type}-${index}`"
      >
        <MDCCached v-if="part.type === 'text'"
          :value="getTextFromMessage(m)"
          :cache-key="m.id"
          unwrap="p"
          :parser-options="{ highlight: false }"
        />
      </div>
    </div>

    <div
      v-if="chat.status === 'submitted' || chat.status === 'streaming'"
      class="mt-4 text-gray-500"
    >
      <div v-if="chat.status === 'submitted'">Loading...</div>
      <UButton @click="chat.stop"> Stop </UButton>
    </div>

    <div v-if="chat.error" class="mt-4">
      <div class="text-red-500">{{ chat.error.message }}</div>
      <UButton @click="chat.regenerate()">Retry</UButton>
    </div>

    <form @submit="handleSubmit">
      <UInput
        autofocus
        class="fixed bottom-0 w-full max-w-md mb-8"
        v-model="input"
        placeholder="Say something..."
        :disabled="disabled"
      />
    </form>
  </div>
</template>
