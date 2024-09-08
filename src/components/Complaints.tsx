"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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

const Complaints = () => {
  interface Complaint {
    id: string;
    issue: string;
    createdAt: string;
    isResolved: boolean;
    // Add other fields if needed
  }

  const { data: session, status } = useSession();
  const [complaints, setComplaints] = useState<Complaint[]>([]); // Apply the type here

  useEffect(() => {
    // Function to fetch complaints
    const fetchComplaints = async () => {
      if (session?.user) {
        try {
          const response = await fetch(
            `/api/report?userId=${session.user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();
          console.log("Fetched complaints:", data);
          setComplaints(data); // Set the fetched data to state
        } catch (error) {
          console.error("Error fetching complaints:", error);
        }
      }
    };

    // Fetch complaints if the user is authenticated
    if (status === "authenticated") {
      fetchComplaints();
    }
  }, [session, status]); // Re-run the effect when session or status changes

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          {complaints.length > 0 ? (
            <Table>
              <TableCaption>A list of your submitted complaints</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Complaint ID</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{complaint.issue}</TableCell>
                    <TableCell>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          complaint.isResolved ? "secondary" : "destructive"
                        }
                      >
                        {complaint.isResolved ? "Resolved" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Show this message if no complaints are available
            <div className="text-center text-gray-500">
              No reports submitted yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Complaints;
