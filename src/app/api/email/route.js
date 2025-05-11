import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/config/db";
import EmailModel from "../../../../lib/models/EmailModel";

export async function POST(request) {
  try {
    await connectDB(); // Connect to DB in the handler
    const formData = await request.formData();
    const emailData = {
      email: formData.get("email"),
      date: new Date(), // Use new Date() for clarity
    };
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error("POST /api/email error:", error);
    return NextResponse.json(
      { success: false, msg: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const emailData = await EmailModel.find({});
    return NextResponse.json({ success: true, emails: emailData });
  } catch (error) {
    console.error("GET /api/email error:", error);
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email Deleted" });
  } catch (error) {
    console.error("DELETE /api/email error:", error);
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}