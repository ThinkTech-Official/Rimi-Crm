import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../utils/urls';

interface UpdatePaymentMethodResult {
  success: boolean;
  message: string;
  cardDetails: {
    brand: string;
    last4: string;
    cardholderName?: string;
  };
}

export function useUpdatePaymentMethod() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePaymentMethod = async (
    policyId: string,
    paymentMethodId: string
  ): Promise<UpdatePaymentMethodResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put<UpdatePaymentMethodResult>(
        `${API_BASE}/policies/${policyId}/update-payment-method`,
        { paymentMethodId },
        { withCredentials: true }
      );

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update payment method';
      setError(errorMessage);
      console.error('Error updating payment method:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updatePaymentMethod, loading, error };
}


// ============================
