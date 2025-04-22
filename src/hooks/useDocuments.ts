



import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface DocumentItem {
  id: string;
  filename: string;
  url?: string;
  createdAt?: string;
}

const localAddress = 'http://localhost:3000'

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await axios.get<DocumentItem[]>(`${localAddress}/documents`);
      setDocuments(Array.isArray(resp.data) ? resp.data : []);
      console.log(resp)
      console.log(documents)
    } catch (err) {
      console.error(err);
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const resp = await axios.post<DocumentItem>(
        `${localAddress}/documents/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setDocuments((prev) => [...prev, resp.data]);
      return resp.data;
    } catch (err) {
      console.error(err);
      setError("Failed to upload document.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${localAddress}/documents/delete/${id}`);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete document.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument,
  };
}
