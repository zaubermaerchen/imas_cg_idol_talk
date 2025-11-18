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
const { height: unitHeight } = useElementSize(unitElement, undefined, { box: 'border-box' })

const topSerifHeight = ref(0)
const bottomSerifHeight = ref(0)
const myStudioHeight = computed(() => {
  return `${unitHeight.value + topSerifHeight.value + bottomSerifHeight.value}px`
})

const unitTop = computed(() =>
  topSerifHeight.value > 0 ? `${topSerifHeight.value - 10}px` : undefined,
)
const bottomSerifTop = computed(() =>
  unitTop.value !== undefined ? `${topSerifHeight.value + unitHeight.value - 34}px` : undefined,
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
  <section id="my-studio" v-bind:style="{ height: myStudioHeight }">
    <VueDraggable v-model="cardList" tag="ul" ref="unitElement" v-bind:style="{ top: unitTop }">
      <li v-for="(card, index) in cardList" v-bind:key="index">
        <CardImage v-bind:card="card" size="ls" v-on:click="showCardSelectorModal(index)" />
      </li>
    </VueDraggable>
    <SerifFrame
      v-bind:serif="serifList[0]!"
      v-bind:card="findCardByPosition(cardList, serifList[0]!.position)"
      v-on:click="showSerifEditorModal(0)"
      v-on:change-size="(_, height) => (topSerifHeight = height)"
    />
    <SerifFrame
      v-bind:serif="serifList[1]!"
      v-bind:card="findCardByPosition(cardList, serifList[1]!.position)"
      v-bind:style="{ top: bottomSerifTop }"
      v-on:click="showSerifEditorModal(1)"
      v-on:change-size="(_, height) => (bottomSerifHeight = height)"
    />

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
  </section>
</template>
