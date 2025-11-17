
import { useState } from 'react';
import { API_BASE } from '../utils/urls';

export interface PublicAgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company?: string;
  docFile1?: File;
  docFile2?: File;
  validUpto?: string;
  validUpto2?: string;
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

      // Append text fields
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('confirmPassword', formData.confirmPassword);
      
      if (formData.company) {
        data.append('company', formData.company);
      }

      // Append document files
      if (formData.docFile1) {
        data.append('documents', formData.docFile1);
      }
      if (formData.docFile2) {
        data.append('documents', formData.docFile2);
      }

      // Append validity dates
      if (formData.validUpto) {
        data.append('validUpto', formData.validUpto);
      }
      if (formData.validUpto2) {
        data.append('validUpto2', formData.validUpto2);
      }

      // Make API call (no authentication required)
      const response = await fetch(`${API_BASE}/auth/register-public`, {
        method: 'POST',
        body: data,
        // Note: Do NOT set Content-Type header - browser will set it with boundary
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