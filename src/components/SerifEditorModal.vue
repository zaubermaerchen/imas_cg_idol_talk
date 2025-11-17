<script setup lang="ts">
import { ref } from 'vue'
import Serif from '@/models/serif.ts'

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const model = defineModel<Serif>({ required: true })
const serif = ref<Serif>({ ...model.value })
const emits = defineEmits<Emits>()

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
            <el-option value="0" label="リーダー" />
            <el-option value="1" label="メンバー1" />
            <el-option value="2" label="メンバー2" />
            <el-option value="3" label="メンバー3" />
            <el-option value="4" label="メンバー4" />
          </el-select>
        </el-form-item>
        <el-form-item label="メッセージ">
          <el-input v-model="serif.message" placeholder="セリフを入力してください" />
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
