import { Database, Bot } from '../src/index'

const myBot = new Bot('YOUR_BOT_ID', 'YOUR_BOT_SECRET')

const db = new Database({
  serverId: 'YOUR_SERVER_ID',
  provider: 'custom',
  botProvider: myBot,
})

;(async () => {
  try {
    await db.ready
    console.log('Baza danych jest gotowa do użycia.')
  } catch (error) {
    console.error('Błąd inicjalizacji bazy danych:', error)
  }
})()
