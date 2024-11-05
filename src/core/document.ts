import { Message, Client } from 'discord.js'
import { log, error as logError } from '../utils/logger'

export default class Document<T> {
  private message: Message
  private client: Client
  private dataCache: T | null = null

  constructor(message: Message, client: Client) {
    this.message = message
    this.client = client
  }

  /**
   * Pobiera dane z dokumentu (wiadomości).
   * @returns Obiekt danych zapisanych w wiadomości.
   */
  public async getData(): Promise<T> {
    if (this.dataCache) return this.dataCache

    try {
      const content = this.message.content.trim()
      const jsonString = content
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '')
      this.dataCache = JSON.parse(jsonString) as T
      return this.dataCache
    } catch (err) {
      logError('Błąd podczas parsowania danych dokumentu:', err)
      throw new Error('Nie udało się sparsować zawartości dokumentu.')
    }
  }

  /**
   * Aktualizuje dane w dokumencie (wiadomości).
   * @param newData Nowe dane do zapisania w wiadomości.
   */
  public async updateData(newData: T): Promise<void> {
    try {
      const updatedContent = `\`\`\`json\n${JSON.stringify(newData, null, 2)}\n\`\`\``
      await this.message.edit(updatedContent)
      this.dataCache = newData
      log(`Dokument ${this.message.id} został zaktualizowany.`)
    } catch (err) {
      logError('Błąd podczas aktualizacji dokumentu:', err)
      throw err
    }
  }

  /**
   * Usuwa dokument (wiadomość).
   */
  public async delete(): Promise<void> {
    try {
      await this.message.delete()
      log(`Dokument ${this.message.id} został usunięty.`)
    } catch (err) {
      logError('Błąd podczas usuwania dokumentu:', err)
      throw err
    }
  }
}
