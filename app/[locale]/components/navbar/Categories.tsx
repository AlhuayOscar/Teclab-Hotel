"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain } from "react-icons/tb";
import { GiBoatFishing, GiField, GiForestCamp } from "react-icons/gi";
import { MdOutlineVilla, MdSnowmobile, MdOutlineWbSunny } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const { t } = useTranslation();

  const categories = [
    {
      label: t("Beach"),
      icon: TbBeach,
      description: t("descBeach"),
    },
    {
      label: t("Modern"),
      icon: MdOutlineVilla,
      description: t("descModern"),
    },
    {
      label: t("Mountain"),
      icon: TbMountain,
      description: t("descMountain"),
    },
    {
      label: t("Lake"),
      icon: GiBoatFishing,
      description: t("descLake"),
    },
    {
      label: t("Camping"),
      icon: GiForestCamp,
      description: t("descCamping"),
    },
    {
      label: t("Cold"),
      icon: MdSnowmobile,
      description: t("descCold"),
    },
    {
      label: t("Warm"),
      icon: MdOutlineWbSunny,
      description: t("descWarm"),
    },
    {
      label: t("Quiet"),
      icon: GiField,
      description: t("descQuiet"),
    },
    {
      label: t("Spacious"),
      icon: FaTreeCity,
      description: t("descSpacious"),
    },
  ];
  const pathname = usePathname() || "";
  const isMainPage = /^\/(es|en)?$/.test(pathname);
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
