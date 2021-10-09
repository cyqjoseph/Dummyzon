import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/helper";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        console.log(user);

        if (!user) {
          client.close();
          throw new Error("User does not exist");
        }

        const isValid = await verifyPassword(
          credentials.password, //entered password
          user.password // hashed password
        );

        if (!isValid) {
          client.close();
          throw new Error("Incorrect password - Please try again!");
        }

        client.close();

        return user;
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, user, token }) {
  //     console.log(session);
  //     return session;
  //   },
  // },
});
