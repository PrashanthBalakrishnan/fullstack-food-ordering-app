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
  return <div>Paymeent is successful please do not close the page.</div>;
}

const SuccessPage = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};
export default SuccessPage;
