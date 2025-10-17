import { useState } from 'react';
import axios from 'axios';

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface Stage1Payload {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  provinceOfResidence: string;
  applicantNumber: number;
  applicants: Applicant[];
  policyType: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  destinationCountry: string;
  travelingThroughUS: string;
  usTravelDays?: number;
  numberOfDaysPerTrip?: number;
  deductible: number;
  agentCode: string;
  product: string;
  quoteNumber?: string;
  status: string;
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
  deductible: number;
  quoteAmount: number;
  dateOfBirth: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  createdAt: Date;
  applicants: Applicant[];
}

export function useSaveQuoteNextProduct3() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveQuoteNext = async (payload: Stage1Payload): Promise<Stage1Response> => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = payload.quoteNumber
        ? `/api/quotes/product3/stage1/${payload.quoteNumber}`
        : '/api/quotes/product3/stage1';

      const method = payload.quoteNumber ? 'put' : 'post';

      const response = await axios[method]<Stage1Response>(endpoint, payload, {
        withCredentials: true,
      });

      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to save quote';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { saveQuoteNext, loading, error };
}