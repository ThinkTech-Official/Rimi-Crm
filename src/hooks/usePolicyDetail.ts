import { useState, useEffect } from 'react';

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

  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  expiryDate?: string;
  gender?: string;
  premium?: number;
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

  beneficiaryName?: string;
  beneficiaryRelation?: string;

  premiumTotal?: number;
  paymentOption?: string;
  creditCardLast4?: string;
  paymentHistory?: any[];
}

const baseUrl = "http://localhost:3000"

export function usePolicyDetail(id: string | null) {
  const [data, setData] = useState<PolicyDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${baseUrl}/policies/${id}`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text() || res.statusText);
        console.log('from use policy details ',res)
        // return res.json() as Promise<PolicyDetail>;
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => {
        setLoading(false)
        console.log('from use policy details 2', data)
  });
  }, [id]);

  return { data, loading, error };
}
