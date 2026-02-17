import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export interface DocumentItem {
  id: string;
  filename: string;
  url?: string;
  createdAt?: string;
}



export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await axiosInstance.get<DocumentItem[]>(`/documents`);
      setDocuments(Array.isArray(resp.data) ? resp.data : []);
      console.log(resp)
      console.log("documentss",documents)
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
      const resp = await axiosInstance.post<DocumentItem>(
        `/documents/upload`,
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
      await axiosInstance.delete(`/documents/delete/${id}`);
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
