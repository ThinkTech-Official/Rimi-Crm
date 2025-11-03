// src/components/ForgotPassword.tsx
import { useState, useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import rimilogo from "../assets/rimi_en.png";
import { LangContext } from "../context/LangContext";
import { useForgotPassword } from "../hooks/useForgotPassword";
import useNotification from "../hooks/useNotification";
import { useTranslation } from "react-i18next";

interface ForgotFormInputs {
  email: string;
}

type ToastType = "error" | "success";
interface Toast {
  type: ToastType;
  message: string;
  show: boolean;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { langauge } = useContext(LangContext);
  const {
    sendResetLink,
    loading,
    error: hookError,
    result,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormInputs>();
  const { NotificationComponent, triggerNotification } = useNotification();
  const { t } = useTranslation();
  // Show error toast when hookError changes
  useEffect(() => {
    if (hookError) {
      triggerNotification({ type: "error", message: hookError });
    }
  }, [hookError]);

  // Show success toast when result.success is true
  useEffect(() => {
    if (result?.success) {
     triggerNotification({ type: "success", message: result.message });
    }
  }, [result]);

  const onSubmit: SubmitHandler<ForgotFormInputs> = async ({ email }) => {
    await sendResetLink(email);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-white px-4 h-[calc(100vh-64px)]">
        {/* Left: form */}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={rimilogo}
              alt="RIMI Logo"
              className="h-12 w-32 sm:h-[75px] sm:w-40"
            />
          </div>
          <h1 className="text-center text-2xl font-bold text-neutral-800 mb-6 capitalize">
            Reset Password
          </h1>
          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Username/email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  setValueAs: (value) => value.trim().toLowerCase(),
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {t(String(errors.email.message))}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`btn-primary`}
              >
                {langauge === "En" ? "Send Reset Link" : "Envoyer le lien"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex w-full justify-center p-1 text-sm font-[inter] leading-6 text-primary hover:underline cursor-pointer"
              >
                {langauge === "En" ? "Back to Login" : "Retour à la connexion"}
              </button>
            </div>
          </form>
        </div>

        {/* Right: image */}
      </div>

      {NotificationComponent}
    </>
  );
};

export default ForgotPassword;
