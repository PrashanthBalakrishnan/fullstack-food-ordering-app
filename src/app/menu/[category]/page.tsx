import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

type CategoryPageProps = {
  params: { category: string };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const products: Product[] = await getData(params.category);
  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col space-between group even:bg-fuchsia-50"
        >
          {/* Image Container */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* Text Container */}
          <div className="flex items-center justify-between font-bold ">
            <h2 className="text-2xl uppercase p-2">{item.title}</h2>
            <h3 className="group-hover:hidden text-xl">{item.price}</h3>
            <button className=" hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default CategoryPage;
