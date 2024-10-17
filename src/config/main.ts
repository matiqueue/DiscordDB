import { BaseConfig } from "../types/types"

export class DiscordBase {
  public serverId: string
  public botId: string
  public botSecret: string
  public botToken: string
  public databaseName: string
  public databaseId?: string
  public createdAt: Date
  public updatedAt?: Date
  public ownerId: string
  public provider: "discord" | "custom"
  public shardId?: number
  public loggingEnabled: boolean
  public cacheTimeout: number
  public maxRetries: number

  constructor(config: BaseConfig) {
    this.serverId = config.serverId
    this.botId = config.botId
    this.botSecret = config.botSecret
    this.botToken = config.botToken
    this.databaseName = config.databaseName
    this.databaseId = config.databaseId
    this.createdAt = config.createdAt
    this.updatedAt = config.updatedAt
    this.ownerId = config.ownerId
    this.provider = config.provider
    this.shardId = config.shardId
    this.loggingEnabled = config.loggingEnabled
    this.cacheTimeout = config.cacheTimeout
    this.maxRetries = config.maxRetries
  }

  update(updatedConfig: Partial<BaseConfig>): void {
    Object.assign(this, updatedConfig)
    this.updatedAt = new Date()
  }

  printConfig(): void {
    console.log({
      serverId: this.serverId,
      botId: this.botId,
      databaseName: this.databaseName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ownerId: this.ownerId,
      provider: this.provider,
      loggingEnabled: this.loggingEnabled,
    })
  }
}
