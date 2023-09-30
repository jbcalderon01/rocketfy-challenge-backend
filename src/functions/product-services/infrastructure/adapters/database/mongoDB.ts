import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URL;

if (!uri) throw new Error("No database url found");

export const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export function connectToDatabase() {
  console.log("Connecting to database");
  return mongoClient.connect().then(() => {
    console.log("Connected to database");
  });
}
