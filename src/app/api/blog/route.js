import { NextResponse } from "next/server";
import connectDB from "../../../../lib/config/db"; // Ensure this path is correct
import { writeFile } from "fs/promises";
import BlogModel from "../../../../lib/models/BlogModel";
import { promises as fs } from "fs";
import path from "path";

// Ensure MongoDB connection
const LoadDB = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully via LoadDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB in LoadDB:", error);
  }
};

LoadDB();

// POST: Create a new blog
export async function POST(request) {
  try {
    // Ensure MongoDB connection
    tryರ
    try {
      await connectDB();
    } catch (error) {
      console.error("MongoDB connection error in POST:", error);
      return NextResponse.json(
        { success: false, msg: `Database connection error: ${error.message}` },
        { status: 500 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error("Error parsing formData:", error);
      return NextResponse.json(
        { success: false, msg: `Failed to parse form data: ${error.message}` },
        { status: 400 }
      );
    }

    const timestamp = Date.now();

    // Validate image
    const image = formData.get("image");
    if (!image || !(image instanceof File) || !image.name || image.size === 0) {
      console.error("Invalid image:", { name: image?.name, size: image?.size });
      return NextResponse.json(
        { success: false, msg: "Valid image file is required" },
        { status: 400 }
      );
    }

    // Save image to public/uploads/
    let imgUrl;
    try {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      const safeFileName = image.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const filePath = path.join(uploadDir, `${timestamp}-${safeFileName}`);
      await writeFile(filePath, buffer);
      imgUrl = `/uploads/${timestamp}-${safeFileName}`;
    } catch (error) {
      console.error("Error saving image:", error);
      return NextResponse.json(
        { success: false, msg: `Failed to save image: ${error.message}` },
        { status: 500 }
      );
    }

    // Construct blog data
    const blogData = {
      title: formData.get("title")?.toString().trim() || "",
      description: formData.get("description")?.toString().trim() || "",
      category: formData.get("category")?.toString().trim() || "",
      author: formData.get("author")?.toString().trim() || "",
      image: imgUrl,
      authorImg: formData.get("authorImg")?.toString().trim() || "",
      date: new Date(),
    };

    // Validate required fields
    if (!blogData.title || !blogData.description || !blogData.category || !blogData.image) {
      console.error("Missing required fields:", blogData);
      return NextResponse.json(
        { success: false, msg: "Title, description, category, and image are required" },
        { status: 400 }
      );
    }

    // Log for debugging
    console.log("Blog data:", blogData);

    // Create blog
    let newBlog;
    try {
      newBlog = await BlogModel.create(blogData);
    } catch (error) {
      console.error("MongoDB error:", error);
      return NextResponse.json(
        { success: false, msg: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: "Blog Created Successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Unexpected error in POST handler:", error);
    return NextResponse.json(
      { success: false, msg: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}

// GET and DELETE handlers (unchanged)
export async function GET(request) {
  try {
    await connectDB();
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ blog });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ msg: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ msg: "Blog ID is required" }, { status: 400 });
    }
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }
    await fs.unlink(path.join(process.cwd(), "public", blog.image)).catch(() => {});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ msg: "Failed to delete blog" }, { status: 500 });
  }
}