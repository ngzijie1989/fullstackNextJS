import { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: {
      label: "User Name"
    },

    password: {
      label: "Password",
      type: "password"
    }
  },

  async authorize(credentials){
    if (credentials.username === "sk" && credentials.password === "123") {
      return {
        name: "Zijie",
      }
    };
  }
})

const authConfig = {
  providers: [Google, credentialsConfig]

}

export const { handlers, auth, signIn, signOut  } = NextAuth(authConfig)