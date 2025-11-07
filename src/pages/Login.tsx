import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
// import useAdmin from '../hooks/useAdmin';
import { Link, useNavigate } from "react-router-dom";

import rimilogo from "../assets/rimi_en.png";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import useNotification from "../hooks/useNotification";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { NotificationComponent, triggerNotification } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  // const { login, loading, error} = useAuth()
  const { login } = useAuth();

  // const { login } = useAdmin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    const result = await login(data.email, data.password);
    console.log(result.type);
    if (result.type === "auth/loginUser/fulfilled") {
      navigate("/");
    } else if (result.type === "auth/loginUser/rejected") {
      triggerNotification({
        type: "error",
        message: result.payload as string,
      });
    } else {
      triggerNotification({
        type: "error",
        message: "Network error",
      });
    }

    //   const resp = await login(data);
    //   if (resp?.user) {
    //     // navigate to admindashboard
    //     navigate("/admindashboard");
    //   } else {
    // display error
    // console.log(resp?.response?.data?.errors[0]?.msg);
    // setErrMsg(resp?.response?.data?.errors[0]?.msg);
    // setErrMsg("Networ error");
    // setShow(true);
    //   }
  };

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
      <div className="flex items-center justify-center bg-white px-4 h-[calc(100vh-64px)]">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={rimilogo}
              alt="RIMI Logo"
              className="h-12 w-32 sm:h-[75px] sm:w-40"
            />
          </div>
          <h3 className="text-center text-3xl font-bold text-neutral-800 mb-2 capitalize">
            {t("Sign in")}
          </h3>
          {/* Heading */}
          <h2 className="text-center text-sm text-text-primary mb-8 capitalize">
            {t("Please Sign In to your account")}
          </h2>
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

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                {t("Password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", {
                    setValueAs: (value) => value.trim(),
                    required: t("Password is required"),
                    // minLength: {
                    //   value: 6,
                    //   message: "Password must be at least 6 characters",
                    // },
                    // validate: {
                    //   hasLetter: (value) =>
                    //     /[A-Za-z]/.test(value) ||
                    //     "Password must contain at least one letter",
                    //   hasNumber: (value) =>
                    //     /\d/.test(value) ||
                    //     "Password must contain at least one number",
                    // },
                  })}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-zinc-300 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeIcon
                      className="h-5 w-5 cursor-pointer"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-5 w-5 cursor-pointer"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {t(String(errors.password.message))}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-primary text-white font-semibold cursor-pointer transition-all delay-100 shadow hover:bg-indigo-700"
            >
              {t("Sign In")}
            </button>
          </form>
          <div className="flex w-full justify-end mt-1">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline "
            >
              {t("Forgot Password?")}
            </Link>
          </div>
        </div>
      </div>

      {/* // Toast  */}
      {NotificationComponent}

      {/* ///  */}
    </>
  );
};
export default Login;
