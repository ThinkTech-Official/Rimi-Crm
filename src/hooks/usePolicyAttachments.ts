import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:3000";

export interface Attachment {
  id: string;
  url: string;
  originalName: string;
  description?: string;
  createdAt: string;
}

export function usePolicyAttachments(policyId: string) {
  const [items, setItems]       = useState<Attachment[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string|null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<Attachment[]>(`${baseUrl}/policies/${policyId}/attachments`);
      setItems(res.data);
    } catch (e: any) {
      setError(e.message || 'Cannot load attachments');
    } finally {
      setLoading(false);
    }
  }, [policyId]);

  const add = useCallback(async (file: File, description?: string) => {
    const form = new FormData();
    form.append('file', file);
    if (description) form.append('description', description);

    try {
      const res = await axios.post<Attachment>(
        `${baseUrl}/policies/${policyId}/attachments`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setItems(prev => [res.data, ...prev]);
    } catch (e: any) {
      setError(e.message || 'Cannot upload attachment');
    }
  }, [policyId]);

  useEffect(() => {
    if (policyId) fetch();
  }, [policyId, fetch]);

  return { items, loading, error, add };
}
