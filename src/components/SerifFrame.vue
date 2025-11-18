<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'
import { useElementSize } from '@vueuse/core'

import Serif from '@/models/serif.ts'
import Card from '@/models/card.ts'

interface Props {
  serif: Serif
  card?: Card
}
interface Emits {
  (e: 'changeSize', width: number, height: number): void
}

const typeMap = new Map<number, string>([
  [0, 'cute'],
  [1, 'cool'],
  [2, 'passion'],
])

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const element = useTemplateRef<HTMLElement>('element')
const { width, height } = useElementSize(element, undefined, { box: 'border-box' })
watch([width, height], () => {
  emits('changeSize', width.value, height.value)
})

const classList = computed(() => {
  const list = ['serif']
  list.push(props.serif.isTop ? 'top' : 'bottom')
  list.push(typeMap.get(props.card?.type ?? 0) ?? 'cute')
  list.push(`position${props.serif.position}`)

  return list
})
</script>

<template>
  <p ref="element" v-bind:class="classList">
    {{ props.serif.message }}
  </p>
</template>
