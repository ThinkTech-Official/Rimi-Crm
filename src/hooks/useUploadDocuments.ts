import { useState } from "react";
import { API_BASE } from "../utils/urls";

export function useUploadDocuments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any>(null);
  const localAddress = `${API_BASE}`;

  const uploadDocuments = async (files: { file: File; category: string }[]) => {
    setLoading(true);
    setError(null);
    setDocuments(null);

    try {
      const formData = new FormData();

      files.forEach((item, index) => {
        formData.append(`files[${index}]`, item.file);
        formData.append(`categories[${index}]`, item.category);
      });
      const res = await fetch(`${localAddress}/documents/upload`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      setDocuments(json);
      return json;
    } catch (err: any) {
      setError(err.message || "An error occurred while uploading documents");
      console.error("Upload error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${localAddress}/documents`);
      const json = await res.json();
      setDocuments(json);
      return json;
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching documents");
      console.error("Fetch error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadDocuments,
    fetchDocuments,
    loading,
    error,
    documents,
  };
}
