// // src/hooks/useCreateUser.ts
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { ProfileForm } from "../utils/types";

// interface UseCreateUserResult {
//   createUser: (data: ProfileForm) => Promise<void>;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// export function useCreateUser(): UseCreateUserResult {
//   const token = useSelector((state: any) => state.auth.token) as string | null;
//   const [loading, setLoading] = useState(false);
//   const [error,   setError]   = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   async function createUser(data: ProfileForm) {
//     if (!token) {
//       setError("No auth token");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     // Base payload for ALL user types
//     const payload: any = {
//       firstName: data.firstName,
//       lastName:  data.lastName,
//       email:     data.email,
//       agentCode: data.agentCode,
//       company:   data.company,
//       userType:  data.userType,
//       status:    data.status,
//       password:  data.password,
//       docLink1:  data.docLink1 || "",
//       docLink2:  data.docLink2 || "",
//       docLink3:  data.docLink3 || "",
//       validUpto: data.validUpto,
//     };

//     // MGA users get an extra `agentCodes` array
//     if (data.userType === "MGA") {
//       payload.agentCodes = data.agentCodes;
//     }

//     try {
//       const res = await fetch("http://localhost:3000/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type":  "application/json",
//           Authorization:   `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(errText || `HTTP ${res.status}`);
//       }
//       setSuccess(true);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { createUser, loading, error, success };
// }

// =======================================================

// src/hooks/useCreateUser.ts
import { useState } from "react";
import { useSelector } from "react-redux";

interface UseCreateUserResult {
  /** 
   * Pass in a FormData containing all user fields 
   * and any File objects under field name "documents"
   */
  createUser: (formData: FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useCreateUser(): UseCreateUserResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function createUser(formData: FormData) {
    if (!token) {
      setError("No auth token");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          // Do NOT set Content-Type here; browser will add the correct multipart boundary
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { createUser, loading, error, success };
}
