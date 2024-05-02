'use client'

import { useState } from "react"
import LoginCardWrapper from "../components/LoginCardWrapper"
import styles from "@/app/css/loginForm.module.css"
import { useSearchParams } from "next/navigation"

function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const params = useSearchParams()
  const error = params.get('error')

  return (
    <div>
      <LoginCardWrapper email={email} password={password} setPassword={setPassword} setEmail={setEmail} />
    </div>
  )
}

export default Page
