import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export function useCategories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any>(null);


  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    setCategories(null);
    try {
      const res = await axiosInstance.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };
  const addCategory = async (name: string) => {
    setLoading(true);
    setError(null);
    setCategories(null);
    try {
      const res = await axiosInstance.post('/categories', { name });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    setLoading(true);
    setError(null);
    setCategories(null);
    try {
      await axiosInstance.delete(`/categories/${id}`);
      await fetchCategories();
    } catch (err) {
      console.error(err);
      setError("Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return {
    loading,
    error,
    categories,
    fetchCategories,
    addCategory,
    deleteCategory,
  };
}
