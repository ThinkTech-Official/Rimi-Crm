// import { useState } from 'react';
// import { axiosInstance } from '../utils/axiosInstance';

// export interface SearchPoliciesCriteria {
//   firstName?: string;
//   lastName?: string;
//   dateOfBirth?: string;
//   policyNumber?: string;
//   phoneNumber?: string;
//   email?: string;
//   saleDateFrom?: string;
//   saleDateTo?: string;
//   effectiveDateFrom?: string;
//   effectiveDateTo?: string;
//   applicationId?: string;
//   agent?: string;
//   status?: string;
//   products?: string[];
//   page?: number;
//   limit?: number;
// }

// export interface PolicyRecord {
//   id: string;
//   policyNumber?: string;
//   policyType?: string;
//   firstName?: string;
//   lastName?: string;
//   dateOfBirth?: string;
//   dateIssued?: string;
//   covEffDate?: string;
//   expiryDate?: string;
//   effectiveDate?: string;
//   product?: string;
//   status?: string;
// }

// export interface PaginatedPolicies<T> {
//   items: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }



// export function useSearchPolicies(defaultLimit: number = 10) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState<PaginatedPolicies<PolicyRecord> | null>(null);

//   async function search(
//     criteria: Omit<SearchPoliciesCriteria, 'page' | 'limit'>,
//     page: number = 1,
//     limit: number = defaultLimit
//   ) {
//     setLoading(true);
//     setError(null);
//     // setData(null);
//     try {
//       const payload = { ...criteria, page, limit };
//       const res = await axiosInstance.post('/policies/search', payload);

//       const result = res.data;
//       setData(result);
//       console.log('from use Search Policy',result)
//     } catch (err: any) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { search, loading, error, data };
// }


// ====================

import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

export interface SearchPoliciesCriteria {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  policyNumber?: string;
  phoneNumber?: string;
  email?: string;
  saleDateFrom?: string;
  saleDateTo?: string;
  effectiveDateFrom?: string;
  effectiveDateTo?: string;
  applicationId?: string;
  agent?: string;
  status?: string;
  products?: string[];
  page?: number;
  limit?: number;
}

export interface PolicyRecord {
  id: string;
  policyNumber?: string;
  policyType?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  dateIssued?: string;
  covEffDate?: string;
  expiryDate?: string;
  effectiveDate?: string;
  product?: string;
  status?: string;
}

export interface PaginatedPolicies<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useSearchPolicies(defaultLimit: number = 10) {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaginatedPolicies<PolicyRecord> | null>(null);

  async function search(
    criteria: Omit<SearchPoliciesCriteria, 'page' | 'limit'>,
    page: number = 1,
    limit: number = defaultLimit
  ) {
    setLoading(true);
    setError(null);
    // setData(null);
    try {
      const payload = { ...criteria, page, limit };
      const res = await axiosInstance.post('/policies/search', payload);
      const result = res.data;
      setData(result);
      console.log('from use Search Policy', result);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function exportCsv(
    criteria: Omit<SearchPoliciesCriteria, 'page' | 'limit'>
  ) {
    setExporting(true);
    setExportError(null);
    try {
      const res = await axiosInstance.post('/policies/search/export', criteria, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `policies_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      // Axios returns blob on error too — parse it back to JSON to get the message
      if (err.response?.data instanceof Blob) {
        const text = await err.response.data.text();
        try {
          const parsed = JSON.parse(text);
          setExportError(parsed.message || 'Export failed. Please try again.');
        } catch {
          setExportError('Export failed. Please try again.');
        }
      } else {
        setExportError(err.response?.data?.message || 'Export failed. Please try again.');
      }
    } finally {
      setExporting(false);
    }
  }

  return { search, exportCsv, exporting, exportError, loading, error, data };
}

