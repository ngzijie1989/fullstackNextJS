import ReviewCard from "./ReviewCard"
import NoReview from "./NoReview"
import ReviewFilter from "./ReviewFilter"

function ReviewContainer({reviews, setFilter, setReviews}) {

  return (
    <>
    {reviews.length!==0 ? 
        <div className="bg-slate-200 p-4 rounded-md w-full md:w-[80%] mx-auto">
        <div className="flex justify-between flex flex-col lg:flex-row mb-3">
          <h1 className="font-bold p-3 text-xl md:text-2xl">User Reviews {`(${reviews.length})`}</h1>
          <div className="flex justify-end">
            <ReviewFilter reviews={reviews} setFilter={setFilter} setReviews={setReviews} />  
          </div>
        </div>
        {reviews.map((review)=> {return <ReviewCard key={review.id} review={review} />})}
      </div> : 
    <NoReview/>}

    </>
  )
}

export default ReviewContainer
