import { useEffect, useState } from "react";
import { API_BASE } from "../utils/urls";

export function useCategories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any>(null);
  const localAddress = `${API_BASE}`;

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    setCategories(null);
    try {
      const res = await fetch(`${localAddress}/categories`);
      const json = await res.json();
      setCategories(json);
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
      const res = await fetch(`${localAddress}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      setCategories(json);
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
      await fetch(`${localAddress}/categories/${id}`, {
        method: "DELETE",
      });
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
