import { useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';

interface RenewalNoticeResponse {
  success: boolean;
  message: string;
}

export const useRenewalNotice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendRenewalNotice = async (policyId: string): Promise<RenewalNoticeResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post<RenewalNoticeResponse>(
        `/policies/${policyId}/renewal-notice/send`
      );

      setSuccess(true);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to send renewal notice';
      setError(errorMessage);
      console.error('Error sending renewal notice:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendRenewalNotice,
    loading,
    error,
    success,
  };
};