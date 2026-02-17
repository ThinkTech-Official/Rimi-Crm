import { useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';

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
      const response = await axiosInstance.post<SaveQuoteResponse>(`/quotes/product4/save`, payload);
      const data: SaveQuoteResponse = response.data;
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