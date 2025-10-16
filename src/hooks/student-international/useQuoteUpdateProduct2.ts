import { useState } from "react";
import { API_BASE } from "../../utils/urls";

export interface Stage2PayloadProduct2 {
  quoteNumber: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
    province: string;
  };
  contactInfo: {
    additionalEmail?: string;
    phoneNumber: string;
    legalGuardianName?: string;
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
  quoteNumber: string;
  quoteId: string;
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
      console.log("Completing Product 2 application with payload:", payload);

      // 🔥 Call backend API with cookie credentials
      const response = await fetch(`${API_BASE}/quotes/product2/stage2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 🔑 This sends the HTTP-only cookie
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete application');
      }

      const result: CompleteApplicationResponseProduct2 = await response.json();
      console.log("Product 2 application completed successfully:", result);

      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to complete application";
      console.error("Error completing Product 2 application:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { completeApplication, loading, error, data };
}