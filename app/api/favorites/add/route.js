import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { auth } from "@/auth";

export async function POST(info) {
  const session = await auth();
  const response = await info.json()

  const user = await prisma.User.findUnique({
    where: { email : session.user.email}
  })


  const findFavorite = await prisma.Favorite.findFirst({
    where: { 
      title: response.title,
      userId: user.id
    }
  })

  if (!findFavorite){
    response.userId = user.id

    const favourite = await prisma.Favorite.create({
      data: response,
    });
      
    return NextResponse.json({data: response})
  } else {
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
