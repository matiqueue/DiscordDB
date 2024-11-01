import { Database } from '../../src/index'

const db = new Database({
  serverId: '1301543581260976139',
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
