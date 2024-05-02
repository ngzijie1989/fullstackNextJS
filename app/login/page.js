'use client'

import { useEffect, useState } from "react"
import LoginCardWrapper from "../components/LoginCardWrapper"
import styles from "@/app/css/loginForm.module.css"
import { useSearchParams } from "next/navigation"
import ActivationModal from "../components/ActivationModal"

function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const params = useSearchParams()
  const error = params.get('error')
  const modalset = params.get('redirect');
  const [ modal, setModal ] = useState(false)

  useEffect(()=>{ 
    if (modalset === "true") {
      setModal(true)
      console.log(modal)
      }
    }
  ,[])

  return (
    <div>
      <LoginCardWrapper email={email} password={password} setPassword={setPassword} setEmail={setEmail} />
      <ActivationModal setModal={setModal} modal={modal} />
    </div>
  )
}

export default Page
