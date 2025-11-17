<script setup lang="ts">
import { computed } from 'vue'

import Serif from '@/models/serif.ts'
import Card from '@/models/card.ts'

interface Props {
  serif: Serif
  card?: Card
}

const typeMap = new Map<number, string>([
  [0, 'cute'],
  [1, 'cool'],
  [2, 'passion'],
])

const props = defineProps<Props>()
const classList = computed(() => {
  const list = ['serif']
  list.push(props.serif.isTop ? 'top' : 'bottom')
  list.push(typeMap.get(props.card?.type ?? 0) ?? 'cute')
  list.push(`position${props.serif.position}`)

  return list
})
</script>

<template>
  <p v-bind:class="classList">
    {{ props.serif.message }}
  </p>
</template>
