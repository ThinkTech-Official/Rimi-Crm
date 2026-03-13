import { useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';


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
      const response = await axiosInstance.post(`/policies/${policyId}/split/preview`, { splitGroups });
      const data = response.data;
      setPreview(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.errors[0] || err.message || 'An error occurred');
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
      const response = await axiosInstance.post(`/policies/${policyId}/split`, { splitGroups, adminNotes });
      const data = response.data;
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
      const response = await axiosInstance.post(`/policies/${policyId}/split/undo`);
      const data = response.data;
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