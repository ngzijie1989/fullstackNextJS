'use client'

import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import AddToFavorites from './AddToFavorites';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Loading from '../utilis/Loading';
import Button from './Button';
import ReviewForm from './ReviewForm';
import { useEffect } from 'react';
import ReviewContainer from './ReviewContainer';
import reviewSkeleton from '../utilis/reviewSkeleton';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function MovieWithDetails() {
  const [ loading, setLoading ] = useState(false)
  const [ displayForm, setDisplayForm] = useState(false)
  const [ reviews, setReviews ] = useState([])
  const [ user, setUser ] = useState({})
  const [ check, setCheck ] = useState(false)
  const [ reviewLoading, setReviewLoading ] = useState(true)
  const [ filter, setFilter ] = useState("")

  const searchParams = useSearchParams()
  const title = searchParams.get('title');
  const overview = searchParams.get('overview');
  const poster_path = searchParams.get('poster_path');
  const release_date = searchParams.get('release_date');
  const vote_average = searchParams.get('vote_average');
  const vote_count = searchParams.get('vote_count');
  const tmdbId = searchParams.get('tmdbId');

  const session = useSession()

  if (!session.data || !session.status === "authenticated") {
    redirect("/no-access")
  }


  function formatDate(inputDate) {
    // Parse the input date string
    const parts = inputDate.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are zero-based in JavaScript Date objects
    const day = parseInt(parts[2]);
  
    // Create a Date object
    const date = new Date(year, month, day);
  
    // Options for formatting the date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
  
    // Format the date using toLocaleDateString
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }

  const inputDate = release_date;
  const formattedDate = formatDate(inputDate);

  const propsFavorites = {
    'id': uuidv4(),
    'title': title,
    'overview': overview,
    'poster_path': poster_path,
    'release_date': release_date,
    'vote_average': vote_average,
    'vote_count': vote_count,
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };

  useEffect(()=> {
    const getMovieReviews = async () => {
      const response = await fetch(`/api/reviews/all?tmdbid=${tmdbId}&title=${title}`, options)
      const reviews = await response.json()
      setReviews(reviews.data)

      const userResponse = await fetch('/user', options)
      const data = await userResponse.json()
      const user = data.data
      setUser(user)

      const reviewsArray = reviews.data
      const check = reviewsArray.filter((review) => {
        return review.userId === user.id
      })

      if (check.length > 0) {
        setCheck(true)
      } else {
        setCheck(false)
      }

      setReviewLoading(false)

      return reviews
    }

      getMovieReviews();
  },[reviewLoading])

  const handleDisplayForm = () => {
    return setDisplayForm(true)
  }

  return (
    <div className="w-[60%] mx-auto my-4">
      <h1 className="font-bold text-4xl mb-3">{title}</h1>
      <div className="block md:flex">
        <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} width="400" height="500" />

        <div className="text-center md:text-left mt-3 px-5 flex flex-col justify-around">
          <div>
            <h3 className="font-bold">Overview</h3>
            <p className="py-3">{overview}</p>
          </div>

          <div>
            <h3 className="font-bold ">Release Date</h3>
            <p className="py-3">{formattedDate}</p> 
          </div>

          <div>
            <h3 className="font-bold ">Vote Count</h3>
            <p className="py-3">{vote_average} / 10</p>
          </div>

          <div>
            <h3 className="font-bold ">Vote_Average</h3>
            <p className="py-3">{vote_count}</p>
          </div>
        </div>
      </div>

      {loading ? Loading() : ""}
      
      <div>{reviewLoading ? reviewSkeleton() :

      <div>
        <div className="flex ">
          <div>
            <AddToFavorites id={propsFavorites.id} info={propsFavorites} setLoading={setLoading} />
          </div>
          

          <div className={`${check ? "btn-disabled" : ""}`}
              onClick={handleDisplayForm}
              onKeyDown={handleDisplayForm}
              tabIndex={0}
              role="button"
              >
            <Button className={`ms-3 btn btn-accent mt-3 ${check ? "btn-disabled" : "" }`}>{check ? "You have already added a review" : "Watched? Add a review!" }</Button>
          </div>
        </div>
        
        <div>
          {displayForm ? <ReviewForm setDisplayForm={setDisplayForm} title={title} tmdbId={tmdbId} setReviewLoading={setReviewLoading}/> : ""}
        </div>

        <div>
        {displayForm ? "" : <ReviewContainer reviews={reviews} setFilter={setFilter} setReviews={setReviews} />}
        </div>
      </div>}
      </div>


    </div>
  )
}

export default MovieWithDetails
