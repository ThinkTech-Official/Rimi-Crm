import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";


interface CommissionRow {
  id: string;
  policyNumber: string;
  agentCode: string;
  grossAmount: number;
  ratePercent: number;
  commissionAmount: number;
  mgaShare: number;
  agentShare: number;
  status: string;
  currency: string;
  createdAt: string;
  paymentHistory: {
    date: string;
    paymentType: string;
    amount: number;
  };
  policy: {
    policyNumber: string;
    firstName: string;
    lastName: string;
    premium: number;
  };
}

interface CommissionsResponse {
  items: CommissionRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  summary: {
    totalCommissions: number;
    totalAmount: number;
    totalMgaShare: number;
    totalAgentShare: number;
  };
}

export function useMgaAgentCommissions(agentCode: string, page = 1, limit = 10) {
  const [data, setData] = useState<CommissionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!agentCode) return;

    setLoading(true);
    setError(null);

    axiosInstance
      .get<CommissionsResponse>(`/mga/me/agents/${agentCode}/commissions?page=${page}&limit=${limit}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [agentCode, page, limit]);

  return { data, loading, error };
}