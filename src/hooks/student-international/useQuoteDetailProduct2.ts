import { useState, useEffect } from "react";

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
  street: string;
  street2?: string;
  city: string;
  province: string;
  countryCode: string;
  postalCode?: string;
  beneficiaryName?: string;
  beneficiaryRelation?: string;
  premium: number;
  paidPremium: number;
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
        // TODO: Replace with actual API endpoint
        console.log("Fetching Product 2 quote detail for ID:", quoteId);

        // Simulate API call
        // const response = await fetch(`/api/product2/quote/${quoteId}`);
        // const result = await response.json();

        // Mock data for now
        const mockData: QuoteDetailProduct2 = {
          quoteId: quoteId,
          quoteNumber: "Q-STUDY-" + Math.floor(Math.random() * 10000),
          product: "Secure Study RIMI International Students to Canada",
          status: "Active",
          effectiveDate: "2025-01-15",
          expiryDate: "2025-06-15",
          covLen: 152,
          policyType: "Enhanced",
          destProv: "ON",
          countryOfOrigin: "IN",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          additionalEmail: "parent@example.com",
          phoneNumber: "+1234567890",
          legalGuardianName: "Jane Doe",
          applicants: [],
          street: "123 Main St",
          street2: "Apt 4B",
          city: "Toronto",
          province: "ON",
          countryCode: "CA",
          postalCode: "M5H 2N2",
          beneficiaryName: "Jane Doe",
          beneficiaryRelation: "Parent",
          premium: 450.0,
          paidPremium: 450.0,
        };

        setData(mockData);
      } catch (err: any) {
        const errorMessage = err.message || "Failed to fetch quote details";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchQuoteDetail();
  }, [quoteId]);

  return { data, loading, error };
}