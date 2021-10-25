import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.lp8gh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);

  return client;
}

export async function getUser(email) {
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: email });
  client.close();
  return user;
}
