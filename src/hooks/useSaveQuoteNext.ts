
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Applicant } from './useSaveQuote';

export interface QuoteNextPayload {
  primaryFirstName:        string;
  primaryLastName:         string;
  primaryDateOfBirth:      string;
  primaryEmail:            string;
  coverageForPreMedCon:    boolean;
  applicantNumber:         number;
  applicants:              any[];
  countryOfOrigin:         string;
  inCanada:                'yes' | 'no' | '';
  superVisa:               'yes' | 'no' | '';
  superVisaYears:          '1' | '2' | '';
  destinationProvince:     string;
  effectiveDate:           string;
  expiryDate:              string;
  coverageLength:          string;
  policyType:              string;
  coverageOption:          string;
  deductible:              number;
  paymentOption:           'lump-sum' | 'monthly-installments';
  agentCode:               string;
  product:                 string;
  quoteNumber?:            string | null;
}

export interface QuoteNextResponse {
  quoteId: string;
  quoteNumber:         string;
  effectiveDate:       string;
  expiryDate:          string;
  coverageLength:      string;
  numberOfTravellers:  number;
  policyType:          string;
  coverageLimit:       string;
  deductible:          number;
  destinationProvince: string;
  quoteAmount:         number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  preExMedCov: string;
  email: string;
  applicants: Applicant[]
}

const baseUrl = 'http://localhost:3000'

export function useSaveQuoteNext() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<Error | null>(null);
  const [data,    setData]    = useState<QuoteNextResponse | null>(null);

  const token = useSelector((state: any) => state.auth.token) as string | null;

  const saveQuoteNext = useCallback(

    async (payload: QuoteNextPayload) => {
      setLoading(true);
      setError(null);

      try {
        // If we already have a quoteNumber, do PUT (upsert), otherwise POST
        const method = payload.quoteNumber ? 'PUT' : 'POST';
        const url =
          payload.quoteNumber
            ? `${baseUrl}/quotes/stage1/${payload.quoteNumber}`
            : `${baseUrl}/quotes/stage1`;

        const res = await fetch(url, {
          method,
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: QuoteNextResponse = await res.json();
        setData(json);
        return json;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { saveQuoteNext, loading, error, data };
}
