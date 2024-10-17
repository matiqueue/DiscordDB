import { DiscordBase } from "../models/discord-base"
import { type BaseConfig } from "../types/base-config"

export class DatabaseManager {
  private base: DiscordBase

  constructor(config: BaseConfig) {
    this.base = new DiscordBase(config)
  }

  public connect(): void {
    console.log(`Connecting to database: ${this.base.databaseName}`)
  }

  public disconnect(): void {
    console.log("Disconnecting from database")
  }

  public sync(): void {
    console.log("Synchronizing with Discord server")
  }
}
