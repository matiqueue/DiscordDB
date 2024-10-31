import { Client, TextChannel } from 'discord.js'
import Document from './document'

export default class Collection {
  private channelId: string
  private client: Client
  private channel: TextChannel | null = null

  constructor(channelId: string, client: Client) {
    this.channelId = channelId
    this.client = client
  }

  private async getChannel(): Promise<TextChannel> {
    if (this.channel) return this.channel

    const channel = await this.client.channels.fetch(this.channelId)
    if (!channel) {
      throw new Error(
        `Channel with ID ${this.channelId} not found or is not a text channel.`,
      )
    }

    this.channel = channel as TextChannel
    return this.channel
  }

  public async insert(document: object): Promise<Document> {
    const channel = await this.getChannel()
    const content = JSON.stringify(document)
    const message = await channel.send(`\`\`\`json\n${content}\n\`\`\``)
    return new Document(message.id, this.channelId, this.client)
  }

  public async findAll(): Promise<Document[]> {
    const channel = await this.getChannel()
    const messages = await channel.messages.fetch({ limit: 100 })
    const documents: Document[] = []

    for (const message of messages.values()) {
      if (message.content.startsWith('```json')) {
        documents.push(new Document(message.id, this.channelId, this.client))
      }
    }

    return documents
  }

  // Additional methods like findOne, update, delete can be implemented similarly
}
