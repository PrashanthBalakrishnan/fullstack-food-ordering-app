import Link from "next/link";

const Footer = () => {
  return (
    <div className="static bottom-0 left-0 w-full bg-white h-12 md:h-24 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl uppercase">
        Italizze
      </Link>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} ITALIZZE. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
