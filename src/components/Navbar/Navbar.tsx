"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const current_path1 = usePathname();
  console.log(current_path1);
  const links = [
    { label: "Home", href: "/" },
    { label: "Video Library", href: "/user/video_library" },
    { label: "Blog", href: "/user/blog" },
    { label: "Events", href: "/user/events" },
    { label: "About", href: "/user/about" },
    { label: "Contact", href: "/user/contact" },
    // { label: "Dashboard", href: "/events" },
  ];
  return (
    <nav className="lg:container lg:w-full lg:mx-auto mx-[20px] ring-1 ring-black rounded-full mt-5">
      <ul className="flex w-full items-center justify-around py-3">
        {links.map((link, index) => (
          <li
            key={index}
            className={`${
              current_path1 === link.href && " border-b-black border-b-[3px]"
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
