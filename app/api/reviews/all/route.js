import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { NextRequest } from "next/server";

export async function GET(req) {
  const url = req.nextUrl.searchParams
  const tmdb = url.get('tmdbid')
  const title = url.get('title')
  const tmdbInt = parseInt(tmdb)

  const reviews = await prisma.Review.findMany({
    where: {
      tmdb: tmdbInt,
      title: title
    },
    include: {
      User: true
    }
  })

    const sortReviews = await reviews.sort((a,b)=>  new Date(b.CreatedAt) - new Date(a.CreatedAt))
  
    return NextResponse.json({data: sortReviews})
}