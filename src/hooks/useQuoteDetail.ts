import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000';

export interface QuoteApplicant {
  index: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  province?: string;
}

export interface QuoteDetail {
  id: string;
  quoteNumber?: string;
  covEffDate?: string;
  covExpDate?: string;
  covLen?: string;
  policyType?: string;
  destProv?: string;
  applicantInCanada?: string;
  applicantOnSuperVisa?: string;
  coverage?: string;
  deductible?: string;
  destination?: string;
  applicantTravelThroughUs?: string;

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
  street?: string;
  city?: string;
  province?: string;
  countryCode?: string;
  product?: string;
  schoolName?: string;
  status?: string;
  dateIssued?: string;
  lastModified?: string;
  premium?: number;
  paidPremium?: number;
  coverageOption?: string;

  agentCode: string;
  createdAt: string;
  updatedAt: string;

  applicants: QuoteApplicant[];
}

export function useQuoteDetail(id: string | null) {
  const [data, setData] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setError('No ID provided');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${baseUrl}/quotes/search/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text() || res.statusText);
        }
        return res.json() as Promise<QuoteDetail>;
      })
      .then((quote) => {
        console.log(quote)
        setData(quote)
  })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}