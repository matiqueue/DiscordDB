import { Message } from 'discord.js'
import { logError } from '../../utils/logger'

export default async function getData<T>(message: Message): Promise<T> {
  try {
    const content = message.content.trim()
    const jsonString = content.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    const data: T = JSON.parse(jsonString)
    return data
  } catch (err) {
    logError('Błąd podczas parsowania danych dokumentu:', err)
    throw new Error('Nie udało się sparsować zawartości dokumentu.')
  }
}
