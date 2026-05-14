/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SignupRequest {
  name: string;      // fullName থেকে name এ পরিবর্তন করা হয়েছে
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: any;
}
