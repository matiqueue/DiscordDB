export default class Bot {
  public botId: string
  public botToken: string

  constructor(botId: string, botToken: string) {
    this.botId = botId
    this.botToken = botToken
  }
}
