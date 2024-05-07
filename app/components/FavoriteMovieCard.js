import Image from "next/image"
import Link from "next/link"
import styles from '@/app/css/hover.module.css'
import DeleteModal from "./DeleteModal"
import { useState } from "react"

export default function FavoriteMovieCard({ movie, id, setLoading }) {
  const [ deleteModal, setDeleteModal ] = useState(false);

  const Url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const handleDelete = (e) => {
    e.preventDefault()
    setDeleteModal(true)
    return ""
  } 

  return (
    <div>
      <Link href={{ pathname: `/favorites/${id}`, query: { title: movie.title, overview: movie.overview, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average, vote_count: movie.vote_count, id: movie.id }}}>
        <div className={styles.hover}>
          <div className={styles.cardContainer}>
            <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xs sm:text-base py-5 h-11 font-bold flex items-center">{movie.title}</h1>
            </div>
            <div>
              <button onClick={handleDelete} className="btn btn-sm btn-circle">✕</button>
            </div>
            </div>
            <div className="w-[calc(100%-4px)]">
            <Image width={500}
                  height={500} 
                  src={Url} 
                  alt={movie.title} />
            </div>
          </div>
        </div>
      </Link>
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} movie={movie} id={id} setLoading={setLoading} />
    </div>
  )
}
