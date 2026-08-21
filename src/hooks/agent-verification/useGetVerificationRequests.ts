

import { useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';



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
  phoneNumber: string | null; 
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
  docLink4: string | null; 

//  Document type tracking:
docType1: string | null;  // 'insurance_license'
docType2: string | null;  // 'eo_insurance'
docType3: string | null;  // 'bank_details'
docType4: string | null;  // 'agency_agreement'
  validUpto: string | null;
  validUpto2: string | null;
  isImportedAgent: boolean;
  //  applicantType?: 'independent' | 'under_mga' | null;
  applicantType?: 'independent' | 'under_mga' | 'wfg' | null;
  mgaType?: 'wfg' | 'other' | null;
  wfgCode?: string | null;
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
  
  // const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const fetchRequests = useCallback(async (
    status?: string,
    page: number = 1,
    limit: number = 10
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/auth/verification-requests`, { status, page, limit });
      const result = response.data;
      console.log('Verification requests fetched successfully:', result);
      setData(result);
      console.log('from use get verification request',result)
      return result;
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching verification requests:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { data, loading, error, fetchRequests };
}