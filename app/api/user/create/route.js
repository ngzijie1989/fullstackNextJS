import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

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
