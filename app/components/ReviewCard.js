/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { formatISO } from "../utilis/date"
import Image from "next/image"
import styles from '@/app/css/avatar.module.css'

function ReviewCard({review}) {
  const [ rating, setRating ] = useState(review.rating)
  const [ timestamp, setTimeStamp ] = useState("")

  useEffect(()=>{
    const toFormat = review.CreatedAt
    const timeFormat = formatISO(toFormat)
    return setTimeStamp(timeFormat)
  },[])

  return (
    <div className="flex">
      <div>
      <img  
        src={review.User.image_path} 
        alt={review.User.name} className={styles.reviewImageAvatar} />
      </div>

      <div className="bg-white p-4 ms-3 rounded-md w-[100%]">
        <div className="flex border-b justify-between">
          <p>{review.User.name}</p>
          <p className="text-slate-400">{timestamp}</p>
        </div>

        <div className="flex justify-between pt-2">
          <p className="w-[80%]">{review.comment}</p>
          <p>{rating} <span className="text-amber-200"><FontAwesomeIcon icon={faStar} /></span></p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
