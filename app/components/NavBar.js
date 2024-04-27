/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import AuthSign from "./SessionMenu"
import Image from "next/image"
import { getServerSession } from "next-auth";
import styles from '@/app/css/avatar.module.css'

async function NavBar() {

  const session = await getServerSession();

  console.log(session.user.image)

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
        <li><AuthSign/></li>
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
    <Link href="/account" className="btn btn-ghost btn-circle ">
      <img src={session.user.image} alt={session.user.name} className={styles.imageavatar} />
    </Link>
  </div>
</div>
  )
}

export default NavBar
