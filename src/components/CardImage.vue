<script setup lang="ts">
import Card from '@/models/card.ts'
import blankImageUrl from '@/assets/blank_ls.jpg'

interface Props {
  card?: Card
}

const props = defineProps<Props>()
</script>

<template>
  <img
    v-bind:src="props.card?.imageUrl() ?? blankImageUrl"
    v-bind:alt="props.card?.name ?? 'blank'"
    width="60"
  />
</template>
