/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link"
import AuthSign from "./SessionMenu"
import Image from "next/image"
import styles from '@/app/css/avatar.module.css'
import SignInNav from "./signInNav"
import SignOutComponent from "./signOut"
import { useEffect,useState } from "react"

function NavBar() {
  const [ email, setEmail ] = useState("")
  const [ imagePath, setImagePath ] = useState("")

  useEffect(()=>{
    const getUser = async () => {

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }

        const response = await fetch(`/api/user/find` ,options)
        const getUser = await response.json()
        const getUserInfo = getUser.data

        if (getUserInfo !== "") {
          setEmail(getUserInfo.email)
          if (getUserInfo.imagePath === null){
          setImagePath("")
          } else {
            setImagePath(getUserInfo.imagePath)
          }
        }
    }
    getUser()
  },[])

  return (
    <div className="navbar bg-base-100 p-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href="/all">All Movies</Link></li>
        <li><Link href="/upcoming">Upcoming</Link></li>
        <li><Link href="/greatest-of-all-time">Greatest of all Time</Link></li>
        <li><Link href="/now_playing">Now Playing</Link></li>
        <li><Link href="/favorites">My Favorites</Link></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <Link href="/" className="btn btn-ghost text-xl">Movie Hunt!</Link>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex">
      {email !== "" ? <img src={imagePath} alt="profile" className={styles.imageavatar}/> 
      : 
      <img src="/nouserimagesquare.jpg" alt="noimage" className={styles.imageavatar}/>}
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {email !== "" ? <li><Link href="/account">My Account</Link></li> : ""}
        <li>{email !== "" ? (<SignOutComponent />) : (<SignInNav/ >)}</li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar
