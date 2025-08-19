import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { AgentSummary, PolicyTypeSlice } from "../../utils/types";

export function usePolicyTypeDistribution() {
  const [data, setData] = useState<PolicyTypeSlice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get<PolicyTypeSlice[]>("/agents/me/policy-type-distribution")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}