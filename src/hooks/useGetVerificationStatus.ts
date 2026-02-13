

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../utils/axiosInstance';


const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGetVerificationStatus = () => {
  const verificationState = useSelector((state: any) => state.verification);
  
  const fetchStatus = useCallback(async () => {
    const now = Date.now();
    const lastFetch = verificationState.lastStatusFetch;
    
    
    if (
      verificationState.userVerificationStatus && 
      lastFetch && 
      now - lastFetch < CACHE_DURATION
    ) {
      console.log('Using cached verification status');
      return verificationState.userVerificationStatus;
    }
    
    
    console.log('Fetching fresh verification status');
    try {
      const { data } = await axiosInstance.get('/auth/verification-status');
      return data;
    } catch (error) {
      console.error('Error fetching verification status:', error);
      throw error;
    }
  }, [verificationState]);
  
  return { fetchStatus };
};