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
    { label: "Manage Event", href: "/admin/event" },
  ];

  let text = "/admin/blog";
  console.log(text.split("/")[2]);

  return (
    <nav className="lg:container lg:w-full lg:mx-auto mx-[20px]  rounded-full mt-5 shadow-xl border-t border-t-gray-200">
      <ul className="flex w-full items-center justify-around py-3">
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
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Adminnavbar;
