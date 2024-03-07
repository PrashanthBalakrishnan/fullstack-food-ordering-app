import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body = await req.json();
  try {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: body,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
