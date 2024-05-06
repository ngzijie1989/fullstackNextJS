'use client'

import styles from "@/app/css/loginForm.module.css"
import { useState } from "react"
import { InvalidPassword } from "../components/Errors"
import { Router, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loading from "../utilis/Loading"

function Page() {
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ rmbpassword, setRmbPassword ] = useState("")
  const [ error, setError ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const router = useRouter()

  const handleSignUp = async (e) => {

    e.preventDefault()
    if (password !== rmbpassword) {
      setError(true)
      setErrorMessage("Password typed is not the same. Please try again")
    } else if (password === "" || name === "" || password === "" || rmbpassword === ""){
      setError(true)
      setErrorMessage("Input fields are empty. Please type again")
    } else {

      setLoading(true)

      const userInfo = {
        name: name,
        email: email,
        password: password,
        provider: 'Credentials'
      }
  
      const options = {method: "POST", headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
      }
  
      const response = await fetch('/api/user/create', options)
      const createUser = await response.json()
      
      if (createUser.data.error === "Server Error") {
        setLoading(false)
        setError(true)
        setErrorMessage("Server Error. Please try again")
      } else if (createUser.data.error === "There is existing email registered. Please use another email") {
        setLoading(false)
        setError(true)
        setErrorMessage("There is existing email registered. Please use another email")
      } else {
        if (process.env.NODE_ENV === 'production') {
          const redirectUrl = `https://fullstack-next-js-mu.vercel.app?redirect=true`;
          router.push(redirectUrl)
          toast.success('User account has been created successfully')
        } else {
          const redirectUrl = `http://localhost:3000?redirect=true`;
          router.push(redirectUrl)
          toast.success('User account has been created successfully')
        }
      }
    }

  }

  return (
    <div className={`${styles.signUpContainer}`}>
      {loading ? Loading() : ""}
      <h1 className="text-center font-bold text-2xl">Sign Up an Account</h1>
      <form onSubmit={handleSignUp}>
      <div className="mb-3">
          <label className="flex flex-col w-full">
            Username
            <input pattern=".{6,}" title="User name must be at least 6 characters long" type="text" placeholder="Jeff Bezos" className="input input-bordered w-full" onChange={(e)=> setName(e.currentTarget.value)} />
          </label>
        </div>

        <div className="mb-3">
          <label className="flex flex-col w-full">
            Email
            <input pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email format" type="text" placeholder="JeffBezos@email.com" className="input input-bordered w-full" onChange={(e)=> setEmail(e.currentTarget.value)} />
          </label>
        </div>

        <div className="mb-3">
          <label className="flex flex-col w-full">
            Password
            <input pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"  title="Password must be at least 8 characters long and contain at least one letter and one number" type="password"  className="input input-bordered w-full" onChange={(e)=> setPassword(e.currentTarget.value)}/>
          </label>
        </div>

        <div className="mb-3">
          <label className="flex flex-col w-full">
            Re-type Password
            <input pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"  title="Password must be at least 8 characters long and contain at least one letter and one number" type="password"  className="input input-bordered w-full" onChange={(e)=> setRmbPassword(e.currentTarget.value)}/>
          </label>
        </div>


        <button className="btn btn-primary mb-2 w-full" type="submit">Sign Up An Account</button>
      </form>
        {error ? <InvalidPassword error={errorMessage}/> : ""}
    </div>
  )
}

export default Page
