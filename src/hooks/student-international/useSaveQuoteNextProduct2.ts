import { useState } from "react";
import { API_BASE } from "../../utils/urls";
import { useSelector } from "react-redux";

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

  const token = useSelector((state: any) => state.auth.token) as string | null;

  const saveQuoteNext = async (
    payload: SaveQuotePayloadProduct2
  ): Promise<SaveQuoteResponseProduct2> => {
    setLoading(true);
    setError(null);

    try {
      console.log("Saving Product 2 quote with payload:", payload);

      // Determine endpoint based on whether we're creating or updating
      const endpoint = payload.quoteNumber
        ? `${API_BASE}/quotes/product2/stage1/${payload.quoteNumber}` // Update existing
        : `${API_BASE}/quotes/product2/stage1`; // Create new
      
      const method = payload.quoteNumber ? 'PUT' : 'POST';

      // 🔥 Call backend with credentials: 'include' to send cookie
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include', // 🔑 This sends the HTTP-only cookie
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new Error(errorData.message || 'Failed to save quote');
      }

      const result: SaveQuoteResponseProduct2 = await response.json();
      console.log("Product 2 quote saved successfully:", result);

      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to save quote";
      console.error("Error saving Product 2 quote:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { saveQuoteNext, loading, error, data };
}