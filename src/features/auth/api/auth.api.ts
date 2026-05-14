/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignupRequest, AuthResponse } from "../types";

export const signupUser = async (
  data: SignupRequest,
): Promise<AuthResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register
`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};



export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send OTP");
  }
  return response.json();
};




export const verifyOtp = async (email: string, otp: string): Promise<AuthResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid OTP");
  }
  return response.json();
};




export const resetPassword = async (data: any): Promise<AuthResponse> => {
  // ডাটাতে সাধারণত email, otp/token, এবং newPassword থাকে
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset password");
  }
  return response.json();
};