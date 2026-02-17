import { useState, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

export interface PaymentScheduleItem {
  id: string;
  sequenceNumber: number;
  amount: number;
  currency: string;
  paymentType: string;
  scheduledDate: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  processedAt?: string;
  failedAt?: string;
  refundedAt?: string;
  stripeChargeId?: string;
  stripeInvoiceId?: string;
  notes?: string;
  paymentHistoryId?: string;
  // Populated from PaymentHistory relation
  paymentHistory?: {
    cardholderName: string | null;
    brand: string | null;
    last4: string | null;
    fee: number | null;
  };
}

export function usePaymentSchedule(policyId: string | null) {
  const [data, setData] = useState<PaymentScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!policyId) return;
    
    setLoading(true);
    setError(null);

    axiosInstance
      .get<PaymentScheduleItem[]>(`/policies/${policyId}/payment-schedule`)
      .then((response) => {
        console.log('Payment schedule loaded:', response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.error('Error fetching payment schedule:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load payment schedule');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [policyId]);

  return { data, loading, error };
}