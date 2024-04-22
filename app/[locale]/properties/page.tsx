
import EmptyState from "@/app/[locale]/components/EmptyState";
import ClientOnly from "@/app/[locale]/components/ClientOnly";

import getCurrentUser from "@/app/[locale]/actions/getCurrentUser";
import getListings from "@/app/[locale]/actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Log in please"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no properties"
          subtitle="Please add some if you wish to"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default PropertiesPage;
