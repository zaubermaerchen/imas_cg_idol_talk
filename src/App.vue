<script setup lang="ts">
import { ref } from 'vue'
import { domToBlob } from 'modern-screenshot'

import MyStudio from '@/components/MyStudio.vue'

const myStudio = ref<InstanceType<typeof MyStudio> | null>(null)

const imagePath = ref<string | null>(null)
const downloadImage = async () => {
  if (imagePath.value) {
    URL.revokeObjectURL(imagePath.value)
    imagePath.value = null
  }
  const node = myStudio.value!.$el as HTMLElement
  const blob = await domToBlob(node, { type: 'image/jpeg', quality: 0.85 })
  imagePath.value = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.download = `my_studio_${Math.round(new Date().getTime() / 1000)}.jpg`
  link.href = imagePath.value
  link.click()
}
</script>

<template>
  <el-container id="app-container">
    <el-main>
      <MyStudio ref="myStudio" />
    </el-main>
    <el-footer>
      <ul class="button-list">
        <li>
          <el-button type="primary" size="large" v-on:click="downloadImage">画像生成</el-button>
        </li>
      </ul>
    </el-footer>
  </el-container>
</template>
