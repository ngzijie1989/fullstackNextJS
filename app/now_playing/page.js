import MovieList from "../components/MovieList"

async function page() {

  return (
    <div>
      <MovieList type="now_playing"/>
    </div>
  )
}

export default page