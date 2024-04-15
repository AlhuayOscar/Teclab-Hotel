import { SafeListing, SafeUser } from "@/app/[locale]/types";

import Heading from "@/app/[locale]/components/Heading";
import Container from "@/app/[locale]/components/Container";
import ListingCard from "@/app/[locale]/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <div className=" pt-24 md:pt-40 flex flex-wrap gap-4">
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
