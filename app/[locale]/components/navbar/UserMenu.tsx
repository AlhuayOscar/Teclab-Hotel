"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/[locale]/hooks/useLoginModal";
import useRegisterModal from "@/app/[locale]/hooks/useRegisterModal";
import useRentModal from "@/app/[locale]/hooks/useRentModal";
import { SafeUser } from "@/app/[locale]/types";
import { useTranslation } from "react-i18next";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-lg
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          {t("roomOwner")}
        </div>
        <div
          id="userMenu"
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-lg
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block max-h-[30px] max-w-[30px]">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {currentUser && (
                  <MenuItem
                    id="myProfile"
                    label={t("myProfile")}
                    onClick={() => router.push("/profiles")}
                  />
                )}
                <MenuItem
                  id="myTrips"
                  label={t("myTrips")}
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  id="myFavorites"
                  label={t("myFavorites")}
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  id="myReservations"
                  label={t("myReservations")}
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  id="myProperties"
                  label={t("myProperties")}
                  onClick={() => router.push("/properties")}
                />
                <MenuItem
                  id="roomOwner"
                  label={t("roomOwner")}
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem
                  id="logOut"
                  label={t("logout")}
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  id="logIn"
                  label={t("login")}
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  id="signUp"
                  label={t("signup")}
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
