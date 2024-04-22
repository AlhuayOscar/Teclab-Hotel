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
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel ZZZ",
  description: "Teclab Hotel Finder",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <Toaster />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
