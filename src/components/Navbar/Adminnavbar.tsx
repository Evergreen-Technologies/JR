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
  return (
    <nav className="lg:container lg:w-full lg:mx-auto mx-[20px] ring-1 ring-black rounded-full mt-5">
      <ul className="flex w-full items-center justify-around py-3">
        {links.map((link, index) => (
          <li
            key={index}
            className={`${
              current_path2 === link.href && " border-b-black border-b-[3px]"
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
