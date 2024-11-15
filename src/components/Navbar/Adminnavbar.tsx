"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@/../public/menu.svg";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Adminnavbar = () => {
  const current_path2 = usePathname();
  console.log(current_path2);
  const links = [
    // { label: "Home", href: "/admin" },
    { label: "إدارة المدونة", href: "/admin/blog" },
    { label: "إدارة المحتوى", href: "/admin/upload_content" },
    { label: "إدارة الحدث", href: "/admin/event" },
    { label: "تسجيل الخروج", href: "/api/auth/signout" },
  ];

  const text = "/admin/blog";
  console.log(text.split("/")[2]);

  return (
    <nav className="lg:container lg:w-full lg:mx-auto mx-[20px]  rounded-full mt-5 shadow-xl border-t border-t-gray-200 flex items-center justify-end pr-5 sm:pr-0">
      <ul className="sm:flex w-full items-center justify-between py-3 hidden px-4">
        {links.map((link, index) => (
          <li
            key={index}
            className={` active:font-bold ${
              current_path2.includes(link.href.split("/")[2]) &&
              "border-b-black border-b-[2px] transition-all ease-in-out duration-300  text-back font-medium"
            } ${
              current_path2 === link.href &&
              " border-b-black border-b-[2px] transition-all ease-in-out duration-300  text-black font-medium"
            }`}
          >
            <Link
              href={link.href}
              className={`${
                link.href.includes("/signout")
                  ? "bg-black text-white rounded-full px-4 py-2 -mt-3"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Sheet>
        <SheetTrigger asChild>
          <div className="py-3">
            <Image src={Menu} alt="Menu" className="h-7 w-7 sm:hidden" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <ul className="flex flex-col w-full items-start justify-between py-3 h-[400px] pt-16">
            {links.map((link, index) => (
              <li
                key={index}
                className={` active:font-bold ${
                  current_path2.includes(link.href.split("/")[2]) &&
                  "border-b-black border-b-[2px] transition-all ease-in-out duration-300  text-back font-medium"
                } ${
                  current_path2 === link.href &&
                  " border-b-black border-b-[2px] transition-all ease-in-out duration-300  text-black font-medium"
                }`}
              >
                <SheetClose asChild>
                  <Link href={link.href}>{link.label}</Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Adminnavbar;
