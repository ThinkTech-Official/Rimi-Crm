import { useState, useEffect } from "react";
import { ProfileData } from "../utils/types";
import { axiosInstance } from "../utils/axiosInstance";

interface UseProfileResult {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: FormData) => Promise<ProfileData>;
}

export function useProfile(): UseProfileResult {
  // const token = useSelector((state: any) => state.auth.token) as string | null;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // if (!token) { setError("No auth token"); setLoading(false); return; }
    setLoading(true);
    axiosInstance.get('/auth/profile')
      .then(res => {
        setProfile(res.data)
        console.log('fetching from server profile data', res.data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = async (data: FormData): Promise<ProfileData> => {
    const res = await axiosInstance.put('/auth/update', data);
    const updated = res.data;
    console.log('from fetch data on update', updated.user)
    setProfile(updated.user);
    return updated;
  };

  return { profile, loading, error, updateProfile };
}
