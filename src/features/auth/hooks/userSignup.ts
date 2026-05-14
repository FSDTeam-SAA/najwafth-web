import { useState } from "react";
import { signupUser } from "../api/auth.api";
import { SignupRequest } from "../types";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeSignup = async (data: SignupRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signupUser(data);
      return response; // Success hole data return korbe
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { executeSignup, isLoading, error };
};