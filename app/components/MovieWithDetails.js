'use client'

import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import Button from './Button';

function MovieWithDetails() {
  const searchParams = useSearchParams()
  const title = searchParams.get('title');
  const overview = searchParams.get('overview');
  const poster_path = searchParams.get('poster_path');
  const release_date = searchParams.get('release_date');
  const vote_average = searchParams.get('vote_average');
  const vote_count = searchParams.get('vote_count');

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
console.log(formattedDate); // Output: "March 14, 1972"

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

      <Button className="btn btn-primary my-3">Add to favourites?</Button>
    </div>
  )
}

export default MovieWithDetails
