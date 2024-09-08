import { db } from "~/server/db";
import React from "react";
import RatioChart from "~/components/RatioChart";

async function countTotalReports() {
  const totalReports = await db.report.count();
  return totalReports;
}
async function todayReported() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Count reports created today
  const reportsToday = await db.report.count({
    where: {
      createdAt: {
        gte: today, // Greater than or equal to today's start
      },
    },
  });
  return reportsToday;
}

async function countPercentageOfReportsSolved() {
  const totalReports = await db.report.count();
  const resolvedReports = await db.report.count({
    where: {
      isResolved: true,
    },
  });
  const percentageResolved =
    totalReports > 0 ? (resolvedReports / totalReports) * 100 : 0;
  return percentageResolved;
}

async function countPercentageOfReportsUnSolved() {
  const totalReports = await db.report.count();
  const unresolvedReports = await db.report.count({
    where: {
      isResolved: false,
    },
  });
  const percentageUnResolved =
    totalReports > 0 ? (unresolvedReports / totalReports) * 100 : 0;
  return percentageUnResolved;
}

const page = async ({ params }: any) => {
  const pass = process.env.NEXT_PUBLIC_PASS!;
  if (pass !== params.id) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-5xl font-bold text-red-700">unauthorized</div>
      </div>
    );
  }

  const totalReports = await countTotalReports();
  const percentageTrue = await countPercentageOfReportsSolved();
  const percentageFalse = await countPercentageOfReportsUnSolved();
  const reportsToday = await todayReported();

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold">Statistics</h1>
      <div className="flex flex-wrap items-center justify-center gap-7">
        <div className="border-black-2 mt-10 rounded-xl border px-20 py-7">
          <h2 className="text-2xl font-bold">Total Reports Reported</h2>
          <p className="mt-4 text-4xl font-bold">{totalReports}</p>
        </div>
        <div className="border-black-2 mt-10 rounded-xl border px-20 py-7">
          <h2 className="text-2xl font-bold">Reports Reported Today</h2>
          <p className="mt-4 text-4xl font-bold">{reportsToday}</p>
        </div>
        <div className="border-black-2 mt-10 rounded-xl border px-20 py-7">
          <h2 className="text-2xl font-bold">Total Reports Solved</h2>
          <p className="mt-4 text-4xl font-bold">{percentageTrue}%</p>
        </div>
        <div className="border-black-2 mt-10 rounded-xl border px-20 py-7">
          <h2 className="text-2xl font-bold">Total Reports Unolved</h2>
          <p className="mt-4 text-4xl font-bold">{percentageFalse}%</p>
        </div>
      </div>
      <RatioChart Solved={percentageTrue} Unsolved={percentageFalse} />{" "}
    </div>
  );
};

export default page;
