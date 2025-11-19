import { useState, Fragment, useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Transition } from "@headlessui/react";
import {
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import rimilogo from "../assets/rimi_en.png";
import { LangContext } from "../context/LangContext";
import { useResetPassword } from "../hooks/useResetPassword";

interface ResetFormInputs {
  password: string;
  confirmPassword: string;
}

type ToastType = "error" | "success";
interface Toast {
  type: ToastType;
  message: string;
  show: boolean;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const { langauge } = useContext(LangContext);
  const {
    verifyToken,
    resetPassword,
    loading,
    error: hookError,
    result,
  } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormInputs>();

  const [toast, setToast] = useState<Toast>({
    type: "error",
    message: "",
    show: false,
  });

  const password = watch("password");

  // Verify token on mount
  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setToast({
          type: "error",
          message: "Invalid reset link. Please request a new one.",
          show: true,
        });
        setTokenValid(false);
        setVerifying(false);
        return;
      }

      const result = await verifyToken(token);
      setTokenValid(result.valid);
      
      if (!result.valid) {
        setToast({
          type: "error",
          message: result.message || "Invalid or expired reset token",
          show: true,
        });
      }
      
      setVerifying(false);
    };

    checkToken();
  }, [token]);

  // Show error toast when hookError changes
  useEffect(() => {
    if (hookError) {
      setToast({ type: "error", message: hookError, show: true });
    }
  }, [hookError]);

  // Show success toast and redirect when result.success is true
  useEffect(() => {
    if (result?.success) {
      setToast({
        type: "success",
        message: result.message,
        show: true,
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [result, navigate]);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const id = setTimeout(() => {
        setToast((t) => ({ ...t, show: false }));
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [toast.show]);

  const onSubmit: SubmitHandler<ResetFormInputs> = async (data) => {
    if (!token) {
      setToast({
        type: "error",
        message: "Invalid reset token",
        show: true,
      });
      return;
    }

    await resetPassword(token, data.password, data.confirmPassword);
  };

  if (verifying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4340DA] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="btn-primary"
            >
              Request New Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[calc(100vh-64px)] flex-1 justify-center items-center -mt-10 sm:mt-0">
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="mx-auto w-full max-w-md lg:w-130 items-center">
            <div className="flex flex-col justify-center items-center">
              <a href="#">
                <img
                  className="h-14 sm:h-20 w-[140px] sm:w-[170px]"
                  src={rimilogo}
                  alt="Rimi"
                />
              </a>
              <h2 className="mt-8 text-2xl sm:text-3xl font-bold font-[inter] sm:leading-9 text-text-primary">
                {langauge === "En" ? "Reset Password" : "Réinitialiser le mot de passe"}
              </h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                {langauge === "En"
                  ? "Enter your new password below"
                  : "Entrez votre nouveau mot de passe ci-dessous"}
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 space-y-5 mx-2"
              noValidate
            >
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700 mb-2"
                >
                  {langauge === "En" ? "New Password" : "Nouveau mot de passe"}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message:
                          "Password must contain uppercase, lowercase, and number",
                      },
                    })}
                    className="input-primary pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-700 mb-2"
                >
                  {langauge === "En"
                    ? "Confirm Password"
                    : "Confirmer le mot de passe"}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="input-primary pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="btn-primary"
                >
                  {loading || isSubmitting
                    ? langauge === "En"
                      ? "Resetting..."
                      : "Réinitialisation..."
                    : langauge === "En"
                    ? "Reset Password"
                    : "Réinitialiser"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex w-full justify-center p-1 mt-1 text-sm font-semibold font-[inter] leading-6 text-[#4340DA] hover:text-[#2B00B7] cursor-pointer"
                >
                  {langauge === "En" ? "Back to Login" : "Retour à la connexion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={toast.show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4 flex items-start">
                <div className="flex-shrink-0">
                  {toast.type === "error" ? (
                    <XCircleIcon
                      className="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    {toast.type === "error" ? "Error" : "Success"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{toast.message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setToast((t) => ({ ...t, show: false }))}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;