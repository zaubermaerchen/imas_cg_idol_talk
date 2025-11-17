<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { VueFinalModal } from 'vue-final-modal'

import Card from '@/models/card.ts'
import Serif from '@/models/serif.ts'
import CardImage from '@/components/CardImage.vue'
import SerifFrame from '@/components/SerifFrame.vue'
import CardSelectorModal from '@/components/CardSelectorModal.vue'
import SerifEditorModal from '@/components/SerifEditorModal.vue'
import { useTargetCard } from '@/composables/targetCard.ts'
import { findCardByPosition } from '@/utils/card.ts'

const cardList = ref<Array<Card | undefined>>([
  undefined,
  new Card(1001101, '小日向美穂', 0, 0, 'bef9093335fbcbe9e92a41d2d68a206d'),
  new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce'),
  new Card(1001301, '五十嵐響子', 0, 0, 'fb3b173c49703071b4dbdd5ed424640c'),
  undefined,
])
const serifList = ref<Serif[]>([
  new Serif(
    true,
    0,
    'はじめまして、プロデューサーさん！ 島村卯月、17歳です。私、精一杯頑張りますから、一緒に夢叶えましょうね♪よろしくお願いしますっ！',
  ),
  new Serif(false, 0, '今日も1日がんばります！'),
])

const isVisibleCardSelectorModal = ref(false)
const { targetCardIndex, targetCard } = useTargetCard(cardList)
const showCardSelectorModal = (cardIndex: number) => {
  targetCardIndex.value = cardIndex
  isVisibleCardSelectorModal.value = true
}

const isVisibleSerifEditorModal = ref(false)
const showSerifEditorModal = () => {
  isVisibleSerifEditorModal.value = true
}
</script>

<template>
  <section id="my-studio">
    <SerifFrame
      v-bind:serif="serifList[0]!"
      v-bind:card="findCardByPosition(cardList, serifList[0]!.position)"
      v-on:click="showSerifEditorModal"
    />
    <VueDraggable v-model="cardList" tag="ul">
      <li v-for="(card, index) in cardList" v-bind:key="index">
        <CardImage v-bind:card="card" size="ls" v-on:click="showCardSelectorModal(index)" />
      </li>
    </VueDraggable>
    <SerifFrame
      v-bind:serif="serifList[1]!"
      v-bind:card="findCardByPosition(cardList, serifList[1]!.position)"
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
        v-model="serifList[0]!"
        v-bind:card-list="cardList"
        v-on:confirm="isVisibleSerifEditorModal = false"
        v-on:cancel="isVisibleSerifEditorModal = false"
      />
    </VueFinalModal>
  </section>
</template>
