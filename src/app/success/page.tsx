"use client";

import { useCartStore } from "@/utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { emptyCart } = useCartStore();

  useEffect(() => {
    const payment_intent = searchParams.get("payment_intent");
    console.log(payment_intent);
    const makeRequest = async () => {
      try {
        await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/confirm/${payment_intent}`,
          {
            method: "PUT",
          }
        );
        router.push("/orders");
      } catch (error) {
        console.log(error);
      }
    };
    emptyCart();
    makeRequest();
  }, [router, searchParams, emptyCart]);
  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-red-700">
      <p className="max-w-[600px]">
        Payment successful. You are being redirected to the orders page. Please
        do not close the page.
      </p>
    </div>
  );
}

const SuccessPage = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};
export default SuccessPage;
