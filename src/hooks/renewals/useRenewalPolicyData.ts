// src/hooks/renewals/useRenewalPolicyData.ts
import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email?: string;
  province?: string;
  relation?: string;
  PreExCoverage?: string;
  premium?: number;
}

interface PolicyData {
  id: string;
  policyNumber: string;
  product: string;

  // Primary applicant
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  gender: string;

  // Coverage details
  effectiveDate: string;
  expiryDate: string;
  coverageLength?: string;
  covLen?: string;
  policyType?: string;
  coverage?: string;
  deductible?: number;

  // Product 1 specific
  destination?: string;
  destProv?: string;
  applicantInCanada?: string;
  applicantOnSuperVisa?: string;
  countryOfOrigin?: string;
  PreExCoverage?: string;

  // Product 2 specific (International Student)
  legalGuardianName?: string;

  // Product 3 specific (Canuck Voyage Medical)
  destinationCountry?: string;
  applicantTravelThroughUs?: string;
  usTravelDays?: number;
  numberOfDaysPerTrip?: number;

  // Product 4 specific (Canuck Voyage Non-Medical)
  tripCost?: number;
  dateBooked?: string;
  provinceStateResidence?: string;
  tripCancellationDeluxe?: boolean;

  // Contact
  phoneNumber?: string;
  additionalEmail?: string;

  // Address
  street?: string;
  street2?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  countryCode?: string;

  // Beneficiary
  beneficiaryName?: string;
  beneficiaryRelation?: string;

  // Applicants
  applicants: Applicant[];

  // Payment
  premium?: number;
  paymentOption?: string;
}

export function useRenewalPolicyData(policyId: string | null) {
  const [data, setData] = useState<PolicyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!policyId) {
      setLoading(false);
      return;
    }

    const fetchPolicyData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Fetching policy data for renewal:", policyId);

        const response = await axiosInstance.get(`/policies/${policyId}`);

        console.log("Policy data loaded:", response.data);
        setData(response.data);
      } catch (err: any) {
        console.error("Failed to fetch policy data:", err);
        setError(err.response?.data?.message || "Failed to load policy data");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyData();
  }, [policyId]);

  return { data, loading, error };
}
