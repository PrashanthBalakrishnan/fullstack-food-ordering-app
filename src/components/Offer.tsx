import Image from "next/image";

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* Text Container */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-6 p-6">
        <h2 className="text-white text-5xl font-bold xl:text-6xl">
          Delicious Burger and French Fry
        </h2>
        <p className="text-yellow-500 xl:text-xl">
          Get your favorite burger and fries at a discounted price. Offer valid
          for a limited time.
        </p>
        <button className="bg-red-500 text-white rounded-md py-3 px-6">
          Order Now
        </button>
      </div>
      {/* Image Container */}
      <div className="flex-1 relative w-full md:h-[full]">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};
export default Offer;
