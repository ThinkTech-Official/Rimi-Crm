// src/hooks/useUserUpload.ts
import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../utils/urls';

export type UploadResult = {
  loading: boolean;
  message: string;
  error: string;
};

const baseUrl = `${API_BASE}`

export function useUserUpload(): [
  (file: File | null) => Promise<void>,
  UploadResult
] {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const upload = async (file: File | null) => {
    setMessage('');
    setError('');

    if (!file) {
      setError('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/users/import`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message || 'Import successful');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Import failed');
    } finally {
      setLoading(false);
    }
  };

  return [upload, { loading, message, error }];
}