import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { auth } from "@/auth";

export async function POST(info) {
  const session = await auth();
  const response = await info.json()

  const user = await prisma.User.findUnique({
    where: { email : session.user.email}
  })

  const findReview = await prisma.Review.findFirst({
    where: {
      userId: user.id,
      title: response.review.title
    }
  })

  if (!findReview){
    const reviewEntry = response.review

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
