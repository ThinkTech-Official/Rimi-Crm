import { useState } from 'react';
import { API_BASE } from '../utils/urls';
import { PolicyDetail } from './usePolicyDetail';

export interface ModifyApplicant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  province?: string;
  relation?: string;
  PreExCoverage?: string;
}

export interface RefundData {
  originalExpiryDate: string;
  newExpiryDate: string;
  daysToRefund: number;
  maxRefundable: number;
  transactionFee: number;
  netRefundAmount: number;
}

export interface PremiumRecalculation {
  originalPremium: number;
  newPremium: number;
  premiumDifference: number;
}

export interface ModifyPolicyData {
  language?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  email: string;
  additionalEmail?: string;
  phoneNumber?: string;
  street: string;
  street2?: string;
  city: string;
  province: string;
  countryCode: string;
  postalCode: string;
  effectiveDate?: string;
  expiryDate: string;
  destination: string;
  deductible: string;
  applicantOnSuperVisa?: string;
  applicants?: ModifyApplicant[];
  refund?: RefundData;
  premiumRecalculation?: PremiumRecalculation;
  lastKnownUpdatedAt: string;
}

export const useModifyPolicy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modifyPolicy = async (
    policyId: string,
    data: ModifyPolicyData
  ): Promise<{ success: boolean; message: string; refundProcessed: boolean; refundAmount?: number; policy?: PolicyDetail } | null> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE}/policies/${policyId}/modify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to modify policy');
      }

      const result = await response.json();
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred while modifying policy');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const calculateRefund = async (
    policyId: string,
    originalExpiryDate: string,
    newExpiryDate: string,
    originalPremium: number,
    originalCoverageLength: number
  ): Promise<{ daysToRefund: number; premiumPerDay: number; maxRefundable: number } | null> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE}/policies/${policyId}/calculate-refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalExpiryDate,
          newExpiryDate,
          originalPremium,
          originalCoverageLength,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate refund');
      }

      const result = await response.json();
      return {
        daysToRefund: result.daysToRefund,
        premiumPerDay: result.premiumPerDay,
        maxRefundable: result.maxRefundable,
      };
    } catch (err: any) {
      setError(err.message || 'An error occurred while calculating refund');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    modifyPolicy,
    calculateRefund,
  };
};