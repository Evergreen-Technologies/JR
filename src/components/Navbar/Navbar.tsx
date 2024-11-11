"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../app/globals.css";

const Navbar = () => {
  const current_path1 = usePathname();
  console.log(current_path1);
  const links = [
    { label: "Home", href: "/" },
    { label: "Content", href: "/user/video_library" },
    { label: "Blog", href: "/user/blog" },
    { label: "Events", href: "/user/event" },
    { label: "About", href: "/user/about" },
    { label: "Contact", href: "/user/contact" },
    // { label: "Dashboard", href: "/events" },
  ];
  return (
    <nav className="lg:container lg:w-full lg:mx-auto mx-[20px] rounded-full  shadow-xl border-t border-t-gray-200">
      <ul className="flex w-full items-center justify-around py-3">
        {links.map((link, index) => (
          <li
            key={index}
            className={`${
              current_path1 === link.href &&
              " border-b-red-700 border-b-[3px] text-red-700"
            }`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
