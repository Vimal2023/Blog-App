const { NextResponse } = require("next/server");
import connectDB from "@/lib/config/db";
import {writeFile} from "fs/promises";

const LoadDB =async () => {
    await connectDB();
}

LoadDB();
async function GET(request) {
    return NextResponse.json({msg:"Hello from blog API"})
}

export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}-${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}-${image.name}`;

    const blogData = {
        title: `${formData.get("title")}`,
        description: `${formData.get("description")}`,
        category: `${formData.get("category")}`,
        author: `${formData.get("author")}`,
        image:`${imgUrl}`,
        authorImg: `${formData.get("authorImg")}`,
    }

    await BlogModel.create(blogData);

    return NextResponse.json({success:true, msg:"Blog Created Successfully"});
}