
import getCurrentUser from "@/app/[lang]/actions/getCurrentUser";
import getListingById from "@/app/[lang]/actions/getListingById";
import getReservations from "@/app/[lang]/actions/getReservations";

import ClientOnly from "@/app/[lang]/components/ClientOnly";
import EmptyState from "@/app/[lang]/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
