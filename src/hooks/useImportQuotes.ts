import { useState } from 'react';
import { API_BASE } from '../utils/urls';

export interface ImportResult {
  message: string;
  errors: { row: number; error: string }[];
}

export function useImportQuotes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ImportResult | null>(null);

  const baseUrl = `${API_BASE}`

  async function importQuotes(file: File) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${baseUrl}/quotes/import`, {
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

  return { importQuotes, loading, error, data };
}