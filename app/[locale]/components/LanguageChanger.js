"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import es from "@/public/es.svg";
import us from "@/public/us.svg";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e, newLocale) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
    console.log(currentLocale);
    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }
  };

return (
  <div>
    <button
      onClick={(e) => handleChange(e, "en")}
      className={`w-10 ${currentLocale === "en" ? "hidden" : ""}`}
    >
      <Image src={us} alt={"US Flag"} className="w-10" />
    </button>
    <button
      onClick={(e) => handleChange(e, "es")}
      className={`w-10 ${currentLocale === "es" ? "hidden" : ""}`}
    >
      <Image src={es} alt={"ES Flag"} className="w-10" />
    </button>
  </div>
);

}
