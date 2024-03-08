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
  console.log(singleProduct);
  return (
    <div className="p-4 lg:px-10 xl:p-20 h-[60vh] flex flex-col justify-around text-red-500 md:flex-row md:gap-8 relative md:mt-8">
      {/* Image Container */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[100%]">
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
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
};
export default SingleProduct;
