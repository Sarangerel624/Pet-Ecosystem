"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Mail, PawPrint, Pen, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { isSignedIn } = useUser();
  const handleSubmit = async () => {
    try {
      if (!email || !firstName || !lastName) {
        toast.error("Please fill all the fields");
        return;
      }

      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User registered successfully:", data);
        toast.success("User registered successfully");
        setEmail("");
        setFirstName("");
        setLastName("");
      }
      if (!response.ok) {
        toast.error(
          data.error.errors.map((err: { message: string }) => err.message)[0],
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push("/paw-connect");
    }
  }, [isSignedIn, router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 py-8 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-6xl opacity-10">🐾</div>
      <div className="absolute bottom-20 right-20 text-6xl opacity-10">🐾</div>
      <div className="absolute top-1/3 right-10 text-4xl opacity-10">🐶</div>
      <div className="absolute bottom-1/3 left-10 text-4xl opacity-10">🐱</div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 border-2 border-orange-200 relative z-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Sign Up
          </h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <User className="h-4 w-4" />
              <span>Last Name</span>
            </label>
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-xl border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <Pen className="h-4 w-4" />
              <span>First Name</span>
            </label>
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-xl border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full text-base font-bold px-6 py-4 rounded-xl bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-[1.02] transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            <PawPrint />
            <span>Sign Up</span>
          </span>
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">or</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <SignInButton mode="modal">
              <span className="text-orange-600 font-semibold cursor-pointer hover:text-orange-700 hover:underline transition">
                Sign In
              </span>
            </SignInButton>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
