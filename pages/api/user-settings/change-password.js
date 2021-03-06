import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/helper";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  //server side getSession()
  const session = await getSession({ req: req });
  console.log(session);

  if (!session) {
    res.status(401).json({ message: "You are not signed in" });
    return;
  }

  const userEmail = session.user.email;
  // incoming request body
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    client.close();
    throw new Error("User not found");
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password, please try again!" });
    client.close();
    throw new Error("Invalid password, please try again!");
  }
  // hashing new pwd
  const hashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    {
      $set: { password: hashedPassword },
      $currentDate: { lastModified: true },
    }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
