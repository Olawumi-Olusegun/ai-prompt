import React, { MouseEvent, useState } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import BrandLogo from "./BrandLogo";
import { User } from "@clerk/nextjs/server";
import UserProfileMenu from "../UserProfileMenu";
import { UserProfile } from "@clerk/nextjs";

type Props = {
  activeItem: number;
  user: User | null;
  isSellerExist: boolean;
};

function Header({ activeItem, user, isSellerExist }: Props) {
  const [active, setActive] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);

  const [open, setOpen] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === "screen") {
      setOpen(false);
    }
  };

  const handleProfile = () => {
    setActiveProfile((prevActiveProfile) => !prevActiveProfile);
  };

  return (
    <header
      className={`w-full p-5 border-b min-h-[60px] border-b-[#ffffff32] transition-opacity ${
        active ? "fixed top-0 left-0 bg-[#000] z-[99999]" : ""
      }`}
    >
      <nav className="hidden md:w-[90%] mx-auto md:flex items-center justify-between">
        <BrandLogo />
        <div className="flex items-center">
          <Navigation activeItem={activeItem} />
        </div>
        <div className="flex items-center gap-x-5 ml-10">
          <button className=" hover:bg-white/20 duration-300 p-1.5 rounded-full flex items-center justify-center">
            <AiOutlineSearch size={18} />
          </button>
          {user ? (
            <div className="">
              <UserProfileMenu
                user={user}
                setOpen={setOpen}
                handleProfile={handleProfile}
                isSellerExist={isSellerExist}
              />
            </div>
          ) : (
            <Link href={"/sign-in"} className="">
              <CgProfile className="text-[25px] cursor-pointer" />
            </Link>
          )}
        </div>
      </nav>
      <div className="w-full md:hidden flex items-center justify-between">
        <BrandLogo />
        <button
          onClick={() => setOpen((prev) => !prev)}
          className=" hover:bg-white/10 duration-300 p-1.5 rounded-md flex items-center justify-center"
        >
          {open ? <MdOutlineClose size={18} /> : <GiHamburgerMenu size={18} />}
        </button>
        {activeProfile && (
          <div className="w-full fixed h-screen overflow-hidden flex justify-center items-center top-0 left-0 bg-[#00000068] z-[999]">
            <div className="w-min relative h-[90vh] overflow-y-scroll bg-white rounded-xl shadow">
              <UserProfile />
              <RxCross1
                className="absolute text-black text-2xl top-10 right-10 cursor-pointer"
                onClick={handleProfile}
              />
            </div>
          </div>
        )}

        {open && (
          <div
            className="fixed md:hidden w-full h-screen top-0 left-0 z-[999999] bg-[unset]"
            onClick={handleClose}
            id="screen"
          >
            <div className="fixed bg-black h-screen top-0 right-0 w-[60%] z-[99999999999999999999]">
              <div className="flex items-center justify-between p-5 border-b min-h-[65px] border-b-[#ffffff32] transition-opacity">
                <div className="opacity-0 invisible">
                  <BrandLogo />
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto hover:bg-white/10 duration-300 p-1.5 rounded-md flex items-center justify-center"
                >
                  <MdOutlineClose size={18} />
                </button>
              </div>

              <div className="py-5 ">
                <Navigation
                  activeItem={activeItem}
                  className="hover:bg-white/5 duration-300"
                />
                {user && (
                  <div className="w-full ml-5">
                    <UserProfileMenu
                      user={user}
                      setOpen={setOpen}
                      handleProfile={handleProfile}
                      isSellerExist={isSellerExist}
                      dropdownPlacement="right"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
