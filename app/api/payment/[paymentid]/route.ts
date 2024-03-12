import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  paymentId?: string;
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { paymentId } = params;

  if (!paymentId || typeof paymentId !== "string") {
    throw new Error("Invalid ID");
  }

  return NextResponse.json(1);
}
