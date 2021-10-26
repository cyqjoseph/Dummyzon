import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/client";
async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const data = req.body;
  console.log(data);
  if (!data) {
    return res.status(422).json({ message: "Cart must not be empty" });
  }

  const session = await getSession({ req: req });
  const userEmail = session.user.email;
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(401).json({ message: "User not found" });
    client.close();
    return;
  }
  await usersCollection.updateOne(user, {
    $set: {
      cartItems: data,
    },
  });
  client.close();
  res.status(200).json({ message: "Cart Information added" });
}
export default handler;
