// import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
// import { loginUser, logout } from '../features/authSlice';

// export const useAuth = () => {
//   const dispatch = useAppDispatch();
//   const { token, loading, error, userType, fullName, agentCode } = useAppSelector((state) => state.auth);

//   const login = (email: string, password: string) => {
//     return dispatch(loginUser({ email, password }));
//   };

//   return {
//     token,
//     userType,
//     fullName,
//     agentCode,
//     loading,
//     error,
//     login,
//     logout: () => dispatch(logout()),
//   };
// };


// ==================

import { loginUser, logoutUser } from '../features/authSlice'; 
import { clearVerificationData } from '../features/verificationSlice'; 
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error, userType, fullName, agentCode } = useAppSelector((state) => state.auth);

  const login = (email: string, password: string) => {
    return dispatch(loginUser({ email, password }));
  };

  const logout = async () => {
    await dispatch(logoutUser()); 
    dispatch(clearVerificationData()); 
  };

  return {
    token,
    userType,
    fullName,
    agentCode,
    loading,
    error,
    login,
    logout,
  };
};