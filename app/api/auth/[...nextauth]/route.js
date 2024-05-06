import { handlers, signIn as signInFunction, signOut } from "@/auth";

export const { GET, POST } = handlers 
export const signIn = signInFunction;
