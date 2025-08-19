import { useState } from 'react';
import { API_BASE } from '../utils/urls';

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

const baseUrl = `${API_BASE}`;

export function useSearchPolicies(defaultLimit: number = 10) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaginatedPolicies<PolicyRecord> | null>(null);

  async function search(
    criteria: Omit<SearchPoliciesCriteria, 'page' | 'limit'>,
    page: number = 1,
    limit: number = defaultLimit
  ) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const payload = { ...criteria, page, limit };
      const res = await fetch(`${baseUrl}/policies/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Search failed');
      }
      const result = (await res.json()) ;
      setData(result);
      console.log('from use Search Policy',result)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { search, loading, error, data };
}
