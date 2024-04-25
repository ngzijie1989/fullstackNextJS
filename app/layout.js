import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { getServerSession } from "next-auth";
import SessionProvider from './components/SessionProvider'
import AuthSign from "./components/SessionMenu";
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "New App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        <NavBar/>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
