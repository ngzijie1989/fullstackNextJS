'use client'

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function MovieList({type}) {

  const [ movieList, setMovieList ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(1)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };

  useEffect(()=> {
      const getMovieData = async () => {
      // const response = await fetch(Url, options)
      if (type === "all") {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${page}&sort_by=popularity.desc`, options)
        const movies = await response.json()
        const totalPages = movies.total_pages
        setTotalPages(totalPages)
        setMovieList(movies.results)
        return movies
      } else {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=${page}`, options)
      const movies = await response.json()
      const totalPages = movies.total_pages
      setTotalPages(totalPages)
      setMovieList(movies.results)
      return movies
      }
    }

    getMovieData();
  },[page])

  const handlePageIncrement = () => {
    if ( page < totalPages )
    setPage((prev) => prev + 1) 
  }

  const handlePageDecrement = () => {
    if ( page > 1 ) {
    setPage((prev) => prev - 1)
    }
  }

  return (
      <div>
          <div className='flex justify-center'>
              <input type="text" placeholder="Search for a movie..." className="input input-bordered w-[50%]" />
          </div>

          <div className="mx-auto my-3 flex justify-between w-[80%]">
            <div className="flex items-center">
              <p>Page {page}/{totalPages}</p>
            </div>

            <div className="join grid grid-cols-2 w-[20%]">
              <button onClick={handlePageDecrement} className="join-item btn btn-outline">Previous page</button>
              <button onClick={handlePageIncrement} className="join-item btn btn-outline">Next</button>
            </div>
        </div>
      
        <div className="w-[80%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movieList.map((movie)=> <MovieCard key={movie.id} movie={movie} type={type} />
          )}
        </div>
      </div>
  )
}

export default MovieList
