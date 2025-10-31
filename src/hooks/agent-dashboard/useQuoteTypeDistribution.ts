import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface QuoteTypeDistribution {
  policyType: string;
  count: number;
}

export function useQuoteTypeDistribution() {
  const [data, setData] = useState<QuoteTypeDistribution[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance
      .get<QuoteTypeDistribution[]>("/agents/me/quote-type-distribution")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}