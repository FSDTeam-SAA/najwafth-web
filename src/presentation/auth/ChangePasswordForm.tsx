"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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
            Change Password
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            Enter your email to recover your password
          </p>

          <form className="space-y-4">
            {/* New Password */}
            <div>
              <Label className="text-blue-500 text-sm">
                Create New Password
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

            {/* Confirm Password */}
            <div>
              <Label className="text-blue-500 text-sm">
                Confirm New Password
              </Label>

              <div className="relative mt-1">
                <Input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re- Enter Password..."
                  className="rounded-full border-gray-300 h-11 pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <Button className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white">
              Verify
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordForm;