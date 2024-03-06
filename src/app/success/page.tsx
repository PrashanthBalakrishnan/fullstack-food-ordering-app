"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
          method: "POST",
        });
        router.push("/orders");
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [payment_intent, router]);

  return (
    <div>
      Paymnet successful. You are being redirected to the orders page. Please do
      not close the page.
    </div>
  );
};
export default SuccessPage;
