import { Database } from '../src/index'
;(async () => {
  const db = new Database({
    token: 'YOUR_DISCORD_BOT_TOKEN',
    serverId: 'YOUR_DISCORD_SERVER_ID',
    collectionPrefix: 'db_',
  })

  // Get or create a collection
  const users = await db.getCollection('users')

  // Insert a document
  const userDoc = await users.insert({
    id: '123',
    name: 'John Doe',
    age: 30,
  })
  console.log('Inserted document:', await userDoc.getData())

  // Find all documents
  const allDocs = await users.findAll()
  for (const doc of allDocs) {
    console.log('Document data:', await doc.getData())
  }

  // Update a document
  await userDoc.update({
    id: '123',
    name: 'John Doe',
    age: 31,
  })
  console.log('Updated document:', await userDoc.getData())

  // Delete a document
  await userDoc.delete()
  console.log('Document deleted.')

  // Close the database connection when done
  await db.close()
})()
