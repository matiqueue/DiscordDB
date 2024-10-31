// src/core/database.ts

import Bot from './bot'
import { DatabaseOptions } from '../types/database-options'

export default class Database {
  public serverId: string
  public provider: Bot

  constructor(options: DatabaseOptions) {
    this.serverId = options.serverId

    if (options.provider === 'default') {
      // Użycie domyślnego providera
      this.provider = new Bot('defaultBotId', 'defaultBotSecret')
    } else if (options.provider === 'custom') {
      // Użycie customowego providera
      this.provider = options.bot
    } else {
      throw new Error(
        'Niepoprawny provider. Użyj "default" lub "custom" z obiektem Bot.',
      )
    }
  }

  // Dodatkowe metody dla Database będą tutaj
}
