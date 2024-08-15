import bcryptjs from "bcryptjs";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import db from "@/configs/db";

import User from "@/models/User";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      authorize: async (credentials) => {
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
          name: user.name,
          role: user.role,
        };
      }

      return session;
    },
    signIn: async ({ account, profile, credentials }) => {
      try {
        await db();

        const user = await User.findOne({
          email:
            account?.type === "oauth" ? profile?.email : credentials?.email,
        });

        if (user) {
          if (account?.type === "oauth") {
            return true;
          } else {
            const isMatch = await bcryptjs.compare(
              credentials?.password as string,
              user.password
            );

            if (isMatch) {
              return true;
            } else {
              return false;
            }
          }
        } else {
          if (account?.type === "oauth") {
            await User.create({
              email: profile?.email,
              name: profile?.name,
            });

            return true;
          } else {
            return false;
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
      role: string;
    } | null;
  }
}
