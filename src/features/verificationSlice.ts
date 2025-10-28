import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VerificationState {
  // User's own verification status
  userVerificationStatus: {
    id: string;
    verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED' | 'NOT_UPLOADED' | 'DRAFT';
    verifiedAt: string | null;
    verificationValidTill: string | null;
    documentsUploadedAt: string | null;
    isImportedAgent: boolean;
    docLink1: string | null;
    docLink2: string | null;
    docLink3: string | null;
    verifiedBy: string | null;
  } | null;
  
  // For admin - pending verification count
  pendingVerificationCount: number;
  
  // Loading states
  statusLoading: boolean;
  countLoading: boolean;
  
  // Last fetch timestamps
  lastStatusFetch: number | null;
  lastCountFetch: number | null;
}

const initialState: VerificationState = {
  userVerificationStatus: null,
  pendingVerificationCount: 0,
  statusLoading: false,
  countLoading: false,
  lastStatusFetch: null,
  lastCountFetch: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    // Set user's verification status
    setVerificationStatus: (state, action: PayloadAction<VerificationState['userVerificationStatus']>) => {
      state.userVerificationStatus = action.payload;
      state.lastStatusFetch = Date.now();
      state.statusLoading = false;
    },
    
    // Set pending count for admin
    setPendingCount: (state, action: PayloadAction<number>) => {
      state.pendingVerificationCount = action.payload;
      state.lastCountFetch = Date.now();
      state.countLoading = false;
    },
    
    // Set loading states
    setStatusLoading: (state, action: PayloadAction<boolean>) => {
      state.statusLoading = action.payload;
    },
    
    setCountLoading: (state, action: PayloadAction<boolean>) => {
      state.countLoading = action.payload;
    },
    
    // Clear verification data (on logout)
    clearVerificationData: (state) => {
      state.userVerificationStatus = null;
      state.pendingVerificationCount = 0;
      state.lastStatusFetch = null;
      state.lastCountFetch = null;
    },
    
    // Update verification status after document upload
    updateDocumentUploadStatus: (state, action: PayloadAction<{
      documentsUploadedAt: string;
      docLink1: string | null;
      docLink2: string | null;
      docLink3: string | null;
    }>) => {
      if (state.userVerificationStatus) {
        state.userVerificationStatus = {
          ...state.userVerificationStatus,
          verificationStatus: 'PENDING',
          ...action.payload
        };
      }
    },
  },
});

export const {
  setVerificationStatus,
  setPendingCount,
  setStatusLoading,
  setCountLoading,
  clearVerificationData,
  updateDocumentUploadStatus,
} = verificationSlice.actions;

export default verificationSlice.reducer;

// Selectors
export const selectVerificationStatus = (state: { verification: VerificationState }) => 
  state.verification.userVerificationStatus;

export const selectPendingCount = (state: { verification: VerificationState }) => 
  state.verification.pendingVerificationCount;

export const selectIsVerified = (state: { verification: VerificationState }) => {
  const status = state.verification.userVerificationStatus;
  if (!status) return false;
  
  return status.verificationStatus === 'VERIFIED' && 
         status.verificationValidTill && 
         new Date(status.verificationValidTill) > new Date();
};

export const selectNeedsVerification = (state: { verification: VerificationState }) => {
  const status = state.verification.userVerificationStatus;
  if (!status) return true;
  
  return status.verificationStatus !== 'VERIFIED' || 
         !status.verificationValidTill ||
         new Date(status.verificationValidTill) <= new Date();
};