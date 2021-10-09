import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.zuavu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);

  return client;
}

// import { MongoClient } from "mongodb";

// let cached = global.mongo;

// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null };
// }
// export async function connectToDatabase() {
//   const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.zuavu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     cached.promise = MongoClient.connect(connectionString, opts).then(
//       (client) => {
//         return { client, db: client.db("users") };
//       }
//     );
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

export async function getUser(email) {
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: email });
  client.close();
  return user;
}
