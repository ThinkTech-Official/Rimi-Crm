import { useState, useCallback } from 'react';
import axios from 'axios';

export function useFulfillment(policyId: string) {
  const [preview, setPreview] = useState<{ subject: string; html: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string|null>(null);

  const baseUrl = "http://localhost:3000";

  const fetchPreview = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ subject: string; html: string }>(
        `${baseUrl}/policies/${policyId}/fulfillment/preview`
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
        await axios.post(`${baseUrl}/policies/${policyId}/fulfillment/send`, {
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
