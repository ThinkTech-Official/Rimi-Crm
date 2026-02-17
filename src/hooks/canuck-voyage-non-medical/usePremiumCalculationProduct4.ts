import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface PremiumCalculationData {
  tripCost: number;
  numberOfTravellers: number;
  tripCancellationDeluxe: boolean;
  applicants: { age: number }[];
}

interface PremiumResponse {
  totalPremium: number;
  breakdown: {
    basePremium: number;
    deluxePremium?: number;
    finalPremium: number;
  };
}

export function usePremiumCalculationProduct4(
  data: PremiumCalculationData,
  shouldCalculate: boolean,
) {
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<
    PremiumResponse["breakdown"] | null
  >(null);
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
        const response = await axiosInstance.post<PremiumResponse>(
          `/premium/product4/calculate`,
          data,
          {
            signal: controller.signal,
          },
        );

        const result: PremiumResponse = response.data;
        setTotalPremium(result.totalPremium);
        setBreakdown(result.breakdown);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          const message = err.message || "Failed to calculate premium";
          setError(message);
          console.error("Premium calculation error:", err);
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
    data.tripCost,
    data.numberOfTravellers,
    data.tripCancellationDeluxe,
    JSON.stringify(data.applicants),
    shouldCalculate,
  ]);

  return { totalPremium, breakdown, loading, error };
}
