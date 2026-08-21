// // src/hooks/useReporting.ts

// import { useState } from 'react';
// import { API_BASE } from '../utils/urls';

// export interface ReportingPayload {
//   product: string;
//   reportType: string;
//   startDate: string;
//   endDate: string;
//   emailTo: string;
//   emailCc?: string;
// }

// export function useReporting() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string|null>(null);
//   const [result, setResult] = useState<any>(null);

//   async function sendReport(data: ReportingPayload) {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_BASE}/reporting`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (!res.ok){
//         // throw new Error(`Status ${res.status}`);
//         return res
//       } 
//       const json = await res.json();
//       setResult(json);
//       return json
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { sendReport, loading, error, result };
// }



// =============================================





import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

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
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  async function sendReport(data: ReportingPayload) {
    setLoading(true);
    setError(null);
    setResult(null); // Clear previous result
    
    try {
      // Convert dates to ISO8601 format
      const payload = {
        ...data,
        startDate: new Date(data.startDate + 'T00:00:00').toISOString(),
        endDate: new Date(data.endDate + 'T23:59:59').toISOString(), // End of day
      };

      const res = await axiosInstance.post('/reporting', payload);

      setResult(res.data);
      return res.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'An unexpected error occurred';
      setError(errorMsg);
      console.error('Reporting error:', err);
    } finally {
      setLoading(false);
    }
  }

  return { sendReport, loading, error, result };
}