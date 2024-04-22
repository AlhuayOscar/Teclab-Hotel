import { SafeListing, SafeUser } from "@/app/[lang]/types";

import Heading from "@/app/[lang]/components/Heading";
import Container from "@/app/[lang]/components/Container";
import ListingCard from "@/app/[lang]/components/listings/ListingCard";

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
