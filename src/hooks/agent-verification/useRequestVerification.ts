// import { useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE } from '../../utils/urls';


// interface RequestVerificationResponse {
//   message: string;
//   user: any;
// }

// export function useRequestVerification() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
  
//   const token = useSelector((state: any) => state.auth.token);
//   const navigate = useNavigate();

//   const requestVerification = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await fetch(`${API_BASE}/auth/request-verification`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       if (response.status === 401) {
//         navigate('/login');
//         throw new Error('Unauthorized');
//       }

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to request verification');
//       }

//       setSuccess(true);
//       return result;
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [token, navigate]);

//   return { loading, error, success, requestVerification };
// }




// ===============================



// hooks/agent-verification/useRequestVerification.ts

import { useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
interface RequestVerificationResponse {
  message: string;
  user: any;
}

export function useRequestVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const requestVerification = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post(`/auth/request-verification`);
      const result = response.data;

      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err.message);
      console.error('Error requesting verification:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { 
    loading, 
    error, 
    success, 
    requestVerification 
  };
}