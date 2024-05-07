import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(info) {
  const response = await info.json();
  
  const userUpdateImage = await prisma.User.update({
    where: {
      email: response.email
    },
    data: {
      imagePath: response.url
    }
  })

    return NextResponse.json({data: userUpdateImage})
  // }
}