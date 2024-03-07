import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

// GET SINGLE PRODUCT
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const product = await prisma?.product.findUnique({
      where: { id },
    });
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

// DELETE SINGLE PRODUCT
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const session = await getAuthSession();

  if (session?.user.isAdmin) {
    try {
      await prisma?.product.delete({
        where: { id },
      });
      return new NextResponse(JSON.stringify("Product has been delete"), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
      );
    }
  }

  return new NextResponse(
    JSON.stringify({
      message: "You are not authorized to perform this action",
    }),
    { status: 403 }
  );
};
