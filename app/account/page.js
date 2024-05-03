/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect,useState } from "react"
import styles from "@/app/css/account.module.css"
import { useRouter } from "next/navigation"
import Link from "next/link"
import UploadImageButton from "../components/UploadImageButton"
import { useSession } from "next-auth/react";

function Page() {
  const [ email, setEmail ] = useState("")
  const [ imagePath, setImagePath ] = useState("")
  const [ name, setName ] = useState("")

  const router = useRouter()

  const session = useSession()

  if (!session.data || !session.status === "authenticated") {
    redirect("/no-access")
  }

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
        console.log(getUserInfo)

        if (getUserInfo !== "") {
          setEmail(getUserInfo.email)
          setName(getUserInfo.name)
          if (getUserInfo.imagePath === null){
          setImagePath("")
          } else {
            setImagePath(getUserInfo.imagePath)
          }
        }
    }
    getUser()
  },[])

  const handleEditImage = (e) => {
    e.preventDefault()
    return console.log('hello')
  }

  return (
    <div className="w-[80%] mx-auto">
      <button onClick={()=> router.back()} className=" text-blue-700 hover:underline ">Go Back</button>
      <div className={styles.accountContainer}>
        <h1 className="text-center font-bold text-3xl">Account Info</h1>
        <div className="flex">
        <img src="imagePath" alt="profileimage" className={styles.accountImage} />
          <div className="flex flex-col justify-between">
            <div>
              <p><span className="font-bold ">User Name: </span>{name}</p>
              <p className="my-2"><span className="font-bold">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> {email}</p>
            </div>
            <div>
              <button onClick={handleEditImage} className="btn btn-primary">Edit profile picture</button>
              <UploadImageButton />
              <form action="/api" method="post" enctype="multipart/form-data">
                <label for="file">File</label>
                <input id="file" name="file" type="file" />
                <button type="submit" classname="btn btn-primary">Upload</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
