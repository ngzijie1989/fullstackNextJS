function ReviewFilter({setFilter, reviews, setReviews}) {

  const handleFilter = (e) => {
    setFilter(e.target.value)

    if (e.target.value === "Highest Rating") {
      console.log(reviews)
      const sortReviews = reviews.sort((a,b)=> a.rating - b.rating)
      setReviews(sortReviews)
      console.log(reviews)
      //carry out a re-render
    } else if (e.target.value === "Lowest Rating") {
      console.log(reviews)
      const sortReviews = reviews.sort((a,b)=> b.rating - a.rating)
      setReviews(sortReviews)
      console.log(reviews)
      //carry out a re-render
    } else if (e.target.value === "Date"){
      console.log(reviews)
      const sortReviews = reviews.sort((a,b)=> a.CreatedAt - b.CreatedAt)
      setReviews(sortReviews)
      console.log(reviews)
      //carry out a re-render
    }
  }

  return (
    <div className="flex items-center">
      <div className="flex">
        <div className="flex items-center">
          <span>Sort By &nbsp; </span>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <select className="select select-bordered" onChange={handleFilter}>
              <option>Date</option>
              <option>Lowest Rating</option>
              <option>Highest Rating</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ReviewFilter
