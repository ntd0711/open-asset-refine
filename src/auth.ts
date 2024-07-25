import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { User } from "next-auth";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({}),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // call api backend register user
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, profile, email, credentials });
      if (account?.provider === "google") {
        try {
          // call api backend register user
          const backendToken = `backend-token-${user.email}`;
          cookies().set("backendToken", backendToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60, // 30 days
          });

          return true;
        } catch (error) {
          console.error("Error registering Google user:", error);
          return false;
        }
      }
      return true; // allow sign in
    },
    // async jwt({ token, user, account, profile, session }) {
    //   console.log({ token, user, account, profile, session });
    //   return token;
    // },
    // async session({ session, token }) {
    //   return session;
    // },
  },
});
