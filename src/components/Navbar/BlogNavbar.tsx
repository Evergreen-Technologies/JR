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
    <nav className="sm:w-[20%] w-full  sm:rounded-[30px] rounded-[12px] flex items-center justify-start sm:shadow-2xl sm:border-t sm:border-t-gray-200">
      <ul className="flex sm:flex-col sm:justify-start justify-center sm:pt-12 -mt-2 items-center sm:gap-y-10 gap-x-7 w-full  sm:h-[40vh] h-[50px] sm:rounded-[20px] rounded-[12px]">
        {links.map((link, index) => (
          <li
            key={index}
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
