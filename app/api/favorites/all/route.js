import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"

export async function GET() {
  const session = await getServerSession();

  const user = await prisma.User.findUnique({
    where: { email : session.user.email}
  })

  const favorites = await prisma.Favorite.findMany({
    where: {
      userId: user.id
    }
  })

  if (favorites.length === 0 ){
    return NextResponse.json({data: favorites})
  } else {
    return NextResponse.json({data: favorites})
  }
}