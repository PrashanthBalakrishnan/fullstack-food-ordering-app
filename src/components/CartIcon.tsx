"use client";
import { useCartStore } from "@/utils/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <Link
      href="/cart"
      className="flex items-center gap-4 whitespace-nowrap mr-5 "
    >
      <span className="flex">
        <p className="sr-only">Cart</p>
        <ShoppingCart />({totalItems})
      </span>
    </Link>
  );
};
export default CartIcon;
