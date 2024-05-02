import WelcomeBanner from "../components/WelcomeBanner"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

async function page() {

  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="w-[100%]">
      <WelcomeBanner user={session.user.name} />
    </div>
  )
}

export default page
