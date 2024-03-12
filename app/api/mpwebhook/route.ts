import { NextResponse } from "next/server";
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

export const mpwebhook = async (req: Request) => {
  try {
    const payment = req;
    console.log(payment);
    return NextResponse.json(1);
  } catch (error) {
    console.log(error);

    throw new Error(
      "Error occurred while updating reservation with payment information"
    );
  }
};
