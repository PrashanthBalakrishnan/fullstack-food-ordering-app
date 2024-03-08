import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center animate-spin mt-8">
      <Image src="/temporary/p1.png" alt="loading" height={100} width={100} />
    </div>
  );
};
export default Loading;
