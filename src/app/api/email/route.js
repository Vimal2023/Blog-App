import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/config/db";
import EmailModel from "../../../../lib/models/EmailModel";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

export async function POST(request) {
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
    date: Date.now(),
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email Subscribed" });
}

export async function GET(request) {
  const emailData = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(request) {
  
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Deleted" });
}
