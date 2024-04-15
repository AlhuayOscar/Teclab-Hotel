import Container from "@/app/[locale]/components/Container";
import ListingCard from "@/app/[locale]/components/listings/ListingCard";
import EmptyState from "@/app/[locale]/components/EmptyState";

import getListings, { IListingsParams } from "@/app/[locale]/actions/getListings";
import getCurrentUser from "@/app/[locale]/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-72 flex flex-wrap gap-4">
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
