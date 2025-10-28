

import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../utils/urls';


interface UploadDocumentsResponse {
  message: string;
  user: any;
}

export function useUploadDocuments() {
  const [data, setData] = useState<UploadDocumentsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const uploadDocuments = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/auth/upload-documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData - browser will set it with boundary
        },
        credentials: 'include',
        body: formData,
      });

      if (response.status === 401) {
        navigate('/login');
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload documents');
      }

      const result = await response.json();
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
  }, [token, navigate]);

  return { data, loading, error, success, uploadDocuments };
}