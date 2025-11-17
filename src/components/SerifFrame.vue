<script setup lang="ts">
interface Props {
  direction: 'top' | 'bottom'
  message: string
}

const props = defineProps<Props>()
</script>

<template>
  <p v-bind:class="['serif', props.direction, 'cute', 'position0']">{{ props.message }}</p>
</template>
