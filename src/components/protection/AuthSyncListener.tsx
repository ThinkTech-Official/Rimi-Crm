// src/components/AuthSyncListener.tsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { clearVerificationData } from '../../features/verificationSlice';




export const AuthSyncListener = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      
      if (e.key === 'logout-event') {
        console.log('Logout detected in another tab, syncing...');
        dispatch(logout());
        dispatch(clearVerificationData());
        
        
        window.location.href = '/login';
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
  
  return null; 
};