"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { UploadButton } from "~/utils/uploadthing";

const Page = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [formData, setFormData] = useState({
    crimeType: "crime",
    description: "",
    name: "",
    phone: "",
    state: "",
    pinCode: "",
    address: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/report", {
        ...formData,
        image: uploadedFileUrl,
        userId: session?.user?.id, // Extracting userId from session
      });
      console.log("Form Data Submitted:", response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex h-screen min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Report Crime</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, crimeType: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Crime Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crime">crime</SelectItem>
              <SelectItem value="sanitation">sanitation</SelectItem>
              <SelectItem value="water">water</SelectItem>
              <SelectItem value="sewage">sewage</SelectItem>
              <SelectItem value="light">light</SelectItem>
            </SelectContent>
          </Select>
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <Input
            name="description"
            type="text"
            required
            placeholder="Description"
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <label>Your Name</label>
          <Input
            name="name"
            type="text"
            required
            placeholder="John Doe"
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <label>Phone Number</label>
          <Input
            name="phone"
            type="text"
            required
            placeholder="79030XXXXX"
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <label>State</label>
          <Input
            name="state"
            type="text"
            required
            placeholder="Mumbai"
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <label>Pin Code</label>
          <Input
            name="pinCode"
            type="text"
            required
            placeholder="400004"
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <label>Address</label>
          <Input
            name="address"
            required
            type="text"
            placeholder="Bandra West"
            onChange={handleInputChange}
          />
        </fieldset>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log(res[0]?.url);
            setUploadedFileUrl(res[0]!.url); // Assuming res is an array of uploaded files and we take the first one
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Page;
