import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET() {


  const reviews = await prisma.Review.findMany()
  const titles = reviews.map((review)=> { return review.title })
  const filteredTitles = Array.from(new Set(titles));

  if (filteredTitles.length > 0) {
    return NextResponse.json({data: filteredTitles})
  } else {
    return NextResponse.json({data: []})
  }
}