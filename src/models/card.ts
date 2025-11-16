export default class Card {
  id: number
  name: string
  type: number
  rarity: number
  hash: string

  constructor(id: number, name: string, type: number, rarity: number, hash: string) {
    this.id = id
    this.name = name
    this.type = type
    this.rarity = rarity
    this.hash = hash
  }

  imageUrl = (): string => {
    return `${import.meta.env.VITE_IMAGE_SERVER_URL}/card/ls/${this.hash}.jpg`
  }
}
