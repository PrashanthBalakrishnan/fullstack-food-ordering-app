"use client";
import { useCartStore } from "@/utils/store";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();

        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* Products Container */}
      <div className="h-3/4 md::h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3  2xl:w-1/2 lg:px-20 xl:px-40">
        {/* Single Item Container */}

        {products.map((item) => (
          <div className="flex items-center justify-between mb-2" key={item.id}>
            {item.img && <Image src={item.img} alt="" width={60} height={60} />}
            <div className="flex flex-col justify-start w-full  ml-2">
              <h2 className="uppercase text-xl font-bold">
                {item.title} x {item.quantity}
              </h2>
              <span>{item.optionTitle}</span>
            </div>
            <h3 className="font-bold ">${item.price.toFixed(2)}</h3>
            <button
              className="cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              <X size={24} />
            </button>
          </div>
        ))}
      </div>

      {/* Payment Container */}
      <div className="h-1/4 md:h-2/3 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};
export default CartPage;
