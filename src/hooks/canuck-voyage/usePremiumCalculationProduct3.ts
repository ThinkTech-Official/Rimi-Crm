import { useState, useEffect } from 'react';
import axios from 'axios';

interface PremiumCalculationData {
  policyType: string;
  destinationCountry: string;
  travelingThroughUS: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  primaryDateOfBirth: string;
  numberOfDaysPerTrip?: number;
  deductible: number;
  applicants: { dob: string }[];
}

interface PremiumResponse {
  totalPremium: number;
  breakdown: {
    basePremium: number;
    deductibleDiscount: number;
    travelCompanionDiscount?: number;
    finalPremium: number;
  };
}

export function usePremiumCalculationProduct3(
  data: PremiumCalculationData,
  shouldCalculate: boolean
) {
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<PremiumResponse['breakdown'] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldCalculate) {
      setTotalPremium(0);
      setBreakdown(null);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post<PremiumResponse>(
          '/api/premium/product3/calculate',
          data,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        );

        setTotalPremium(response.data.totalPremium);
        setBreakdown(response.data.breakdown);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled');
        } else {
          const message = err.response?.data?.message || 'Failed to calculate premium';
          setError(message);
          console.error('Premium calculation error:', err);
        }
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [
    data.policyType,
    data.destinationCountry,
    data.travelingThroughUS,
    data.effectiveDate,
    data.expiryDate,
    data.coverageLength,
    data.primaryDateOfBirth,
    data.numberOfDaysPerTrip,
    data.deductible,
    JSON.stringify(data.applicants),
    shouldCalculate,
  ]);

  return { totalPremium, breakdown, loading, error };
}