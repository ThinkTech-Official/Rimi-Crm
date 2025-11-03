import { useState, useEffect } from "react";
import { API_BASE } from "../../utils/urls";

interface PremiumCalculationParams {
  policyType: string;
  countryOfOrigin: string;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
  primaryDateOfBirth: string;
  applicants: Array<{ dob: string }>;
  isConfirmed: boolean; // Only calculate if confirmed
}

interface PremiumBreakdown {
  policyType: string;
  dailyRate: number;
  numberOfDays: number;
  numberOfTravellers: number;
  premiumPerTraveller: number;
}

interface PremiumResult {
  totalPremium: number;
  breakdown: PremiumBreakdown;
}

export function usePremiumCalculationProduct2(params: PremiumCalculationParams) {
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ═══════════════════════════════════════════════════════════════
    // Validate: All required fields must be filled AND confirmed
    // ═══════════════════════════════════════════════════════════════
    const isValid =
      params.policyType &&
      params.countryOfOrigin &&
      params.destinationProvince &&
      params.effectiveDate &&
      params.expiryDate &&
      params.coverageLength &&
      Number(params.coverageLength) > 0 &&
      params.primaryDateOfBirth &&
      params.isConfirmed; // 🔑 Must be confirmed!

    if (!isValid) {
      setTotalPremium(0);
      setError(null);
      return;
    }

    // ═══════════════════════════════════════════════════════════════
    // Debounce: Wait 500ms after user stops typing
    // ═══════════════════════════════════════════════════════════════
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("📊 Calculating Product 2 premium...", params);

        const payload = {
          policyType: params.policyType,
          countryOfOrigin: params.countryOfOrigin,
          destinationProvince: params.destinationProvince,
          effectiveDate: params.effectiveDate,
          expiryDate: params.expiryDate,
          coverageLength: Number(params.coverageLength),
          primaryDateOfBirth: params.primaryDateOfBirth,
          applicants: params.applicants,
        };

        const response = await fetch(`${API_BASE}/premium/product2/calculate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to calculate premium');
        }

        const result: PremiumResult = await response.json();
        console.log("✅ Premium calculated:", result.totalPremium);

        setTotalPremium(result.totalPremium);
      } catch (err: any) {
        console.error("❌ Error calculating premium:", err.message);
        setError(err.message || "Failed to calculate premium");
        setTotalPremium(0);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    // Cleanup timeout on dependency change
    return () => clearTimeout(timeoutId);
  }, [
    params.policyType,
    params.countryOfOrigin,
    params.destinationProvince,
    params.effectiveDate,
    params.expiryDate,
    params.coverageLength,
    params.primaryDateOfBirth,
    params.applicants.length, // Re-calculate when applicants change
    params.isConfirmed, // Re-calculate when confirmed
  ]);

  return { totalPremium, loading, error };
}