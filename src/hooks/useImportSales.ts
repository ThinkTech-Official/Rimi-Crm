import { useState } from "react";

export interface ImportSalesResult {
  updatedPolicies: number;
  createdPolicies: number;
  createdPayments: number;
  skipped: number;
  errors: { policyNumber: string; error: string }[];
}

const baseUrl = "http://localhost:3000"

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
      const resp = await fetch(`${baseUrl}/policies/import-sales`, {
        method: "POST",
        body: form,
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || resp.statusText);
      }
      const json = (await resp.json()) as ImportSalesResult;
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { upload, loading, error, data };
}