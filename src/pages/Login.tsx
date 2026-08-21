import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
// import useAdmin from '../hooks/useAdmin';
import { useNavigate, useSearchParams } from "react-router-dom";

import rimilogo from "../assets/rimi_en.png";
import { useAuth } from "../hooks/useAuth";
import useNotification from "../hooks/useNotification";
import { useLanguage } from "../context/LanguageContext";
import LanguageDropdown from "../components/LanguageDropdown";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
      const returnUrl = searchParams.get("returnUrl") || "/";
      navigate(returnUrl, { replace: true });
    } else if (result.type === "auth/loginUser/rejected") {
      setSignInClicked(false);
      triggerNotification({
        type: "error",
        message: result.payload as unknown as string,
      });
    } else {
      triggerNotification({
        type: "error",
        message: t("Network Error"),
      });
      setSignInClicked(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden lg:flex w-[45%] flex-col items-center justify-center relative overflow-hidden">
        {/* Background Image/Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/loginBg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // filter: "brightness(0.8) contrast(1.2)"
          }}
        ></div>

        {/* Outlined Box */}
        <div className="relative z-10 border border-white/80 min-h-[400px] px-8 max-w-lg flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl xl:text-5xl font-medium text-white mb-6 tracking-wider leading-snug uppercase font-[inter]">
           {t("Rimi")}  <br /> {t("Insurance")}
          </h1>
          <p className="text-white text-2xl max-w-xs leading-relaxed capitalize">
            {t("Welcome to RIMI travel insurance portal")}
          </p>
        </div>
      </div>

      {/* ===== RIGHT COLUMN - CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white lg:rounded-l-[20px] relative z-20 lg:-ml-[20px]">
        {/* Top Nav Buttons */}
        <div className="p-6 flex justify-end items-center gap-3">
          {/* Language Selector */}
          <LanguageDropdown className="mr-4" />

          <button
            onClick={() => navigate("/apply-mga")}
            className="px-6 py-2 border border-[#2B00B7] text-[#2B00B7] font-medium text-sm transition-colors cursor-pointer"
          >
            {t("Apply as MGA")}
          </button>
          <button
            onClick={() => navigate("/apply")}
            className="btn-primary py-2 font-medium text-sm cursor-pointer"
          >
            {t("Apply as agent")}
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center flex-1 px-6 py-5 sm:py-10 sm:px-16">
          <div className="w-full sm:max-w-md flex flex-col justify-center lg:justify-start">
            <img
              src={rimilogo}
              alt="RIMI Logo"
              className="h-12 w-24 sm:h-16 sm:w-36 mb-4 sm:mb-12"
            />

            <div className="mb-4 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#232323] mb-2 font-[inter]">
                {t("Welcome to RIMI Insurance")}
              </h2>
              <p className="text-[#969696] text-sm font-normal font-[inter]">
                {t("Please login to continue to your account.")}
              </p>
              {searchParams.get("sessionExpired") === "true" && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800 text-center">
                    {t("Your session expired. Please log in again.")}
                  </p>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3"
              noValidate
            >
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1 text-text-secondary">
                  {t("Email")}
                </label>
                <div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      setValueAs: (value) => value?.trim()?.toLowerCase() || "",
                      required: t("Email is required"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("Invalid email address"),
                      },
                    })}
                    className="input-primary"
                    placeholder={t("Enter your email")}
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
                  {t("Password")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password", {
                      setValueAs: (value) => value?.trim() || "",
                      required: t("Password is required"),
                    })}
                    className="input-primary pr-10"
                    placeholder={t("Enter your password")}
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
                  {t("Forgot Password?")}
                </button>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={signInClicked}
                  className={`btn-primary w-full ${signInClicked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                  {signInClicked ? t("Signing in...") : t("Sign in")}
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
