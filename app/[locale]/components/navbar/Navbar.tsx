"use client";
import { SafeUser } from "@/app/[locale]/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Lang from "@/app/[locale]/components/LanguageChanger";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <Search />
            <div>
              <Lang />
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <span>
        <Categories />
      </span>
    </div>
  );
}


export default Navbar;