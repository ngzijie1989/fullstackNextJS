import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/lib/prisma";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn(user) {
      // Check if the user already exists in the database
      console.log(user.user.email)
      const existingUser = await prisma.user.findUnique({
        where: { email: user.user.email }
      });

      // If the user does not exist, create a new user entry
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.user.email,
            name: user.user.name
          }
        });
      }

      return true;
    }
  }
};

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }