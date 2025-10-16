import { useState } from "react";

export interface Stage2PayloadProduct2 {
  quoteNumber: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    province: string;
  };
  contactInfo: {
    additionalEmail: string;
    phoneNumber: string;
    legalGuardianName: string;
  };
  beneficiary: {
    beneficiaryName: string;
    relationshipToInsured: string;
    address: string;
    city: string;
    country: string;
  };
}

interface CompleteApplicationResponseProduct2 {
  success: boolean;
  policyNumber?: string;
  message: string;
}

export function useQuoteUpdateProduct2() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CompleteApplicationResponseProduct2 | null>(
    null
  );

  const completeApplication = async (
    payload: Stage2PayloadProduct2
  ): Promise<CompleteApplicationResponseProduct2> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      console.log("Completing Product 2 application with payload:", payload);

      // Simulate API call
      // const response = await fetch('/api/product2/complete-application', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // const result = await response.json();

      // Mock response for now
      const mockResponse: CompleteApplicationResponseProduct2 = {
        success: true,
        policyNumber: "POL-STUDY-" + Math.floor(Math.random() * 10000),
        message: "Application completed successfully",
      };

      setData(mockResponse);
      return mockResponse;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to complete application";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { completeApplication, loading, error, data };
}