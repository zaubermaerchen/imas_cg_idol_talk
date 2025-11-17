<script setup lang="ts">
import { ref } from 'vue'
import { domToJpeg } from 'modern-screenshot'

import MyStudio from '@/components/MyStudio.vue'

const myStudio = ref<InstanceType<typeof MyStudio> | null>(null)

const downloadImage = async () => {
  const node = myStudio.value!.$el as HTMLElement
  const dataUrl = await domToJpeg(node, { quality: 0.85 })
  const link = document.createElement('a')
  link.download = `my_studio_${Math.round(new Date().getTime() / 1000)}.jpg`
  link.href = dataUrl
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
