import Price from "@/components/Price";
import { singleProduct } from "@/data";
import Image from "next/image";

const SingleProduct = () => {
  return (
    <div className="p-4 lg:px-20 xl:p-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* Image Container */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      )}
      {/* Text Container */}
      <div className="h-1/2 flex flex-col gap-4 md:justify-center md:gap-6 xl:gap-8">
        <h2 className="text-3xl font-bold uppercase xl:text-5xl">
          {singleProduct.title}
        </h2>
        <p>{singleProduct.desc}</p>
        <Price
          price={singleProduct.price}
          id={singleProduct.id}
          options={singleProduct.options}
        />
      </div>
    </div>
  );
};
export default SingleProduct;
