import React from "react";
import { GoHome, GoArrowSwitch } from "react-icons/go";
import { BsWallet2 } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Link from "next/link";
import { styles } from "./../../utils/styles";

interface ShopSidebarProps {
  active: number;
}

const sidebarItems = [
  {
    id: 0,
    icon: <GoHome />,
    title: "Dashboard",
    href: "/my-shop",
  },
  {
    id: 1,
    icon: <MdOutlineCreateNewFolder />,
    title: "Upload Prompt",
    href: "/shop/create-prompt",
  },
  {
    id: 2,
    icon: <BsWallet2 />,
    title: "Prompts",
    href: "/shop/prompts",
  },
  {
    id: 3,
    icon: <TbMoneybag />,
    title: "Orders",
    href: "/shop/orders",
  },
  {
    id: 4,
    icon: <LiaFileInvoiceDollarSolid />,
    title: "Invoices",
    href: "/shop/invoices",
  },
  {
    id: 5,
    icon: <BiMoneyWithdraw />,
    title: "Withdraw Earnings",
    href: "/shop/withdraw",
  },
  {
    id: 6,
    icon: <GoArrowSwitch />,
    title: "Switch to user",
    href: "/",
  },
];

const ShopSidebar = ({ active }: ShopSidebarProps) => {
  return (
    <div className="w-full px-3">
      {sidebarItems.map((item) => (
        <div key={item.id} className="w-full my-3 p-3 rounded hover:bg-white/5">
          <Link href={item.href} className="w-full ">
            <div className="flex items-center gap-3">
              <div
                className={`text-3xl ${
                  active !== item.id ? "!text-white" : "!text-[#858dfb]"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`${styles.label} ${
                  active !== item.id ? "!text-white" : "!text-[#858dfb]"
                } hidden lg:block`}
              >
                {item.title}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShopSidebar;
