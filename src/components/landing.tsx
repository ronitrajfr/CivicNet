"use client";
import NavbarLanding from "./NavbarLanding";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle,
  Droplet,
  Lightbulb,
  Shield,
  Trash2,
} from "lucide-react";

const Main = () => {
  const router = useRouter();
  const { data, status } = useSession();
  async function handleClick() {
    if (status === "unauthenticated") {
      await signIn("google", { callbackUrl: "/dashboard" });
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <div
      className="z-0 min-h-screen w-[100%]"
      style={{
        backgroundImage: "url(/herobg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavbarLanding />
      <div className="flex min-h-dvh flex-col bg-none text-white">
        <section className="w-full pt-24 md:pt-24 lg:pt-32">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter flex flex-wrap text-5xl font-bold tracking-tighter text-gray-200 max-sm:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
                  Report issues, get solutions
                </h1>
                <p className="mx-auto mt-7 max-w-[700px] text-gray-400 md:text-xl lg:text-2xl">
                  Empower your community by reporting issues like water, sewage,
                  or crime. Authorities can quickly address and update
                  resolutions, ensuring a safer, cleaner, and more efficient
                  environment for everyone.
                </p>
                <div className="mt-6 flex flex-wrap space-x-4">
                  <button
                    onClick={handleClick}
                    className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-8 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/logo.png"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Issues We Handle
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <Droplet className="h-12 w-12 text-blue-600" />
                <h3 className="font-bold">Water Issues</h3>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <Trash2 className="h-12 w-12 text-green-600" />
                <h3 className="font-bold">Garbage Collection</h3>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <Lightbulb className="h-12 w-12 text-yellow-600" />
                <h3 className="font-bold">Street Lighting</h3>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <Shield className="h-12 w-12 text-red-600" />
                <h3 className="font-bold">Public Safety</h3>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <AlertTriangle className="h-12 w-12 text-orange-600" />
                <h3 className="font-bold">Sanitation</h3>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <CheckCircle className="h-12 w-12 text-purple-600" />
                <h3 className="font-bold">Other Civic Issues</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

function BotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function CombineIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="8" x="2" y="2" rx="2" />
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
      <polyline points="7 21 10 18 7 15" />
      <rect width="8" height="8" x="14" y="14" rx="2" />
    </svg>
  );
}

function ScalingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M14 15H9v-5" />
      <path d="M16 3h5v5" />
      <path d="M21 3 9 15" />
    </svg>
  );
}

export default Main;
