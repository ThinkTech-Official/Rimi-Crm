import { useState } from 'react';
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

export function useQuoteUpdateProduct4() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Stage2Response | null>(null);

  const completeApplication = async (payload: Stage2Payload): Promise<Stage2Response> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/quotes/product4/stage2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new Error(errorData.message || 'Failed to complete application');
      }

      const result: Stage2Response = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      const message = err.message || 'Failed to complete application';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { completeApplication, loading, error, data };
}