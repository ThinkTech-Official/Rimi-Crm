import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { ProfileForm } from "../utils/types";

interface UseUserDetailsResult {
  user: ProfileForm | null;
  loading: boolean;
  error: string | null;
  save: (
    formData: ProfileForm,
    files: { [key: string]: File | null }
  ) => Promise<void>;
  saving: boolean;
  saveError: string | null;
}

export function useUserDetails(id: string): UseUserDetailsResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;
  const [user, setUser] = useState<ProfileForm | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Fetch user on mount or id change
  useEffect(() => {
    if (!id) return;
    if (!token) {
      setError("No auth token");
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/auth/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: ProfileForm) => setUser(data))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  // Save (update) user
  const save = useCallback(
    async (formData: ProfileForm, files: { [key: string]: File | null }) => {
      if (!token) {
        setSaveError("No auth token");
        return;
      }
      setSaving(true);
      setSaveError(null);

      const fd = new FormData();
      // Append form fields except metadata and passwords
      Object.entries(formData).forEach(([key, value]) => {
        if (["createdAt", "updatedAt", "agentCodes", "password", "confirmPassword"].includes(key)) return;
        if (value != null) fd.append(key, String(value));
      });
      // Attach any new files
      Object.values(files).forEach((file) => {
        if (file) fd.append("documents", file);
      });

      try {
        const res = await fetch(`http://localhost:3000/auth/update-user/${id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const updated = await res.json();
        setUser(updated.user);
      } catch (err: any) {
        setSaveError(err.message);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [id, token]
  );

  return { user, loading, error, save, saving, saveError };
}
