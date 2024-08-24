import { styles } from "@/utils/styles";
import { useClerk } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { GrDocumentStore } from "react-icons/gr";
import { TbSwitchVertical } from "react-icons/tb";

interface DropdownProps {
  user: User | null;
  setOpen: (open: boolean) => void;
  handleProfile: () => void;
  isSellerExist: boolean;
  dropdownPlacement?: "top-end" | "left-start" | "left-end" | "left" | "right";
}

const UserProfileMenu = ({
  user,
  setOpen,
  handleProfile,
  isSellerExist,
  dropdownPlacement = "top-end",
}: DropdownProps) => {
  const router = useRouter();

  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dropdown placement={dropdownPlacement}>
      <DropdownTrigger>
        <Avatar
          src={user?.imageUrl}
          alt="user-profile"
          className="w-[40px] h-[40px] cursor-pointer "
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          onClick={() => {
            handleProfile();
            setOpen(false);
          }}
        >
          <div className="flex items-center w-full gap-2">
            <Avatar
              src={user?.imageUrl}
              alt="user-profile"
              className="w-[30px] h-[30px] cursor-pointer"
            />
            <span className={`${styles.label} text-black text-[16px]  `}>
              My Profile
            </span>
          </div>
        </DropdownItem>

        <DropdownItem className={`${!isSellerExist ? "hidden" : "block"}`}>
          <Link
            href={`/my-orders`}
            className="w-full flex items-center gap-1.5 text-black"
          >
            <GrDocumentStore />
            <span className={`${styles.label} text-black text-base`}>
              My Orders
            </span>
          </Link>
        </DropdownItem>

        <DropdownItem className={`${!isSellerExist ? "hidden" : "block"}`}>
          <Link
            href={`/my-shop`}
            className="w-full flex items-center gap-1.5 text-black"
          >
            <TbSwitchVertical />
            <span className={`${styles.label} text-black text-[16px]`}>
              Seller Account
            </span>
          </Link>
        </DropdownItem>

        <DropdownItem onClick={handleLogout} className="w-full">
          <div className="w-full flex items-center gap-1.5 text-black">
            <AiOutlineLogout />
            <span className={`${styles.label} text-black text-base`}>
              Logout
            </span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfileMenu;
