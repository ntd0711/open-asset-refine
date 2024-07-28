import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { User } from "next-auth";
import { cookies } from "next/headers";
import { LoginSchema } from "@schemas";
import { HttpClient } from "@api/httpClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({}),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // const validatedFields = LoginSchema.safeParse(credentials);
        // if (!validatedFields.success) {
        //   return null;
        // }
        // const { email, password } = validatedFields.data;
        // try {
        //   const response = await HttpClient.post<User>(
        //     "http://your-api-url.com/login",
        //     { email, password }
        //   );
        //   if (response.data.status === 401) {
        //     return null;
        //   }
        //   if (response.status == 200) {
        //     const user = response.data.data;
        //     return user;
        //   }
        // } catch (error) {
        //   console.error("Error during login:", error);
        //   return null;
        // }
        // return null;

        // ------------------------------------------------------------

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
      // console.log({ user, account, profile, email, credentials });
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
      user.token = 123123131;
      return true; // allow sign in
    },
    async jwt({ token, user, account, profile, session }) {
      if (!user || !account) {
        throw new Error("No user or account found");
      }
      token.accessToken = user.accessToken;
      console.log("jwtTTT", { token, user, account, profile, session });
      // console.log({ token });
      return token;
    },
    async session({ session, token }) {
      // throw new Error("No token found");
      // console.log({ session, token });
      // if (!token) {
      //   console.log("no token");
      // }
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
