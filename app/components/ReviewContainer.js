import ReviewCard from "./ReviewCard"
import NoReview from "./NoReview"

function ReviewContainer({reviews}) {

  return (
    <>
    {reviews.length!==0 ? 
        <div className="bg-slate-200 p-4 rounded-md w-[80%] mx-auto">
        <h1 className="font-bold p-3 text-2xl">User Reviews {`(${reviews.length})`}</h1>
        {reviews.map((review)=> {return <ReviewCard key={review.id} review={review} />})}
      </div> : 
    <NoReview/>}

    </>
  )
}

export default ReviewContainer
