"use client";

import React, { use, useState } from "react";
import BlogTableItem from "../../../../Components/AdminComponents/BlogTableItem";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blogs");
    setBlogs(response.data.blogs); // Replace with your API endpoint
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete("/api/blog", {
      params: { id: mongoId },
    })
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All blogs</h1>
      <div className="relative overflow-x-auto h-[80vh] max-w-[850px] mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500 ">
          <thead className="text-sm text text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className=" px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className=" px-6 py-3">
                Date
              </th>
              <th scope="col" className=" px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <itemsTableItem
                  key={index}
                  mongoId={item._id}
                  authorImg={item.authorImg}
                  title={item.title}
                  author={item.author}
                  date={item.date}
                  deleteBlog={deleteBlog} // Assuming you have an action property
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
