import { Database, Bot } from 'discord-base'
import dotenv from 'dotenv'

dotenv.config({ path: ['.env.local', '.env'] })

const myBot = new Bot(
  process.env.BOT_ID as string,
  process.env.BOT_TOKEN as string,
)

const db = new Database({
  serverId: 'YOUR SERVER ID',
  provider: 'custom',
  botProvider: myBot,
})
;(async () => {
  try {
    await db.ready
    console.log('Baza danych jest gotowa do użycia.')
    await db.listGuilds()
  } catch (error) {
    console.error('Błąd inicjalizacji bazy danych:', error)
  }
})()