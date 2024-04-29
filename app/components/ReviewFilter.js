function ReviewFilter({setFilter, reviews, setReviews}) {

  const handleFilter = (e) => {
    setFilter(e.target.value)

    if (e.target.value === "Highest Rating") {
      const sortReviews = reviews.sort((a,b)=> b.rating - a.rating)
      setReviews(sortReviews)

    } else if (e.target.value === "Lowest Rating") {
      const sortReviews = reviews.sort((a,b)=> a.rating - b.rating)
      setReviews(sortReviews)
      
    } else if (e.target.value === "Date"){
      const sortReviews = reviews.sort((a,b)=>  new Date(b.CreatedAt) - new Date(a.CreatedAt))
      setReviews(sortReviews)
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
