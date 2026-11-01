import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI

// Reuse the connection across hot reloads in development so we don't open a
// new pool on every request.
const globalForMongo = globalThis as unknown as {
    mongoClientPromise?: Promise<MongoClient>
}

async function getClient(): Promise<MongoClient> {
    if (!uri) {
        throw new Error("MONGODB_URI is not set")
    }

    if (!globalForMongo.mongoClientPromise) {
        globalForMongo.mongoClientPromise = new MongoClient(uri).connect()
    }

    return globalForMongo.mongoClientPromise
}

export async function getDb(): Promise<Db> {
    const client = await getClient()
    return client.db("studiospace")
}
