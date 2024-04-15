import { NextResponse } from "next/server";
import getCurrentUser from "@/app/[locale]/actions/getCurrentUser";
import prisma from "@/app/[locale]/libs/prismadb";
import mercadopage from "mercadopago";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(FormData);
const DOMAIN = "sandbox249b93d991cd46279dda6eb7ef9af055.mailgun.org";
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "Key not found",
});

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
      notification_url: `https://teclab-hotel.vercel.app/api/webhook/${reservationId}`,
      back_urls: {
        success: "https://teclab-hotel.vercel.app/trips",
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
