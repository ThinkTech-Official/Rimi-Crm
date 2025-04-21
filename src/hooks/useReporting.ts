// src/hooks/useReporting.ts

import { useState } from 'react';

export interface ReportingPayload {
  product: string;
  reportType: string;
  startDate: string;
  endDate: string;
  emailTo: string;
  emailCc?: string;
}

export function useReporting() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [result, setResult] = useState<any>(null);

  async function sendReport(data: ReportingPayload) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/reporting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok){
        // throw new Error(`Status ${res.status}`);
        return res
      } 
      const json = await res.json();
      setResult(json);
      return json
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { sendReport, loading, error, result };
}
