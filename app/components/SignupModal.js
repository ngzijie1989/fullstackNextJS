function SignupModal({signupModal, setSignUpModal}) {
  return (
  <div className={`modal ${signupModal ? "modal-open" : ""}`}>
    <div className="modal-box relative">
      <label htmlFor="my-modal-3" onClick={()=>setSignUpModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 className="text-center text-lg font-bold">You have registered an account</h3>
      <p className="text-center py-4">Please log into your registered email account to verify your account.</p>
    </div>
  </div>
  )
}

export default SignupModal
