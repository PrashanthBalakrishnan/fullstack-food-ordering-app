"use client";

import Loading from "@/components/Loading";
import { stat } from "fs";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* BOX */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] w-full lg:w-[60%] xl:w-1/2">
        {/* ImageContainer */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>
        {/* FormContainer */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h2 className="font-bold text-xl xl:text-3xl">Welcome</h2>
          <p>Log into your account or create a new one suing social buttons</p>
          <button
            className="flex gap-4 py-4 ring-1 ring-orange-100 rounded-md"
            onClick={() => signIn("github")}
          >
            <Image
              src="/github.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Continue with Github</span>
          </button>

          <p className="text-sm">
            Have a problem?{" "}
            <Link href="/" className="underline">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
