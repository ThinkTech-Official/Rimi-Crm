import { useState } from 'react';

export interface ImportResult {
  message: string;
  errors: { row: number; error: string }[];
}

const baseUrl ="http://localhost:3000"

export function useImportPolicies() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ImportResult | null>(null);

  async function importPolicies(file: File) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${baseUrl}/policies/import`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Upload failed');
      }

      const result: ImportResult = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { importPolicies, loading, error, data };
}
