// src/hooks/useForgotPassword.ts
import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';


interface ForgotPasswordResult {
  success: boolean;
  message: string;
}

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ForgotPasswordResult | null>(null);

  const sendResetLink = async (email: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      setResult({
        success: true,
        message: response.data.message,
      });
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to send reset link. Please try again.';
      setError(errorMessage);
      setResult({
        success: false,
        message: errorMessage,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendResetLink,
    loading,
    error,
    result,
  };
};