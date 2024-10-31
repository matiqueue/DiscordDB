import { Guild } from 'discord.js'
import Bot from './bot'
import { DatabaseOptions } from '../types/database-options'
import DiscordClient from '../connection/discord-client'
import { log, error as logError } from '../utils/logger'

export default class Database {
  public serverId: string
  private provider: Bot
  private client: DiscordClient
  private guild: Guild | null = null
  public ready: Promise<void>

  constructor(options: DatabaseOptions) {
    this.serverId = options.serverId

    if (options.provider === 'default') {
      this.provider = new Bot('defaultBotId', 'defaultBotSecret')
    } else if (options.provider === 'custom') {
      this.provider = options.botProvider
    } else {
      throw new Error(
        'Niepoprawny provider. Użyj "default" lub "custom" z obiektem Bot.',
      )
    }

    this.client = new DiscordClient(this.provider)

    this.ready = new Promise<void>((resolve, reject) => {
      this.client.client.once('ready', () => {
        log('Klient Discord jest gotowy.')
        this.initialize().then(resolve).catch(reject)
      })

      this.client.client.on('error', (error) => {
        logError('Klient Discord napotkał błąd:', error)
        reject(error)
      })
    })
  }

  private async initialize() {
    try {
      this.guild = await this.client.client.guilds.fetch(this.serverId)
      if (!this.guild) {
        throw new Error(`Serwer o ID ${this.serverId} nie został znaleziony.`)
      }
      log(`Połączono z serwerem: ${this.guild.name}`)
    } catch (error) {
      logError('Błąd podczas pobierania serwera:', error)
      throw error
    }
  }
}
