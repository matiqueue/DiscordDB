import { TextChannel } from 'discord.js'
import { logError } from '../../utils/logger'

export default async function deleteCollection(
  channel: TextChannel,
): Promise<void> {
  try {
    await channel.delete('Usunięcie kolekcji przez użytkownika')
  } catch (err) {
    logError('Błąd podczas usuwania kolekcji:', err)
    throw new Error('Nie udało się usunąć kolekcji.')
  }
}
