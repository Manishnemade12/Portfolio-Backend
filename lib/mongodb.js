import { MongoClient } from "mongodb";


export default async function  connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        return client.db();
    } catch (error) {
        console.error('error to connect mongodb', error);
            throw error;
    }
}