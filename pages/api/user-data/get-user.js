import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: req.body });
  console.log(user);
  client.close();
  res.status(200).json({ message: "Works", data: user });
  return user;
}

export default handler;
