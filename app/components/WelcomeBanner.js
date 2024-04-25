/* eslint-disable @next/next/no-img-element */
'use client'

import Button from "./Button"
import Link from "next/link"

function WelcomeBanner({ user }) {

  return (
    <div>
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content text-2xl">
            <div className="max-w-5xl">
              <h1 className="mb-5 text-5xl font-bold">Welcome {user}!</h1>
              <p className="mb-5">Go through our App to find the most amazing movies to watch!</p>
              <Link href="/">
                <Button className="btn btn-primary">Get Started</Button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
