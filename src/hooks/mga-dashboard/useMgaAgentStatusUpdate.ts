// import { useState } from 'react';

// interface UpdateStatusResponse {
//   message: string;
//   agent: {
//     agentCode: string;
//     firstName: string;
//     lastName: string;
//     status: string;
//   };
// }

// export const useMgaAgentStatusUpdate = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const updateAgentStatus = async (
//     agentCode: string, 
//     status: 'ACTIVE' | 'INACTIVE'
//   ): Promise<UpdateStatusResponse | null> => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch(`/api/mga/me/agents/${agentCode}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       return result;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Failed to update agent status';
//       setError(errorMessage);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { updateAgentStatus, loading, error };
// };



import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface UpdateStatusResponse {
  message: string;
  agent: {
    agentCode: string;
    firstName: string;
    lastName: string;
    status: string;
  };
}

export function useMgaAgentStatusUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const updateAgentStatus = async (
    agentCode: string, 
    status: 'ACTIVE' | 'INACTIVE'
  ): Promise<UpdateStatusResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.patch<UpdateStatusResponse>(
        `/mga/me/agents/${agentCode}/status`,
        { status }
      );
      
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateAgentStatus, loading, error };
}