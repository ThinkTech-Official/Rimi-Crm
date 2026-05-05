import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { PolicyDetail } from "./usePolicyDetail";

export interface ModifyApplicant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  province?: string;
  relation?: string;
  PreExCoverage?: string;
}

export interface RefundData {
  originalExpiryDate: string;
  newExpiryDate: string;
  daysToRefund: number;
  maxRefundable: number;
  transactionFee: number;
  netRefundAmount: number;
}

export interface PremiumRecalculation {
  originalPremium: number;
  newPremium: number;
  premiumDifference: number;
}

export interface ModifyPolicyData {
  language?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  email: string;
  additionalEmail?: string;
  phoneNumber?: string;
  street: string;
  street2?: string;
  city: string;
  province: string;
  countryCode: string;
  postalCode: string;
  effectiveDate?: string;
  expiryDate: string;
  destination: string;
  deductible: string;
  applicantOnSuperVisa?: string;
  superVisaYears?: string;

  // New product-specific fields
  tripCost?: number;
  dateBooked?: string;
  tripCancellationDeluxe?: boolean;
  travelingThroughUS?: string;
  applicantTravelThroughUs?: string;
  usTravelDays?: string | number;
  numberOfDaysPerTrip?: string | number;
  plan?: string;
  beneficiaryName?: string;
  beneficiaryRelation?: string;
  relationshipToInsured?: string;
  provinceStateResidence?: string;
  legalGuardianName?: string;

  coverage?: string;
  applicantInCanada?: string;

  applicants?: ModifyApplicant[];
  refund?: RefundData;
  premiumDifference?: number;
  premiumRecalculation?: PremiumRecalculation;
  lastKnownUpdatedAt: string;
}

export const useModifyPolicy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modifyPolicy = async (
    policyId: string,
    data: ModifyPolicyData,
  ): Promise<{
    success: boolean;
    message: string;
    refundProcessed: boolean;
    refundAmount?: number;
    policy?: PolicyDetail;
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(
        `/policies/${policyId}/modify`,
        data,
      );
      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while modifying policy";
      setError(message);
      return { success: false, message } as any;
    } finally {
      setLoading(false);
    }
  };

  const calculateRefund = async (
    policyId: string,
    originalExpiryDate: string,
    newExpiryDate: string,
    originalPremium: number,
    originalCoverageLength: number,
  ): Promise<{
    daysToRefund: number;
    premiumPerDay: number;
    maxRefundable: number;
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        `/policies/${policyId}/calculate-refund`,
        {
          originalExpiryDate,
          newExpiryDate,
          originalPremium,
          originalCoverageLength,
        },
      );

      const result = response.data;
      return {
        daysToRefund: result.daysToRefund,
        premiumPerDay: result.premiumPerDay,
        maxRefundable: result.maxRefundable,
      };
    } catch (err: any) {
      setError(err.message || "An error occurred while calculating refund");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const calculateModificationPreview = async (
    policyId: string,
    newEffectiveDate: string,
    newExpiryDate: string,
  ): Promise<{
    success: boolean;
    originalPremium: number;
    newPremium: number;
    difference: number;
    originalCovLen: number;
    newCovLen: number;
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        `/policies/${policyId}/calculate-modification-preview`,
        {
          newEffectiveDate,
          newExpiryDate,
        },
      );
      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while calculating modification preview";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    modifyPolicy,
    calculateRefund,
    calculateModificationPreview, // ← ADD
  };

  // return {
  //   loading,
  //   error,
  //   modifyPolicy,
  //   calculateRefund,
  // };
};
