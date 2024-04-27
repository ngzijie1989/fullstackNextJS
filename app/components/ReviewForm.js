import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { redirect, useRouter } from "next/navigation"
import Loading from "../utilis/Loading";
import toast from "react-hot-toast";

function ReviewForm({ setDisplayForm, tmdbId, title, setReviewLoading }) {

  const router = useRouter();
  const [ reviewComment, setReviewComment ] = useState("")
  const [ rating, setRating ] = useState("10")
  const [ loading, setLoading ]= useState(false)

  const handleCancelForm = () => {
    setDisplayForm(false)
    setReviewComment("")
    return setRating("")
  }

  const handleCommentChange = (e) => {
    setReviewComment(e.target.value)
  }

  const handleRating = (e) => {
    setRating(e.target.value)
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true)

    const info = { 
      review: {
      comment: reviewComment,
      rating: parseFloat(rating),
      title: title,
      tmdb: parseInt(tmdbId)
      }
    }

    const options = {
      method: 'POST', 
      headers: {
      'Content-Type': 'application.json'
      },
      body: JSON.stringify(info)
    }

    const response = await fetch(`/api/reviews/add`, options)

    const data = await response.json()

    if (data.data !== '123') {
      setLoading(false)
      setDisplayForm(false)
      setReviewLoading(true)
      toast.success('Your review has been added successfully')
    } else {
      setLoading(false)
      handleCancelForm()
      toast.error('You already have a review for this movie')
    }
  }

  return (
    <div className="w-[80%] mx-auto border p-5 mt-3">
      <form onSubmit={handleSubmitReview}>
        <label>
          <div className="flex justify-between mb-3">
            <div>
              <span className="label-text font-bold">Review</span>
            </div>

            <button  onClick={handleCancelForm}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <input type="text" value={reviewComment} onChange={handleCommentChange} placeholder="Type here" className="input input-bordered w-[100%]" />
        </label>

        <label>
          <div className="label">
            <span className="label-text font-bold mt-3">Rating</span>
          </div>
          <div className="rating rating-lg rating-half mb-3">
            <input type="radio" value='0' onClick={handleRating} name="rating-10" className="rating-hidden" />
            <input type="radio" id="setter" value='0.5' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1"/>
            <input type="radio" value='1' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
            <input type="radio" value='1.5' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
            <input type="radio" value='2' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
            <input type="radio" value='2.5' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
            <input type="radio" value='3' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
            <input type="radio" value='3.5' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
            <input type="radio" value='4' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
            <input type="radio" value='4.5' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
            <input type="radio" value='5' onClick={handleRating} name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
          </div>
        </label>

        <button type="submit" className="btn btn-primary block mt-3 p-2 text-xs z-500">
          <span className="h-0">Submit Review</span></button>
      </form>
      {loading ? Loading() : ""}
    </div>
  )
}

export default ReviewForm
