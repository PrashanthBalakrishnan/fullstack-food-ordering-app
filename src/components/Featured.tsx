import { Product } from "@/types/types";
import Image from "next/image";

const Featured = async () => {
  const getProducts = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/products`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Something went wrong");

    return res.json();
  };

  const featuredProducts: Product[] = await getProducts();
  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* Warpper */}
      <div className="w-max flex">
        {/* Single Item */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* Image Container */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* Text Container */}
            <div className="flex-1 flex flex-col gap-4 items-center text-center justify-center">
              <h2 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h2>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="bg-red-500 text-white p-2 rounded-md">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Featured;
