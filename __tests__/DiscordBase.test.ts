import { DiscordBase } from "../src/config/main"
import { type BaseConfig } from "../src/types/types"

describe("DiscordBase", () => {
  let config: BaseConfig
  let base: DiscordBase

  beforeEach(() => {
    config = {
      serverId: "1234567890",
      botId: "bot123456789",
      botSecret: "super-secret",
      botToken: "bot-token",
      databaseName: "my-discord-db",
      createdAt: new Date(),
      ownerId: "owner123456789",
      provider: "discord",
      loggingEnabled: true,
      cacheTimeout: 3600,
      maxRetries: 5,
    }

    base = new DiscordBase(config)
  })

  test("should create a new DiscordBase instance with the correct properties", () => {
    expect(base.serverId).toBe("1234567890")
    expect(base.databaseName).toBe("my-discord-db")
    expect(base.loggingEnabled).toBe(true)
    expect(base.maxRetries).toBe(5)
  })

  test("should update the databaseName correctly", () => {
    base.update({ databaseName: "updated-db-name" })
    expect(base.databaseName).toBe("updated-db-name")
    expect(base.updatedAt).toBeDefined()
  })

  test("should log the correct config", () => {
    console.log = jest.fn() // Mockowanie funkcji console.log
    base.printConfig()
    expect(console.log).toHaveBeenCalled()
  })
})
