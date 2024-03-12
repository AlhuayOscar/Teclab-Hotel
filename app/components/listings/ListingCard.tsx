import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import axios from "axios"; // Importa Axios

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  payLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  payLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const reservationData = {
    id: "65ea3826769617f46fc5163e",
    userId: "65ea32ab769617f46fc5163b",
    listingId: "65ea1f8de5e2713506f411c2",
    startDate: "2024-03-07T03:00:00.000Z",
    endDate: "2024-03-09T03:00:00.000Z",
    totalPrice: 44,
    createdAt: "2024-03-07T21:56:53.983Z",
    paid: true,
    paymentDate: "2024-03-09T03:00:00.000Z",
    bill: "https://imgv2-2-f.scribdassets.com/img/document/464564232/original/02fe79b69b/1709098739?v=1",
    listing: {
      id: "65ea1f8de5e2713506f411c2",
      title: "Best Austria Hotel 2023",
      description: "Your only option for luxury",
      imageSrc:
        "https://res.cloudinary.com/dipn8zmq3/image/upload/v1709842296/l9slnmrk25nuvattdfvi.jpg",
      createdAt: "2024-03-07T20:11:57.525Z",
      category: "Lake House",
      roomCount: 3,
      bathroomCount: 1,
      guestCount: 4,
      locationValue: "AT",
      userId: "65de518b7a05e77982cc73c4",
      price: 22,
    },
  };

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

  const handlePay = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      try {
        // const response = await axios.put(
        //   `/api/payment/${data.id}`,
        //   reservationData
        // );
        console.log(reservation);
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

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
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
            className="
              object-cover 
              min-h-36 
              min-w-36
              group-hover:scale-110 
              transition
              justify-center items-center self-center
            "
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
          ,{" "}
          {location?.label
            ? location?.label.length > 10
              ? location?.label.slice(0, 10) + "..."
              : location?.label
            : "Unknown"}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && payLabel && actionLabel && (
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
      </div>
    </div>
  );
};

export default ListingCard;
