import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export interface QuoteApplicant {
  index: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phoneNumber?: string;
  province?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  country?: string;
  relation?: string;
  gender?: string;
  PreExCoverage?: string;
  additionalEmail?: string;
  legalGuardianName?: string;
  beneficiaryName?: string;
  relationshipToInsured?: string;
  beneficiaryRelation?: string;
  healthQuestionnaire?: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export interface QuoteDetail {
  id: string;
  quoteNumber?: string;
  covEffDate?: string;
  covExpDate?: string;
  covLen?: string;
  coverageLength?: string;
  policyType?: string;
  destProv?: string;
  destinationProvince?: string;
  destinationCountry?: string;
  applicantInCanada?: string;
  inCanada?: string;
  applicantOnSuperVisa?: string;
  superVisa?: string;
  superVisaYears?: string;
  coverage?: string;
  deductible?: string | number;
  destination?: string;
  applicantTravelThroughUs?: string;
  travelingThroughUS?: string;
  usTravelDays?: number;
  numberOfDaysPerTrip?: number;
  tripCost?: number;
  dateBooked?: string;
  tripCancellationDeluxe?: boolean;
  paymentOption?: string;
  plan?: string | number;

  policyNumber?: string;
  firstName: string;
  lastName: string;
  gender?: string;
  studentId?: string;
  dateOfBirth?: string;
  countryOfOrigin?: string;
  effectiveDate?: string;
  expiryDate?: string;
  email?: string;
  phoneNumber?: string;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  countryCode?: string;
  postalCode?: string;
  product?: string;
  schoolName?: string;
  status?: string;
  dateIssued?: string;
  lastModified?: string;
  premium?: number;
  paidPremium?: number;
  coverageOption?: string;
  coverageLimit?: string;

  additionalEmail?: string;
  legalGuardianName?: string;
  beneficiaryName?: string;
  relationshipToInsured?: string;
  beneficiaryRelation?: string;

  agentCode: string;
  createdAt: string;
  updatedAt: string;
  coverageForPreMedCon?: string;
  preExMedCov?: string;

  healthQuestionnaire?: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  applicants: QuoteApplicant[];
}

export function useQuoteDetail(id: string | null) {
  const [data, setData] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setError("No ID provided");
      return;
    }

    setLoading(true);
    setError(null);

    axiosInstance.get<QuoteDetail>(`/quotes/search/${id}`)
      .then((response) => {
        const quote = response.data;
        console.log(quote);
        setData(quote);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}
