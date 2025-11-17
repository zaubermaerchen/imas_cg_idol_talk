import { ref, computed, type Ref } from 'vue'
import Serif from '@/models/serif.ts'

export function useTargetSerif(serifList: Ref<Array<Serif>>) {
  const targetSerifIndex = ref<number>(0)
  const targetSerif = computed<Serif>({
    get() {
      const index = targetSerifIndex.value
      return serifList.value[index]!
    },
    set(serif: Serif) {
      const index = targetSerifIndex.value
      serifList.value[index] = serif
    },
  })

  return { targetSerifIndex, targetSerif }
}
