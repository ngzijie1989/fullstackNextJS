'use client'

import { useEffect, useState } from "react"
import FavoriteMovieCard from "../components/FavoriteMovieCard";

function Page() {
  const [ favorites, setFavorites ] = useState([])
  const [ loading, setLoading ] = useState(true)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };

  useEffect(()=> {
    const getFavouriteData = async () => {
    const response = await fetch(`api/favorites/all`, options)
    //what do i type in here? this is where i get the response back from my api route
    const data = await response.json();
    const favorites = data.data
    setFavorites(favorites)
    setLoading(false)
    return console.log('hello')
  }
  getFavouriteData();
  },[])


  return (
    <div className="w-[80%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {loading ? "Loading..." : favorites.map((favorite)=> <FavoriteMovieCard key={favorite.id} id={favorite.id} movie={favorite}/>
    )}
  </div>
  )
}

export default Page
