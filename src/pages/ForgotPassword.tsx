// src/components/ForgotPassword.tsx
import { useState, Fragment, useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Transition } from "@headlessui/react";
import {
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import rimilogo from "../assets/rimi_en.png";
import five from "../assets/login2.avif";
import { LangContext } from "../context/LangContext";
import { useForgotPassword } from "../hooks/useForgotPassword";

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

  const [toast, setToast] = useState<Toast>({
    type: "error",
    message: "",
    show: false,
  });

  // Show error toast when hookError changes
  useEffect(() => {
    if (hookError) {
      setToast({ type: "error", message: hookError, show: true });
    }
  }, [hookError]);

  // Show success toast when result.success is true
  useEffect(() => {
    if (result?.success) {
      setToast({
        type: "success",
        message: result.message,
        show: true,
      });
    }
  }, [result]);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const id = setTimeout(() => {
        setToast((t) => ({ ...t, show: false }));
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [toast.show]);

  const onSubmit: SubmitHandler<ForgotFormInputs> = async ({ email }) => {
    await sendResetLink(email);
  };

  return (
    <>
      <div className="flex min-h-full flex-1">
        {/* Left: form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <a href="#">
              <img className="h-10 w-auto" src={rimilogo} alt="Rimi" />
            </a>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {langauge === "En" ? "Forgot Password" : "Mot de passe oublié"}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 space-y-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {langauge === "En" ? "Email address" : "Adresse email"}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`block w-full rounded-md border-0 py-1.5 shadow-sm
                      ring-1 ring-inset ${
                        errors.email ? "ring-red-500" : "ring-gray-300"
                      } placeholder:text-gray-400
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600
                      sm:text-sm sm:leading-6`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`flex w-full justify-center rounded-md
                    px-3 py-1.5 text-sm font-semibold leading-6 text-white
                    shadow-sm transition ${
                      loading || isSubmitting
                        ? "bg-[#b5b4ec] hover:bg-[#b5b4ec]"
                        : "bg-[#4340DA] hover:bg-[#405ada]"
                    } focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
                >
                  {langauge === "En"
                    ? "Send Reset Link"
                    : "Envoyer le lien"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  {langauge === "En"
                    ? "Back to Login"
                    : "Retour à la connexion"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-screen w-full object-cover"
            src={five}
            alt=""
          />
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
                  <p className="mt-1 text-sm text-gray-500">
                    {toast.message}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() =>
                      setToast((t) => ({ ...t, show: false }))
                    }
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
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

export default ForgotPassword;
