import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { hash } from "bcrypt"

export async function PUT(info){
  try{
    const response = await info.json()

    const findToken = await prisma.ResetToken.findFirst({
      where: {
        resetToken: response.token
      },
      include: {
        user: true
      }
    })

    if (!findToken) {
      const info = "You are not authorized to change the password"
      return NextResponse.json({data: info})
    } else if (findToken.activatedAt !== null){
      const info = "Password has been changed before using this session. Re try to reset the password again"
      return NextResponse.json({data: info})
    } else {

      const encryptPassword = await hash(response.password, 10)


      const updateUserPassword = await prisma.User.update({
        where: {
          id: findToken.user.id
        }, data: {
          password: encryptPassword
        }
      })

      const updateResetToken = await prisma.ResetToken.update({
        where: {
          id: findToken.id
        }, data: {
          activatedAt: new Date()
        }
      })

      const info = "Successful"

      return NextResponse.json({data: info})
    }


  } catch (e) {
    const info = "Server Error"
  return NextResponse.json({data: info})
  }

}