export interface BaseConfig {
  serverId: string
  botId: string
  botSecret: string
  botToken: string
  databaseName: string
  databaseId?: string
  createdAt: Date
  updatedAt?: Date
  ownerId: string
  provider: "discord" | "custom"
  shardId?: number
  loggingEnabled: boolean
  cacheTimeout: number
  maxRetries: number
}
