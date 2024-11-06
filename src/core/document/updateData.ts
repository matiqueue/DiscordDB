// src/core/document/updateData.ts
import { Message } from 'discord.js'
import { log, error as logError } from '../../utils/logger'

export default async function updateData<T>(
  message: Message,
  newData: T,
): Promise<void> {
  try {
    const updatedContent = `\`\`\`json\n${JSON.stringify(newData, null, 2)}\n\`\`\``
    await message.edit(updatedContent)
    log(`Dokument ${message.id} został zaktualizowany.`)
  } catch (err) {
    logError('Błąd podczas aktualizacji dokumentu:', err)
    throw err
  }
}
