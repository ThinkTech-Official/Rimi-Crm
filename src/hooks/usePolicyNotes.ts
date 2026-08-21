import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export function usePolicyNotes(policyId: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<Note[]>(
        `/policies/${policyId}/notes`,
      );
      setNotes(res.data);
    } catch (e: any) {
      setError(e.message || "Could not load notes");
    } finally {
      setLoading(false);
    }
  }, [policyId]);

  const addNote = useCallback(
    async (content: string) => {
      try {
        const res = await axiosInstance.post<Note>(
          `/policies/${policyId}/notes`,
          { content },
        );
        // newest first
        setNotes((prev) => [res.data, ...prev]);
      } catch (e: any) {
        setError(e.message || "Could not add note");
      }
    },
    [policyId],
  );

  useEffect(() => {
    if (policyId) fetchNotes();
  }, [policyId, fetchNotes]);

  return { notes, loading, error, addNote };
}
