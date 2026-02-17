import { useState, useEffect, useCallback } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';

export interface DocumentItem {
  id: string;
  filename: string;
  url: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategorizedDocuments {
  [category: string]: DocumentItem[];
}

export const useDocuments = () => {
  // const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [categorizedDocuments, setCategorizedDocuments] = useState<CategorizedDocuments>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const fetchDocuments = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axiosInstance.get(`/documents`);
  //     setDocuments(response.data);
  //   } catch (err: any) {
  //     console.error('Fetch documents error:', err);
  //     setError(err.response?.data?.message || err.message || 'An error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const fetchCategorizedDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/documents/categorized`);
      setCategorizedDocuments(response.data);
    } catch (err: any) {
      console.error('Fetch categorized documents error:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(async (file: File, category: string = 'General') => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const response = await axiosInstance.post(
        `/documents/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // Refresh documents after upload
      await fetchCategorizedDocuments();
      
      return response.data;
    } catch (err: any) {
      console.error('Upload document error:', err);
      setError(err.response?.data?.message || err.message || 'Upload failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchCategorizedDocuments]);

  const updateDocument = useCallback(async (
    id: string,
    updateData: { filename?: string; category?: string }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(
        `/documents/${id}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Refresh documents after update
      await fetchCategorizedDocuments();
      
      return response.data;
    } catch (err: any) {
      console.error('Update document error:', err);
      setError(err.response?.data?.message || err.message || 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchCategorizedDocuments]);

  const deleteDocument = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/documents/${id}`);
      
      // Refresh documents after deletion
      await fetchCategorizedDocuments();
    } catch (err: any) {
      console.error('Delete document error:', err);
      setError(err.response?.data?.message || err.message || 'Delete failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchCategorizedDocuments]);

  useEffect(() => {
    fetchCategorizedDocuments();
  }, [fetchCategorizedDocuments]);

  return {
    // documents,
    categorizedDocuments,
    loading,
    error,
    uploadDocument,
    updateDocument,
    deleteDocument,
    refetch: fetchCategorizedDocuments,
  };
};