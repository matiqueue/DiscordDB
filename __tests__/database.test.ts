import { type BaseConfig } from "../src/types/types"
import { DiscordBase } from "../src/config/main"

const config: BaseConfig = {
  serverId: "1234567890",
  botId: "bot123456789",
  botSecret: "your-bot-secret",
  botToken: "your-bot-token",
  databaseName: "my-discord-db",
  createdAt: new Date(),
  ownerId: "owner123456789",
  provider: "discord",
  loggingEnabled: true,
  cacheTimeout: 3600,
  maxRetries: 5,
}

const base = new DiscordBase(config)

base.update({ databaseName: "updated-discord-db" })

base.printConfig()
