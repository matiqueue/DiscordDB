import { Client, TextChannel, Message } from 'discord.js'

export default class Document {
  private messageId: string
  private channelId: string
  private client: Client
  private dataCache: unknown | null = null

  constructor(messageId: string, channelId: string, client: Client) {
    this.messageId = messageId
    this.channelId = channelId
    this.client = client
  }

  private async getMessage(): Promise<Message> {
    const channel = await this.client.channels.fetch(this.channelId)
    if (!channel) {
      throw new Error(
        `Channel with ID ${this.channelId} not found or is not a text channel.`,
      )
    }

    const message = await (channel as TextChannel).messages.fetch(
      this.messageId,
    )
    if (!message) {
      throw new Error(`Message with ID ${this.messageId} not found.`)
    }

    return message
  }

  public async getData(): Promise<unknown> {
    if (this.dataCache) return this.dataCache

    const message = await this.getMessage()
    const content = message.content

    this.dataCache = JSON.parse(content)
    return this.dataCache
  }

  public async update(newData: object): Promise<void> {
    const message = await this.getMessage()
    const content = JSON.stringify(newData)
    await message.edit(`\`\`\`json\n${content}\n\`\`\``)
    this.dataCache = newData
  }

  public async delete(): Promise<void> {
    const message = await this.getMessage()
    await message.delete()
    this.dataCache = null
  }
}
