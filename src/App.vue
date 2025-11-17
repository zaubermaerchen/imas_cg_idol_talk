<script setup lang="ts">
import { ref } from 'vue'
import { domToPng } from 'modern-screenshot'

import MyStudio from '@/components/MyStudio.vue'

const myStudio = ref<InstanceType<typeof MyStudio> | null>(null)

const downloadImage = async () => {
  const node = myStudio.value!.$el as HTMLElement
  const dataUrl = await domToPng(node)
  const link = document.createElement('a')
  link.download = 'screenshot.png'
  link.href = dataUrl
  link.click()
}
</script>

<template>
  <el-container>
    <el-main>
      <MyStudio ref="myStudio" />
    </el-main>
    <el-footer>
      <el-button type="primary" v-on:click="downloadImage">Download Image</el-button>
    </el-footer>
  </el-container>
</template>
