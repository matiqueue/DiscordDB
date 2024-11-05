import { Database, Bot, Collection } from 'discord-base'
import dotenv from 'dotenv'

dotenv.config({ path: ['.env.local', '.env'] })

interface User {
  id: string
  name: string
  age: number
}

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

    // Pobieranie lub tworzenie kolekcji
    const usersCollection = (await db.getCollection<User>(
      'users',
    )) as Collection<User>

    // Tworzenie nowego dokumentu
    const userDoc = await usersCollection.createDocument({
      id: '123',
      name: 'Jan Kowalski',
      age: 30,
    })

    console.log('Dokument utworzony z ID:', userDoc['message'].id)

    // Pobieranie danych dokumentu
    const data = await userDoc.getData()
    console.log('Dane dokumentu:', data)

    // Aktualizacja danych dokumentu
    await userDoc.updateData({
      id: '123',
      name: 'Jan Nowak',
      age: 31,
    })
    console.log('Dokument zaktualizowany.')

    // Wyszukiwanie dokumentu
    const foundDoc = await usersCollection.findDocument(
      (user) => user.id === '123',
    )
    if (foundDoc) {
      const foundData = await foundDoc.getData()
      console.log('Znaleziony dokument:', foundData)
    } else {
      console.log('Dokument nie został znaleziony.')
    }

    // Usuwanie dokumentu
    // await userDoc.delete()
    // console.log('Dokument usunięty.');

    // Usuwanie kolekcji
    // await usersCollection.deleteCollection();
    // console.log('Kolekcja usunięta.');
  } catch (error) {
    console.error('Błąd inicjalizacji bazy danych:', error)
  }
})()
