"use client";
import React from "react";
import axios from "axios";
import { SafeListing, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProfileClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = useForm();

  !currentUser ? router.push("/") : "";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.email = currentUser?.email || "";
    const emailEdited =
      data.editedEmail && data.editedEmail !== currentUser?.email;
    const nameEdited = data.name !== currentUser?.name;

    emailEdited || nameEdited
      ? toast
          .promise(
            axios.put("/api/profile", data, {
              headers: {
                "Content-Type": "application/json",
              },
            }),
            {
              loading: "Guardando...",
              success: <b>Perfil actualizado con éxito</b>,
              error: <b>Error al actualizar el perfil</b>,
            }
          )
          .then((result) => {
            if (emailEdited) {
              toast("Tendrás que volver a iniciar sesión", { icon: "❗" });
              signOut();
            }
          })
          .catch((error) => {
            emailEdited
              ? toast.error(
                  "Se ha realizado un cambio, siga las instrucciones por favor"
                )
              : toast.error("Error al procesar la solicitud");
          })
      : toast("No se realizaron cambios en el perfil.", {
          icon: "❔",
          id: "no-change",
        });
  };

  return (
    <Container>
      {currentUser ? (
        <main className="pt-24 md:pt-40 mx-auto p-4 max-w-screen-md">
          <Heading title="Profile:" subtitle="Your personal information" />

          <img
            src={currentUser?.image || "/images/placeholder.jpg"}
            alt="Imagen de Perfil"
            className="mx-auto rounded-full w-32 h-32"
          />

          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="mb-2">
                Nombre:
                <input
                  type="text"
                  defaultValue={currentUser?.name || ""}
                  {...register("name")}
                  className="border rounded px-2 py-1 w-full"
                />
              </p>

              <p className="mb-2">
                <label className="mb-2 block">
                  Correo Electrónico:
                  <span className="border rounded px-2 py-1 w-full text-gray-600">
                    <br />
                    {currentUser?.email || ""}
                  </span>
                </label>
              </p>
              <p className="mb-2">
                Nuevo Correo Electrónico:
                <input
                  type="text"
                  defaultValue={currentUser?.email || ""}
                  {...register("editedEmail")}
                  className="border rounded px-2 py-1 w-full"
                />
              </p>

              {Object.keys(dirtyFields).length > 0 && (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              )}
            </form>
          </div>
        </main>
      ) : (
        <></>
      )}
      <Toaster />
    </Container>
  );
};

export default ProfileClient;
