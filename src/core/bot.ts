export default class Bot {
  public botId: string
  public botSecret: string

  constructor(botId: string, botSecret: string) {
    this.botId = botId
    this.botSecret = botSecret
  }
}
