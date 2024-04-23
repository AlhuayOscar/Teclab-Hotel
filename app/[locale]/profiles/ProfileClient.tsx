"use client";
import React, { useState } from "react";
import axios from "axios";
import { SafeListing, SafeUser } from "@/app/[locale]/types";
import Heading from "@/app/[locale]/components/Heading";
import Container from "@/app/[locale]/components/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/app/[locale]/components/inputs/ImageUpload";
import { useTranslation } from "react-i18next";

interface ProfileClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editedImage, setEditedImage] = useState<string>(
    currentUser?.image || ""
  );
  const { t } = useTranslation();

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
    data.image = editedImage;

    emailEdited || nameEdited || editedImage
      ? toast
          .promise(
            axios.put("/api/profile", data, {
              headers: {
                "Content-Type": "application/json",
              },
            }),
            {
              loading: "Guardando...",
              success: <b>{t("profToast")}</b>,
              error: <b>{t("profToastErr")}</b>,
            }
          )
          .then((result) => {
            if (emailEdited) {
              toast(t("emailToastErr"), { icon: "❗" });
              signOut();
            }
            if (result && editedImage) {
              router.refresh();
            }
          })
          .catch((error) => {
            emailEdited
              ? toast.error(t("changeToast"))
              : toast.error(t("errToast"));
          })
      : toast(t("errChangeToast"), {
          icon: "❔",
          id: "no-change",
        });
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <Container>
      {currentUser ? (
        <main className="pt-24 md:pt-40 mx-auto p-4 max-w-screen-md">
          <Heading title={t("profTitle")} subtitle={t("profSub")} />

          <img
            src={editedImage || currentUser?.image || "/images/placeholder.jpg"}
            alt="Imagen de Perfil"
            className="mx-auto rounded-full w-32 h-32 cursor-pointer object-cover"
            onClick={openImageModal}
          />

          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="mb-2">
                {t("name")}
                <input
                  type="text"
                  defaultValue={currentUser?.name || ""}
                  {...register("name")}
                  className="border rounded px-2 py-1 w-full"
                />
              </p>

              <p className="mb-2">
                <label className="mb-2 block">
                  {t("email")}
                  <span className="border rounded px-2 py-1 w-full text-gray-600">
                    <br />
                    {currentUser?.email || ""}
                  </span>
                </label>
              </p>
              <p className="mb-2">
                {t("newEmail")}
                <input
                  type="text"
                  defaultValue={currentUser?.email || ""}
                  {...register("editedEmail")}
                  className="border rounded px-2 py-1 w-full"
                />
              </p>

              {(Object.keys(dirtyFields).length > 0 ||
                editedImage !== currentUser?.image) && (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? `${t("saving")}...` : `${t("save")}`}
                </button>
              )}
            </form>
          </div>
        </main>
      ) : (
        <></>
      )}
      <Toaster />
      {isImageModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeImageModal();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 w-auto h-auto w-max-96 h-max-96">
            <ImageUpload
              className="image-upload"
              onChange={(value) => {
                setEditedImage(value);
                closeImageModal();
              }}
              value={editedImage}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProfileClient;
