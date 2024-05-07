/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect,useState } from "react"
import styles from "@/app/css/account.module.css"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react";
import Loading from "../utilis/Loading"
import toast from "react-hot-toast"
import ProfilePic from "../components/ProfilePic"
import { redirect } from "next/navigation"

function Page() {
  const [ email, setEmail ] = useState("")
  const [ imagePath, setImagePath ] = useState("")
  const [ name, setName ] = useState("")
  const [ displayForm, setDisplayForm ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ imageSet, setImageSet ] = useState()
  const [ imageuploadloading, setImageUpLoadLoading ] = useState(false)

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

        if (getUserInfo !== "") {
          setEmail(getUserInfo.email)
          setName(getUserInfo.name)
          if (getUserInfo.imagePath === null){
          setImagePath("")
          } else {
            setImagePath(getUserInfo.imagePath)
          }
        }
        setLoading(false)
    }
    getUser()
  },[imagePath])

  const handleOpenEditImage = (e) => {
    e.preventDefault()
    setDisplayForm(true)
    return ""
  }

  const handleImageSet = (e) => {
    e.preventDefault()
    setImageSet(e.target.files[0])
  }

  const handleCloseEditImage = (e) => {
    e.preventDefault()
    setDisplayForm(false)
    return ""
  }

  const handleSubmitImage = async (e) => {
    e.preventDefault()

    if (!imageSet){
      return;
    }

    setImageUpLoadLoading(true)

    const formData = new FormData();
    formData.append("file", imageSet);
    formData.append("upload_preset", "zi5exbhf");

    const options = {method: "POST",
    body: formData
    }

    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/dycdatne1/image/upload`, options)
    const uploadedImageData = await uploadResponse.json();

    const info = { 
      email: email,
      url: uploadedImageData.url
    }

    const updateUserOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }
    toast.success("Profile Image has been changed successfully")

    const updateUserImage = await fetch('/api/user/updateprofileimage', updateUserOptions)
    const updateUserImageResponse = await updateUserImage.json()

    setDisplayForm(false)
    setImageSet(false)
    setImageUpLoadLoading(false)
    // router.push("/account")
    window.location.reload(true)
  }

  return (
    <div className="w-[80%] mx-auto">
      {imageuploadloading ? Loading() : ""}
      {loading ? Loading() : ""}
      <button onClick={()=> router.back()} className=" text-blue-700 hover:underline ">Go Back</button>
      <div className={styles.accountContainer}>
        <h1 className="text-center font-bold text-3xl mb-3">Account Info</h1>
        <div className="flex flex-col text-center md:flex-row md:text-left">
          <div className="flex justify-center">
        <ProfilePic imagePath={imagePath} />
          </div>
          <div className="flex flex-col justify-between">
            <div className="my-3">
              <p><span className="font-bold ">User Name: </span>{name}</p>
              <p className="my-2"><span className="font-bold">Email: </span> {email}</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center md:items-start justify-center lg:justify-start">
              <div className="flex">
                <button onClick={handleOpenEditImage} className={`btn btn-primary mb-5 me-3 ${displayForm ? "btn-disabled" : ""}`}>Edit profile Image</button>
              </div>
              {displayForm ?              
              <div className="border p-2 pe-7 relative flex">
                <form onSubmit={handleSubmitImage}>
                  <div className="flex flex-col md:flex-row">
                    <div>
                      <input className="w-[100%] mb-3" required id="file" name="file" type="file" onChange={handleImageSet} accept=".jpg, .png, .gif, .jpeg"/>
                      <button onClick={handleCloseEditImage} className="p-2 absolute top-[-9px] right-0 ">x</button>
                    </div>

                    <div>
                      <button type="submit" className="btn btn-accent p-2">Upload</button>
                    </div>
                  </div>
                </form>
              </div>
              :
              "" }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
