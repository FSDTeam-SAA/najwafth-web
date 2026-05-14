/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { resetPassword } from "../api/auth.api";

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeResetPassword = async (data: any) => {
    // data এর মধ্যে সাধারণত email, otp এবং newPassword থাকে
    setIsLoading(true);
    setError(null);
    try {
      const response = await resetPassword(data);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { executeResetPassword, isLoading, error };
};