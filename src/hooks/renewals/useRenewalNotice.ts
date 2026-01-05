import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../utils/urls';

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
      const response = await axios.post<RenewalNoticeResponse>(
        `${API_BASE}/policies/${policyId}/renewal-notice/send`
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