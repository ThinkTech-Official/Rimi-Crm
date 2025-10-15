import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../utils/urls';

export interface RefundPolicyFeeResponse {
  success: boolean;
  policyNumber: string;
  amountRefunded: number;
  stripeRefundId: string;
  message: string;
}

export function usePolicyFeeRefund() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Refund a specific policy fee payment
   */
  const refundPolicyFee = async (
    policyId: string,
    paymentHistoryId: string,
    notes?: string,
    processedBy?: string
  ): Promise<RefundPolicyFeeResponse | null> => {
    if (!policyId || !paymentHistoryId) {
      setError('Policy ID and Payment History ID are required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE}/policies/${policyId}/refund-policy-fee`,
        {
          paymentHistoryId,
          notes,
          processedBy,
        }
      );

      return response.data;
    } catch (err: any) {
      const errorMsg = 
        err.response?.data?.message || 
        err.message || 
        'Error processing refund';
      setError(errorMsg);
      console.error('Refund policy fee error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    refundPolicyFee,
  };
}