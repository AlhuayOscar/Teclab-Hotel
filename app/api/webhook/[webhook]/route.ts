import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "Key not found",
});

interface IParams {
  reservationId?: string;
}
interface PaymentData {
  paymentDate: string;
  paid: boolean;
  bill: string | any;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const body = await request.json();
  const reservationId = params.reservationId;
  const dateCreated = body.date_created;
  const mercadoPagoId = body.resource.match(/\d+/)[0];
  const paymentId = body.id;
  const htmlContent = `
    <img src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1709847291/rokqijqiwc0d4mms8ylo.jpg" style="width: 100%; max-width: 100%; max-height: 250px; overflow: hidden; object-fit: cover;" />
    <div>
        Your purchase is done! Feel free to read the description: 

        <div style="max-width: 300px">
        </div>

        El id de la transacción realizado mediante Mercado Pago

        <div> 
        ${mercadoPagoId}
        </div>


        El id de la reserva pagada en HotelZZZ
        <div> 
        ${reservationId}
        </div>
      
        <div>
        <button>Quiero presentar una queja</button>
        </div>

        <div>
        <button>Tuve un problema</button>
        </div>
    </div>
`;

  /*Si queremos agregar el email del usuario necesitamos 
  poner en subject el valor de paymentBody.userEmail, 
  En este caso no lo haremos porque es más facil el testeo*/

  mg.messages
    .create("sandbox249b93d991cd46279dda6eb7ef9af055.mailgun.org", {
      from: "oscar_alhuay2001@hotmail.com",
      to: ["bibarel9999@gmail.com"],
      subject: "Test Mailgun",
      text: "Testing some Mailgun awesomness! Right?",
      html: htmlContent,
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.error(err));

  if (paymentId) {
    const parsedBill = paymentId.toString();
    if (reservationId && body.action === "payment.created" && parsedBill) {
      const paymentData: PaymentData = {
        paid: true,
        paymentDate: dateCreated,
        bill: parsedBill,
      };
      const updatedReservation = await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: paymentData,
      });
    }

    console.log("Pago realizado");

    return NextResponse.json(body);
  }
  return NextResponse.json("Webhook not working.");
}
