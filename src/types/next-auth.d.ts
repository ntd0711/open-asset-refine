import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    access_token: string;
    user: {
      role: string;
    } & DefaultSession["user"];
  }

  // Extend user to assign the serverAccessToken
  interface User {
    role: string;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    role: string;
  }
}
