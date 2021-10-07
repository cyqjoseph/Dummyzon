import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/helper";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  //incoming body
  const data = req.body;

  const { name, email, password } = data;

  if (
    !email.includes("@") ||
    !email ||
    !name ||
    /\d/.test(name) ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid inputs, name shoule not contain numbers and password should also be at least 7 characters long",
    });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();
  const hasExistingUser = await db
    .collection("users")
    .findOne({ email: email });

  if (hasExistingUser) {
    res.status(422).json({ message: "Email already exists" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    name: name,
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Account created!" });
  client.close();
}

export default handler;
