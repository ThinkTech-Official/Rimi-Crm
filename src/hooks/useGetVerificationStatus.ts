import { useCallback } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGetVerificationStatus = () => {
  const userVerificationStatus = useSelector(
    (state: any) => state.verification.userVerificationStatus,
  );
  const lastStatusFetch = useSelector(
    (state: any) => state.verification.lastStatusFetch,
  );

  const fetchStatus = useCallback(async () => {
    const now = Date.now();

    if (
      userVerificationStatus &&
      lastStatusFetch &&
      now - lastStatusFetch < CACHE_DURATION
    ) {
      return userVerificationStatus;
    }

    try {
      const { data } = await axiosInstance.get("/auth/verification-status");
      return data;
    } catch (error) {
      console.error("Error fetching verification status:", error);
      throw error;
    }
  }, [userVerificationStatus, lastStatusFetch]);

  return { fetchStatus };
};
