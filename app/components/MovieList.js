'use client'

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useDebouncedCallback } from "use-debounce";

function MovieList({type}) {

  const [ movieList, setMovieList ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(1)
  const [ search, setSearch ] = useState("")
  const [ searchPage, setSearchPage ] = useState(1)

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

    getMovieData()
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

  const SearchRun = useDebouncedCallback(async ()=> {
    if (type === "all") {
      if (search !== "") {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${search}&page=${page}`, options)
        const searchResults = await response.json()
        const totalPages = searchResults.total_pages
        setTotalPages(totalPages)
        setMovieList(searchResults.results)
        } else {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${page}&sort_by=popularity.desc`, options)
          const movies = await response.json()
          const totalPages = movies.total_pages
          setTotalPages(totalPages)
          setMovieList(movies.results)
          return movies  
        }
    } else {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=${page}`, options)
      //need to filter again
      const searchResults = await response.json()
      const totalPages = searchResults.total_pages
      setTotalPages(totalPages)
      setMovieList(searchResults.results)
    }
  },300)

  const HandleSearch = (e) => {
    setSearch(e.currentTarget.value)
    SearchRun()
  }

  console.log(`totalPages = ${totalPages}`)
  console.log(`page = ${page}`)

  return (
      <div>
          <div className='flex justify-center'>
              <input type="text" value={search} onChange={HandleSearch} placeholder="Search for a movie..." className="input input-bordered w-[50%]" />
          </div>

          <div className="mx-auto my-3 flex justify-between w-[80%]">
            <div className="flex items-center">
              <p>Page {page}/{totalPages}</p>
            </div>

            <div className="join grid grid-cols-2 w-[20%]">
              <button onClick={handlePageDecrement} className="join-item btn btn-outline">Previous</button>
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
