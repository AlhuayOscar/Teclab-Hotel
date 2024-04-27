"use client";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import axios from "axios"; // Importa Axios

import useCountries from "@/app/[locale]/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/[locale]/types";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  payLabel?: string;
  paid?: boolean;
  actionId?: string;
  currentUser?: SafeUser | null;
}
interface Category {
  label: string;
}
interface Categories {
  [key: string]: Category;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  paid,
  payLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const [showPayButton, setShowPayButton] = useState(true);
  const { t } = useTranslation();

  const categories: Categories = {
    "Beach House": {
      label: t("Beach"),
    },
    "Modern Apartment": {
      label: t("Modern"),
    },
    "Mountain House": {
      label: t("Mountain"),
    },
    "Lake House": {
      label: t("Lake"),
    },
    "Camping Huts": {
      label: t("Camping"),
    },
    "Cold Areas": {
      label: t("Cold"),
    },
    "Warm Areas": {
      label: t("Warm"),
    },
    "Quiet Area": {
      label: t("Quiet"),
    },
    "Big Apartments": {
      label: t("Spacious"),
    },
  };
  const category = useMemo(() => {
    return categories?.[data.category];
  }, [data.category]);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );
  const isPaid = paid;
  function handleNone() {
    return toast(t("paidTrip"), {
      icon: "👍",
    });
  }
  const handlePay = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      setShowPayButton(false);
      try {
        const now = new Date();
        const userId = currentUser?.id;
        const paymentInfo = {
          price: reservation?.totalPrice,
          // userEmail: currentUser?.email,
          userId: userId,
          userEmail: "test_user_123@testuser.com",
        };
        if (reservation?.id) {
          const reservationId = reservation?.id;
          const response = await axios.put(
            `/api/payment/${reservationId}`,
            paymentInfo
          );
          response ? window.open(response.data, "_blank") : null;
        }
      } catch (error) {
        console.error("Error occurred while processing payment:", error);
      }
    },
    [disabled, data.id]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    console.log(reservation.startDate, reservation.endDate);
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const startDayMonth = `|${start.getDate()} / ${
      start.getMonth() < 11 ? start.getMonth() + 1 : 12
    }| `;
    const endDayMonth = `|${end.getDate()} / ${
      end.getMonth() < 11 ? end.getMonth() + 1 : 12
    }|`;

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    const formattedStart =
      startYear === endYear ? startDayMonth : start.toLocaleDateString();
    const formattedEnd =
      startYear === endYear ? endDayMonth : end.toLocaleDateString();

    return `${formattedStart} - ${formattedEnd}`;
  }, [reservation]);

  return (
    <div
      id="listingCard"
      onClick={isPaid ? undefined : () => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group px-2"
    >
      <div className="flex flex-col gap-2 w-ful">
        <div
          className="aspect-square 
            w-full
            relative 
            overflow-hidden 
            rounded-xl
            min-h-36 
            min-w-36 
            max-h-36 
            max-w-36 
            self-center
          "
        >
          <Image
            fill
            className={`
             object-cover 
             min-h-36 
             min-w-36
             group-hover:scale-110 
             transition
             justify-center 
             items-center 
             self-center
             ${isPaid ? "brightness-50" : ""}
            `}
            onClick={
              isPaid ? () => router.push(`/listings/${data.id}`) : undefined
            }
            src={data.imageSrc}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region
            ? location?.region.length > 10
              ? location?.region.slice(0, 10) + "..."
              : location?.region
            : "Unknown"}
          , <br />{" "}
          {location?.label
            ? location?.label.length > 10
              ? location?.label.slice(0, 10) + "..."
              : location?.label
            : "Unknown"}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate || (category && category.label)}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">{t("perNight")}</div>}
        </div>
        {onAction && payLabel && actionLabel && (
          <>
            {!showPayButton && <h3>{t("payRedir")}</h3>}
            {showPayButton && (
              <>
                <Button
                  disabled={disabled}
                  small
                  payment
                  label={payLabel}
                  onClick={handlePay}
                />

                <Button
                  disabled={disabled}
                  small
                  label={actionLabel}
                  onClick={handleCancel}
                />
              </>
            )}
          </>
        )}
        {isPaid ? (
          <Button
            disabled={disabled}
            small
            paid
            label={t("done")}
            onClick={handleNone}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
