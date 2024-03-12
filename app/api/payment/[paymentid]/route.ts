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
  mercadopage.configure({
    access_token:
      "TEST-6853751905309594-031200-61ca45230f1b95ad5a8533f855abe126-1721592315",
  });
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
      notification_url: "https://452f-190-57-242-149.ngrok-free.app/payment",
      back_urls: {
        success: "http://localhost:3000/trips",
      },
    });
    const initPoint = result.body.init_point;
    console.log("Url del pago de MercadoPago", initPoint);
    // const paymentData: PaymentData = {
    //   paid: paymentBody.paid,
    //   paymentDate: paymentBody.paymentDate,
    //   bill: paymentBody.bill,
    // };

    // Actualizamos la reserva en la base de datos usando Prisma con los datos de pago
    // const updatedReservation = await prisma.reservation.update({
    //   where: {
    //     id: reservationId,
    //   },
    //   data: paymentData,
    // });
    console.log("Pago realizado");
    // Devolvemos una respuesta JSON que incluye el init_point junto con la reserva actualizada
    if (initPoint) {
      return NextResponse.json(initPoint);
    }
    // return NextResponse.json({ reservation: updatedReservation });
    return NextResponse.json(204);
  } catch (error) {
    throw new Error(
      "Error occurred while updating reservation with payment information:"
    );
  }
}
