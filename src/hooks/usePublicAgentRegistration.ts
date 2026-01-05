
// import { useState } from 'react';
// import { API_BASE } from '../utils/urls';

// export interface PublicAgentFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   company?: string;
//   docFile1?: File;
//   docFile2?: File;
//   validUpto?: string;
//   validUpto2?: string;
//     applicantType?: "independent" | "under_mga";
//   mgaType?: "wfg" | "other";
//   wfgCode?: string;  // Required for WFG applicants
// }

// interface UsePublicAgentRegistrationReturn {
//   submitApplication: (data: PublicAgentFormData) => Promise<boolean>;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// export function usePublicAgentRegistration(): UsePublicAgentRegistrationReturn {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const submitApplication = async (formData: PublicAgentFormData): Promise<boolean> => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Create FormData for file upload
//       const data = new FormData();

//       // Append text fields
//       data.append('firstName', formData.firstName);
//       data.append('lastName', formData.lastName);
//       data.append('email', formData.email);
//       data.append('password', formData.password);
//       data.append('confirmPassword', formData.confirmPassword);
      
//       if (formData.company) {
//         data.append('company', formData.company);
//       }

//       // Append document files
//       if (formData.docFile1) {
//         data.append('documents', formData.docFile1);
//       }
//       if (formData.docFile2) {
//         data.append('documents', formData.docFile2);
//       }

//       // Append validity dates
//       if (formData.validUpto) {
//         data.append('validUpto', formData.validUpto);
//       }
//       if (formData.validUpto2) {
//         data.append('validUpto2', formData.validUpto2);
//       }

//       // Make API call (no authentication required)
//       const response = await fetch(`${API_BASE}/auth/register-public`, {
//         method: 'POST',
//         body: data,
//         // Note: Do NOT set Content-Type header - browser will set it with boundary
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to submit application');
//       }

//       setSuccess(true);
//       setError(null);
//       return true;
//     } catch (err: any) {
//       const errorMessage = err.message || 'An error occurred while submitting your application';
//       setError(errorMessage);
//       setSuccess(false);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     submitApplication,
//     loading,
//     error,
//     success,
//   };
// }



// =================================


// import { useState } from 'react';
// import { API_BASE } from '../utils/urls';

// export interface PublicAgentFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phoneNumber: string;
//   confirmPassword: string;
//   company?: string;
//   docFile1?: File;
//   docFile2?: File;
//   validUpto?: string;
//   validUpto2?: string;
//   applicantType?: "independent" | "under_mga";
//   mgaType?: "wfg" | "other";
//   wfgCode?: string;  // Required for WFG applicants
// }

// interface UsePublicAgentRegistrationReturn {
//   submitApplication: (data: PublicAgentFormData) => Promise<boolean>;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// export function usePublicAgentRegistration(): UsePublicAgentRegistrationReturn {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const submitApplication = async (formData: PublicAgentFormData): Promise<boolean> => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Create FormData for file upload
//       const data = new FormData();

//       // Append required text fields
//       data.append('firstName', formData.firstName);
//       data.append('lastName', formData.lastName);
//       data.append('email', formData.email);
//       data.append('password', formData.password);
//       data.append('confirmPassword', formData.confirmPassword);
      
//       // Append applicant type (required)
//       if (formData.applicantType) {
//         data.append('applicantType', formData.applicantType);
//       }

//       //Append MGA type if applicable
//       if (formData.applicantType === 'under_mga' && formData.mgaType) {
//         data.append('mgaType', formData.mgaType);
//       }

//       // Append WFG code if applicable
//       if (formData.applicantType === 'under_mga' && 
//           formData.mgaType === 'wfg' && 
//           formData.wfgCode) {
//         data.append('wfgCode', formData.wfgCode);
//       }

//       // Append company if provided
//       if (formData.company) {
//         data.append('company', formData.company);
//       }

//       // 
//       // Documents are required for:
//       // - Independent agents
//       // - Agents under MGA ==> Other
//       const documentsRequired = 
//         formData.applicantType === 'independent' || 
//         (formData.applicantType === 'under_mga' && formData.mgaType === 'other');

//       if (documentsRequired) {
//         // Append document files
//         if (formData.docFile1) {
//           data.append('documents', formData.docFile1);
//         }
//         if (formData.docFile2) {
//           data.append('documents', formData.docFile2);
//         }

//         // Append validity dates
//         if (formData.validUpto) {
//           data.append('validUpto', formData.validUpto);
//         }
//         if (formData.validUpto2) {
//           data.append('validUpto2', formData.validUpto2);
//         }
//       }

//       // Make API call (no authentication required)
//       const response = await fetch(`${API_BASE}/auth/register-public`, {
//         method: 'POST',
//         body: data,
        
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to submit application');
//       }

//       setSuccess(true);
//       setError(null);
//       return true;
//     } catch (err: any) {
//       const errorMessage = err.message || 'An error occurred while submitting your application';
//       setError(errorMessage);
//       setSuccess(false);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     submitApplication,
//     loading,
//     error,
//     success,
//   };
// }



// ================================


import { useState } from 'react';
import { API_BASE } from '../utils/urls';

export interface PublicAgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  company?: string;
  
  // ✅ UPDATED: Three applicant types (no more mgaType nesting)
  applicantType?: "independent" | "under_mga" | "wfg";
  
  // ✅ WFG Code (direct field, required for wfg applicants)
  wfgCode?: string;
  
  // ✅ UPDATED: Four document files (only for independent agents)
  docFile1?: File;  // Insurance License
  docFile2?: File;  // E&O Insurance
  docFile3?: File;  // Bank Details - NEW
  docFile4?: File;  // Signed Agency Agreement - NEW
  
  // ✅ REMOVED: Validity dates (admin will set these during verification)
  // validUpto and validUpto2 are no longer needed in registration
}

interface UsePublicAgentRegistrationReturn {
  submitApplication: (data: PublicAgentFormData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function usePublicAgentRegistration(): UsePublicAgentRegistrationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitApplication = async (formData: PublicAgentFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create FormData for file upload
      const data = new FormData();

      // Append required text fields
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('confirmPassword', formData.confirmPassword);
      
      // Append applicant type (required)
      if (formData.applicantType) {
        data.append('applicantType', formData.applicantType);
      }

      // Append phone number if provided (required for independent and under_mga)
      if (formData.phoneNumber) {
        data.append('phoneNumber', formData.phoneNumber);
      }

      // Append WFG code if applicable (required for wfg applicants)
      if (formData.applicantType === 'wfg' && formData.wfgCode) {
        data.append('wfgCode', formData.wfgCode);
      }

      // Append company if provided (optional for independent, required for under_mga)
      if (formData.company) {
        data.append('company', formData.company);
      }

      // ✅ UPDATED: Documents are ONLY required for independent agents
      const documentsRequired = formData.applicantType === 'independent';

      if (documentsRequired) {
        // Append all 4 document files for independent agents
        if (formData.docFile1) {
          data.append('documents', formData.docFile1);
        }
        if (formData.docFile2) {
          data.append('documents', formData.docFile2);
        }
        if (formData.docFile3) {
          data.append('documents', formData.docFile3);
        }
        if (formData.docFile4) {
          data.append('documents', formData.docFile4);
        }

        // ✅ REMOVED: No validity dates sent from frontend
        // Admin will set these during verification
      }

      // Make API call (no authentication required)
      const response = await fetch(`${API_BASE}/auth/register-public`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
      }

      setSuccess(true);
      setError(null);
      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while submitting your application';
      setError(errorMessage);
      setSuccess(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitApplication,
    loading,
    error,
    success,
  };
}