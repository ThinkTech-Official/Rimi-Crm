import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface SaveQuotePayloadProduct2 {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  applicantNumber: number;
  applicants: any[];
  countryOfOrigin: string;
  policyType: string;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
  agentCode: string;
  product: string;
  quoteNumber: string | null;
  status: string;
}

interface SaveQuoteResponseProduct2 {
  quoteId: string;
  quoteNumber: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  destinationProvince: string;
  quoteAmount: number;
  dateOfBirth: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  applicants: any[];
  createdAt: string;
}

export function useSaveQuoteNextProduct2() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SaveQuoteResponseProduct2 | null>(null);

  const saveQuoteNext = async (
    payload: SaveQuotePayloadProduct2,
  ): Promise<SaveQuoteResponseProduct2> => {
    setLoading(true);
    setError(null);

    try {
      console.log("Saving Product 2 quote with payload:", payload);

      const url = payload.quoteNumber
        ? `/quotes/product2/stage1/${payload.quoteNumber}`
        : `/quotes/product2/stage1`;

      const res = payload.quoteNumber
        ? await axiosInstance.put<SaveQuoteResponseProduct2>(url, payload)
        : await axiosInstance.post<SaveQuoteResponseProduct2>(url, payload);

      const result: SaveQuoteResponseProduct2 = res.data;
      console.log("Product 2 quote saved successfully:", result);

      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Failed to save quote";
      console.error("Error saving Product 2 quote:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { saveQuoteNext, loading, error, data };
}
