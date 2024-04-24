function DeleteModal({ deleteModal, setDeleteModal, movie,id }) {

  console.log(movie)
  console.log(id)

  const handleDelete = () => {
    console.log('hello')
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
