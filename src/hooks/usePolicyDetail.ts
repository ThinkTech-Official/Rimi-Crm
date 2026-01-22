import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../utils/urls';

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

  product?: string;

  beneficiaryName?: string;
  beneficiaryRelation?: string;

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

    axios.get<PolicyDetail>(`${API_BASE}/policies/${id}`)
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
