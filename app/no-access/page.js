'use client'

import Link from "next/link"
import styles from '@/app/css/noacess.module.css'
import SignInComponent from "../components/signIn"
import { useState } from "react"

function Page() {

  return (
    <div className={styles.noacesssContainer}>
      <p className="mb-4 font-bold">You do not have access </p>
      <SignInComponent />
    </div>
  )
}

export default Page
