// src/hooks/useSaveQuote.ts
import { useState, useCallback } from "react";
// import { useSelector } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";

// mirror your types from the component
export interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relation: string;
  preMedCoverage: boolean;
  gender: string;
}

export type YesNo = "" | "yes" | "no";
export type SuperVisaOption = "" | "yes" | "no";
export type SuperVisaYears = "" | "1" | "2";

// export interface CoverageInfo {
//   countryOfOrigin: string
//   inCanada: YesNo
//   superVisa: SuperVisaOption
//   superVisaYears: SuperVisaYears
//   destinationProvince: string
//   effectiveDate: string
//   expiryDate: string
//   coverageLength: string
//   policyType: string
//   coverageOption: string
//   deductible: string
//   paymentOption: 'lump-sum' | 'monthly-installments'
// }

export interface QuotePayload {
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  coverageForPreMedCon: boolean;
  applicantNumber: number;
  applicants: Applicant[];
  countryOfOrigin: string;
  inCanada: YesNo;
  superVisa: SuperVisaOption;
  superVisaYears: SuperVisaYears;
  destinationProvince: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: string;
  policyType: string;
  coverageOption: string;
  deductible: number;
  paymentOption: "lump-sum" | "monthly-installments";
  agentCode: string;
  product: string;
  quotePremium: number;
  quoteNumber?: string;
  primaryApplicantGender: string;
  plan: number;
}

export function useSaveQuote() {
  // const token = useSelector((state: any) => state.auth.token) as string | null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const saveQuote = useCallback(async (payload: QuotePayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post<{ quote: number }>(
        "/quotes/save",
        payload,
      );

      const data = res.data;
      setResult(data.quote);
      // console.log('from data save quote result state',result)
      console.log("from data save quote data", data);
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to save quote";
      setError(errorMessage);
      console.log(
        "from useSave Qoutes error on response not ok 122",
        errorMessage,
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { saveQuote, loading, error, result };
}
