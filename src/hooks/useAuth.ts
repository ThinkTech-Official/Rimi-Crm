import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { loginUser, logout } from '../features/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error, userType, fullName, agentCode } = useAppSelector((state) => state.auth);

  const login = (email: string, password: string) => {
    return dispatch(loginUser({ email, password }));
  };

  return {
    token,
    userType,
    fullName,
    agentCode,
    loading,
    error,
    login,
    logout: () => dispatch(logout()),
  };
};
