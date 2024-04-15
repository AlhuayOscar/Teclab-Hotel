import EmptyState from "@/app/[locale]/components/EmptyState";
import ClientOnly from "@/app/[locale]/components/ClientOnly";

import getCurrentUser from "@/app/[locale]/actions/getCurrentUser";
import getListings from "@/app/[locale]/actions/getListings";

import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  const listings = await getListings({ userId: currentUser?.id });

  if (listings.length === 0 && !currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="No profile data found"
          subtitle="Looks like you are not logged in."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ProfileClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ProfilePage;
