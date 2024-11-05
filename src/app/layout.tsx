"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Adminnavbar from "@/components/Navbar/Adminnavbar";

import { usePathname } from "next/navigation";
import BlogNavbar from "@/components/Navbar/BlogNavbar";

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
  const isAdminPathBlog = curent_path.includes("admin/blog");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isAdminPath && !isAdminPathBlog ? (
          <>
            <Adminnavbar />
            {children}
          </>
        ) : isAdminPathBlog ? (
          <>
            <Adminnavbar />
            <div className="flex lg:container lg:mx-auto pt-20 justify-between">
              <BlogNavbar />
              {children}
            </div>
          </>
        ) : (
          <>
            <Navbar />
            {children}
          </>
        )}

        {/* {children} */}
      </body>
    </html>
  );
}
