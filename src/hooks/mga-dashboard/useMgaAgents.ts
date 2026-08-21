// import { useState, useEffect } from 'react';

// interface MgaAgent {
//   id: string;
//   agentCode: string;
//   name: string;
//   email: string;
//   joinedDate: string;
//   validity: string;
//   status: 'ACTIVE' | 'INACTIVE';
//   commissionPercent: number;
//   totalQuotes: number;
//   totalPolicies: number;
// }

// interface MgaAgentsResponse {
//   items: MgaAgent[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// export const useMgaAgents = (page: number = 1, limit: number = 10) => {
//   const [data, setData] = useState<MgaAgentsResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMgaAgents = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(`/api/mga/me/agents?page=${page}&limit=${limit}`, {
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
//         setError(err instanceof Error ? err.message : 'Failed to fetch agents');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMgaAgents();
//   }, [page, limit]);

//   return { data, loading, error };
// };



import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface MgaAgent {
  id: string;
  agentCode: string;
  name: string;
  email: string;
  joinedDate: string;
  validity: string;
  status: 'ACTIVE' | 'INACTIVE';
  commissionPercent: number;
  totalQuotes: number;
  totalPolicies: number;
}

interface MgaAgentsResponse {
  items: MgaAgent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useMgaAgents(page: number = 1, limit: number = 10) {
  const [data, setData] = useState<MgaAgentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get<MgaAgentsResponse>(`/mga/me/agents?page=${page}&limit=${limit}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [page, limit]);

  

  return { data, loading, error };
}