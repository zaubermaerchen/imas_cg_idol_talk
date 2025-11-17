import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-vue'

import CardImage from '@/components/CardImage.vue'
import Card from '@/models/card.ts'

import blankImageUrl from '@/assets/blank.jpg'

describe('CardImage', () => {
  it('カードの内容が反映されているか', () => {
    const card = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    const screen = render(CardImage, { props: { card, size: 'xs' } })
    const image = screen.baseElement.querySelector('img')
    expect(image?.src).toBe('https://example.com/card/xs/0dabb79ff64691111a0abae2ffed01ce.jpg')
    expect(image?.alt).toBe('島村卯月')
    expect(image?.width).toBe(100)
  })

  it('サイズを変更した場合反映されているか', () => {
    const card = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    const screen = render(CardImage, { props: { card, size: 'ls' } })
    const image = screen.baseElement.querySelector('img')
    expect(image?.src).toBe('https://example.com/card/ls/0dabb79ff64691111a0abae2ffed01ce.jpg')
    expect(image?.width).toBe(60)
  })

  it('カードがない場合はブランク画像が表示されるか', () => {
    const screen = render(CardImage, { props: { size: 'xs' } })
    const image = screen.baseElement.querySelector('img')
    expect(image?.src).toBe(new URL(blankImageUrl, location.href).href)
    expect(image?.alt).toBe('blank')
  })
})
