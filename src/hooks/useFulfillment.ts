import { useState, useCallback } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

export function useFulfillment(policyId: string) {
  const [preview, setPreview] = useState<{ subject: string; html: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string|null>(null);



  const fetchPreview = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<{ subject: string; html: string }>(
        `/policies/${policyId}/fulfillment/preview`
      );
      setPreview(res.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [policyId]);

  const sendMail = useCallback(
    async (to: string, cc: string, agentEmail: string) => {
      setLoading(true);
      try {
        await axiosInstance.post(`/policies/${policyId}/fulfillment/send`, {
          to, cc, agentEmail,
        });
        alert('Email sent!');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [policyId]
  );

  return { preview, loading, error, fetchPreview, sendMail };
}
