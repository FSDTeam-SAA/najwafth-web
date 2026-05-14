/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { forgotPassword } from "../api/auth.api";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeForgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await forgotPassword(email);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { executeForgotPassword, isLoading, error };
};