import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export interface ImportResult {
  message: string;
  errors: { row: number; error: string }[];
}

export function useImportQuotes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ImportResult | null>(null);

  async function importQuotes(file: File) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("/quotes/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result: ImportResult = response.data;
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { importQuotes, loading, error, data };
}
