<script setup lang="ts">
import { computed } from 'vue'

import Serif from '@/models/serif.ts'

interface Props {
  serif: Serif
}

const props = defineProps<Props>()
const classList = computed(() => {
  const list = ['serif']
  list.push(props.serif.isTop ? 'top' : 'bottom')
  list.push('cute')
  list.push(`position${props.serif.position}`)
  return list
})
</script>

<template>
  <p v-bind:class="classList">
    {{ props.serif.message }}
  </p>
</template>
