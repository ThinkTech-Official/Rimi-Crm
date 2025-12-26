import { useState } from 'react';
import { API_BASE } from '../../utils/urls';


interface SplitGroup {
  applicantIds: string[];
  effectiveDate: string;
  expiryDate: string;
  isPrimaryInGroup: boolean;
}

interface SplitPreviewResponse {
  original: {
    policyNumber: string;
    totalPremium: number;
    paymentOption: string;
  };
  splitPolicies: Array<{
    groupIndex: number;
    newPolicyNumber: string;
    applicants: any[];
    coveragePeriod: {
      effectiveDate: string;
      expiryDate: string;
      days: number;
    };
    premium: {
      total: number;
      monthly: number;
      policyFeeAllocation: number;
    };
    payment: {
      type: string;
      alreadyPaid: number;
      refundDue: number;
      remainingPayments: number;
    };
  }>;
  financial: {
    originalPremium: number;
    newTotalPremium: number;
    totalRefund: number;
    difference: number;
  };
  warnings: string[];
}

export function usePolicySplit(policyId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<SplitPreviewResponse | null>(null);

  /**
   * Get split preview
   */
  const getPreview = async (splitGroups: SplitGroup[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/policies/${policyId}/split/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ splitGroups }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to preview split');
      }

      const data = await response.json();
      setPreview(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Execute split
   */
  const executeSplit = async (splitGroups: SplitGroup[], adminNotes: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/policies/${policyId}/split`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ splitGroups, adminNotes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to execute split');
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Undo split
   */
  const undoSplit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/policies/${policyId}/split/undo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to undo split');
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    preview,
    getPreview,
    executeSplit,
    undoSplit,
  };
}