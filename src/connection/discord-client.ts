import { Client, GatewayIntentBits } from 'discord.js'
import Bot from '../core/bot'
import { log, logError } from '../utils/logger'

export default class DiscordClient {
  public client: Client

  constructor(bot: Bot) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    })

    this.client.once('ready', () => {
      log('Pomyślnie połączono z Discordem.')
    })

    this.client.on('error', (err) => {
      logError('Błąd połączenia z Discordem:', err)
    })

    this.client.login(bot.botToken).catch((err) => {
      logError('Błąd logowania do Discorda:', err)
    })
  }
}
