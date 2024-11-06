// src/core/document/document.ts
import { Message, Client } from 'discord.js'
import getData from './getData'
import updateData from './updateData'
import deleteDocument from './delete'

export default class Document<T> {
  private message: Message
  private client: Client
  private dataCache: T | null = null

  constructor(message: Message, client: Client) {
    this.message = message
    this.client = client
  }

  public async getData(): Promise<T> {
    if (this.dataCache) return this.dataCache
    return getData<T>(this.message)
  }

  public async updateData(newData: T): Promise<void> {
    return updateData<T>(this.message, newData)
  }

  public async delete(): Promise<void> {
    return deleteDocument(this.message)
  }

  /**
   * Pobiera ID wiadomości reprezentującej dokument.
   * @returns ID wiadomości.
   */
  public getId(): string {
    return this.message.id
  }
}
