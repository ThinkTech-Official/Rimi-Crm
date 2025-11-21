

import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../utils/urls';



// interface VerificationRequest {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   agentCode: string;
//   company: string | null;
//   verificationStatus: string;
//   documentsUploadedAt: string | null;
//   verifiedAt: string | null;
//   verificationValidTill: string | null;
//   docLink1: string | null;
//   docLink2: string | null;
//   docLink3: string | null;
//   validUpto: string | null;
//   validUpto2: string | null;
//   isImportedAgent: boolean;
// }

// interface VerificationRequestsResponse {
//   data: VerificationRequest[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPrevPage: boolean;
// }


export interface VerificationRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  company: string | null;
  userType: string; // 'AGENT' | 'MGA'
  status: string; // 'ACTIVE' | 'INACTIVE'
  commissionPercent: number | null;
  mgaOverridePercent: number | null;
  verificationStatus: string; // 'PENDING' | 'VERIFIED' | 'DRAFT' | 'REJECTED' | 'EXPIRED'
  documentsUploadedAt: string | null;
  verificationRequestedAt: string | null;
  verifiedAt: string | null;
  verificationValidTill: string | null;
  docLink1: string | null;
  docLink2: string | null;
  docLink3: string | null;
  validUpto: string | null;
  validUpto2: string | null;
  isImportedAgent: boolean;
}

export interface VerificationRequestsResponse {
  data: VerificationRequest[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}


export function useGetVerificationRequests() {
  const [data, setData] = useState<VerificationRequestsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const fetchRequests = useCallback(async (
    status?: string,
    page: number = 1,
    limit: number = 10
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/verification-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status, page, limit }),
      });

      if (response.status === 401) {
        navigate('/login');
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch verification requests');
      }

      const result = await response.json();
      console.log('Verification requests fetched successfully:', result);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching verification requests:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  return { data, loading, error, fetchRequests };
}