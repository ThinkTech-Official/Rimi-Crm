import { useState } from 'react';
import { API_BASE } from '../../utils/urls';
import { useSelector } from 'react-redux';

export interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
   healthQuestionnaire?: {
    questions: any[];
  };
}

export interface Stage1Payload {
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
  quoteNumber?: string;
  status: string;
  primaryHealthQuestionnaire?: {
    questions: any[];
  };
}

interface Stage1Response {
  quoteId: string;
  quoteNumber: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  destinationCountry: string;
  tripCost: number;
  dateBooked: string;
  tripCancellationDeluxe: boolean;
  quoteAmount: number;
  dateOfBirth: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  countryOfOrigin: string;
  provinceStateResidence: string;
  createdAt: Date;
  applicants: Applicant[];
}

export function useSaveQuoteNextProduct4() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: any) => state.auth.token) as string | null;

  const saveQuoteNext = async (payload: Stage1Payload): Promise<Stage1Response> => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = payload.quoteNumber
        ? `${API_BASE}/quotes/product4/stage1/${payload.quoteNumber}`
        : `${API_BASE}/quotes/product4/stage1`;

      const method = payload.quoteNumber ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

      const data: Stage1Response = await response.json();
      return data;
    } catch (err: any) {
      const message = err.message || 'Failed to save quote';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { saveQuoteNext, loading, error };
}