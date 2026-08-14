import { useState, useCallback } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import useNotification from './useNotification';

export function useFulfillment(
  policyId: string,
  triggerNotification?: (args: any) => void
) {
  const [preview, setPreview] = useState<{ subject: string; html: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { triggerNotification: localTrigger } = useNotification();

  const activeTrigger = triggerNotification || localTrigger;

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

  // agentEmail is no longer sent: the server reads the agent's address from
  // the policy, so the caller cannot choose who gets BCC'd.
  const sendMail = useCallback(
    async (to: string, cc: string) => {
      setLoading(true);
      try {
        await axiosInstance.post(`/policies/${policyId}/fulfillment/send`, {
          to, cc,
        });
        activeTrigger({
          message: "Email sent!",
          type: "success",
        });
      } catch (e: any) {
        setError(e.message);
        activeTrigger({
          message: e.message,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [policyId, activeTrigger]
  );

  return { preview, loading, error, fetchPreview, sendMail };
}
