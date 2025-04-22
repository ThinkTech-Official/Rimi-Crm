// hooks/useProfile.ts
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProfileData } from "../utils/types";

interface UseProfileResult {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
}

export function useProfile(): UseProfileResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("No auth token available");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("http://localhost:3000/auth/profile", {
      credentials: "include", // if you rely on cookies too
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: ProfileData) => {
        setProfile(data)
        console.log('from use profile',data)
      }
    )
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return { profile, loading, error };
}
