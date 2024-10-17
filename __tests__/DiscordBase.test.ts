import { type BaseConfig, DiscordBase } from "../src/index"

describe("DiscordBase", () => {
  let config: BaseConfig

  beforeEach(() => {
    config = {
      serverId: "123",
      botId: "abc",
      botSecret: "secret",
      botToken: "token",
      databaseName: "testDB",
      createdAt: new Date(),
      ownerId: "owner123",
      provider: "discord",
      loggingEnabled: true,
      cacheTimeout: 5000,
      maxRetries: 3,
    }
  })

  test("Should initialize with correct config values", () => {
    const discordBase = new DiscordBase(config)
    expect(discordBase.serverId).toBe("123")
    expect(discordBase.botId).toBe("abc")
    expect(discordBase.databaseName).toBe("testDB")
    expect(discordBase.loggingEnabled).toBe(true)
  })

  test("Should update values correctly", () => {
    const discordBase = new DiscordBase(config)
    const updatedConfig = { databaseName: "newDB", loggingEnabled: false }
    discordBase.update(updatedConfig)
    expect(discordBase.databaseName).toBe("newDB")
    expect(discordBase.loggingEnabled).toBe(false)
    expect(discordBase.updatedAt).toBeInstanceOf(Date)
  })

  test("Should log config correctly", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {})
    const discordBase = new DiscordBase(config)
    discordBase.printConfig()
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
