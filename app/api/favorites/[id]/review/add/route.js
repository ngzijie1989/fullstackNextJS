import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"

export async function POST(info) {
  const session = await getServerSession();
  const response = await info.json()

  const user = await prisma.User.findUnique({
    where: { email : session.user.email}
  })

  const findFavorite = await prisma.Favorite.findFirst({
    where: { 
      id: response.id
    }
  })

  const findReview = await prisma.Review.findFirst({
    where: {
      userId: user.id,
      title: response.review.title
    }
  })

  if (!findReview){
    const reviewEntry = response.review

    reviewEntry.favoriteId = findFavorite.id
    reviewEntry.userId = user.id

    const review = await prisma.Review.create({
      data: reviewEntry,
    });

    return NextResponse.json({data: review})
  } else {
    const review= '123'

    return NextResponse.json({data: review})
  }
}
