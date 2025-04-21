// import {
//   useContext,
//   useState,
//   useEffect,
//   Fragment,
//   FormEvent,
// } from "react";
// import { LangContext } from "../context/LangContext";
// import { useReporting, ReportingPayload } from "../hooks/useReporting";
// import { Transition } from "@headlessui/react";
// import {
//   XCircleIcon,
//   CheckCircleIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";

// type ToastType = "error" | "success";

// interface Toast {
//   type: ToastType;
//   message: string;
//   show: boolean;
// }

// const Reporting: React.FC = () => {
//   const { langauge } = useContext(LangContext);
//   const { sendReport, loading, error, result } = useReporting();

//   const [form, setForm] = useState<ReportingPayload>({
//     product: "",
//     reportType: "",
//     startDate: "",
//     endDate: "",
//     emailTo: "",
//     emailCc: "",
//   });

//   // single toast state
//   const [toast, setToast] = useState<Toast>({
//     type: "error",
//     message: "",
//     show: false,
//   });

//   // whenever `error` changes, show an error toast
//   useEffect(() => {
//     if (error) {
//       setToast({ type: "error", message: error, show: true });
//     }
//   }, [error]);

//   const onChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
//   ) =>
//     setForm((f) => ({
//       ...f,
//       [e.target.name]: e.target.value,
//     }));

//   const onSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const response = await sendReport(form);

//     if (response?.success) {
//       setToast({
//         type: "success",
//         message:
//           langauge === "En"
//             ? "Report created successfully!"
//             : "Rapport créé avec succès !",
//         show: true,
//       });
//       // Optionally clear form:
//       setForm({
//         product: "",
//         reportType: "",
//         startDate: "",
//         endDate: "",
//         emailTo: "",
//         emailCc: "",
//       });
//     }
//   };

//   return (
//     <>
//       <form
//         onSubmit={onSubmit}
//         className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl"
//       >
//         <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">
//           {langauge === "En" ? "REPORTING" : "RAPPORTS"}
//         </h2>
//         <p className="text-center text-gray-600 mb-4">
//           {langauge === "En"
//             ? "Enter all the criteria for the report"
//             : "Saisissez tous les critères du rapport"}
//         </p>

//         <div className="grid grid-cols-2 gap-4">
//           {/* PRODUCT */}
//           <div className="flex flex-col gap-2">
//             <label className="block text-gray-700">
//               {langauge === "En" ? "PRODUCT" : "PRODUIT"}
//             </label>
//             <select
//               name="product"
//               value={form.product}
//               onChange={onChange}
//               className="w-full p-2 border rounded text-sm border-[#3a17c5] focus:outline-[#3a17c5]"
//             >
//               <option value="">---</option>
//               <option value="RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL">
//                 RIMI Canuck Voyage Travel Medical
//               </option>
//               <option value="RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL">
//                 RIMI Canuck Voyage Non-Medical Travel
//               </option>
//               <option value="RIMI_MONTHLY">Rimi Monthly</option>
//               <option value="RIMI_WEEKLY">Rimi Weekly</option>
//               <option value="SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA">
//                 Secure Study RIMI International Students to Canada
//               </option>
//               <option value="SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL">
//                 Secure Travel RIMI Visitors to Canada Travel
//               </option>
//             </select>
//           </div>
//           {/* REPORT TYPE */}
//           <div className="flex flex-col gap-2">
//             <label className="block text-gray-700">
//               {langauge === "En" ? "REPORT TYPE" : "TYPE DE RAPPORT"}
//             </label>
//             <select
//               name="reportType"
//               value={form.reportType}
//               onChange={onChange}
//               className="w-full p-2 border rounded text-sm border-[#3a17c5] focus:outline-[#3a17c5]"
//             >
//               <option value="">---</option>
//               <option value="SALES">Sales</option>
//               <option value="CHANGE">Change</option>
//             </select>
//           </div>
//           {/* START DATE */}
//           <div className="flex flex-col gap-2">
//             <label className="block text-gray-700">
//               {langauge === "En" ? "START DATE" : "DATE DE DÉBUT"}
//             </label>
//             <input
//               name="startDate"
//               type="date"
//               value={form.startDate}
//               onChange={onChange}
//               className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
//             />
//           </div>
//           {/* END DATE */}
//           <div className="flex flex-col gap-2">
//             <label className="block text-gray-700">
//               {langauge === "En" ? "END DATE" : "DATE DE FIN"}
//             </label>
//             <input
//               name="endDate"
//               type="date"
//               value={form.endDate}
//               onChange={onChange}
//               className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
//             />
//           </div>
//           {/* EMAIL TO */}
//           <div className="flex flex-col gap-2">
//             <label className="block text-gray-700">
//               {langauge === "En" ? "EMAIL TO" : "EMAIL TO"}
//             </label>
//             <input
//               name="emailTo"
//               type="email"
//               value={form.emailTo}
//               onChange={onChange}
//               className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
//             />
//           </div>
//           {/* EMAIL CC */}
//           <div className="flex flex-col gap-2">
//             <label className="block text-gray-700">
//               {langauge === "En" ? "EMAIL CC" : "EMAIL CC"}
//             </label>
//             <input
//               name="emailCc"
//               type="email"
//               value={form.emailCc}
//               onChange={onChange}
//               className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
//             />
//           </div>
//         </div>

