"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const current_path = usePathname();
  console.log(current_path);
  const links = [
    { label: "Home", href: "/" },
    { label: "Video Library", href: "/user/video_library" },
    { label: "Blog", href: "/user/blog" },
    { label: "Events", href: "/user/events" },
    // { label: "Dashboard", href: "/events" },
  ];
  return (
    <nav className="lg:container lg:w-full lg:mx-auto mx-[20px] ring-1 ring-black rounded-full mt-5">
      <ul className="flex w-full items-center justify-around py-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
