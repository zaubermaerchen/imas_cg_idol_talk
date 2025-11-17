import { describe, it, expect } from 'vitest'

import Serif from '@/models/serif.ts'

describe('Serif', () => {
  it('コンストラクタに渡した引数がメンバーにセットされているか', () => {
    const serif1 = new Serif(true, 0, 'こんにちは')
    expect(serif1.isTop).toBe(true)
    expect(serif1.position).toBe(0)
    expect(serif1.message).toBe('こんにちは')

    const serif2 = new Serif(false, 1, 'おはようございます')
    expect(serif2.isTop).toBe(false)
    expect(serif2.position).toBe(1)
    expect(serif2.message).toBe('おはようございます')
  })
})
