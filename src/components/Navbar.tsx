import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  const user = false;
  return (
    <nav className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40 ">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">MASSIMO</Link>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center flex-1 justify-end ">
        <div className="flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md md:absolute top-3 lg:static">
          <Image src="/phone.png" alt="phone icon" width={20} height={20} />
          <span>123 456 7892</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>
    </nav>
  );
};
export default Navbar;
