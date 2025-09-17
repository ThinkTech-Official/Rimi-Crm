// import { useState, useEffect } from 'react';

// interface MgaSummary {
//   totalPolicies: number;
//   totalQuotes: number;
//   commissionPercent: number;
//   monthlyPremiums: Array<{ ym: string; total: number }>;
//   totalCommissions: number;
//   currentMonthCommissions: number;
//   totalAgents: number;
// }

// export const useMgaSummary = () => {
//   const [data, setData] = useState<MgaSummary | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMgaSummary = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('/api/mga/me/summary', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch MGA summary');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMgaSummary();
//   }, []);

//   return { data, loading, error };
// };



import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface MgaSummary {
  totalPolicies: number;
  totalQuotes: number;
  commissionPercent: number;
  monthlyPremiums: Array<{ ym: string; total: number }>;
  totalCommissions: number;
  currentMonthCommissions: number;
  totalAgents: number;
}

export function useMgaSummary() {
  const [data, setData] = useState<MgaSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get<MgaSummary>("/mga/me/summary")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}