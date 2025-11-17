import Card from '@/models/card.ts'

const positionMap = new Map<number, number>([
  [0, 2], // リーダー
  [1, 1], // メンバー1
  [2, 3], // メンバー2
  [3, 0], // メンバー3
  [4, 4], // メンバー4
])

/**
 * 立ち位置から対応するカードの情報を取得
 *
 * @param {Array<Card | undefined>} cardList カード情報リスト
 * @param {number}                  position 立ち位置
 *
 * @returns {Card | undefined} カード情報
 */
export const findCardByPosition = (
  cardList: (Card | undefined)[],
  position: number,
): Card | undefined => {
  const index = positionMap.get(position)

  return index !== undefined ? cardList[index] : undefined
}
