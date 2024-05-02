import React from 'react'
import { useState } from 'react'

function ForgotModal({forgotModal, setForgotModal, onChange, emailField, onSubmit, afterSubmit, resServerError, resError, setAfterSubmit, setEmailField}) {

  const handleCancel =() => {
    setAfterSubmit(false)
    setForgotModal(false)
    setEmailField("")
    return ""
  }

  return (
    <div>
      <div className={`modal ${forgotModal ? "modal-open" : ""}`}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleCancel}><button onClick={()=> setForgotModal(false)}>✕</button></label>
          <h3 className="text-lg font-bold">Reset Password</h3>

          {afterSubmit ? 
          <div>
            <p>Email Sent! Please click on the link inside your email to reset your password</p>
          </div> 
          : 
            <form onSubmit={onSubmit}>
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">Please key in your email to reset your password</span>
              </label>
              <input required type="text" placeholder="JeffBezos@email.com" className="input input-bordered w-full max-w-xs" onChange={onChange} value={emailField}/>


              <div className="flex mt-3">
              <div>
                <button type="submit" className="btn btn-primary me-3">Reset Password</button>
              </div>
              <div>
                <button className="btn btn-glass" onClick={()=> setForgotModal(false)}>Cancel</button>
              </div>
              </div>
            </div>
          </form>
          }
          {resError ? 
            <div className="alert alert-error shadow-lg mt-3 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-xs p-1 font-bold ">There is no email inside our database. Please enter a valid email</span>
            </div> : 
          ""}

          {resServerError ? 
            <div className="alert alert-error shadow-lg mt-3 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Server Error. Please try again</span>
            </div> : 
          ""}

        </div>
      </div>
    </div>
  )
}

export default ForgotModal
