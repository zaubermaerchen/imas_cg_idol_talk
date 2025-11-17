export default class Serif {
  isTop: boolean
  position: number
  message: string

  constructor(isTop: boolean = true, position: number = 0, message: string = '') {
    this.isTop = isTop
    this.position = position
    this.message = message
  }
}
