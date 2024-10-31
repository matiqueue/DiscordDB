// src/database.ts

import { Client, GatewayIntentBits, ChannelType } from 'discord.js'
import { DatabaseOptions } from './interfaces/database-options'
import Collection from './models/collection'
import { log, error } from './utils/logger'

export default class Database {
  private client: Client
  private serverId: string
  private collectionPrefix: string
  private ready: Promise<void>

  constructor(options: DatabaseOptions) {
    this.serverId = options.serverId
    this.collectionPrefix = options.collectionPrefix || ''
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    })

    this.ready = this.client
      .login(options.token)
      .then(() => {
        log('Discord client logged in.')
      })
      .catch((err) => {
        error('Failed to login Discord client:', err)
      })
  }

  public async getCollection(name: string): Promise<Collection> {
    await this.ready

    const guild = await this.client.guilds.fetch(this.serverId)
    if (!guild) {
      throw new Error(`Server with ID ${this.serverId} not found.`)
    }

    const channelName = `${this.collectionPrefix}${name}`
    let channel = guild.channels.cache.find(
      (ch) => ch.name === channelName && ch.type === ChannelType.GuildText,
    )

    if (!channel) {
      channel = await guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
      })
    }

    return new Collection(channel.id, this.client)
  }

  public async close(): Promise<void> {
    await this.client.destroy()
  }
}
