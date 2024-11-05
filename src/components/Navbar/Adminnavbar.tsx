"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Adminnavbar = () => {
  const current_path2 = usePathname();
  console.log(current_path2);
  const links = [
    { label: "Home", href: "/admin" },
    { label: "Manage Content", href: "/admin/upload_content" },
    { label: "Manage Blog", href: "/admin/blog" },
    { label: "Manage Events", href: "/admin/events" },
  ];

  let text = "/admin/blog";
  console.log(text.split("/")[2]);

  return (
    <nav className="lg:container lg:w-full lg:mx-auto mx-[20px]  rounded-full mt-5 shadow-xl ">
      <ul className="flex w-full items-center justify-around py-3">
        {links.map((link, index) => (
          <li
            key={index}
            className={` border-b-[3px]${
              current_path2.includes(link.href.split("/")[2]) &&
              "border-b-black border-b-[3px] transition-all ease-in-out duration-300 animate-pulse"
            } ${
              current_path2 === link.href &&
              " border-b-black border-b-[3px] transition-all ease-in-out duration-300 animate-pulse"
            }`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Adminnavbar;
