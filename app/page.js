/* eslint-disable @next/next/no-img-element */

import MovieList from "./components/MovieList";


export default async function Home() {

  return (
   <div>
      <MovieList type="all"/>
   </div>
  );
}
