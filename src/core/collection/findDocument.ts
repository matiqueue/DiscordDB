// src/core/collection/findDocument.ts
import { TextChannel, Client } from 'discord.js'
import Document from '../document/document'
import { error as logError } from '../../utils/logger'

export default async function findDocument<T>(
  channel: TextChannel,
  client: Client,
  predicate: (data: T) => boolean,
): Promise<Document<T> | null> {
  try {
    const documents = await channel.messages.fetch({ limit: 100 })
    for (const message of documents.values()) {
      if (message.author.id === client.user?.id) {
        const doc = new Document<T>(message, client)
        const data = await doc.getData()
        if (predicate(data)) {
          return doc
        }
      }
    }
    return null
  } catch (err) {
    logError('Błąd podczas wyszukiwania dokumentu:', err)
    throw err
  }
}
