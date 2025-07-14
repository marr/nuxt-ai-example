<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <UContainer>
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
  </UContainer>
</template>