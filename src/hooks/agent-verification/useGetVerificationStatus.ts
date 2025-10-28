

import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../utils/urls';



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
  
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/verification-status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        navigate('/login');
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch verification status');
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching verification status:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  return { data, loading, error, fetchStatus };
}