import { useState, useEffect } from 'react';
import axios from 'axios';

export interface PolicyApplicant {
  id: string;
  index: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  email?: string;
  province?: string;
  policyNumber?: string;
  gender?: string;
  premium?: string;
  PreExCoverage?: string;
  relation?: string;
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

  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  expiryDate?: string;
  gender?: string;
  premium: number;
  planDetails?: string;
  PreExCoverage?: string;

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

  beneficiaryName?: string;
  beneficiaryRelation?: string;

  premiumTotal?: number;
  paymentOption?: string;
  creditCardLast4?: string;
  paymentHistory?: any[];
}

const baseUrl = "http://localhost:3000";

export function usePolicyDetail(id: string | null) {
  const [data, setData] = useState<PolicyDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axios.get<PolicyDetail>(`${baseUrl}/policies/${id}`)
      .then(response => {
        console.log("Response from backend:", response.data);
        setData(response.data);
      })
      .catch(err => {
        console.error("Error fetching policy details:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { data, loading, error };
}
