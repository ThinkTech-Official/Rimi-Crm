import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProfileData } from "../utils/types";

interface UseProfileResult {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: FormData) => Promise<ProfileData>;
}

export function useProfile(): UseProfileResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setError("No auth token"); setLoading(false); return; }
    setLoading(true);
    fetch("http://localhost:3000/auth/profile", {
      credentials: "include",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => { if (!res.ok) throw new Error(`Status ${res.status}`); return res.json(); })
      .then((data: ProfileData) =>{
        setProfile(data)
        console.log('fetching from server profile data', data)
      } )
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const updateProfile = async (data: FormData): Promise<ProfileData> => {
    if (!token) throw new Error("No auth token");
    const res = await fetch("http://localhost:3000/auth/update", {
      method: "PUT",
      credentials: "include",
      headers: { "Authorization": `Bearer ${token}` },
      body: data
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const updated = await res.json();
    console.log('from fetch data on update',updated.user)
    setProfile(updated.user);
    return updated;
  };

  return { profile, loading, error, updateProfile };
}
