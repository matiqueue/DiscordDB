import { TextChannel, Client, Guild } from 'discord.js'
import Document from '../document/document'
import { logError } from '../../utils/logger'
import createDocument from './createDocument'
import getDocument from './getDocument'
import getAllDocuments from './getAllDocuments'
import findDocument from './findDocument'
import deleteCollection from './deleteCollection'

export default class Collection<T extends { id: string }> {
  private channel: TextChannel
  private client: Client
  private guild: Guild

  constructor(channel: TextChannel, client: Client, guild: Guild) {
    this.channel = channel
    this.client = client
    this.guild = guild
  }

  public async createDocument(data: T): Promise<Document<T>> {
    // Sprawdzenie unikalności ID przed utworzeniem dokumentu
    const existingDoc = await this.findDocument((doc) => doc.id === data.id)
    if (existingDoc) {
      logError(
        `Dokument z ID ${data.id} już istnieje w kolekcji ${this.channel.name}.`,
      )
      throw new Error(`Dokument z ID ${data.id} już istnieje w kolekcji.`)
    }
    return createDocument(this.channel, this.client, data)
  }

  public async getDocument(messageId: string): Promise<Document<T>> {
    return getDocument(this.channel, this.client, messageId)
  }

  public async getAllDocuments(): Promise<Document<T>[]> {
    return getAllDocuments(this.channel, this.client)
  }

  public async findDocument(
    predicate: (data: T) => boolean,
  ): Promise<Document<T> | null> {
    return findDocument(this.channel, this.client, predicate)
  }

  public async deleteCollection(): Promise<void> {
    return deleteCollection(this.channel)
  }
}
