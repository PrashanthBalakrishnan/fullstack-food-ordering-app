"use client";
import { createURL } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();

  function Search() {
    const searchParams = useSearchParams();
    return searchParams.get("payment_intent");
  }
  const payment_intent = Search();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(createURL(`/api/confirm/${payment_intent}`), {
          method: "PUT",
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, router]);

  return (
    <Suspense>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
      </div>
    </Suspense>
  );
};

export default SuccessPage;
