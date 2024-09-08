"use client";
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { signOut } from "next-auth/react";
import { UploadButton } from "~/utils/uploadthing";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Form state variables
  const [issue, setIssue] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      issue === "" ||
      phone === "" ||
      name === "" ||
      state === "" ||
      city === "" ||
      address === "" ||
      description === "" ||
      photoUrl === ""
    ) {
      alert("Please fill in all the fields.");
      return; // Stop the submission if any field is empty
    }
    const phonePattern = /^\d{10}$/; // Example pattern: 10-digit number for phone validation
    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return; // Stop form submission if phone is invalid
    }
    // Log all the data
    console.log({
      issue,
      phone,
      name,
      state,
      city,
      address,
      description,
      photoUrl,
    });

    // Send a POST request to the backend
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          issue,
          phone,
          name,
          state,
          city,
          address,
          description,
          image: photoUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Complaint created successfully:", data);
        alert("Complaint created successfully!");
        setOpen(false); // Close the drawer after successful submission
      } else {
        console.error("Failed to create complaint:", response.statusText);
        alert("Failed to create complaint. Please try again.");
      }
    } catch (error) {
      console.error("Error creating complaint:", error);
      alert("Error creating complaint. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between border p-4 px-10 shadow-md">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold text-black max-sm:hidden">
          CivicNet
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Bell />
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-[#FEC887] text-base font-semibold hover:bg-[#FEC887]/80">
              New Complaint
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white px-6 text-black">
            <DrawerHeader>
              <DrawerTitle>Create A Complaint</DrawerTitle>
            </DrawerHeader>
            <form className="space-y-3 px-2 py-3" onSubmit={handleFormSubmit}>
              {/* Form fields */}
              <div className="flex gap-4">
                <div>
                  <label>Issue</label>
                  <Select onValueChange={(value) => setIssue(value)}>
                    <SelectTrigger className="w-[180px] border-[1px] border-gray-300 bg-transparent">
                      <SelectValue placeholder="Select an issue" />
                    </SelectTrigger>
                    <SelectContent className="border-[1px] border-gray-300 bg-[#F6F2EB]">
                      {[
                        "light",
                        "sewage",
                        "water",
                        "sanitation",
                        "crime",
                        "miscellaneous",
                      ].map((issue) => (
                        <SelectItem
                          key={issue}
                          value={issue}
                          className="text-black focus:bg-[#FCD09B] focus:text-black"
                        >
                          {issue.charAt(0).toUpperCase() + issue.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-grow">
                  <label>Phone</label>
                  <Input
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-none"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Name</label>
                  <Input
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-none"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>State</label>
                  <Input
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-none"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-4 md:col-span-3">
                  <label>City</label>
                  <Input
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-none"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="col-span-6 md:col-span-7">
                  <label>Address</label>
                  <Input
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-none"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label>Description</label>
                <Input
                  className="w-full rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-none"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <UploadButton
                  className="w-full rounded-md border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-none"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setPhotoUrl(res[0]?.url || ""); // Set the uploaded photo URL to the state
                    alert("Upload Completed");
                  }}
                  onUploadError={(error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>

              <DrawerFooter>
                <Button
                  className="bg-[#ce7256] hover:bg-[#FEC887]/80"
                  type="submit"
                >
                  Submit
                </Button>
                <DrawerClose>
                  <Button
                    className="w-full bg-transparent text-black"
                    variant="outline"
                    type="button"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="text-semibold rounded-2xl border border-black px-3 py-2 text-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
