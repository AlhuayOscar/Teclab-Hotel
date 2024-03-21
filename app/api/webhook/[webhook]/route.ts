import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  webhook?: string;
}
interface PaymentData {
  paymentDate: string;
  paid: boolean;
  bill: string | any;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const body = await request.json();
  const webhookId = params.webhook;
  const dateCreated = body.date_created;
  const paymentId = body.id;
  if (paymentId) {
    const parsedBill = paymentId.toString();
    if (webhookId && body.action === "payment.created" && parsedBill) {
      const paymentData: PaymentData = {
        paid: true,
        paymentDate: dateCreated,
        bill: parsedBill,
      };
      const updatedReservation = await prisma.reservation.update({
        where: {
          id: webhookId,
        },
        data: paymentData,
      });
      return NextResponse.json({ reservation: updatedReservation });
    }
  }

  console.log("Pago realizado");

  return NextResponse.json(body);
}
