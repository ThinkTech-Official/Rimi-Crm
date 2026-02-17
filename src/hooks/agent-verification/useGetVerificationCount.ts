

import { useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';



interface VerificationCountResponse {
  count: number;
}

export function useGetVerificationCount() {
  const [data, setData] = useState<VerificationCountResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const fetchCount = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/auth/verification-count`);
      const result = response.data;
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching verification count:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { data, loading, error, fetchCount };
}