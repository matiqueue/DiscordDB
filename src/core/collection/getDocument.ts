// src/core/collection/getDocument.ts
import { TextChannel, Client } from 'discord.js'
import Document from '../document/document'
import { error as logError } from '../../utils/logger'

export default async function getDocument<T>(
  channel: TextChannel,
  client: Client,
  messageId: string,
): Promise<Document<T>> {
  try {
    const message = await channel.messages.fetch(messageId)
    return new Document<T>(message, client)
  } catch (err) {
    logError(`Błąd podczas pobierania dokumentu o ID ${messageId}:`, err)
    throw err
  }
}
