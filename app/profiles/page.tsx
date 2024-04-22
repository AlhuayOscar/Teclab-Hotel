import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

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
