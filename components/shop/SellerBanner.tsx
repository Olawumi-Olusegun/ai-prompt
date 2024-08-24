import Link from "next/link";
import { styles } from "@/utils/styles";
import { Button } from "@nextui-org/react";
import { MdArrowRightAlt } from "react-icons/md";

const SellerBanner = () => {
  return (
    <section className="w-full my-12 2xl:w-[80%] 2xl:mx-auto min-h-[30vh] flex items-center justify-center sellers-banner rounded-xl md:m-2 ">
      <div className="flex flex-col  items-center justify-center">
        <h1 className={`${styles.heading} !text-indigo-950 font-Montserrat`}>
          Start selling with us
        </h1>
        <br />

        <Link href={"/sign-up"}>
          <Button className="group mb-3 p-6 rounded-md text-xl bg-black text-white font-Inter flex items-center gap-1.5 ">
            <span>Get Started</span>
            <MdArrowRightAlt className="group-hover:translate-x-1 duration-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SellerBanner;
