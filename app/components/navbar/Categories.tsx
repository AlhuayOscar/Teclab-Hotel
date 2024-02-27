"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain } from "react-icons/tb";
import { GiBoatFishing, GiField, GiForestCamp } from "react-icons/gi";
import { MdOutlineVilla, MdSnowmobile, MdOutlineWbSunny } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Beach House",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Modern Apartment",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Mountain house",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },

  {
    label: "Lake House",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Camping Huts",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Cold Areas",
    icon: MdSnowmobile,
    description: "This property is in arctic environment!",
  },
  {
    label: "Warm Areas",
    icon: MdOutlineWbSunny,
    description: "This property is in the desert!",
  },
  {
    label: "Quiet Area",
    icon: GiField,
    description: "This property is in a barn!",
  },
  {
    label: "Big Apartments",
    icon: FaTreeCity,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
