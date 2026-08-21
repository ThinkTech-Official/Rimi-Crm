import { useState, useCallback } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';

interface RejectAgentPayload {
  agentId: string;
  reason?: string;
}

interface RejectAgentResponse {
  message: string;
  user: any;
}

export function useRejectAgent() {
  const [data, setData] = useState<RejectAgentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Reject a pending application. The agent keeps their account and can
   * upload new documents and request verification again.
   */
  const rejectAgent = useCallback(async (payload: RejectAgentPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.put(`/auth/reject-agent`, payload);
      const result = response.data;
      setData(result);
      setSuccess(true);
      return result;
    } catch (err: any) {
      // Validation failures come back as an array of messages.
      const raw = err.response?.data?.message;
      setError(
        Array.isArray(raw)
          ? raw.join('. ')
          : raw || err.message || 'Failed to reject application',
      );
      console.error('Error rejecting agent:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, success, rejectAgent };
}
