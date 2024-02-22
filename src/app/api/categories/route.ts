import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

// FETCH ALL CATEGORIES

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify("Something went wrong!"), {
      status: 500,
    });
  }
};
