import WelcomeBanner from "../components/WelcomeBanner"
import { getServerSession } from "next-auth";

async function page() {

  const session = await getServerSession()

  return (
    <div className="w-[100%]">
      <WelcomeBanner user={session.user.name} />
    </div>
  )
}

export default page
