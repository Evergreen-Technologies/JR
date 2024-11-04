"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Adminnavbar from "@/components/Navbar/Adminnavbar";

import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const curent_path = usePathname();

  // Debugging log to check the current path
  console.log("Current Path:", curent_path);

  // Ensure consistent rendering logic
  const isAdminPath = curent_path.includes("admin");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isAdminPath ? <Adminnavbar /> : <Navbar />}

        {children}
      </body>
    </html>
  );
}
