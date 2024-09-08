import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      address,
      city,
      description,
      issue,
      name,
      phone,
      state,
      image,
    } = await req.json();
    const newReport = await db.report.create({
      data: {
        address,
        city,
        description,
        issue,
        name,
        phone,
        image,
        state,
        userId,
      },
    });
    return NextResponse.json({ newReport }, { status: 200 });
  } catch (error) {
    console.error("Error creating new report:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const reports = await db.report.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
