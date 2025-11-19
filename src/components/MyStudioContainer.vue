<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'

interface Props {
  mainTopOffset?: number
  headerTopOffset?: number
  footerTopOffset?: number
}

const props = defineProps<Props>()

const main = useTemplateRef<HTMLElement>('main')
const header = useTemplateRef<HTMLElement>('header')
const footer = useTemplateRef<HTMLElement>('footer')
const { height: mainHeight } = useElementSize(main, undefined, { box: 'border-box' })
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })
const { height: footerHeight } = useElementSize(footer, undefined, {
  box: 'border-box',
})

const headerTop = computed(() => Math.max(0, props.headerTopOffset ?? 0))
const mainTop = computed(() =>
  Math.max(0, headerTop.value + headerHeight.value + (props.mainTopOffset ?? 0)),
)
const footerTop = computed(() =>
  Math.max(0, mainTop.value + mainHeight.value + (props.footerTopOffset ?? 0)),
)
</script>

<template>
  <div class="container" v-bind:style="{ '--height': footerTop + footerHeight }">
    <div class="main" ref="main" v-bind:style="{ '--top': mainTop }">
      <slot></slot>
    </div>
    <div class="header" ref="header" v-bind:style="{ '--top': headerTop }">
      <slot name="header"></slot>
    </div>
    <div class="footer" ref="footer" v-bind:style="{ '--top': footerTop }">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
