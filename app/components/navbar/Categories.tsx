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
    description:
      "This property is so close to the beach, you might just get sand in your bed!",
  },
  {
    label: "Modern Apartment",
    icon: MdOutlineVilla,
    description: "This property is as modern as a robot butler!",
  },
  {
    label: "Mountain House",
    icon: TbMountain,
    description:
      "This property is nestled in the countryside like a cozy bear den!",
  },

  {
    label: "Lake House",
    icon: GiBoatFishing,
    description:
      "This property is so close to the lake, you'll be casting shadows on the fish!",
  },
  {
    label: "Camping Huts",
    icon: GiForestCamp,
    description:
      "This property offers camping activities that'll make you a happy camper!",
  },
  {
    label: "Cold Areas",
    icon: MdSnowmobile,
    description:
      "This property is so chilly, you'll need a penguin as a roommate!",
  },
  {
    label: "Warm Areas",
    icon: MdOutlineWbSunny,
    description:
      "This property is as sunny as a desert vacation without the sand in your shoes!",
  },
  {
    label: "Quiet Area",
    icon: GiField,
    description:
      "This property is nestled in a barn, so peaceful even the mice whisper!",
  },
  {
    label: "Big Apartments",
    icon: FaTreeCity,
    description:
      "This property is as spacious and luxurious as a castle fit for a king!",
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
