

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';


interface UploadDocumentsResponse {
  message: string;
  user: any;
}

export function useUploadDocuments() {
  const [data, setData] = useState<UploadDocumentsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const uploadDocuments = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post(`/auth/upload-documents`, formData);
      const result = response.data;
      setData(result);
      setSuccess(true);
      alert('Documents uploaded successfully! Waiting for admin verification.');
      return result;
    } catch (err: any) {
      setError(err.message);
      alert(`Failed to upload documents: ${err.message}`);
      console.error('Error uploading documents:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { data, loading, error, success, uploadDocuments };
}