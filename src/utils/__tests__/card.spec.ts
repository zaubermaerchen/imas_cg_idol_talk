import { describe, it, expect } from 'vitest'

import Card from '@/models/card.ts'
import { findCardByPosition } from '@/utils/card.ts'

describe('findCardByPosition', () => {
  it('指定した立ち位置に対応するカード情報が取得できるか', () => {
    const cardList: Array<Card | undefined> = [
      undefined,
      new Card(1001101, '小日向美穂', 0, 0, 'bef9093335fbcbe9e92a41d2d68a206d'),
      new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce'),
      new Card(1001301, '五十嵐響子', 0, 0, 'fb3b173c49703071b4dbdd5ed424640c'),
      undefined,
    ]

    expect(findCardByPosition(cardList, 0)?.id).toBe(1000101)
    expect(findCardByPosition(cardList, 1)?.id).toBe(1001101)
    expect(findCardByPosition(cardList, 2)?.id).toBe(1001301)
    expect(findCardByPosition(cardList, 3)?.id).toBeUndefined()
    expect(findCardByPosition(cardList, 4)?.id).toBeUndefined()
    expect(findCardByPosition(cardList, 99)?.id).toBeUndefined()
  })
})
