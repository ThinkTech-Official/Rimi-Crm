import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { loginUser, logout } from '../features/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error } = useAppSelector((state) => state.auth);

  const login = (email: string, password: string) => {
    return dispatch(loginUser({ email, password }));
  };

  return {
    token,
    loading,
    error,
    login,
    logout: () => dispatch(logout()),
  };
};
