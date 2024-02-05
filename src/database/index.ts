import { MongoClient } from 'mongodb'

export const database = (name: string) => {
  const client = new MongoClient(process.env.DB_URI as string)

  return client.db(name)
}