import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

export interface QuoteDetailProduct2 {
  quoteId: string;
  quoteNumber: string;
  product: string;
  status: string;
  effectiveDate: string;
  expiryDate: string;
  covLen: number;
  policyType: string;
  destProv: string;
  countryOfOrigin: string;
  firstName: string;
  lastName: string;
  email: string;
  additionalEmail?: string;
  phoneNumber?: string;
  legalGuardianName?: string;
  applicants: any[];
  street?: string;
  street2?: string;
  city?: string;
  province?: string;
  countryCode?: string;
  postalCode?: string;
  beneficiaryName?: string;
  beneficiaryRelation?: string;
  premium: number;
  paidPremium?: number;
}

export function useQuoteDetailProduct2(quoteId: string | null) {
  const [data, setData] = useState<QuoteDetailProduct2 | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quoteId) {
      setData(null);
      return;
    }

    const fetchQuoteDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching Product 2 quote detail for ID:", quoteId);

        // 🔥 Call backend with cookie credentials
        const response = await axiosInstance.get<QuoteDetailProduct2>(`/quotes/search/${quoteId}`);

        const result: QuoteDetailProduct2 = response.data;
        console.log("Product 2 quote details fetched:", result);

        setData(result);
      } catch (err: any) {
        const errorMessage = err.message || "Failed to fetch quote details";
        console.error("Error fetching Product 2 quote details:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchQuoteDetail();
  }, [quoteId]);

  return { data, loading, error };
}