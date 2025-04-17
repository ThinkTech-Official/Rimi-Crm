// src/hooks/useUserDetails.ts
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProfileForm } from "../utils/types";

interface UseUserDetailsResult {
  user: ProfileForm | null;
  loading: boolean;
  error: string | null;
}

export function useUserDetails(id: string): UseUserDetailsResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;
  const [user, setUser] = useState<ProfileForm | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // assuming the response is the user object matching ProfileForm
      .then((data: ProfileForm) => {
        setUser(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  return { user, loading, error };
}
