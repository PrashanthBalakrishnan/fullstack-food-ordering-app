import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import { getAuthSession } from "@/utils/auth";

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

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      const body = await req.json();
      if (session.user.email) {
        const order = await prisma.order.create({
          data: body,
        });
        return new NextResponse(JSON.stringify(order), { status: 201 });
      }
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
