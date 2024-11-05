import { TextChannel, Client, Guild } from 'discord.js'
import Document from './document'
import { log, error as logError } from '../utils/logger'

export default class Collection<T> {
  private channel: TextChannel
  private client: Client
  private guild: Guild

  constructor(channel: TextChannel, client: Client, guild: Guild) {
    this.channel = channel
    this.client = client
    this.guild = guild
  }

  /**
   * Tworzy nowy dokument (wiadomość) w kolekcji.
   * @param data Obiekt danych do zapisania w dokumencie.
   * @returns Instancja klasy Document reprezentująca nową wiadomość.
   */
  public async createDocument(data: T): Promise<Document<T>> {
    try {
      const messageContent = `\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``
      const message = await this.channel.send(messageContent)
      return new Document<T>(message, this.client)
    } catch (err) {
      logError('Błąd podczas tworzenia dokumentu:', err)
      throw err
    }
  }

  /**
   * Pobiera istniejący dokument (wiadomość) na podstawie ID wiadomości.
   * @param messageId ID wiadomości do pobrania.
   * @returns Instancja klasy Document reprezentująca pobraną wiadomość.
   */
  public async getDocument(messageId: string): Promise<Document<T>> {
    try {
      const message = await this.channel.messages.fetch(messageId)
      return new Document<T>(message, this.client)
    } catch (err) {
      logError(`Błąd podczas pobierania dokumentu o ID ${messageId}:`, err)
      throw err
    }
  }

  /**
   * Pobiera wszystkie dokumenty (wiadomości) w kolekcji.
   * @returns Tablica instancji klasy Document.
   */
  public async getAllDocuments(): Promise<Document<T>[]> {
    try {
      const messages = await this.channel.messages.fetch({ limit: 100 })
      const documents: Document<T>[] = []
      messages.forEach((message) => {
        if (message.author.id === this.client.user?.id) {
          documents.push(new Document<T>(message, this.client))
        }
      })
      return documents
    } catch (err) {
      logError('Błąd podczas pobierania wszystkich dokumentów:', err)
      throw err
    }
  }

  /**
   * Wyszukuje dokument spełniający podany warunek.
   * @param predicate Funkcja predykatu określająca warunek.
   * @returns Instancja klasy Document spełniająca warunek lub null, jeśli nie znaleziono.
   */
  public async findDocument(
    predicate: (data: T) => boolean,
  ): Promise<Document<T> | null> {
    try {
      const documents = await this.getAllDocuments()
      for (const doc of documents) {
        const data = await doc.getData()
        if (predicate(data)) {
          return doc
        }
      }
      return null
    } catch (err) {
      logError('Błąd podczas wyszukiwania dokumentu:', err)
      throw err
    }
  }

  /**
   * Usuwa kolekcję (kanał tekstowy).
   */
  public async deleteCollection(): Promise<void> {
    try {
      await this.channel.delete('Usunięcie kolekcji przez użytkownika')
      log(`Kolekcja ${this.channel.name} została usunięta.`)
    } catch (err) {
      logError('Błąd podczas usuwania kolekcji:', err)
      throw err
    }
  }
}
