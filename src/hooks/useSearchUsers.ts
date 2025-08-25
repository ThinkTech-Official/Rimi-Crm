// // src/hooks/useSearchUsers.ts
// import { useState, useCallback } from "react";
// import { useSelector } from "react-redux";

// export interface User {
//   id: string;
//   agentCode: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   userType: string;
//   status: string;
// }

// export interface SearchCriteria {
//   firstName: string;
//   lastName: string;
//   email: string;
//   agentCode: string;
//   createdAfter: string;
//   createdBefore: string;
//   company: string;
//   userType: string;
//   status: string;
//   page: number;
//   limit: number;
// }

// interface UseSearchUsersResult {
//   users: User[];
//   loading: boolean;
//   error: string | null;
//   search: (criteria: SearchCriteria) => Promise<void>;
// }

// export function useSearchUsers(): UseSearchUsersResult {
//   const token = useSelector((state: any) => state.auth.token) as string | null;
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const search = useCallback(
//     async (criteria: SearchCriteria) => {
//       if (!token) {
//         setError("No auth token");
//         return;
//       }
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch("http://localhost:3000/auth/users", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(criteria),
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();
//         // backend wraps list in `data`
//         setUsers(Array.isArray(json.data) ? json.data : []);
//         console.log('from useSearch users ', json)
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [token]
//   );

//   return { users, loading, error, search };
// }


// =========================

// src/hooks/useSearchUsers.ts
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { API_BASE } from "../utils/urls";

export interface User {
  id: string;
  agentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  status: string;
}

export interface SearchCriteria {
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  createdAfter: string;
  createdBefore: string;
  company: string;
  userType: string;
  status: string;
  page: number;
  limit: number;
}

interface UseSearchUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  search: (criteria: SearchCriteria) => Promise<void>;
}

export function useSearchUsers(): UseSearchUsersResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const search = useCallback(
    async (criteria: SearchCriteria) => {
      if (!token) {
        setError("No auth token");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/auth/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(criteria),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        // Destructure the full pagination payload
        const {
          data,
          total: t,
          page: p,
          limit: l,
          totalPages: tp,
          hasNextPage: hNext,
          hasPrevPage: hPrev,
        } = json;

        setUsers(Array.isArray(data) ? data : []);
        setTotal(t ?? 0);
        setPage(p ?? criteria.page);
        setLimit(l ?? criteria.limit);
        setTotalPages(tp ?? 1);
        setHasNextPage(!!hNext);
        setHasPrevPage(!!hPrev);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return {
    users,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
    search,
  };
}
