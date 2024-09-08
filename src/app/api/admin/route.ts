import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
  try {
    const allReports = await db.report.findMany({
      where: {
        isResolved: false, // Filter to get only unresolved complaints
      },
    });

    return NextResponse.json(allReports, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const complaintId = searchParams.get("complaintId");

    if (!complaintId) {
      return NextResponse.json(
        { error: "Complaint ID is required" },
        { status: 400 },
      );
    }

    // Update the complaint to mark it as resolved
    const updatedComplaint = await db.report.update({
      where: {
        id: complaintId, // Ensure complaintId is an integer
      },
      data: {
        isResolved: true, // Set isResolved to true
      },
    });

    return NextResponse.json(updatedComplaint, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
