

import { useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE } from "../utils/urls";

type AvailabilityStatus = 
  | "unchecked"
  | "checking"
  | "available"
  | "taken";

interface UseCreateUserResult {
  /**
   * Must be called first with the agentCode that i want to verify.
   * Returns true if code is free, false if taken.
   */
  checkAvailability: (agentCode: string) => Promise<boolean>;

  /** "unchecked" -> "checking" -> "available" | "taken" */
  availability: AvailabilityStatus;
  availabilityError: string | null;

  /**
   * Pass in a FormData containing all user fields
   * and any File objects under field name "documents".
   * Will throw / set error if code hasn't been confirmed available.
   */
  createUser: (formData: FormData) => Promise<void>;

  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useCreateUser(): UseCreateUserResult {
  const token = useSelector((state: any) => state.auth.token) as string | null;

  // for createUser
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // for availability check
  const [availability, setAvailability] = useState<AvailabilityStatus>("unchecked");
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  async function checkAvailability(agentCode: string) {
    if (!agentCode) {
      setAvailabilityError("No code provided");
      return false;
    }

    setAvailability("checking");
    setAvailabilityError(null);

    try {
      const res = await fetch(
        `${API_BASE}/auth/check?code=${encodeURIComponent(agentCode)}`,
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const { available } = await res.json();
      setAvailability(available ? "available" : "taken");
      return available;
    } catch (err: any) {
      setAvailability("unchecked");
      setAvailabilityError(err.message || "Error checking availability");
      return false;
    }
  }

  async function createUser(formData: FormData) {
    // ensure and checked and code is free
    if (availability !== "available") {
      setError("Agent code must be checked and available before creating user.");
      return;
    }

    if (!token) {
      setError("No auth token");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          // browser will set Content-Type for multipart
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

  return {
    checkAvailability,
    availability,
    availabilityError,

    createUser,
    loading,
    error,
    success,
  };
}
