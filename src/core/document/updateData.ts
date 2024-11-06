import { Message } from 'discord.js'
import { logError } from '../../utils/logger'

export default async function updateData<T>(
  message: Message,
  newData: T,
): Promise<void> {
  try {
    const updatedContent = `\`\`\`json\n${JSON.stringify(newData, null, 2)}\n\`\`\``
    await message.edit(updatedContent)
  } catch (err) {
    logError('Błąd podczas aktualizacji dokumentu:', err)
    throw new Error('Nie udało się zaktualizować dokumentu.')
  }
}
