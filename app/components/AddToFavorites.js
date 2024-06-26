import toast from "react-hot-toast";
import Button from "./Button"
import { useRouter } from "next/navigation";
 
function AddToFavorites({id, info, setLoading}) {

  const router = useRouter()

  const addOptions = { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  }

  const handleFavorite = async (e) => {
    e.preventDefault();

    setLoading(true)

    const response = await fetch('/api/favorites/add', addOptions)

    if (response.ok === false){
      toast.error('This movie is already in your Watchlist')
      setLoading(false)
    } else {
      toast.success('Added movie to your list Successfully')
      setLoading(false)
      router.push("/favorites")
    }
  }

  return (
    <div onClick={handleFavorite}
    onKeyDown={handleFavorite}
    tabIndex={0}
    role="button">
      <Button className="btn btn-primary my-3">Add to WatchList</Button>
    </div>
  )
}

export default AddToFavorites
