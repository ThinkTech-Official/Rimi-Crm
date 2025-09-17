import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Page, PolicyRow, QuoteRow } from "../../utils/types";

// MGA hook to get policies for a specific agent
export function useMgaAgentPolicies(agentCode: string, page = 1, limit = 10) {
  const [data, setData] = useState<Page<PolicyRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!agentCode) return;

    setLoading(true);
    setError(null);

    // MGA endpoint to get policies for a specific agent
    axiosInstance.get<Page<PolicyRow>>(`/mga/me/agents/${agentCode}/policies?page=${page}&limit=${limit}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [agentCode, page, limit]);

  return { data, loading, error };
}