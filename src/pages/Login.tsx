import { useState, Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
// import useAdmin from '../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';

import rimilogo from "../assets/rimi_en.png";
import { LangContext } from "../context/LangContext";
import { useAuth } from "../hooks/useAuth";



interface LoginFormInputs {
  email: string;
  password: string;
}



const Login = () => {
  const navigate = useNavigate();

  const { langauge } = useContext(LangContext);

  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [signInClicked,setSignInClicked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // const { login, loading, error} = useAuth()
  const { login } = useAuth()

  // const { login } = useAdmin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data:LoginFormInputs) => {
    setSignInClicked(true)
    console.log(data);
    const result = await login(data.email, data.password);
    console.log(result.type)
    if (result.type === 'auth/loginUser/fulfilled') {
      navigate('/dashboard');
    } else if(result.type === 'auth/loginUser/rejected'){
      setErrMsg(result.payload);
      setShow(true);
      setSignInClicked(false)
    } else {
      setErrMsg("Network Error")
      setShow(true);
      setSignInClicked(false)
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

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
      <div className="flex h-screen flex-1  justify-center items-center ">
        <div className="flex flex-1 flex-col  justify-center items-center ">
          <div className="mx-auto w-full  max-w-md lg:w-130 ">
            <div className="flex flex-col justify-center items-center">
              <a href="#">
                <img
                  className="h-10 w-auto"
                  src={rimilogo}
                  alt="Your Company"
                />
              </a>

              <h2 className="mt-8 text-3xl font-bold font-[inter] leading-9  text-[#232323]">
                {langauge === "En" ? <p>Sign in</p> : <p>Se connecter</p>}
              </h2>
              <h4 className="mt-4 text-md font-normal font-[inter] text-[#969696]">
                Please login to continue to your account.
              </h4>

              {/* <p className="mt-2 text-sm leading-6 text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Start a 14 day free trial
                    </a>
                  </p> */}
            </div>

            <div className="mt-10">
              <div>
                <form
                  id="signinForm"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="sr-only block text-sm font-medium leading-6 text-[#D9D9D9]"
                    >
                      {langauge === "En" ? (
                        <p>Email Address</p>
                      ) : (
                        <p>Adresse email</p>
                      )}
                    </label>

                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email", { required: true })}
                        className="block w-full rounded-sm border border-[#D9D9D9] p-3 hover:border-[#2B00B7]   placeholder:text-[#9A9A9A] font-[inter] "
                        placeholder="Username/email"
                      />
                      {errors.email && (
                        <span className="text-red-500  text-sm  font-[inter]">Email is required</span>
                      )}
                    </div>
                  </div>
                  {/* password field */}
                  
                  <div>
                    <label
                      htmlFor="password"
                      className="sr-only block text-sm font-medium leading-6 text-[#D9D9D9]"
                    >
                      {langauge === "En" ? (
                        <p>Password</p>
                      ) : (
                        <p>Mot de passe</p>
                      )}
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        {...register("password", { required: true })}
                        className="block w-full rounded-sm border border-[#D9D9D9] p-3 hover:border-[#2B00B7] placeholder:text-[#9A9A9A] font-[inter] pr-10"
                        placeholder="Password"
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#9A9A9A]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeIcon className="h-5 w-5" />
                        ) : (
                          <EyeSlashIcon className="h-5 w-5" />
                        )}
                      </div>
                      {errors.password && (
                        <span className="text-red-500 text-sm font-[inter]">
                          Password is required
                        </span>
                      )}
                    </div>
                    
                  </div>
                  {/* <div className="flex items-center justify-between"> */}
                  {/* <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                            Remember me
                          </label>
                        </div> */}
                  {/* <div className="text-sm leading-6">
                          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                          </a>
                        </div> */}
                  {/* </div> */}
                  
                  <div className=" flex flex-col gap-4">
                    { signInClicked
                       ? 
                       <button
                      
                      className="flex w-full justify-center rounded-md bg-[#b5b4ec] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#90a1fa] focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    >
                      {langauge === "En" ? <p>Sign in</p> : <p>Se connecter</p>}
                    </button>
                       : 
                       <button
                      type="submit"
                      className="w-full mt-2 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"
                    >
                      {langauge === "En" ? <p>Sign in</p> : <p>Se connecter</p>}
                    </button>
                    }
                    {/* <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#4340DA] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#405ada] focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    >
                      {langauge === "En" ? <p>Sign in</p> : <p>Se connecter</p>}
                    </button> */}
                    
                  </div>
                  <button
                      onClick={handleForgotPassword}
                      className="flex w-full justify-left p-1 mt-1 text-sm font-semibold font-[inter] leading-6 text-[#4340DA] hover:text-[#2B00B7] cursor-pointer"
                    >
                      {langauge === "En" ? <p>Forgot Password?</p> : <p>Mot de passe oublié?</p>}
                    </button>
                </form>
              </div>

              {/* <div className="mt-10">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white px-6 text-gray-900">Or continue with</span>
                      </div>
                    </div>
    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                      >
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        <span className="text-sm font-semibold leading-6">Twitter</span>
                      </a>
    
                      <a
                        href="#"
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                      >
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-semibold leading-6">GitHub</span>
                      </a>
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* // Toast  */}
      <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">Error</p>
                      <p className="mt-1 text-sm text-gray-500">{errMsg}</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>

      {/* ///  */}
    </>
  );
};
export default Login;
