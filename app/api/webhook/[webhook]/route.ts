import { NextResponse } from "next/server";
import prisma from "@/app/[locale]/libs/prismadb";
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
  const reservationId = params.webhook;
  const dateCreated = new Date().toISOString();
  console.log(params);
  const mercadoPagoId = await body.resource.match(/\d+/)[0];
  const htmlContent = `
    <img src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1709847291/rokqijqiwc0d4mms8ylo.jpg" style="width: 100%; max-width: 100%; max-height: 250px; overflow: hidden; object-fit: cover;" />
    <div class="bg-red-500">
        <h3> 
        Your purchase is done! Feel free to read the description: 
        </h3>
        <div style="max-width: 300px">
        </div>
        The transaction ID is:

        <div> 
        ${mercadoPagoId}
        </div>


        The HotelZZZ reservation room ID is:
        <div> 
        ${reservationId}
        </div>
      
        <div>
        <button>I want a refund</button>
        </div>

        <div>
        <button>I had a problem</button>
        </div>
    </div>
`;

  /*Si queremos agregar el email del usuario necesitamos 
  poner en subject el valor de paymentBody.userEmail, 
  En este caso no lo haremos porque es más facil el testeo*/

  try {
    mg.messages
      .create("sandbox249b93d991cd46279dda6eb7ef9af055.mailgun.org", {
        from: "oscar_alhuay2001@hotmail.com",
        to: ["bibarel9999@gmail.com"],
        subject: "Test Mailgun",
        text: "Testing some Mailgun awesomeness! Right?",
        html: htmlContent,
      })
      .then((msg) => console.log(msg))
      .catch((err) => console.error(err));
    if (reservationId) {
      if (mercadoPagoId) {
        const paymentData: PaymentData = {
          paid: true,
          paymentDate: dateCreated,
          bill: mercadoPagoId,
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
  } catch (error) {
    return NextResponse.json("Webhook not working.");
  }
  return NextResponse.json("Webhook not working.");
}
