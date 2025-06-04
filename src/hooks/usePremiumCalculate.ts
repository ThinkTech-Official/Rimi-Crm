


import { useState, useEffect, useRef } from 'react';
import { PremiumCalculationData } from '../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step1/Step1STRVCT';

const baseUrl = "http://localhost:3000";

interface PaymentScheduleItem {
  label: string;
  amount: number;
  count?: number;
}

interface PremiumResponse {
  totalPremium: number;
  schedule: PaymentScheduleItem[];
}

export function usePremiumCalculate(
  premiumCalculationData: PremiumCalculationData,
  enabled: boolean
) {
  // const [quotePremium, setQuotePremium] = useState<number>(0);
  const [quoteResponse, setQuoteResponse] = useState<PremiumResponse>({ totalPremium: 0, schedule: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // refs to track request state and dedupe
  const loadingRef = useRef(false);
  const pendingRef = useRef(false);
  // initialize with null so TS is happy
  const lastPayloadKeyRef = useRef<string | null>(null);

  const doFetch = () => {
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    fetch(`${baseUrl}/premium/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(premiumCalculationData),
    })
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        console.log("Premium calculation response:", data); 
        setQuoteResponse(data);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Failed to fetch quote premium');
      })
      .finally(() => {
        loadingRef.current = false;
        setLoading(false);

        // if payload changed while loading, fetch the latest once
        if (pendingRef.current) {
          pendingRef.current = false;
          lastPayloadKeyRef.current = JSON.stringify(premiumCalculationData);
          doFetch();
        }
      });
  };

  useEffect(() => {
    if (!enabled) return;

    const key = JSON.stringify(premiumCalculationData);
    if (loadingRef.current) {
      pendingRef.current = true;
      return;
    }
    if (lastPayloadKeyRef.current === key) {
      return;
    }
    lastPayloadKeyRef.current = key;
    doFetch();
  }, [premiumCalculationData, enabled]);

  return { 
    totalPremium: quoteResponse.totalPremium,
    schedule:    quoteResponse.schedule,
    loading,
    error
  };;
}
