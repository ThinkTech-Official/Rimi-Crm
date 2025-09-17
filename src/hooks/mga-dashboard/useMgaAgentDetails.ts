// import { useState, useEffect } from 'react';

// interface MgaAgentDetails {
//   id: string;
//   agentCode: string;
//   name: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   company: string;
//   status: 'ACTIVE' | 'INACTIVE';
//   joinedDate: string;
//   validity: string;
//   commissionPercent: number;
//   totalQuotes: number;
//   totalPolicies: number;
//   totalCommissions: number;
//   currentMonthCommissions: number;
// }

// export const useMgaAgentDetails = (agentCode: string) => {
//   const [data, setData] = useState<MgaAgentDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!agentCode) return;

//     const fetchAgentDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(`/api/mga/me/agents/${agentCode}`, {
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
//         setError(err instanceof Error ? err.message : 'Failed to fetch agent details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgentDetails();
//   }, [agentCode]);

//   return { data, loading, error };
// };



import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface MgaAgentDetails {
  id: string;
  agentCode: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinedDate: string;
  validity: string;
  commissionPercent: number;
  totalQuotes: number;
  totalPolicies: number;
  totalCommissions: number;
  currentMonthCommissions: number;
}

export function useMgaAgentDetails(agentCode: string) {
  const [data, setData] = useState<MgaAgentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!agentCode) return;

    axiosInstance.get<MgaAgentDetails>(`/mga/me/agents/${agentCode}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [agentCode]);

  return { data, loading, error };
}