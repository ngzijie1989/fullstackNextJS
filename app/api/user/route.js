import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth";

export async function GET() {
  
  const session = await getServerSession();

  const user = await prisma.User.findFirst({
    where: {
      email: session.user.email
    }
  })

    return NextResponse.json({data: user})
}