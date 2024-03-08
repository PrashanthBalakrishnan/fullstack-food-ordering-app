import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between">
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