//         <div className="flex justify-center items-center">
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition disabled:opacity-50"
//           >
//             {langauge === "En" ? "SEND REPORT" : "ENVOYER LE RAPPORT"}
//           </button>
//         </div>

//         {/*  show success inline if needed */}
//         {result && (
//           <p className="text-green-500 mt-2 text-center">
//             Report requested! ID: {result.id}
//           </p>
//         )}
//       </form>

//       {/* ===== Toast ===== */}
//       <div
//         aria-live="assertive"
//         className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
//       >
//         <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
//           <Transition
//             show={toast.show}
//             as={Fragment}
//             enter="transform ease-out duration-300 transition"
//             enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
//             enterTo="translate-y-0 opacity-100 sm:translate-x-0"
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//             afterLeave={() =>
//               setToast((t) => ({ ...t, show: false }))
//             }
//           >
//             <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//               <div className="p-4 flex items-start">
//                 <div className="flex-shrink-0">
//                   {toast.type === "error" ? (
//                     <XCircleIcon
//                       className="h-6 w-6 text-red-400"
//                       aria-hidden="true"
//                     />
//                   ) : (
//                     <CheckCircleIcon
//                       className="h-6 w-6 text-green-400"
//                       aria-hidden="true"
//                     />
//                   )}
//                 </div>
//                 <div className="ml-3 w-0 flex-1 pt-0.5">
//                   <p className="text-sm font-medium text-gray-900">
//                     {toast.type === "error" ? "Error" : "Success"}
//                   </p>
//                   <p className="mt-1 text-sm text-gray-500">
//                     {toast.message}
//                   </p>
//                 </div>
//                 <div className="ml-4 flex flex-shrink-0">
//                   <button
//                     type="button"
//                     className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     onClick={() =>
//                       setToast((t) => ({ ...t, show: false }))
//                     }
//                   >
//                     <span className="sr-only">Close</span>
//                     <XMarkIcon
//                       className="h-5 w-5"
//                       aria-hidden="true"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Transition>
//         </div>
//       </div>

      
//     </>
//   );
// };

// export default Reporting;


// ====================================

// src/components/Reporting.tsx
import {
  useContext,
  useState,
  useEffect,
  Fragment,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LangContext } from "../context/LangContext";
