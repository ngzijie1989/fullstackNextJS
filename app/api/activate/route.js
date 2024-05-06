import prisma from "@/app/lib/prisma"
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export async function GET(req){
  const url = req.nextUrl.searchParams
  const token = url.get('token')

  const tokenObject = await prisma.ActivateToken.findFirst({
    where: {
      token: token
    },
    include: {
      user: true
    }
  })

  const user = tokenObject.user

  const updateUser = await prisma.User.update({
    where: {
      id: user.id
    },
    data :{
      active: true
    }
  })

  const activateToken = await prisma.ActivateToken.update({
    where: {
      token: token
    },
    data :{
      activatedAt: new Date()
    }
  })

  const callbackUrl = encodeURIComponent("/") + "&redirect=true";

  if (process.env.NODE_ENV === 'production') {
    const redirectUrl = `https://fullstack-next-js-mu.vercel.app/login?callbackUrl=${callbackUrl}`;
    redirect(redirectUrl)
  } else {
    const redirectUrl = `http://localhost:3000/login?callbackUrl=${callbackUrl}`;
    redirect(redirectUrl)
  } 
}