

import { useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';



interface VerificationStatus {
  id: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED' | 'NOT_UPLOADED' | 'DRAFT';
  verifiedAt: string | null;
  verificationValidTill: string | null;
  documentsUploadedAt: string | null;
  isImportedAgent: boolean;
  docLink1: string | null;
  docLink2: string | null;
  docLink3: string | null;
  verifiedBy: string | null;
}

export function useGetVerificationStatus() {
  const [data, setData] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/auth/verification-status`);
      const result = response.data;
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching verification status:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { data, loading, error, fetchStatus };
}