import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../utils/urls';

interface AddressInfo {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
}

interface ContactInfo {
  email: string;
  additionalEmail?: string;
  phoneNumber: string;
}

export interface Stage2Payload {
  quoteNumber: string;
  address: AddressInfo;
  contactInfo: ContactInfo;
}

interface Stage2Response {
  success: boolean;
  quoteNumber: string;
  quoteId: string;
  message: string;
}

export function useQuoteUpdateProduct3() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Stage2Response | null>(null);

  const completeApplication = async (payload: Stage2Payload): Promise<Stage2Response> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<Stage2Response>(
        `${API_BASE}/quotes/product3/stage2`,
        payload,
        { withCredentials: true }
      );

      setData(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to complete application';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { completeApplication, loading, error, data };
}