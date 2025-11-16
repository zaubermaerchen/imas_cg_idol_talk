<script setup lang="ts">
import { ref } from 'vue'

import Card from '@/models/card.ts'
import CardImage from '@/components/CardImage.vue'
import SerifFrame from '@/components/SerifFrame.vue'

const cardList = ref<Array<Card | undefined>>([
  undefined,
  new Card(1001101, '小日向美穂', 0, 0, 'bef9093335fbcbe9e92a41d2d68a206d'),
  new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce'),
  new Card(1001301, '五十嵐響子', 0, 0, 'fb3b173c49703071b4dbdd5ed424640c'),
  undefined,
])
</script>

<template>
  <main>
    <SerifFrame
      message="はじめまして、プロデューサーさん！ 島村卯月、17歳です。私、精一杯頑張りますから、一緒に夢叶えましょうね♪よろしくお願いしますっ！"
    />
    <ul>
      <li v-for="(card, index) in cardList" v-bind:key="index"><CardImage v-bind:card="card" /></li>
    </ul>
    <SerifFrame direction="bottom" message="今日も1日がんばります！" />
  </main>
</template>

<style scoped>
main {
  width: 300px;
  padding: 5px 10px;
  background: #000000;
}

main > ul {
  display: flex;
  font-size: 0;
  margin-top: 0;
  padding-left: 1em;
}

main > ul > li {
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>
