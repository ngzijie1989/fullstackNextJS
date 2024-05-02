import { CredentialsSignin, NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "./app/lib/prisma";
import { compare } from "bcrypt";
import { redirect } from "next/navigation";

const credentials = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "email"
    },

    password: {
      label: "Password",
      type: "password"
    }
  },

  async authorize(credentials){

    if (!credentials?.email || !credentials.password) {
      return null
    }

    const user = await prisma.User.findFirst({
      where: {
        provider: "Credentials",
        email: credentials.email
      }
    })

    if (!user) {
      return null
    }

    if (!user.active){

      return null //how to return custom errors}
    }

    const password = user.password

    const passwordValid = await compare(credentials.password, password)

    if (!passwordValid){
      return null }

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
})

const authConfig = {
  providers: [credentials, Google], 
  pages: {
    signIn: "/login" //custom login page redirect
  },
  callbacks: {
    async signIn(){
      
      //   return {
      //   user: true
      // };
    },
    async redirect({ url }){
      console.log(url)
      if (url.includes("signin")) return "/"
      return url;
    }
  }
}

export const { handlers, auth, signIn, signOut  } = NextAuth(authConfig)