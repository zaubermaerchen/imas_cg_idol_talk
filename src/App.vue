<script setup lang="ts">
import { ref } from 'vue'
import { domToPng } from 'modern-screenshot'

import MyStudio from '@/components/MyStudio.vue'

const main = ref<HTMLElement | null>(null)

const downloadImage = async () => {
  const dataUrl = await domToPng(main.value!)
  const link = document.createElement('a')
  link.download = 'screenshot.png'
  link.href = dataUrl
  link.click()
}
</script>

<template>
  <main ref="main">
    <MyStudio />
  </main>

  <button v-on:click="downloadImage">Download Image</button>
</template>
