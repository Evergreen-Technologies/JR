"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Adminnavbar from "@/components/Navbar/Adminnavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { usePathname } from "next/navigation";
import BlogNavbar from "@/components/Navbar/BlogNavbar";
import EventNavbar from "@/components/Navbar/EventNavbar";

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
  const isAdminPathEvent = curent_path.includes("admin/event");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mt-10`}
      >
        {isAdminPath && !isAdminPathBlog && !isAdminPathEvent ? (
          <>
            <Adminnavbar />
            {children}
          </>
        ) : isAdminPathBlog ? (
          <>
            <Adminnavbar />
            <div className="flex lg:container lg:mx-auto pt-10 items-start justify-between">
              <BlogNavbar />
              {children}
            </div>
          </>
        ) : isAdminPathEvent ? (
          <>
            <Adminnavbar />
            <div className="flex lg:container lg:mx-auto pt-10 items-start justify-between">
              <EventNavbar />
              {children}
            </div>
          </>
        ) : (
          <>
            <Navbar />
            {children}
          </>
        )}

        <ToastContainer position="top-center" theme="dark" />
      </body>
    </html>
  );
}
