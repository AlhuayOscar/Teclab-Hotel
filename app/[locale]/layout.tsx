import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import SearchModal from "./components/modals/SearchModal";
import ClientOnly from "./components/ClientOnly";
import RentModal from "./components/modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import { Toaster } from "react-hot-toast";
import initTranslations from "./i18n";
import TranslationsProvider from "./components/TranslationsProvider";

const i18nNamespaces = ["rentModal", "Categories"];
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel ZZZ",
  description: "Teclab Hotel Finder",
};
interface Props {
  children: React.ReactNode;
  params: { locale: any };
}
export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const currentUser = await getCurrentUser();
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <ClientOnly>
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
            <Toaster />
          </ClientOnly>
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
