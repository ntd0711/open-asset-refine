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
        //     user.serverAccessToken = response.data.data.serverAccessToken;
        //     return user;
        //   }
        // } catch (error) {
        //   console.error("Error during login:", error);
        //   return null;
        // }
        // return null;
        // ------------------------------------------------------------
        // return null;
        // console.log({ credentials });
        // console.log("sign in with email, password");
        const user: User = {
          id: "1",
          name: "John Doe",
          email: "demo@refine.dev",
          image: "https://i.pravatar.cc/300",
          role: "user",
        };
        user.serverAccessToken = "myServerAccessToken";
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, profile, email, credentials });
      // console.log("sign innn");
      // if (account?.provider === "google") {
      //   try {
      //     console.log("sign in with google");
      //     // call api backend register user
      //          const response = await HttpClient.post<User>(
      //       "http://api-signin-google-url.com/",
      //       user
      //     );
      //     if (response.data.status === 401) {
      //       return false;
      //     }
      //     if (response.status == 200) {
      //       const user = response.data.data;
      //       user.accessToken = response.data.data.accessToken
      //       return true;
      //     }
      //   } catch (error) {
      //     console.error("Error registering Google user:", error);
      //     return false;
      //   }
      // }
      // return false; // allow sign in
      // ---------------------------------------------------------------------------------
      user.serverAccessToken = "myServerAccessToken";
      return true;
    },
    async jwt({ token, user, account, profile, session }) {
      // console.log("jwtTTT", { token, user, account, profile, session });
      // if (!user && !account) {
      //   throw new Error("No user or account found");
      // }
      if (
        account?.provider &&
        ["google", "credentials"].includes(account.provider)
      ) {
        token.access_token = user.serverAccessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session>>>>>>>>>>>", { session, token });
      // session.accessToken = token.accessToken;
      // session.serverAccessToken = token.serverAccessToken;
      if (token.role) {
        session.user.role = token.role;
      }
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.access_token) {
        session.access_token = token.access_token;
      }
      return session;
    },
  },
  pages: {
    signIn: "auth/login",
  },
});
