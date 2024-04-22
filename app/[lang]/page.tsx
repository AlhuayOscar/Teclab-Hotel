import Container from "@/app/[lang]/components/Container";
import ListingCard from "@/app/[lang]/components/listings/ListingCard";
import EmptyState from "@/app/[lang]/components/EmptyState";

import getListings, { IListingsParams } from "@/app/[lang]/actions/getListings";
import getCurrentUser from "@/app/[lang]/actions/getCurrentUser";
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
