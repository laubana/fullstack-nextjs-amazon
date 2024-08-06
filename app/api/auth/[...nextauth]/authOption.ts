import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/configs/db";
import User from "@/models/User";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      authorize: async (credentials) => {
        console.log(credentials);
        return credentials ?? null;
      },
      credentials: {
        id: { label: "id", type: "text" },
      },
      name: "Email",
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token.email) {
        await db();

        const user = await User.findOne({ email: token.email });

        session.user = {
          email: user.email,
          id: user.id,
          image: user.image,
          name: user.name,
        };
      }

      return session;
    },
    signIn: async ({ account, profile, credentials }) => {
      try {
        await db();

        const user =
          account?.type === "oauth"
            ? await User.findOne({
                email: profile?.email,
              })
            : await User.findOne({
                email: credentials?.email,
                password: credentials?.password,
              });

        if (user) {
          return true;
        } else {
          if (account?.type === "oauth") {
            await User.create({
              email: profile?.email,
              image: profile?.picture,
              name: profile?.name,
              password: "123123",
            });

            return true;
          } else {
            return "/";
          }
        }
      } catch (error) {
        console.error(error);

        return "/";
      }
    },
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    } | null;
  }
}

declare module "next-auth" {
  interface Profile {
    picture?: string;
  }
}

export default NextAuth(authOptions);
