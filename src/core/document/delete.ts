// src/core/document/delete.ts
import { Message } from 'discord.js'
import { log, error as logError } from '../../utils/logger'

export default async function deleteDocument(message: Message): Promise<void> {
  try {
    await message.delete()
    log(`Dokument ${message.id} został usunięty.`)
  } catch (err) {
    logError('Błąd podczas usuwania dokumentu:', err)
    throw err
  }
}
