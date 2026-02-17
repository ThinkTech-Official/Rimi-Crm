import { useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';

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
  tripCancellationDeluxe: boolean | null;
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

  const saveQuoteNext = async (payload: Stage1Payload): Promise<Stage1Response> => {
    setLoading(true);
    setError(null);

    try {
      const url = payload.quoteNumber
        ? `/quotes/product4/stage1/${payload.quoteNumber}`
        : `/quotes/product4/stage1`;

      const method = payload.quoteNumber ? 'put' : 'post';

      const response = await axiosInstance[method]<Stage1Response>(url, payload);

      const data: Stage1Response = response.data;
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