"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const page = ({ params }: any) => {
  const pass = process.env.NEXT_PUBLIC_PASS!;
  if (pass !== params.id) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-5xl font-bold text-red-700">unauthorized</div>
      </div>
    );
  }

  // State to store the fetched data
  const [result, setResult] = useState<any[]>([]);

  // Fetch data from the API endpoint when the component mounts
  useEffect(() => {
    const fetchData = () => {
      fetch("/api/admin")
        .then((response) => response.json())
        .then((data) => setResult(data))
        .catch((error) =>
          console.error("An error occurred while fetching data:", error),
        );
    };

    fetchData();
  }, []);

  // Function to handle the resolution of complaints
  const updateResults = async (id: string) => {
    // Optimistically update the UI
    setResult((prevResults) =>
      prevResults.filter((complaint) => complaint.id !== id),
    );

    const response = await fetch(`/api/admin?complaintId=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to update the complaint.");
      // Revert the UI change in case of an error
      setResult((prevResults) => [
        ...prevResults,
        result.find((c) => c.id === id),
      ]);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">All Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          {result.length > 0 ? (
            <Table>
              <TableCaption>A list of your submitted complaints</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Complaint ID</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((complaint, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{complaint.issue}</TableCell>
                    <TableCell>{complaint.address}</TableCell>
                    <TableCell>{complaint.city}</TableCell>
                    <TableCell>{complaint.state}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>{complaint.phone}</TableCell>
                    <TableCell>{complaint.name}</TableCell>
                    <TableCell>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => updateResults(complaint.id)}
                        className="text-md rounded-2xl bg-black px-4 py-3 text-white"
                      >
                        Resolve
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-gray-500">
              No reports submitted yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
