// src/hooks/useAgentCodes.ts
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface UseAgentCodesResult {
  agents: string[];
  loading: boolean;
  error: string | null;
}

export function useAgentCodes(search: string): UseAgentCodesResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;
  const [agents, setAgents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // if empty search, clear list
    if (!search.trim()) {
      setAgents([]);
      return;
    }
    if (!token) {
      setError("No auth token");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(
      `http://localhost:3000/auth/agent-codes?search=${encodeURIComponent(
        search
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data: string[]) => {
        setAgents(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [search, token]);

  return { agents, loading, error };
}
