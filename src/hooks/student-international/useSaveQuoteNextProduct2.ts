import { useState } from "react";

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
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  applicants: any[];
}

export function useSaveQuoteNextProduct2() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SaveQuoteResponseProduct2 | null>(null);

  const saveQuoteNext = async (
    payload: SaveQuotePayloadProduct2
  ): Promise<SaveQuoteResponseProduct2> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      console.log("Saving Product 2 quote with payload:", payload);

      // Simulate API call
      // const response = await fetch('/api/product2/save-quote', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // const result = await response.json();

      // Mock response for now
      const mockResponse: SaveQuoteResponseProduct2 = {
        quoteId: "PROD2-" + Date.now(),
        quoteNumber: "Q-STUDY-" + Math.floor(Math.random() * 10000),
        effectiveDate: payload.effectiveDate,
        expiryDate: payload.expiryDate,
        coverageLength: Number(payload.coverageLength),
        numberOfTravellers: payload.applicantNumber + 1,
        policyType: payload.policyType,
        destinationProvince: payload.destinationProvince,
        quoteAmount: 450.0, // This would come from backend calculation
        dateOfBirth: payload.primaryDateOfBirth,
        firstName: payload.primaryFirstName,
        lastName: payload.primaryLastName,
        gender: payload.primaryApplicantGender,
        email: payload.primaryEmail,
        applicants: payload.applicants,
      };

      setData(mockResponse);
      return mockResponse;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to save quote";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { saveQuoteNext, loading, error, data };
}