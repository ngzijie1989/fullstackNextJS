'use client'

import { useEffect, useState } from "react";

function MovieList() {

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
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}`, options)
      const movies = await response.json()
      setMovieList(movies.results)
    }

    getMovieData();
  },[])

  console.log(movieList)

  return (
    <div>
    </div>
  )
}

export default MovieList
