import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

// FETCH ALL PRODUCTS

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });
    return new NextResponse(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify("Something went wrong!"), {
      status: 500,
    });
  }
};
