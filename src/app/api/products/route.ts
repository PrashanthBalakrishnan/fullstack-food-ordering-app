import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

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
    console.log(products);
    return new NextResponse(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify("Something went wrong!"), {
      status: 500,
    });
  }
};

// ADD PRODUCT
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const products = await prisma.product.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(products), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify("Something went wrong!"), {
      status: 500,
    });
  }
};
