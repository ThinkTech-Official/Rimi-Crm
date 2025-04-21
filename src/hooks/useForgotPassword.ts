// src/hooks/useForgotPassword.ts
import { useState } from 'react';

export interface ForgotPasswordResult {
  success: boolean;
  message: string;
}

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [result,  setResult]  = useState<ForgotPasswordResult | null>(null);

  /**
   * Send a POST /forgot-password { email }
   */
  async function sendResetLink(email: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        // assume { message: string } on error
        const msg = data?.message || `Error ${res.status}`;
        setError(msg);
        return { success: false, message: msg };
      }

      // assume { message: string } on success
      const successMsg = data?.message || 'Reset link sent';
      const payload = { success: true, message: successMsg };
      setResult(payload);
      return payload;
    } catch (err: any) {
      const msg = err?.message || 'Network error';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }

  return { sendResetLink, loading, error, result };
}
