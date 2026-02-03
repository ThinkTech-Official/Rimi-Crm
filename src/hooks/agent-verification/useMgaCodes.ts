
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE } from '../../utils/urls';

// interface UseMgaCodesReturn {
//   mgas: string[];
//   loading: boolean;
//   error: string | null;
// }

// /**
//  * Hook to search for MGA codes
//  * Similar to useAgentCodes but searches for MGAs only
//  */
// export function useMgaCodes(search: string): UseMgaCodesReturn {
//   const [mgas, setMgas] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const token = useSelector((state: any) => state.auth.token);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Only search if we have at least 1 character
//     if (!search || search.trim().length === 0) {
//       setMgas([]);
//       setError(null);
//       return;
//     }

//     const fetchMgas = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(
//           `${API_BASE}/auth/mga-codes?search=${encodeURIComponent(search)}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//             credentials: 'include',
//           }
//         );

//         if (response.status === 401) {
//           navigate('/login');
//           throw new Error('Unauthorized');
//         }

//         if (!response.ok) {
//           throw new Error('Failed to fetch MGAs');
//         }

//         const data = await response.json();
//         setMgas(data);
//       } catch (err: any) {
//         setError(err.message);
//         setMgas([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Debounce the search
//     const timeoutId = setTimeout(fetchMgas, 300);
//     return () => clearTimeout(timeoutId);
//   }, [search, token, navigate]);

//   return { mgas, loading, error };
// }


// =====================================



import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../utils/urls';

// ✅ NEW: Return full MGA objects, not just codes
export interface MgaOption {
  id: string;           // ✅ UUID for backend
  agentCode: string;    // For display
  firstName: string;    // For display
  lastName: string;     // For display
  commissionPercent: number | null; 
}

interface UseMgaCodesReturn {
  mgas: MgaOption[];    // ✅ Changed from string[] to MgaOption[]
  loading: boolean;
  error: string | null;
}

export function useMgaCodes(search: string): UseMgaCodesReturn {
  const [mgas, setMgas] = useState<MgaOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const fetchMgaCodes = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 1) {
      setMgas([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE}/auth/mga-codes?search=${encodeURIComponent(searchTerm)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (response.status === 401) {
        navigate('/login');
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch MGA codes');
      }

      const result = await response.json();
      
      // ✅ Result should now be an array of objects with id, agentCode, firstName, lastName
      setMgas(result);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching MGA codes:', err);
      setMgas([]);
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMgaCodes(search);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, fetchMgaCodes]);

  return { mgas, loading, error };
}