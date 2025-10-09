import { useState } from 'react';
import { API_BASE } from '../../utils/urls';


export interface RefundPreview {
  policyNumber: string;
  paymentOption: string;
  totalPaid: number;
  cancellationFee: number;
  adminFeeRefundable: number;
  totalRefundable: number;
  refundBreakdown: Array<{
    chargeId: string;
    amount: number;
    date: string;
    willRefund: number;
  }>;
}

export interface CancelPolicyRequest {
  cancellationType: 'visitors' | 'visa-refusal' | 'other' | 'super-visa' | 'early-return'
  cancellationFee: number;
  notes?: string;
  processedBy?: string;
}

export interface RefundAdminFeeRequest {
  notes?: string;
  processedBy?: string;
}

export interface CancelPolicyResponse {
  success: boolean;
  policyNumber: string;
  totalRefunded: number;
  cancellationFee: number;
  refundedCharges: number;
  subscriptionCancelled: boolean;
  refundRecordId: string;
  message: string;
}

export interface RefundAdminFeeResponse {
  success: boolean;
  policyNumber: string;
  adminFeeRefunded: number;
  stripeRefundId: string;
  refundRecordId: string;
  message: string;
}

export function usePolicyCancellation(policyId: string | null) {
  const [preview, setPreview] = useState<RefundPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch refund preview calculation
   */
  const fetchRefundPreview = async (
    cancellationType: string = 'visitors',
    cancellationFee: number = 50
  ): Promise<RefundPreview | null> => {
    if (!policyId) {
      setError('Policy ID is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE}/policies/${policyId}/refund-preview`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cancellationType, cancellationFee }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch refund preview');
      }

      const data: RefundPreview = await response.json();
      setPreview(data);
      return data;
    } catch (err: any) {
      const errorMsg = err.message || 'Error fetching refund preview';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel policy with refunds
   */
  const cancelPolicy = async (
    request: CancelPolicyRequest
  ): Promise<CancelPolicyResponse | null> => {
    if (!policyId) {
      setError('Policy ID is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/policies/${policyId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to cancel policy');
      }

      const data: CancelPolicyResponse = await response.json();
      return data;
    } catch (err: any) {
      const errorMsg = err.message || 'Error cancelling policy';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refund admin fee (admin only)
   */
  const refundAdminFee = async (
    request: RefundAdminFeeRequest
  ): Promise<RefundAdminFeeResponse | null> => {
    if (!policyId) {
      setError('Policy ID is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE}/policies/${policyId}/refund-admin-fee`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to refund admin fee');
      }

      const data: RefundAdminFeeResponse = await response.json();
      return data;
    } catch (err: any) {
      const errorMsg = err.message || 'Error refunding admin fee';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    preview,
    loading,
    error,
    fetchRefundPreview,
    cancelPolicy,
    refundAdminFee,
  };
}