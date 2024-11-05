import { Database } from 'discord-base'

const db = new Database({
  serverId: 'YOUR SERVER ID',
  provider: 'default',
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
