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
    <nav className="w-[20%]  rounded-[30px] flex items-center justify-start">
      <ul className="flex flex-col justify-center items-center gap-y-10 w-full ring-1 ring-black h-[40vh] rounded-[20px]">
        {links.map((link, index) => (
          <li
            className={`${
              current_path3 === link.href && "border-b-black border-b-[3px]"
            }`}
          >
            <Link href={link.href} className="w-full text-start">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogNavbar;
