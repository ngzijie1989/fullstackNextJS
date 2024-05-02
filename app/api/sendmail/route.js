import { SendMail } from "@/app/lib/mail"
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET(req){
  try{
    const url = req.nextUrl.searchParams
    const email = url.get('email')

    const user = await prisma.User.findFirst({
      where: {
        email: email,
        active: true
      }
    })

    if (!user) {
      const info = "Error"
      return NextResponse.json({data: info})
    } else {
      const body = `Please click on this link to reset your password. http://localhost:3000/api/resetpassword?email=${email}`
      await SendMail(email, "Movie Hunt: Reset Password", body)
      const info = "Successful"
      return NextResponse.json({data: info})
    }


  } catch (e) {
    const info = "Server Error"
  return NextResponse.json({data: info})
  }

}