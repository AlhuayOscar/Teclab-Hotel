"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/[locale]/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/[locale]/types";

import Container from "@/app/[locale]/components/Container";
import ListingHead from "@/app/[locale]/components/listings/ListingHead";
import ListingInfo from "@/app/[locale]/components/listings/ListingInfo";
import ListingReservation from "@/app/[locale]/components/listings/ListingReservation";
import { TbBeach, TbMountain } from "react-icons/tb";
import { GiBoatFishing, GiField, GiForestCamp } from "react-icons/gi";
import { MdOutlineVilla, MdSnowmobile, MdOutlineWbSunny } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";

import { useTranslation } from "react-i18next";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
interface Category {
  label: string;
  icon: any; // Tipo de icono, puedes ajustarlo según tu implementación
  description: string;
}
interface Categories {
  [key: string]: Category;
}
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { t } = useTranslation();
  const categories: Categories = {
    "Beach House": {
      label: t("Beach"),
      icon: TbBeach,
      description: t("descBeach"),
    },
    "Modern Apartment": {
      label: t("Modern"),
      icon: MdOutlineVilla,
      description: t("descModern"),
    },
    "Mountain House": {
      label: t("Mountain"),
      icon: TbMountain,
      description: t("descMountain"),
    },
    "Lake House": {
      label: t("Lake"),
      icon: GiBoatFishing,
      description: t("descLake"),
    },
    "Camping Huts": {
      label: t("Camping"),
      icon: GiForestCamp,
      description: t("descCamping"),
    },
    "Cold Areas": {
      label: t("Cold"),
      icon: MdSnowmobile,
      description: t("descCold"),
    },
    "Warm Areas": {
      label: t("Warm"),
      icon: MdOutlineWbSunny,
      description: t("descWarm"),
    },
    "Quiet Area": {
      label: t("Quiet"),
      icon: GiField,
      description: t("descQuiet"),
    },
    "Big Apartments": {
      label: t("Spacious"),
      icon: FaTreeCity,
      description: t("descSpacious"),
    },
  };

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category: Category = useMemo(() => {
    return categories?.[listing.category];
  }, [listing.category, categories]);

  console.log(categories, listing.category, listing);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
