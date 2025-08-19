import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { AgentSummary, Page, PolicyRow } from "../../utils/types";

export function usePolicies(page = 1, limit = 10) {
  const [data, setData] = useState<Page<PolicyRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get<Page<PolicyRow>>(`/agents/me/policies?page=${page}&limit=${limit}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [page, limit]);

  return { data, loading, error };
}