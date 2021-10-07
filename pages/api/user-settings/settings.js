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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const country = req.body.country;
  const phone = req.body.phone;
  const city = req.body.city;
  const address = req.body.address;
  const fullName = firstName + lastName;
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
      name: fullName,
      country: country,
      phone: phone,
      city: city,
      address: address,
    },
  });
  client.close();
  res.status(200).json({ message: "Information updated!" });
}

export default handler;
