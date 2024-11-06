import { TextChannel, Client } from 'discord.js'
import Document from '../document/document'

export default async function findDocument<T>(
  channel: TextChannel,
  client: Client,
  predicate: (data: T) => boolean,
): Promise<Document<T> | null> {
  const messages = await channel.messages.fetch({ limit: 100 })
  for (const message of messages.values()) {
    if (message.author.id === client.user?.id) {
      const doc = new Document<T>(message, client)
      const data = await doc.getData()
      if (predicate(data)) {
        return doc
      }
    }
  }
  return null
}
