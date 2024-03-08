"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <div>
      {!open ? (
        <button onClick={() => setOpen(true)}>
          <Image src="/open.png" alt="menu button" width={20} height={20} />
        </button>
      ) : (
        <button onClick={() => setOpen(false)}>
          <Image src="/close.png" alt="menu button" width={20} height={20} />
        </button>
      )}
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] w-full flex flex-col justify-center items-center gap-8 text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {status === "authenticated" ? (
            <div className="flex items-center flex-col gap-y-8 justify-center">
              <Link href="/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
              <button
                className="cursor-pointer uppercase"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};
export default Menu;
