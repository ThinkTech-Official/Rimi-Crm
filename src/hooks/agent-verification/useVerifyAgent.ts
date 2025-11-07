

import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../utils/urls';



interface VerifyAgentResponse {
  message: string;
  user: any;
}

export function useVerifyAgent() {
  const [data, setData] = useState<VerifyAgentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const verifyAgent = useCallback(async (
    agentId: string,
    verificationValidTill: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/auth/verify-agent`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          agentId,
          verificationValidTill,
        }),
      });

      if (response.status === 401) {
        navigate('/login');
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to verify agent');
      }

      const result = await response.json();
      setData(result);
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err.message);
      console.error('Error verifying agent:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  return { data, loading, error, success, verifyAgent };
}