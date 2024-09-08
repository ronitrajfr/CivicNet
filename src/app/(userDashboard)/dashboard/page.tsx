"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "~/components/Navbar";
import { useRouter } from "next/navigation";
import Complaints from "~/components/Complaints";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div>
      <Navbar />
      <Complaints />
    </div>
  );
};

export default Page;
