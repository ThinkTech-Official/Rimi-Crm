import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

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
  status: string;
}

interface SaveQuoteResponse {
  quote: string;
}

export function useCreateQuoteProduct3() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SaveQuoteResponse | null>(null);

  const saveQuote = async (
    payload: SaveQuotePayload,
  ): Promise<SaveQuoteResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<SaveQuoteResponse>(
        `/quotes/product3/save`,
        payload,
      );

      setResult(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to save quote";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { saveQuote, loading, error, result };
}
