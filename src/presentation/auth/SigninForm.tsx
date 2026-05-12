"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side Image */}
      <div className="relative h-64 w-full lg:h-auto lg:w-1/2">
        <Image
          src="/images/authImage.png"
          alt="Auth Image"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 bg-sky-50 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-sky-100 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-24">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-blue-500">
            Hello!
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            Access to manage your account
          </p>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <Label className="text-blue-500 text-sm">
                Email Address
              </Label>

              <Input
                type="email"
                placeholder="Enter your email..."
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-blue-500 text-sm">
                Password
              </Label>

              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password..."
                  className="rounded-full border-gray-300 h-11 pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-blue-500"
                />
                Remember Me
              </label>

              <button
                type="button"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Button */}
            <Button className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white">
              Sign In
            </Button>

            {/* Signup */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Don&apos;t have an account?{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;