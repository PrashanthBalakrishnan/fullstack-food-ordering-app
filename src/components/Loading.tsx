import Image from "next/image";

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex justify-center items-center animate-spin mt-8">
      <Image src="/temporary/p1.png" alt="loading" height={200} width={200} />
    </div>
  );
};
export default Loading;
