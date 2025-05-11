import { NextResponse } from "next/server";
import connectDB from "../../../../lib/config/db";
import { writeFile } from "fs/promises";
import BlogModel from "../../../../lib/models/BlogModel";
import { promises as fs } from "fs";
import path from "path";

// Ensure MongoDB connection
const LoadDB = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

LoadDB();

// GET: Fetch all blogs or a single blog by ID
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ blog });
    } else {
      const blogs = await BlogModel.find({}); // Note: renamed to blogs for clarity
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ msg: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(request) {
  try {
    // Ensure MongoDB is connected
    await connectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    // Validate image
    const image = formData.get("image");
    if (!image || !image.name) {
      return NextResponse.json({ success: false, msg: "Image is required" }, { status: 400 });
    }

    // Save image to public/uploads/
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true }); // Create directory if it doesn't exist
    const filePath = path.join(uploadDir, `${timestamp}-${image.name}`);
    await writeFile(filePath, buffer);
    const imgUrl = `/uploads/${timestamp}-${image.name}`;

    // Construct blog data
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    // Validate required fields
    if (!blogData.title || !blogData.description || !blogData.category) {
      return NextResponse.json({ success: false, msg: "Missing required fields" }, { status: 400 });
    }

    // Log for debugging
    console.log("Blog data:", blogData);

    // Create blog
    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Created Successfully" });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ success: false, msg: `Server error: ${error.message}` }, { status: 500 });
  }
}

// DELETE: Delete a blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ msg: "Blog ID is required" }, { status: 400 });
    }
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }
    await fs.unlink(path.join(process.cwd(), "public", blog.image)).catch(() => {}); // Ignore if file doesn't exist
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ msg: "Failed to delete blog" }, { status: 500 });
  }
}