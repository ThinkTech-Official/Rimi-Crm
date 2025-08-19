import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { AgentSummary, Page, QuoteRow } from "../../utils/types";

export function useQuotes(page = 1, limit = 10) {
  const [data, setData] = useState<Page<QuoteRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get<Page<QuoteRow>>(`/agents/me/quotes?page=${page}&limit=${limit}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [page, limit]);

  return { data, loading, error };
}