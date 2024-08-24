import Link from "next/link";

const BrandLogo = () => {
  return (
    <Link href={"/"} className="z-[999999]">
      <h1 className="font-Inter text-3xl">
        <span>AI</span>
        <strong className="text-[#64ff4c]">Marketplace</strong>
      </h1>
    </Link>
  );
};

export default BrandLogo;
