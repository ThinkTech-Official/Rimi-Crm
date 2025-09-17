import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Page, PolicyRow, QuoteRow } from "../../utils/types";


export function useMgaAgentQuotes(agentCode: string, page = 1, limit = 10) {
  const [data, setData] = useState<Page<QuoteRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!agentCode) return;

    setLoading(true);
    setError(null);

    // MGA endpoint to get quotes for a specific agent
    axiosInstance.get<Page<QuoteRow>>(`/mga/me/agents/${agentCode}/quotes?page=${page}&limit=${limit}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [agentCode, page, limit]);

  return { data, loading, error };
}