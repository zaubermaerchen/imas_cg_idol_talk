<script setup lang="ts">
import Card, { type CardSize } from '@/models/card.ts'
import blankLsImageUrl from '@/assets/blank_ls.jpg'
import blankXsImageUrl from '@/assets/blank.jpg'

interface Props {
  card?: Card
  size: CardSize
}

const props = defineProps<Props>()

const blankImageUrl = props.size === 'ls' ? blankLsImageUrl : blankXsImageUrl
const width = props.size === 'ls' ? 120 : 100
</script>

<template>
  <img
    v-bind:src="props.card?.imageUrl(props.size) ?? blankImageUrl"
    v-bind:alt="props.card?.name ?? 'blank'"
    v-bind:width="width"
  />
</template>
