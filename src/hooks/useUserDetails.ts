import { useState, useEffect, useCallback } from "react";

import { axiosInstance } from "../utils/axiosInstance";
import { UserFormData } from "../pages/UserDetails";

interface UseUserDetailsResult {
  user: UserFormData | null;
  loading: boolean;
  error: string | null;
  save: (
    formData: UserFormData,
    files: { [key: string]: File | null },
  ) => Promise<void>;
  saving: boolean;
  saveError: string | null;
}

export function useUserDetails(id: string): UseUserDetailsResult {
  const [user, setUser] = useState<UserFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Fetch user on mount or id change
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    axiosInstance
      .get<UserFormData>(`/auth/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Save (update) user
  // const save = useCallback(
  //   async (formData: UserFormData, files: { [key: string]: File | null }) => {

  //     console.log("data", formData);
  //     setSaving(true);
  //     setSaveError(null);

  //     const fd = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       fd.append(key, String(value));
  //     });
  //     // Append form fields except metadata and passwords
  //     // Object.entries(formData).forEach(([key, value]) => {
  //     //   if (["createdAt", "updatedAt", "agentCodes", "password", "confirmPassword"].includes(key)) return;
  //     //   if (value != null) fd.append(key, String(value));
  //     // });
  //     // Attach any new files
  //     Object.values(files).forEach((file) => {
  //       if (file) fd.append("documents", file);
  //     });
  //     for (const [key, value] of fd.entries()) {
  //       if (value instanceof File) {
  //         console.log(
  //           `${key}: File(name=${value.name}, size=${value.size}, type=${value.type})`,
  //         );
  //       } else {
  //         console.log(`${key}: ${value}`);
  //       }
  //     }

  //     try {
  //       const res = await axiosInstance.put(`/auth/update-user/${id}`, fd);
  //       const updated = res.data;
  //       setUser(updated.user);
  //     } catch (err: any) {
  //       setSaveError(err.message);
  //       throw err;
  //     } finally {
  //       setSaving(false);
  //     }
  //   },
  //   [id],
  // );

  const save = useCallback(
    async (formData: UserFormData, files: { [key: string]: File | null }) => {
      setSaving(true);
      setSaveError(null);

      const SKIP_FIELDS = [
        "id",
        "createdAt",
        "updatedAt",
        "agentCodes",
        "newPwd",
        "confirmPwd",
      ];

      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (SKIP_FIELDS.includes(key)) return;
        if (value == null) return; // prevents "null" string reaching the backend
        fd.append(key, String(value));
      });

      // Map newPwd/confirmPwd → password/confirmPassword (backend field names)
      if (formData.newPwd) {
        fd.append("password", formData.newPwd);
        fd.append("confirmPassword", formData.confirmPwd ?? "");
      }

      // Object.values(files).forEach((file) => {
      //   if (file) fd.append("documents", file);
      // });

      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          const index = key.replace("doc", "");
          fd.append(`document${index}`, file);
        }
      });

      try {
        const res = await axiosInstance.put(`/auth/update-user/${id}`, fd);
        setUser(res.data.user);
      } catch (err: any) {
        console.log(err)
        setSaveError(err?.response?.data?.message || err?.message || "Something went wrong");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [id],
  );

  return { user, loading, error, save, saving, saveError };
}

// ============================
