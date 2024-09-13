// next-auth.d.ts
import NextAuth from "next-auth";
import { User as NextAuthUser, Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
     
    } & NextAuthSession["user"];
  }

  interface User extends NextAuthUser {
    username: string;

  }

  interface JWT {
    username: string;
  }
}
