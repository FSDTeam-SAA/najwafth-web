"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

function SignUpFrom() {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Left Side */}
      <div className="relative h-64 w-full lg:h-auto lg:w-1/2">
        <Image
          src="/images/authImage.png"
          alt="Signup Image"
          fill
          className="object-cover"
        />

        {/* <div className="absolute inset-0 bg-black/30" /> */}
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 bg-sky-50 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-sky-100 p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex w-50 h-37.5 items-center justify-center overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={380}
                height={380}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-blue-500">
            Create Your Account
          </h2>

          <p className="text-center text-gray-500 text-sm mt-1 mb-6">
            Connect families with trusted care today.
          </p>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <Label className="text-blue-500 text-sm">Your Full Name</Label>
              <Input
                placeholder="Write here..."
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Email */}
            <div>
              <Label className="text-blue-500 text-sm">Email Address</Label>
              <Input
                placeholder="Enter your email..."
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Phone */}
            <div>
              <Label className="text-blue-500 text-sm">Phone Number</Label>
              <Input
                placeholder="+88-0158*****"
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-blue-500 text-sm">
                Create New Password
              </Label>

              <div className="relative mt-1">
                <Input
                  type="password"
                  placeholder="Enter Password..."
                  className="rounded-full border-gray-300 h-11 pr-10"
                />

                <Eye
                  className="absolute right-3 top-3 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="text-blue-500 text-sm">Confirm Password</Label>

              <div className="relative mt-1">
                <Input
                  type="password"
                  placeholder="Enter Password..."
                  className="rounded-full border-gray-300 h-11 pr-10"
                />

                <EyeOff
                  className="absolute right-3 top-3 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Button */}
            <Button className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white mt-2">
              Sign up
            </Button>

            {/* Login link */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer">Log In</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpFrom;
