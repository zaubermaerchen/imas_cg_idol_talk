<script setup lang="ts">
import Serif from '@/models/serif.ts'

interface Props {
  direction: 'top' | 'bottom'
  serif: Serif
}

const props = defineProps<Props>()
</script>

<template>
  <p v-bind:class="['serif', props.direction, 'cute', `position${props.serif.position}`]">
    {{ props.serif.message }}
  </p>
</template>
