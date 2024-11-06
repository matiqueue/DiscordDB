// src/core/collection/deleteCollection.ts
import { TextChannel } from 'discord.js'
import { log, error as logError } from '../../utils/logger'

export default async function deleteCollection(
  channel: TextChannel,
): Promise<void> {
  try {
    await channel.delete('Usunięcie kolekcji przez użytkownika')
    log(`Kolekcja ${channel.name} została usunięta.`)
  } catch (err) {
    logError('Błąd podczas usuwania kolekcji:', err)
    throw err
  }
}
