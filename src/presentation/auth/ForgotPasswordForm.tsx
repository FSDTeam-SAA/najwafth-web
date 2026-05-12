"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

function ForgotPasswordForm() {
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
            Forgot Password!
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            Enter your email to recover your password
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

            {/* Button */}
            <Button className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white">
              Send OTP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;