import { useReporting, ReportingPayload } from "../hooks/useReporting";
import { Transition } from "@headlessui/react";
import {
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type ToastType = "error" | "success";
interface Toast {
  type: ToastType;
  message: string;
  show: boolean;
}

const Reporting: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const { sendReport, loading, error, result } = useReporting();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportingPayload>({
    defaultValues: {
      product: "",
      reportType: "",
      startDate: "",
      endDate: "",
      emailTo: "",
      emailCc: "",
    },
  });

  // single toast state
  const [toast, setToast] = useState<Toast>({
    type: "error",
    message: "",
    show: false,
  });

  // show error-toast on network/validation error from hook
  useEffect(() => {
    if (error) {
      setToast({ type: "error", message: error, show: true });
    }
  }, [error]);

  // show success-toast when backend responds
  useEffect(() => {
    if (result?.success) {
      setToast({
        type: "success",
        message:
          langauge === "En"
            ? "Report created successfully!"
            : "Rapport créé avec succès !",
        show: true,
      });
      reset(); // clear form
    }
  }, [result, langauge, reset]);

  const onSubmit: SubmitHandler<ReportingPayload> = async (data) => {
    await sendReport(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl"
        noValidate
      >
        <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">
          {langauge === "En" ? "REPORTING" : "RAPPORTS"}
        </h2>
        <p className="text-center text-gray-600 mb-4">
          {langauge === "En"
            ? "Enter all the criteria for the report"
            : "Saisissez tous les critères du rapport"}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* PRODUCT */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">
              {langauge === "En" ? "PRODUCT" : "PRODUIT"}
            </label>
            <select
              {...register("product", { required: "Product is required" })}
              className={`w-full p-2 border rounded text-sm focus:outline-[#3a17c5] ${
                errors.product ? "border-red-500" : "border-[#3a17c5]"
              }`}
            >
              <option value="">---</option>
              <option value="RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL">
                RIMI Canuck Voyage Travel Medical
              </option>
              <option value="RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL">
                RIMI Canuck Voyage Non-Medical Travel
              </option>
              <option value="RIMI_MONTHLY">Rimi Monthly</option>
              <option value="RIMI_WEEKLY">Rimi Weekly</option>
              <option value="SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA">
                Secure Study RIMI International Students to Canada
              </option>
              <option value="SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL">
                Secure Travel RIMI Visitors to Canada Travel
              </option>
            </select>
            {errors.product && (
              <p className="text-red-500 text-sm">
                {errors.product.message}
              </p>
            )}
          </div>

          {/* REPORT TYPE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">
              {langauge === "En" ? "REPORT TYPE" : "TYPE DE RAPPORT"}
            </label>
            <select
              {...register("reportType", {
                required: "Report type is required",
              })}
              className={`w-full p-2 border rounded text-sm focus:outline-[#3a17c5] ${
                errors.reportType ? "border-red-500" : "border-[#3a17c5]"
              }`}
            >
              <option value="">---</option>
              <option value="SALES">Sales</option>
              <option value="CHANGE">Change</option>
            </select>
            {errors.reportType && (
              <p className="text-red-500 text-sm">
                {errors.reportType.message}
              </p>
            )}
          </div>

          {/* START DATE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">
              {langauge === "En" ? "START DATE" : "DATE DE DÉBUT"}
            </label>
            <input
              {...register("startDate", {
                required: "Start date is required",
              })}
              type="date"
              className={`w-full p-2 border rounded focus:outline-[#3a17c5] ${
                errors.startDate ? "border-red-500" : "border-[#3a17c5]"
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* END DATE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">
              {langauge === "En" ? "END DATE" : "DATE DE FIN"}
            </label>
            <input
              {...register("endDate", {
                required: "End date is required",
              })}
              type="date"
              className={`w-full p-2 border rounded focus:outline-[#3a17c5] ${
                errors.endDate ? "border-red-500" : "border-[#3a17c5]"
              }`}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">
                {errors.endDate.message}
              </p>
            )}
          </div>

          {/* EMAIL TO */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">
              {langauge === "En" ? "EMAIL TO" : "EMAIL TO"}
            </label>
            <input
              {...register("emailTo", {
                required: "Recipient email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className={`w-full p-2 border rounded focus:outline-[#3a17c5] ${
                errors.emailTo ? "border-red-500" : "border-[#3a17c5]"
              }`}
            />
            {errors.emailTo && (
              <p className="text-red-500 text-sm">
                {errors.emailTo.message}
              </p>
            )}
          </div>

          {/* EMAIL CC (optional) */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">
              {langauge === "En" ? "EMAIL CC" : "EMAIL CC"}
            </label>
            <input
              {...register("emailCc", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid CC email address",
                },
              })}
              type="email"
              className={`w-full p-2 border rounded focus:outline-[#3a17c5] ${
                errors.emailCc ? "border-red-500" : "border-[#3a17c5]"
              }`}
            />
            {errors.emailCc && (
              <p className="text-red-500 text-sm">
                {errors.emailCc.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition disabled:opacity-50"
          >
            {langauge === "En" ? "SEND REPORT" : "ENVOYER LE RAPPORT"}
          </button>
        </div>
      </form>

      {/* Toast notification */}
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
            afterLeave={() =>
              setToast((t) => ({ ...t, show: false }))
            }
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

export default Reporting;
