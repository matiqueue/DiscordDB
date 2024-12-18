import { TextChannel, Client } from 'discord.js'
import Document from '../document/document'
import { logError } from '../../utils/logger'

export default async function createDocument<T extends { id: string }>(
  channel: TextChannel,
  client: Client,
  data: T,
): Promise<Document<T>> {
  try {
    const messageContent = `\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``
    const message = await channel.send(messageContent)
    return new Document<T>(message, client)
  } catch (err) {
    logError('Błąd podczas tworzenia dokumentu:', err)
    throw new Error('Nie udało się utworzyć dokumentu.')
  }
}
