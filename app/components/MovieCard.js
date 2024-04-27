import Image from "next/image"
import Link from "next/link"
import styles from '@/app/css/hover.module.css'

export default function MovieCard({ movie, type }) {

  const Url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <Link href={{ pathname: `/${type}/${movie.id}`, query: { tmdbId:movie.id, title: movie.original_title, overview: movie.overview, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average, vote_count: movie.vote_count   }}}>
      <div className={styles.hover}>
        <h1 className="text-center py-5 h-11 font-bold">{movie.original_title}</h1>
        <div className="w-[calc(100%-4px)]">
        {movie.poster_path !== null ? 
        <Image height={300} 
              width={400}
              src={Url} 
              alt={movie.original_title} /> : 
        <Image width={500}
        height={500} 
        src="/No_image_available.svg" 
        alt={movie.original_title} className="flex items-center h-83" />}

        </div>
      </div>
    </Link>
  )
}
