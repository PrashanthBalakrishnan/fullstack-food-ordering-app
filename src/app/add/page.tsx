"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type OptionType = {
  title: string;
  additionalPrice: number;
};

type inputType = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<inputType>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<OptionType>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<OptionType[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "getFood");
    const res = await fetch("http://api.cloudinary.com/v1_1/dk719tvz0/image", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });

    const resData = await res.json();

    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({ img: url, ...inputs, options }),
      });

      const data = await res.json();
      //   router.push(`/product/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="shadow-lg flex flex-wrap gap-4 p-8"
        onSubmit={handleSubmit}
      >
        <h2>Add new Product</h2>
        <div className="w-full flex flex-col gap-2">
          <label>Image</label>
          <input
            onChange={handleChangeImg}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="file"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Title</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="title"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label>Desc</label>
          <textarea
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm resize-none"
            name="desc"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Price</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="number"
            name="price"
          />
        </div>
        <div className="w-full flex flex-colgap-2">
          <label>Category</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="catSlug"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Options</label>
          <div>
            <input
              onChange={changeOption}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="text"
              placeholder="Title"
              name="title"
            />
            <input
              onChange={changeOption}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
            />
          </div>
          <button
            type="button"
            className="w-52 bg-red-500 text-white p-2"
            onClick={() => setOptions((prev) => [...prev, option])}
          >
            Add Option
          </button>
        </div>
        <div>
          {options.map((item) => (
            <button
              key={item.title}
              className="ring-1 ring-red-500 p-2 rounded-md cursor-pointer flex gap-2"
              onClick={() =>
                setOptions(options.filter((i) => i.title !== item.title))
              }
            >
              <span>{item.title}</span>
              <span>${item.additionalPrice}</span>
            </button>
          ))}
        </div>
        <button className="p-2 w-full bg-red-500 text-white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddPage;
