import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { AgentSummary } from "../../utils/types";

export function useAgentSummary() {
  const [data, setData] = useState<AgentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get<AgentSummary>("/agents/me/summary")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}