'use client'

import { useEffect, useState } from "react"
import LoginCardWrapper from "../components/LoginCardWrapper"
import styles from "@/app/css/loginForm.module.css"
import { useSearchParams } from "next/navigation"
import ActivationModal from "../components/ActivationModal"
import ForgotModal from "../components/ForgotModal"
import ResetPassword from "../action/resetPassword"
import Loading from "../utilis/Loading"

function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const params = useSearchParams()
  const error = params.get('error')
  const modalset = params.get('redirect');
  const [ modal, setModal ] = useState(false)
  const [ forgotModal, setForgotModal ] = useState(false)
  const [ emailField, setEmailField ] = useState("")
  const [ afterSubmit, setAfterSubmit ] = useState(false)
  const [resError, setResError] = useState(false)
  const [resServerError, setResServerError] = useState(false)
  const [loading, setLoading] =useState(false)

  useEffect(()=>{ 
    if (modalset === "true") {
      setModal(true)
      }
    }
  ,[])

  const handleClick = () => {
    setForgotModal(true)
  }

  const handleChange = (e) => {
    setEmailField(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await ResetPassword(emailField)

    if (res === "Successful"){
      setAfterSubmit(true)
      setLoading(false)

    } else if (res === "Error"){
      setLoading(false)
      setResError(true)

    } else if (res === "Server Error") {
      setLoading(false)
      setResServerError(true)
    }
  }

  return (
    <div>
      {loading ? Loading() : ""}
      <LoginCardWrapper email={email} password={password} setPassword={setPassword} setEmail={setEmail} onClick={handleClick} />
      <ActivationModal setModal={setModal} modal={modal} />
      <ForgotModal forgotModal={forgotModal} setForgotModal={setForgotModal} 
                  onChange={handleChange} emailField={emailField} onSubmit={handleSubmit} 
                  afterSubmit={afterSubmit} resError={resError} resServerError={resServerError} 
                  setAfterSubmit={setAfterSubmit} setEmailField={setEmailField}/>
    </div>
  )
}

export default Page
