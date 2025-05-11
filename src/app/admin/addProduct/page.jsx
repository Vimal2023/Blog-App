"use client";

import Image from "next/image";
import React, { useState } from "react";
import { assets } from "../../../../Assests/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Vimal Anand",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      toast.error("Please fill all required fields (title, description, category)");
      return;
    }
    if (!image) {
      toast.error("Please upload a valid image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      // Debug FormData
      console.log("FormData:", [...formData.entries()]);

      const response = await axios.post("/api/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Vimal Anand",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error(response.data.msg || "Error while uploading blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        error: error,
      });
      toast.error(error.response?.data?.msg || "Server error, please try again");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <p className="text-xl">Upload thumbnail</p>
      <label htmlFor="image">
        <Image
          className="mt-4"
          src={image ? URL.createObjectURL(image) : assets.upload_area}
          width={140}
          height={70}
          alt="Upload thumbnail"
        />
      </label>
      <input
        onChange={(e) => setImage(e.target.files[0] || null)}
        type="file"
        hidden
        id="image"
        accept="image/*"
        required
      />
      <p className="text-xl mt-4">Blog Title</p>
      <input
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Type here"
        required
        name="title"
        onChange={onChangeHandler}
        value={data.title}
      />
      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Write content here"
        rows={6}
        required
        name="description"
        onChange={onChangeHandler}
        value={data.description}
      />
      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        onChange={onChangeHandler}
        value={data.category}
        className="w-40 mt-4 px-4 py-3 border text-gray-500"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <br />
      <button type="submit" className="mt-8 w-40 h-12 bg-black text-white cursor-pointer">
        ADD
      </button>
    </form>
  );
};

export default Page;