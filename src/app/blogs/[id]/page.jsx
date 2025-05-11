"use client";
import React, { useEffect, useState } from "react";
import { assets } from "../../../../Assests/assets"; // Ensure correct path
import Image from "next/image";
import Footer from "../../../../Components/Footer";
import Link from "next/link";
import axios from "axios";
import { use } from "react";

const Page = ({ params }) => {
  const { id } = use(params);
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: { id },
      });
      setData(response.data.blog); // Access blog object from response
    } catch (error) {
      console.error("Error fetching blog:", error.response?.status, error.response?.data);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={'/'}>
          
          <Image
            src={assets.logo}
            width={180}
            height={60}
            alt="Company logo"
            className="w-[130px] sm:w-auto"
          />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image
              src={assets.arrow}
              width={20}
              height={20}
              alt="Arrow icon"
            />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.authorImg || assets.default_author} // Fallback image
            width={60}
            height={60}
            alt={`Profile picture of ${data.author}`}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image || assets.default_image} // Fallback image
          width={1280}
          height={720}
          alt={data.title}
          className="border-4 border-white"
        />
        <div
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank">
              <Image
                src={assets.facebook_icon}
                width={50}
                height={50}
                alt="Facebook icon"
              />
            </Link>
            <Link href="https://plus.google.com" target="_blank">
              <Image
                src={assets.googleplus_icon}
                width={50}
                height={50}
                alt="Google Plus icon"
              />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Image
                src={assets.twitter_icon}
                width={50}
                height={50}
                alt="Twitter icon"
              />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div>Loading...</div> // Improved loading state
  );
};

export default Page;