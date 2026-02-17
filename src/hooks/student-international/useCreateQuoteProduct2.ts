import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
// import { useSelector } from "react-redux";

interface ApplicantProduct2 {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface CreateQuotePayloadProduct2 {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  applicantNumber: number;
  applicants: ApplicantProduct2[];
  countryOfOrigin: string;
  policyType: string;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
  agentCode: string;
  product: string;
  status: string; // "Inactive" for save
}

interface CreateQuoteResponseProduct2 {
  quote: string; // Returns quote number like "Q-STUDY-ABC12345"
}

export function useCreateQuoteProduct2() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const token = useSelector((state: any) => state.auth.token) as string | null;

  const createQuote = async (
    payload: CreateQuotePayloadProduct2
  ): Promise<CreateQuoteResponseProduct2> => {
    setLoading(true);
    setError(null);

    try {
      console.log("💾 Saving Product 2 quote (Inactive status):", payload);

      const response = await axiosInstance.post<CreateQuoteResponseProduct2>('/quotes/product2/save', payload);

      const result: CreateQuoteResponseProduct2 = response.data;
      console.log("✅ Product 2 quote saved successfully:", result.quote);

      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to save quote";
      console.error("❌ Error saving Product 2 quote:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createQuote, loading, error };
}