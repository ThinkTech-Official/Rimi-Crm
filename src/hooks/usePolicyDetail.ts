import { useState, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

export interface PolicyApplicant {
  id: string;
  index: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  email?: string;
  province?: string;
  policyNumber?: string;
  individualPolicyNumber?: string;
  gender?: string;
  premium?: string;
  PreExCoverage?: string;
  relation?: string;
  healthQuestionnaire?: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export interface PolicyDetail {
  id: string;
  quoteNumber?: string;
  policyNumber?: string;
  saleDate?: string;
  status?: string;
  language?: string;
  salesChannel?: string;
  agentCode: string;
  agentEmail: string;
  primaryIndividualNumber?: string;

  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  expiryDate?: string;
  gender?: string;
  premium: number;
  plan?: string;
  planDetails?: string;
  PreExCoverage?: string;
  primaryPremium?: string;

  email?: string;
  additionalEmail?: string;
  phoneNumber?: string;
  street?: string;
  street2?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;

  applicants: PolicyApplicant[];

  covEffDate?: string;
  covExpDate?: string;
  covLen?: string;
  policyType?: string;
  countryOfOrigin?: string;
  destProv?: string;
  applicantInCanada?: string;
  applicantOnSuperVisa?: string;
  coverage?: string;
  deductible?: string;
  destination: string;
  effectiveDate: string;
  dateIssued: string;
  countryCode: string;

  product?: string;
  umr?: string;
  provinceStateResidence?: string;
  legalGuardianName?: string;

  dateBooked?: string;
  tripCost?: number;
  tripCancellationDeluxe?: boolean;
  applicantTravelThroughUs?: string;
  travelingThroughUS?: string;
  usTravelDays?: string | number;
  numberOfDaysPerTrip?: string | number;
  coverageOption?: string;
  coverageLimit?: string;
  beneficiaryName?: string;
  beneficiaryRelation?: string;
  relationshipToInsured?: string;
  individualPolicyNumber?: string;

  // Fallback fields
  coverageLength?: number | string;
  destinationProvince?: string;
  inCanada?: string;
  superVisa?: string;
  superVisaYears?: string;
  destinationCountry?: string;

  premiumTotal?: number;
  paymentOption?: string;
  creditCardLast4?: string;
  paymentHistory?: any[];

  healthQuestionnaire?: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };

  createdAt?: string;
  updatedAt?: string;

  stripeSubscriptionScheduleId: any;

  currentCardBrand?: string;
  currentCardLast4?: string;
  currentCardholderName?: string;
  currentCardUpdatedAt?: Date | string;

  // SPLIT POLICY 
  parentPolicyId?: string | null;  // Required for banner to show
  splitAt?: string | null;         
  splitBy?: string | null;       
  splitNotes?: string | null;      
  splitOriginalPremium?: number | null;  
}


export function usePolicyDetail(id: string | null) {
  const [data, setData] = useState<PolicyDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axiosInstance.get<PolicyDetail>(`/policies/${id}`)
      .then(response => {
        console.log("Response from backend:", response.data);
        setData(response.data);
      })
      .catch(err => {
        console.error("Error fetching policy details:", err);
        // A policy outside your scope now returns 404, so surface something
        // meaningful rather than "Request failed with status code 404".
        if (err.response?.status === 404) {
          setError("Policy not found, or you do not have access to it.");
          return;
        }
        const raw = err.response?.data?.message;
        setError(
          Array.isArray(raw)
            ? raw.join(". ")
            : raw || err.message || "Failed to load policy details"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { data, loading, error };
}
