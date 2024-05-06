import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import { SendMail } from "@/app/lib/mail";

export async function POST(info) {
  try {
    const response = await info.json()

    
    const findEmail = await prisma.User.findFirst({
      where: {
        email: response.email
      }
    })

    if (findEmail) {
      const error = { error: "There is existing email registered. Please use another email" }
      return NextResponse.json({data: error})
    } else {
      const bcryptedPassword = await hash(response.password, 10)
      response.password = bcryptedPassword

      const userCreate = await prisma.User.create({
        data: response
      })

      const token = await prisma.ActivateToken.create({
        data: {
          token: uuidv4().replace(/-/g, ''),
          userId: userCreate.id
        }
      })
      
      if (process.env.NODE_ENV === 'production') {
        const emailBody = `Hello ${response.name}, Please activate your account by clicking on this link: https://fullstack-next-js-mu.vercel.app/api/activate?token=${token.token}`
        const sendMail = await SendMail(response.email, "Verification of Movie Hunt Account", emailBody)
      } else {
        const emailBody = `Hello ${response.name}, Please activate your account by clicking on this link: http://localhost:3000/api/activate?token=${token.token}`
        const sendMail = await SendMail(response.email, "Verification of Movie Hunt Account", emailBody)
      }
      
      if (!userCreate){
        const error = { error: "Failed to create user" }
        return NextResponse.json({data: error})
      } else {
        return NextResponse.json({data: response})
      }
      
    }
  } catch (error) {
    
    return NextResponse.json({ data: { error: "Server error" } });
  }
}
