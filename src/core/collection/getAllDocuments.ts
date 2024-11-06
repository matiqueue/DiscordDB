// src/core/collection/getAllDocuments.ts
import { TextChannel, Client } from 'discord.js'
import Document from '../document/document'
import { error as logError } from '../../utils/logger'

export default async function getAllDocuments<T>(
  channel: TextChannel,
  client: Client,
): Promise<Document<T>[]> {
  try {
    const messages = await channel.messages.fetch({ limit: 100 })
    const documents: Document<T>[] = []
    messages.forEach((message) => {
      if (message.author.id === client.user?.id) {
        documents.push(new Document<T>(message, client))
      }
    })
    return documents
  } catch (err) {
    logError('Błąd podczas pobierania wszystkich dokumentów:', err)
    throw err
  }
}
