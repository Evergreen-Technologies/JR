"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const BlogNavbar = () => {
  const links = [
    { label: "New Post", href: "/admin/blog" },
    { label: "Blog Posts", href: "/admin/blog/posts" },
  ];
  const current_path3 = usePathname();

  return (
    <nav className="w-[20%]  rounded-[30px] flex items-center justify-start shadow-2xl border-t border-t-gray-200">
      <ul className="flex flex-col justify-start pt-12 items-center gap-y-10 w-full  h-[40vh] rounded-[20px]">
        {links.map((link, index) => (
          <li
            className={`${
              current_path3 === link.href && "border-b-black border-b-[3px]"
            }`}
          >
            <Link
              href={link.href}
              className="w-full text-start active:font-bold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogNavbar;
