"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex">
          <div className="flex gap-4">
            <Link className="whitespace-nowrap" href="/orders">
              Orders
            </Link>
            <Link className="whitespace-nowrap" href="/add">
              Add Item
            </Link>
          </div>
          <button
            className="ml-4 cursor-pointer uppercase"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};
export default UserLinks;
