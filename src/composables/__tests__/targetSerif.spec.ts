import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

import { useTargetSerif } from '@/composables/targetSerif.ts'
import Serif from '@/models/serif.ts'

describe('useTargetSerif', () => {
  it('targetSerifIndexに値を設定すると、targetCardが更新されるか', async () => {
    const serifList = ref<Array<Serif>>([
      new Serif(true, 0, 'こんにちは'),
      new Serif(false, 1, 'おはようございます'),
    ])
    const { targetSerifIndex, targetSerif } = useTargetSerif(serifList)

    expect(targetSerifIndex.value).toBe(0)
    expect(targetSerif.value?.isTop).toBe(true)

    targetSerifIndex.value = 1
    expect(targetSerif.value?.isTop).toBe(false)
  })
})
