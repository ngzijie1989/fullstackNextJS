/* eslint-disable @next/next/no-img-element */

import styles from "@/app/css/loginForm.module.css"
import Link from "next/link"
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { AuthenticationError } from "./Errors";
import { useState } from "react";

function LoginCardWrapper({ email, password, setPassword, setEmail, onClick }) {

  const handleSubmitGoogle = (event) => {
    event.preventDefault();
    signIn('google', { callbackUrl: "/"}); // Call the imported signIn function
  
  };

  const handleSubmitCredentials = (event) => {
    event.preventDefault();
    signIn('credentials', { 
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/"
    }); // Call the imported signIn function
  };

  const params = useSearchParams()
  const error = params.get('error')

  return (
    <div className={`${styles.loginContainer}`}>
      <h1 className="font-bold text-3xl mb-3">
        Welcome to Movie Hunt!
      </h1>
      {!!error ? <AuthenticationError/> : ""}
      <form onSubmit={handleSubmitCredentials}>
        <div className="mb-3">
          <label className="flex flex-col w-full">
            Email
            <input type="text" placeholder="JeffBezos@email.com" className="input input-bordered w-full" onChange={(e)=> setEmail(e.currentTarget.value)} />
          </label>
        </div>

        <div className="mb-3">
          <label className="flex flex-col w-full">
            Password
            <input type="password"  className="input input-bordered w-full" onChange={(e)=> setPassword(e.currentTarget.value)}/>
          </label>
        </div>

        <button className="btn btn-primary mb-2 w-full" type="submit">Sign In</button>
      </form>
      <div className="border-t-2 mt-3">

      <form onSubmit={handleSubmitGoogle}>
      <button className={`btn ${styles.googleButton}`} >
        <img src="/googleicon.png" alt="Google Logo" className={styles.googleLogo} />
        &nbsp; Sign in with Google
      </button>
      </form>
      </div>

      <div className="flex flex-col">
        <button  onClick={onClick} className="hover:underline text-blue-700 text-left">Forgot Password?</button>
        <Link href="/signup" className="hover:underline text-blue-700 ">Dont have an account? Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginCardWrapper
