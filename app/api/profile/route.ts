import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function PUT(request: Request) {
  const body = await request.json();

  const {
    email,
    name,
    image,
    newPassword,
    editedEmail,
  } = body;


  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return NextResponse.error();
  }

  // Verificar si el nuevo correo electrónico ya existe en la base de datos.
  if (editedEmail && editedEmail !== email) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: editedEmail,
      },
    });

    if (emailExists) {
      return NextResponse.error();
    }
  }

  // Actualizar los campos proporcionados.
  const updatedUserData: {
    name?: string;
    image?: string;
    hashedPassword?: string;
    email?: string; // Agrega "email" al objeto updatedUserData.
  } = {};

  if (name) {
    updatedUserData.name = name;
  }

  if (image) {
    updatedUserData.image = image;
  }

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    updatedUserData.hashedPassword = hashedPassword;
  }

  if (editedEmail) {
    updatedUserData.email = editedEmail; // Cambia el valor de "email" a "editedEmail".
  }

  // Actualizar el usuario en la base de datos utilizando "editedEmail".
  const updatedUser = await prisma.user.update({
    where: {
      email, // Utiliza "email" aquí para encontrar al usuario.
    },
    data: updatedUserData,
  });

  // Cambia el valor de "email" en el objeto "updatedUser" al valor de "editedEmail".
  if (editedEmail) {
    updatedUser.email = editedEmail;
  }

  return NextResponse.json(updatedUser);
}
