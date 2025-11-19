<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'
import { VueFinalModal } from 'vue-final-modal'

import Card from '@/models/card.ts'
import Serif from '@/models/serif.ts'
import CardImage from '@/components/CardImage.vue'
import SerifFrame from '@/components/SerifFrame.vue'
import CardSelectorModal from '@/components/CardSelectorModal.vue'
import SerifEditorModal from '@/components/SerifEditorModal.vue'
import { useTargetCard } from '@/composables/targetCard.ts'
import { useTargetSerif } from '@/composables/targetSerif.ts'
import { findCardByPosition } from '@/utils/card.ts'

const cardList = ref<Array<Card | undefined>>(Array.from({ length: 5 }))
const serifList = ref<Serif[]>([new Serif(true), new Serif(false)])

const unitElement = useTemplateRef<HTMLElement>('unitElement')
const topSerifElement = useTemplateRef<HTMLElement>('topSerifElement')
const bottomSerifElement = useTemplateRef<HTMLElement>('bottomSerifElement')
const { height: unitHeight } = useElementSize(unitElement, undefined, { box: 'border-box' })
const { height: topSerifHeight } = useElementSize(topSerifElement, undefined, { box: 'border-box' })
const { height: bottomSerifHeight } = useElementSize(bottomSerifElement, undefined, {
  box: 'border-box',
})

const height = computed(() => {
  return `${unitHeight.value + topSerifHeight.value + bottomSerifHeight.value - 44 - 24}px`
})

const unitTop = computed(() =>
  topSerifHeight.value > 0 ? `${topSerifHeight.value - 44}px` : undefined,
)
const bottomSerifTop = computed(() =>
  unitTop.value !== undefined
    ? `${topSerifHeight.value + unitHeight.value - 44 - 24}px`
    : undefined,
)

const isVisibleCardSelectorModal = ref(false)
const { targetCardIndex, targetCard } = useTargetCard(cardList)
const showCardSelectorModal = (cardIndex: number) => {
  targetCardIndex.value = cardIndex
  isVisibleCardSelectorModal.value = true
}

const isVisibleSerifEditorModal = ref(false)
const { targetSerifIndex, targetSerif } = useTargetSerif(serifList)
const showSerifEditorModal = (index: number) => {
  targetSerifIndex.value = index
  isVisibleSerifEditorModal.value = true
}
</script>

<template>
  <section id="my-studio" ref="main">
    <div v-bind:style="{ height: height }">
      <div class="unit-area" ref="unitElement" v-bind:style="{ top: unitTop }">
        <VueDraggable v-model="cardList" tag="ul">
          <li v-for="(card, index) in cardList" v-bind:key="index">
            <CardImage v-bind:card="card" size="ls" v-on:click="showCardSelectorModal(index)" />
          </li>
        </VueDraggable>
      </div>
      <div class="serif-area top" ref="topSerifElement">
        <SerifFrame
          v-bind:serif="serifList[0]!"
          v-bind:card="findCardByPosition(cardList, serifList[0]!.position)"
          v-on:click="showSerifEditorModal(0)"
        />
      </div>
      <div
        class="serif-area bottom"
        ref="bottomSerifElement"
        v-bind:style="{ top: bottomSerifTop }"
      >
        <SerifFrame
          v-bind:serif="serifList[1]!"
          v-bind:card="findCardByPosition(cardList, serifList[1]!.position)"
          v-on:click="showSerifEditorModal(1)"
        />
      </div>
    </div>
  </section>

  <VueFinalModal
    class="modal"
    v-model="isVisibleCardSelectorModal"
    v-bind::click-to-close="true"
    v-bind:esc-to-close="true"
  >
    <CardSelectorModal
      v-model="targetCard"
      v-on:confirm="isVisibleCardSelectorModal = false"
      v-on:cancel="isVisibleCardSelectorModal = false"
    />
  </VueFinalModal>

  <VueFinalModal
    class="modal"
    v-model="isVisibleSerifEditorModal"
    v-bind::click-to-close="true"
    v-bind:esc-to-close="true"
  >
    <SerifEditorModal
      v-model="targetSerif"
      v-bind:card-list="cardList"
      v-on:confirm="isVisibleSerifEditorModal = false"
      v-on:cancel="isVisibleSerifEditorModal = false"
    />
  </VueFinalModal>
</template>
