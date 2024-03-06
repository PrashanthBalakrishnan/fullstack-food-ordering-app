"use client";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image
          src="/cart.png"
          alt="cart"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};
export default CartIcon;
