

import { useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE } from "../utils/urls";
export interface newUser {
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  company: string;
  userType: "ADMIN" | "AGENT" | "READONLY" | "MGA" | "";
  status: "ACTIVE" | "INACTIVE";
  password: string;
  confirmPassword: string;
  validUpto: string;
  docFile1: File | null;
  docFile2: File | null;
  docFile3: File | null;
}

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
   * Pass in a newUser containing all user fields
   * and any File objects under field name "documents".
   * Will throw / set error if code hasn't been confirmed available.
   */
  createUser: (formData: newUser) => Promise<void>;

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

  async function createUser(formData: newUser) {
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
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("agentCode", formData.agentCode);
    formDataToSend.append("company", formData.company);
    formDataToSend.append("userType", formData.userType);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
    formDataToSend.append("validUpto", formData.validUpto);

    if (formData.docFile1) formDataToSend.append("documents", formData.docFile1);
    if (formData.docFile2) formDataToSend.append("documents", formData.docFile2);
    if (formData.docFile3) formDataToSend.append("documents", formData.docFile3);

    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set Content-Type manually — browser handles it
      },
      body: formDataToSend,
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
