import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
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
        
      const htmlContent = `
    <img src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1709847291/rokqijqiwc0d4mms8ylo.jpg" style="width: 100%; max-width: 100%; max-height: 250px; overflow: hidden; object-fit: cover;" />
    <div>
        Your purchase is done! Feel free to read the description: 

        <div style="max-width: 300px">
        </div>

        El id del pago realizado por Mercado Pago

        <div> 
        ${230239232}
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
