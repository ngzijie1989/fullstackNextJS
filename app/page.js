import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import MovieList from "./components/MovieList";

export default async function Home() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }
  return (
   <div>
    <MovieList/>
   </div>
  );
}
