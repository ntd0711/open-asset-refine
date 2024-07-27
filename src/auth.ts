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
        // return null;
        console.log({ credentials });
        console.log("sign in with email, password");
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
      console.log({ user, account, profile, email, credentials });
      console.log("sign innn");
      // if (account?.provider === "google") {
      //   try {
      //     console.log("sign in with google");
      //     // call api backend register user
      //     const backendToken = `backend-token-${user.email}`;
      //     cookies().set("backendToken", backendToken, {
      //       httpOnly: true,
      //       secure: process.env.NODE_ENV === "production",
      //       sameSite: "strict",
      //       maxAge: 30 * 24 * 60 * 60, // 30 days
      //     });

      //     return true;
      //   } catch (error) {
      //     console.error("Error registering Google user:", error);
      //     return false;
      //   }
      // }
      return true; // allow sign in
    },
    async jwt({ token, user, account, profile, session }) {
      // console.log({ token, user, account, profile, session });
      // console.log({ token });
      return token;
    },
    async session({ session, token }) {
      // console.log({ session, token });
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "auth/login",
  },
});
