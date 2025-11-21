// src/hooks/useResetPassword.ts
import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';


interface ResetPasswordResult {
  success: boolean;
  message: string;
}

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResetPasswordResult | null>(null);

  const verifyToken = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/auth/verify-reset-token', { token });
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Invalid or expired reset token';
      setError(errorMessage);
      return { valid: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string,
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        password,
        confirmPassword,
      });
      setResult({
        success: true,
        message: response.data.message,
      });
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to reset password. Please try again.';
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
    verifyToken,
    resetPassword,
    loading,
    error,
    result,
  };
};