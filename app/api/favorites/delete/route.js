import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function DELETE(id) {

  const response = await id.json()

  console.log(response)

  const deleteFavorite = await prisma.Favorite.delete({
    where: {
      id: response
    }
  })

    return NextResponse.json({data: deleteFavorite})

}