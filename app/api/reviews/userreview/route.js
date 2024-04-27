import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET() {

  const reviews = await prisma.Review.findMany({
    where: {
      tmdb: tmdbInt,
      title: title
    },
    include: {
      User: true
    }
  })
    return NextResponse.json({data: reviews})
}