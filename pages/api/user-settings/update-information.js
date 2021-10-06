import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "You are not signed in" });
    return;
  }

  const userEmail = session.user.email;
  const userName = session.user.name;
  const newName = req.body.newName;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    client.close();
    return;
  }
  const result = await usersCollection.updateOne(user, {
    $set: { name: newName ? newName : userName },
  });
  client.close();
  res.status(200).json({ message: "Information updated!" });
}
export default handler;
