import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

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
    null,
  );

  const completeApplication = async (
    payload: Stage2PayloadProduct2,
  ): Promise<CompleteApplicationResponseProduct2> => {
    setLoading(true);
    setError(null);

    try {
      console.log("Completing Product 2 application with payload:", payload);

      // 🔥 Call backend API with cookie credentials
      const response =
        await axiosInstance.post<CompleteApplicationResponseProduct2>(
          `/quotes/product2/stage2`,
          payload,
        );

      const result: CompleteApplicationResponseProduct2 = response.data;
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
