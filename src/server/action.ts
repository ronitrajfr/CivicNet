import { db } from "./db";

export async function countTotalReports() {
  const totalReports = await db.report.count();
  return totalReports;
}
