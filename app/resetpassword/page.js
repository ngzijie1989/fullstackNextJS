'use client'

import styles from "@/app/css/loginForm.module.css"
import { useState, useEffect} from "react"
import { useSearchParams } from "next/navigation"
import Loading from "../utilis/Loading"
import { InvalidPassword } from "../components/Errors"
import { Router, useRouter } from "next/navigation"
import toast from "react-hot-toast"

function Page() {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ rmbpassword, setRmbPassword ] = useState("")
  const [ error, setError ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ token, setToken ] = useState("")

  const params = useSearchParams()
  const getToken = params.get('token')
  const router = useRouter()

  useEffect(()=>{
    setToken(getToken)
  },[getToken])

  const HandleSubmit = async (e) => {
    e.preventDefault()

    if (password !== rmbpassword) {
      setError(true)
      setErrorMessage("Password typed is not the same. Please try again")

    } else if (email === "" || password === "" || rmbpassword === ""){
      setError(true)
      setErrorMessage("Input fields are empty. Please type again")

    } else {
      
      setLoading(true)

      const info = {
        email: email,
        password: password,
        token: token
      }

      const options = {method: "PUT", headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
      }

      const response = await fetch('/api/resetpassword', options)
      const passwordUpdate = await response.json()

      if (passwordUpdate.data === "Server Error") {
        setLoading(false)
        setError(true)
        setErrorMessage("Server Error. Please try again")
      } else if (passwordUpdate.data === "You are not authorized to change the password") {
        setLoading(false)
        setError(true)
        setErrorMessage("You are not authorized to change the password")
      } else if (passwordUpdate.data === "Password has been changed before using this session. Re try to reset the password again") {
        setLoading(false)
        setError(true)
        setErrorMessage("Password has been changed before using this session. Re try to reset the password again")
      } else {
        setLoading(false)
        router.push("/api/auth/signin")
        toast.success('Password has been changed successfully')
      }
    }


  }

  return (
    <div className={styles.resetPasswordForm}>
      {loading ? Loading() : ""}
      <h1 className="text-center font-bold text-4xl mb-4">Reset Password</h1>
      <form onSubmit={HandleSubmit} className="m-auto w-full">

        <label className="form-control w-full">
          <span className="label-text mb-2 font-bold">Please enter your email</span>
          <input pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email format" type="text" placeholder="Type here" className="input input-bordered w-full mb-4" onChange={(e)=> setEmail(e.currentTarget.value)}/>
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-2 font-bold">New Password</span>
          <input pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"  title="Password must be at least 8 characters long and contain at least one letter and one number" type="password" placeholder="Type here" className="input input-bordered w-full mb-4" onChange={(e)=> setPassword(e.currentTarget.value)}/>
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-2 font-bold">Re-enter password</span>
          <input pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"  title="Password must be at least 8 characters long and contain at least one letter and one number" type="password" placeholder="Type here" className="input input-bordered w-full mb-4" onChange={(e)=> setRmbPassword(e.currentTarget.value)}/>
        </label>
        <button type="submit" className="btn btn-primary my-4 w-full">Submit</button>
      </form>
      {error ? <InvalidPassword error={errorMessage}/> : ""}
    </div>
  )
}

export default Page
