<script setup lang="ts">
import { ref, computed } from 'vue'

import Card from '@/models/card.ts'
import Serif from '@/models/serif.ts'
import { findCardByPosition } from '@/utils/card.ts'

interface Props {
  cardList: Array<Card | undefined>
}

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const model = defineModel<Serif>({ required: true })
const serif = ref<Serif>({ ...model.value })
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const positionList = computed(() => {
  return ['リーダー', 'メンバー1', 'メンバー2', 'メンバー3', 'メンバー4'].map((label, position) => {
    const card = findCardByPosition(props.cardList, position)
    return { value: position, label: `${label}: ${card?.name ?? ''}` }
  })
})

const confirm = () => {
  model.value.position = serif.value.position
  model.value.message = serif.value.message
  emits('confirm')
}
const cancel = () => {
  emits('cancel')
}
</script>

<template>
  <el-container id="serif-editor-modal">
    <el-header>
      <h2>セリフ編集</h2>
    </el-header>
    <el-main>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="立ち位置">
          <el-select v-model.number="serif.position" placeholder="立ち位置">
            <el-option
              v-for="item in positionList"
              v-bind:key="item.value"
              v-bind:value="item.value"
              v-bind:label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="メッセージ">
          <el-input
            v-model="serif.message"
            style="font-size: 16px"
            placeholder="セリフを入力してください"
          />
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>
      <ul class="button-list">
        <li>
          <el-button v-on:click="confirm">OK</el-button>
        </li>
        <li>
          <el-button v-on:click="cancel">キャンセル</el-button>
        </li>
      </ul>
    </el-footer>
  </el-container>
</template>
