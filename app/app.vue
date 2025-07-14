<script setup lang="ts">
const navigation = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Chat',
    to: '/chat'
  }
]
</script>

<template>
  <NuxtLayout>
    <UNavigationMenu :items="navigation" />
    <NuxtPage />
  </NuxtLayout>
</template>