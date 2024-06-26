import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { auth } from "@/auth";

export async function GET() {
  
  const session = await auth();

  if (session === null) {
    const user = ""
    return NextResponse.json({data: user})
  } else {
    const user = await prisma.User.findFirst({
      where: {
        email: session.user.email
      }
    })
    return NextResponse.json({data: user})
  }
}