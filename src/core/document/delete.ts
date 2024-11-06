import { Message } from 'discord.js'
import { logError } from '../../utils/logger'

export default async function deleteDocument(message: Message): Promise<void> {
  try {
    await message.delete()
  } catch (err) {
    logError('Błąd podczas usuwania dokumentu:', err)
    throw new Error('Nie udało się usunąć dokumentu.')
  }
}
