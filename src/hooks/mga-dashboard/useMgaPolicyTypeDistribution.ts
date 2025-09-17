// import { useState, useEffect } from 'react';

// interface PolicyTypeDistribution {
//   policyType: string;
//   count: number;
// }

// export const useMgaPolicyTypeDistribution = () => {
//   const [data, setData] = useState<PolicyTypeDistribution[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPolicyTypeDistribution = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('/api/mga/me/policy-type-distribution', {
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
//         setError(err instanceof Error ? err.message : 'Failed to fetch policy distribution');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPolicyTypeDistribution();
//   }, []);

//   return { data, loading, error };
// };


import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface PolicyTypeDistribution {
  policyType: string;
  count: number;
}

export function useMgaPolicyTypeDistribution() {
  const [data, setData] = useState<PolicyTypeDistribution[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get<PolicyTypeDistribution[]>("/mga/me/policy-type-distribution")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}