/* eslint-disable @next/next/no-img-element */

import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import WelcomeBanner from "./components/WelcomeBanner";


export default async function Home() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
   <div className="w-[100%]">
      <WelcomeBanner user={session.user.name}/>
   </div>
  );
}
