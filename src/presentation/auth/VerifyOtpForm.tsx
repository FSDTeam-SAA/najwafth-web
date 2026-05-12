"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

function VerifyOtpForm() {
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
          <h2 className="text-3xl font-bold text-blue-500">Verify Email</h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            Enter OTP to verify your email address
          </p>

          {/* OTP Inputs */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              maxLength={1}
              className="w-14 h-14 rounded-md border border-blue-400 text-center text-lg outline-none"
            />

            <input
              type="text"
              maxLength={1}
              className="w-14 h-14 rounded-md border border-blue-400 text-center text-lg outline-none"
            />

            <input
              type="text"
              maxLength={1}
              className="w-14 h-14 rounded-md border border-blue-400 text-center text-lg outline-none"
            />

            <input
              type="text"
              maxLength={1}
              className="w-14 h-14 rounded-md border border-gray-300 text-center text-lg outline-none"
            />

            <input
              type="text"
              maxLength={1}
              className="w-14 h-14 rounded-md border border-gray-300 text-center text-lg outline-none"
            />

            <input
              type="text"
              maxLength={1}
              className="w-14 h-14 rounded-md border border-gray-300 text-center text-lg outline-none"
            />
          </div>

          {/* Timer + Resend */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-5">
            <p>⏱ 00:59</p>

            <p>
              Didn&apos;t get a code?{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Resend
              </span>
            </p>
          </div>

          {/* Button */}
          <Button className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white">
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpForm;
