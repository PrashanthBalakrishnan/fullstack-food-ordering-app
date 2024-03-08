import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import Image from "next/image";

const getData = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

const SingleProduct = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getData(params.id);
  return (
    <div className="p-4 lg:px-10 xl:p-20 flex flex-col justify-around text-red-500 md:flex-row md:gap-8 relative md:mt-8 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
      {/* Image Container */}
      {singleProduct.img && (
        <div className="relative md:w-[50%] h-3/4 ">
          <Image
            src={singleProduct.img}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      )}
      {/* Text Container */}
      <div className="h-1/2 flex flex-col gap-4 md:justify-center md:gap-6 xl:gap-8 md:w-[50%]">
        <h2 className="text-3xl font-bold uppercase xl:text-5xl">
          {singleProduct.title}
        </h2>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
};
export default SingleProduct;
