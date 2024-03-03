import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getAuthSession } from "@/libs/auth";

// FETCH ALL ORDERS

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      if (session.user.isAdmin) {
        const order = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(order), { status: 200 });
      }
      const order = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      return new NextResponse(JSON.stringify(order), { status: 200 });
    } catch (error) {
      return new NextResponse(JSON.stringify("Something went wrong!"), {
        status: 500,
      });
    }
  } else {
    return new NextResponse(JSON.stringify("Unauthorized"), {
      status: 401,
    });
  }
};
