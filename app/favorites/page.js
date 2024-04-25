'use client'

import { useEffect, useState } from "react"
import FavoriteMovieCard from "../components/FavoriteMovieCard";
import Loading from "../utilis/Loading";
import styles from '@/app/css/favorite.module.css'

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
    const data = await response.json();
    const favorites = data.data
    setFavorites(favorites)
    setLoading(false)
    return console.log('hello')
  }
  getFavouriteData();
  },[loading])


  return (
    <div>
      {loading ? 
        Loading() : 
        (favorites.length === 0 ? 
          <div className={styles.titleContainer}><h1>You do not have any movies inside this list currently</h1></div> :
          <div className="w-[80%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{favorites.map((favorite)=> <FavoriteMovieCard key={favorite.id}  setLoading={setLoading} id={favorite.id} movie={favorite}/>)}</div>)
      }
  </div>
  )
}

export default Page
