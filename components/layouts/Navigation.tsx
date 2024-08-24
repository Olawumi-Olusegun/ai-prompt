import { cn } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface NavigationProps {
  activeItem: number;
  className?: string;
}

const navItems = [
  {
    id: 0,
    title: "Home",
    href: "/",
  },
  {
    id: 1,
    title: "About Us",
    href: "/about",
  },
  {
    id: 2,
    title: "Market",
    href: "/marketplace",
  },
  {
    id: 3,
    title: "Contact",
    href: "/contact",
  },
  {
    id: 4,
    title: "Policy",
    href: "/policy",
  },
];

function Navigation({ activeItem, className }: NavigationProps) {
  return (
    <div className="block md:flex">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            `block md:inline-block px-5 my-1 md:px-4 xl:px-6 py-3 md:py-0 text-[18px] font-[500] font-Inter ${
              activeItem === item.id ? "text-[#6dff4b]" : ""
            } ${className} `
          )}
        >
          <h5>{item.title}</h5>
        </Link>
      ))}
    </div>
  );
}

export default Navigation;
