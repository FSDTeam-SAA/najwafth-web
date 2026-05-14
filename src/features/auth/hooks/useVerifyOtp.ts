/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { verifyOtp } from "../api/auth.api";

export const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeVerifyOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await verifyOtp(email, otp);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { executeVerifyOtp, isLoading, error };
};