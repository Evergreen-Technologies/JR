"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const BlogNavbar = () => {
  const links = [
    { label: "New Post", href: "admin/blog/new_post" },
    { label: "Blog Posts", href: "admin/blog/posts" },
  ];
  const current_path3 = usePathname();

  return (
    <nav className="w-[80%] h-[50vh]  ring-1 ring-black rounded-[30px] flex items- justify-center">
      <ul className="flex flex-col justify-center gap-y-10">
        {links.map((link, index) => (
          <li
            className={`${
              current_path3 === link.href && "border-b-black border-b-[3px]"
            }`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogNavbar;
