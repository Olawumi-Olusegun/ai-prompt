import Link from "next/link";
import React from "react";
import BrandLogo from "./BrandLogo";
import { styles } from "@/utils/styles";

const Footer = () => {
  return (
    <footer className="mt-auto pt-8">
      <div className="w-full mb-5 flex flex-col gap-3 md:flex-row justify-between items-center">
        <div className="">
          <BrandLogo />
        </div>
        <div className="">
          <ul className="flex items-center flex-wrap">
            <li>
              <Link
                href={"/"}
                className={`${styles.label} hover:text-[#64ff4b] duration-300 transition px-4 `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={`${styles.label} hover:text-[#64ff4b] duration-300 transition px-4 `}
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={`${styles.label} hover:text-[#64ff4b] duration-300 transition px-4 `}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.paragraph} text-sm text-center block`}>
        Copyright &copy; {new Date().getFullYear()}{" "}
        <Link href={"/"} className="group">
          AI <span className="group-hover:text-[#64ff4c]">Marketplace</span>
        </Link>{" "}
        . All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
