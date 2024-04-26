'use client'

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { getCurrentDate } from "../utilis/date";
import { getEndDatePlusMonth } from "../utilis/date";
import { getEndDateMinusMonth } from "../utilis/date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

function MovieList({type}) {

  const [ movieList, setMovieList ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(1)
  const [ search, setSearch ] = useState("")
  const [ searchPage, setSearchPage ] = useState(1)
  const [currentDate, setCurrentDate] = useState(getCurrentDate()); 
  const [endDatePlusMonth, setEndDatePlusMonth] = useState(getEndDatePlusMonth());
  const [endDateMinusMonth, setEndDateMinusMonth] = useState(getEndDateMinusMonth()); 

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();

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

        if (totalPages > 500) {
          setTotalPages(500)
        } else {
          setTotalPages(totalPages)
        }

        setMovieList(movies.results)
        return movies
      } 
      
      else if (type === "greatest-of-all-time" ) {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${page}&language=en-US&sort_by=vote_average.desc&vote_count.gte=2000`, options)
      const movies = await response.json()
      const totalPages = movies.total_pages
      
      if (totalPages > 500) {
        setTotalPages(500)
      } else {
        setTotalPages(totalPages)
      }

      setMovieList(movies.results)
      return movies
      }

      else if (type === "upcoming" ) {
        const startDate= getCurrentDate()
        const EndDate = getEndDatePlusMonth()
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=${page}&primary_release_date.gte=${currentDate}&primary_release_date.lte=${endDatePlusMonth}&sort_by=popularity.desc` , options)
        const movies = await response.json()
        const totalPages = movies.total_pages
        
        if (totalPages > 500) {
          setTotalPages(500)
        } else {
          setTotalPages(totalPages)
        }
  
        setMovieList(movies.results)
        return movies
        }

        else {
          const EndDate= getCurrentDate()
          const startDate = getEndDateMinusMonth()
          
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=${page}&primary_release_date.gte=${endDateMinusMonth}&primary_release_date.lte=${currentDate}&region=US&sort_by=popularity.desc` , options)
          const movies = await response.json()
          const totalPages = movies.total_pages
          
          if (totalPages > 500) {
            setTotalPages(500)
          } else {
            setTotalPages(totalPages)
          }
    
          setMovieList(movies.results)
          return movies
          }
    }

    getMovieData()
  },[page, currentDate, endDatePlusMonth, endDateMinusMonth])

  const handlePageIncrement = () => {
    if (search === "") {
      if ( page < totalPages ) {
      setPage((prev) => prev + 1) } 

    } else {
      if ( searchPage < totalPages ) {
      setSearchPage((prev) => prev + 1)   
      SearchRun()
      }
    }
  }

  const handlePageDecrement = () => {
    if (search === "") {
      if ( page > 1 ) {
      setPage((prev) => prev - 1)
      }
    } else {
      if ( searchPage > 1 )
      setSearchPage((prev) => prev - 1) 
      SearchRun()
    }
  }

  const SearchRun = useDebouncedCallback(async ()=> {
    if (type === "all") {
      if (search !== "") {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${search}&page=${searchPage}`, options)
        const searchResults = await response.json()
        const totalPages = searchResults.total_pages
        
        if (totalPages > 500) {
          setTotalPages(500)
        } else {
          setTotalPages(totalPages)
        }

        setMovieList(searchResults.results)
        } else {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${searchPage}&sort_by=popularity.desc`, options)
          const movies = await response.json()
          const totalPages = movies.total_pages
          
          if (totalPages > 500) {
            setTotalPages(500)
          } else {
            setTotalPages(totalPages)
          }

          setMovieList(movies.results)
          return movies  
        }
    } else if ( type !== "all" ) {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=${page}`, options)
      const searchResults = await response.json()
      const totalPages = searchResults.total_pages
      
      if (totalPages > 500) {
        setTotalPages(500)
      } else {
        setTotalPages(totalPages)
      }

      setMovieList(searchResults.results)
    }
  },300,[searchPage])

  const HandleSearch = (e) => {
    if ( search === "" ){
    const term = e.currentTarget.value

    setSearch(e.currentTarget.value)
    setPage(1)
    SearchRun()

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
    } else {

      const term = e.currentTarget.value

      setSearch(e.currentTarget.value)
      setSearchPage(1)
      SearchRun()

      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
  
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
      <div>
          <div className='flex justify-center'>
            {type === 'all' && (
              <input 
                type="text" 
                defaultValue={searchParams.get('query')?.toString()} 
                onChange={HandleSearch} 
                placeholder="Search for a movie..." 
                className="input input-bordered w-[50%]" 
              />
            )}
            {type === "upcoming" &&(
              <div className="flex flex-col items-center">
                <div className="mb-2 font-bold">
                  <p>Date Filter</p>
                </div>

                <div className="flex">
                  <div className="border rounded-md me-2 hover:shadow-xl font-bold rounded"><DatePicker className="w-full h-full bg-transparent font-bold text-center outline-none" selected={currentDate} onChange= {(date) => setCurrentDate(date)} /></div>
                  <p>~</p>
                  <div className="border rounded-md me-2 hover:shadow-xl font-bold rounded"><DatePicker className="w-full h-full bg-transparent font-bold text-center outline-none" selected={endDatePlusMonth} onChange= {(date) => setEndDatePlusMonth(date)} /></div>
                </div>
              </div>
            )}

              {type === "now_playing" &&(
                <div className="flex flex-col items-center">
                  <div className="mb-2 font-bold">
                    <p>Date Filter</p>
                  </div>

                  <div className="flex">
                    <div className="border rounded-md me-2 hover:shadow-xl font-bold rounded"><DatePicker className="w-full h-full bg-transparent font-bold text-center outline-none" selected={endDateMinusMonth} onChange= {(date) => setEndDateMinusMonth(date)} /></div>
                    <p>~</p>
                    <div className="border rounded-md me-2 hover:shadow-xl font-bold rounded"><DatePicker className="w-full h-full bg-transparent font-bold text-center outline-none" selected={currentDate} onChange= {(date) => setCurrentDate(date)} /></div>
                  </div>
                </div>
              )}
          </div>

          <div className="mx-auto my-3 flex justify-between w-[80%]">
            <div className="flex items-center">
              {search === "" ? <p>Page {page}/{totalPages}</p> : <p>Page {searchPage}/{totalPages}</p> }
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
