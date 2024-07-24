import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { User } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {},
      },
      authorize: async (credentials) => {
        // TODO: Request your API to check credentials
        console.log("CredentialsSignIn", JSON.stringify(credentials, null, 2));

        // check credentials
        // if not valid return null
        if (credentials?.["email"] !== "demo@refine.dev") {
          return null;
        }

        const user: User = {
          id: "1",
          name: "John Doe",
          email: "demo@refine.dev",
          image: "https://i.pravatar.cc/300",
        };
        return user;
      },
    }),
  ],
});
