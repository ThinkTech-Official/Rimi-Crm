import { useState } from 'react';
import { API_BASE } from '../../utils/urls';

interface Applicant {
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface SaveQuotePayload {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  countryOfOrigin: string;
  provinceStateResidence: string;
  applicantNumber: number;
  applicants: Applicant[];
  tripCost: number;
  dateBooked: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  destinationCountry: string;
  tripCancellationDeluxe: boolean;
  agentCode: string;
  product: string;
  status: string;
}

interface SaveQuoteResponse {
  quote: string;
}

export function useCreateQuoteProduct4() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SaveQuoteResponse | null>(null);

  const saveQuote = async (payload: SaveQuotePayload): Promise<SaveQuoteResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/quotes/product4/save`, {
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
        throw new Error(errorData.message || 'Failed to save quote');
      }

      const data: SaveQuoteResponse = await response.json();
      setResult(data);
      return data;
    } catch (err: any) {
      const message = err.message || 'Failed to save quote';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { saveQuote, loading, error, result };
}