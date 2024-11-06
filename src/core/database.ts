import { Guild, TextChannel } from 'discord.js'
import Bot from '../core/bot'
import { DatabaseOptions } from '../types/database-options'
import DiscordClient from '../connection/discord-client'
import Collection from '../core/collection/collection'
import { log, logError } from '../utils/logger'

export default class Database {
  public serverId: string
  private provider: Bot
  private client: DiscordClient
  private guild: Guild | null = null
  private ready: boolean = false

  constructor(options: DatabaseOptions) {
    this.serverId = options.serverId

    if (options.provider === 'default') {
      this.provider = new Bot('defaultBotId', 'defaultBotToken')
    } else if (options.provider === 'custom') {
      if (!options.botProvider) {
        throw new Error(
          'W przypadku provider "custom", należy dostarczyć botProvider.',
        )
      }
      this.provider = options.botProvider
    } else {
      throw new Error(
        'Niepoprawny provider. Użyj "default" lub "custom" z obiektem Bot.',
      )
    }

    this.client = new DiscordClient(this.provider)

    // Rozpoczęcie inicjalizacji
    this.initialize()
      .then(() => {
        this.ready = true
        log('Baza danych jest gotowa do użycia.')
      })
      .catch((error) => {
        logError('Błąd inicjalizacji bazy danych:', error)
      })
  }

  private async initialize(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.client.once('ready', async () => {
        try {
          this.guild = await this.client.client.guilds.fetch(this.serverId)
          if (!this.guild) {
            throw new Error(
              `Serwer o ID ${this.serverId} nie został znaleziony.`,
            )
          }
          log(`Połączono z serwerem: ${this.guild.name}`)
          resolve()
        } catch (error) {
          logError('Błąd podczas pobierania serwera:', error)
          reject(error)
        }
      })

      this.client.client.on('error', (error: unknown) => {
        logError('Klient Discord napotkał błąd:', error)
        reject(error)
      })
    })
  }

  /**
   * Pobiera istniejącą kolekcję (kanał tekstowy) lub tworzy nową.
   * Metoda jest generyczna, co pozwala na określenie typu danych przechowywanych w kolekcji.
   * @param name Nazwa kolekcji (kanału tekstowego).
   * @returns Instancja klasy Collection reprezentująca kanał.
   */
  public async getCollection<T extends { id: string }>(
    name: string,
  ): Promise<Collection<T>> {
    if (!this.ready || !this.guild) {
      logError('Baza danych nie jest jeszcze gotowa.')
      throw new Error(
        'Baza danych nie jest jeszcze gotowa. Spróbuj ponownie później.',
      )
    }

    let channel = this.guild.channels.cache.find(
      (ch) => ch.name === name && ch.isTextBased(),
    ) as TextChannel | undefined

    if (!channel) {
      try {
        channel = await this.guild.channels.create({
          name: name,
          type: 0, // GUILD_TEXT w discord.js v14
        })
        log(`Utworzono nową kolekcję: ${name}`)
      } catch (err) {
        logError(`Błąd podczas tworzenia kolekcji ${name}:`, err)
        throw new Error(`Nie udało się utworzyć kolekcji ${name}.`)
      }
    }

    return new Collection<T>(channel, this.client.client, this.guild)
  }
}
