'use client'

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function MovieList({type}) {

  const [ movieList, setMovieList ] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };

  useEffect(()=> {
      const getMovieData = async () => {
      // const response = await fetch(Url, options)
      const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`, options)
      const movies = await response.json()
      setMovieList(movies.results)
      return movies
    }

    getMovieData();
  },[type])

  console.log(movieList)

  return (
      <div className="w-[80%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movieList.map((movie)=> <MovieCard key={movie.id} movie={movie} type={type} />
        )}
      </div>
  )
}

export default MovieList
