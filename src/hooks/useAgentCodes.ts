
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { API_BASE } from "../utils/urls";

// interface UseAgentCodesResult {
//   agents: string[];
//   loading: boolean;
//   error: string | null;
// }

// export function useAgentCodes(search: string): UseAgentCodesResult {
//   const token = useSelector((state: any) => state.auth.token) as string | null;
//   const [agents, setAgents] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // if empty search, clear list
//     if (!search.trim()) {
//       setAgents([]);
//       return;
//     }
//     if (!token) {
//       setError("No auth token");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     fetch(
//       `${API_BASE}/auth/agent-codes?search=${encodeURIComponent(
//         search
//       )}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error(`Error ${res.status}`);
//         return res.json();
//       })
//       .then((data: string[]) => {
//         setAgents(data);
//       })
//       .catch((err) => {
//         setError(err.message);
//       })
//       .finally(() => setLoading(false));
//   }, [search, token]);

//   return { agents, loading, error };
// }



// ==================================



import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

interface UseAgentCodesResult {
  agents: string[];
  loading: boolean;
  error: string | null;
}

export function useAgentCodes(search: string): UseAgentCodesResult {
  const [agents, setAgents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // if empty search, clear list
    if (!search.trim()) {
      setAgents([]);
      setError(null);
      return;
    }

    const searchAgents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Searching for agents with query:', search);
        
        const response = await axiosInstance.get('/auth/agent-codes', {
          params: { search: search.trim() }
        });
        
        console.log('Agent search response:', response.data);
        
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setAgents(response.data);
        } else {
          console.error('Expected array but got:', typeof response.data, response.data);
          setError('Invalid response format from server');
          setAgents([]);
        }
      } catch (err: any) {
        console.error('Agent search error:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to search agents';
        setError(errorMessage);
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search to avoid too many requests
    const timeoutId = setTimeout(searchAgents, 300);
    
    return () => clearTimeout(timeoutId);
  }, [search]);

  return { agents, loading, error };
}