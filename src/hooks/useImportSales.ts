import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export interface ImportSalesResult {
  updatedPolicies: number;
  createdPolicies: number;
  createdPayments: number;
  skipped: number;
  errors: { policyNumber: string; error: string }[];
}



export function useImportSales() {
  const [loading, setLoading] = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [data, setData]         = useState<ImportSalesResult | null>(null);

  async function upload(file: File) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const resp = await axiosInstance.post('/policies/import-sales', form);
      setData(resp.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { upload, loading, error, data };
}