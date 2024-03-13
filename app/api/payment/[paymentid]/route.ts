import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import mercadopage from "mercadopago";

interface PaymentData {
  paid: boolean;
  paymentDate: string;
  bill: string;
}

interface IParams {
  reservationId?: string;
  paymentid?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const paymentBody = await request.json();
  if (process.env.MP_ACCESS_TOKEN) {
    mercadopage.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });
  }

  const finalPrice = paymentBody?.price;
  if (!currentUser) {
    return NextResponse.error();
  }

  const reservationId = params?.paymentid;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }
  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          title: "Hotel Room per Night",
          unit_price: finalPrice,
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      notification_url: `https://9a12-190-57-242-149.ngrok-free.app/api/webhook/${reservationId}`,
      back_urls: {
        success: "http://localhost:3000/trips",
      },
    });
    const initPoint = result.body.init_point;
    if (initPoint) {
      return NextResponse.json(initPoint);
    }
    return NextResponse.json(204);
  } catch (error) {
    throw new Error(
      "Error occurred while updating reservation with payment information:"
    );
  }
}
