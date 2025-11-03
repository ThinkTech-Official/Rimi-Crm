
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../../utils/urls';

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/categories`);
      setCategories(response.data);
    } catch (err: any) {
      console.error('Fetch categories error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/categories`, { name });
      await fetchCategories(); // Refresh list
      return response.data;
    } catch (err: any) {
      console.error('Add category error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to add category';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    addCategory,
    refetch: fetchCategories,
  };
};