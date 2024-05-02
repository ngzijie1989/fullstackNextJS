function ActivationModal({modal, setModal}) {
  return (
  <div className={`modal ${modal ? "modal-open" : ""}`}>
    <div className="modal-box relative">
      <label htmlFor="my-modal-3" onClick={()=>setModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 className="text-lg font-bold">You have activated your account</h3>
      <p className="py-4">Please log in to your account!</p>
    </div>
  </div>
  )
}

export default ActivationModal