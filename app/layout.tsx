import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import ClientOnly from './components/ClientOnly';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel ZZZ",
  description: "Teclab Hotel Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
