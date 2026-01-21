import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

import rimilogo from "../assets/rimi_en.png";
import { useAuth } from "../hooks/useAuth";
import useNotification from "../hooks/useNotification";
import { useLanguage } from "../context/LanguageContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [signInClicked, setSignInClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { triggerNotification, NotificationComponent } = useNotification();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setSignInClicked(true);
    const result = await login(data.email, data.password);
    
    if (result.type === "auth/loginUser/fulfilled") {
      navigate("/");
    } else if (result.type === "auth/loginUser/rejected") {
      setSignInClicked(false);
      triggerNotification({
        type: "error",
        message: result.payload as unknown as string,
      });
    } else {
      triggerNotification({
        type: "error",
        message: "Network Error",
      });
      setSignInClicked(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-white flex overflow-hidden">
      {/* ===== LEFT COLUMN - SIDEBAR ===== */}
      <div className="hidden lg:flex w-[50%] bg-[#E8EEFB] flex-col p-12 relative overflow-hidden">
        <div className="relative z-10 mt-12 font-[inter]">
          <h1 className="text-4xl font-bold text-[#1B1B1B] mb-2">
            Rimi Insurance
          </h1>
          <p className="text-[#4A4A4A] max-w-sm capitalize text-base">
           welcome to RIMI  travel insurance portal
          </p>
        </div>
        
        {/* Umbrella Image */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
            <img 
              src="/Umbrella.png" 
              alt="Umbrella" 
              className="w-[80%] h-[70vh] object-contain transform translate-y-6"
            />
        </div>
      </div>

      {/* ===== RIGHT COLUMN - CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Nav Buttons */}
        <div className="p-6 flex justify-end gap-3 sticky top-0 bg-white/80 backdrop-blur-sm z-20">
          <button 
            onClick={() => navigate("/apply-mga")}
            className="px-6 py-2 border border-[#2B00B7] text-[#2B00B7] font-medium text-sm transition-colors cursor-pointer"
          >
            Apply as MGA
          </button>
          <button 
            onClick={() => navigate("/apply")}
            className="btn-primary w-[150px] py-2 font-medium text-sm cursor-pointer"
          >
            Apply as agent
          </button>
        </div>

        <div className="w-full flex flex-col justify-center flex-1 px-6 py-5 sm:py-10 sm:px-16">
          <div className="w-full sm:max-w-md flex flex-col justify-center lg:justify-start">
            <img
              src={rimilogo}
              alt="RIMI Logo"
              className="h-12 w-24 sm:h-16 sm:w-36 mb-4 sm:mb-12"
            />

            <div className="mb-4 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#232323] mb-2 font-[inter]">
                Welcome to RIMI Insurance
              </h2>
              <p className="text-[#969696] text-sm font-normal font-[inter]">
                Please login to continue to your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3"
              noValidate
            >
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1 text-text-secondary">
                  {t("email")}
                </label>
                <div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: t("emailRequired"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("invalidEmail"),
                      },
                    })}
                    className="input-primary"
                    placeholder={t("emailPlaceholder")}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm font-[inter] mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium mb-1 text-text-secondary">
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password", {
                      required: t("passwordRequired"),
                    })}
                    className="input-primary pr-10"
                    placeholder={t("passwordPlaceholder")}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black/50"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm font-[inter] mt-1 block">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end -mt-3">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm font-semibold font-[inter] leading-6 text-[#4340DA] hover:text-[#2B00B7] cursor-pointer"
                >
                  {t("forgotPassword")}
                </button>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={signInClicked}
                  className={`btn-primary w-full ${
                    signInClicked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {signInClicked ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {NotificationComponent}
    </div>
  );
};

export default Login;
