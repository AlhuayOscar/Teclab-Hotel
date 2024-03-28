import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "Key not found",
});

interface IParams {
  webhook?: string;
}
interface PaymentData {
  paymentDate: string;
  paid: boolean;
  bill: string | any;
}

export async function POST(request: Request, { params }: { params: IParams }) {
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
      mg.messages
        .create("sandbox-123.mailgun.org", {
          from: "Excited User <mailgun@sandbox-123.mailgun.org>",
          to: ["oscar_alhuay2001@hotmail.com"],
          subject: "Hello",
          text: "Testing some Mailgun awesomness! Right?",
          html: "<h1>Testing some Mailgun awesomness! Hey!!!</h1>",
        })
        .then((msg) => console.log(msg))
        .catch((err) => console.error(err));
      return NextResponse.json({ reservation: updatedReservation });
    }
  }

  console.log("Pago realizado");

  return NextResponse.json(body);
}
