import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

function DeleteModal({ deleteModal, setDeleteModal, movie, id, setLoading }) {

  const router = useRouter()

  const options = {
    method: 'DELETE', 
    headers: 
    { 'Content-Type': 'application/json'},
    body: JSON.stringify(id)
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch('/api/favorites/delete', options)
    setDeleteModal(false)
    toast.success('Movie has been removed from your favorite list')
    setLoading(true)
  }

  return (
    <div className={`modal ${deleteModal ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <button onClick={()=>setDeleteModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        <h3 className="text-lg font-bold mt-5">Are you sure you want to remove this item from your favorite list?</h3>
        <div className="mt-3">
          <button onClick={handleDelete} className="btn btn-error me-2">Yes</button>
          <button onClick={()=>setDeleteModal(false)} className="btn btn-ghost">Cancel</button>
        </div>
      </div>
    </div>
    )
}

export default DeleteModal
