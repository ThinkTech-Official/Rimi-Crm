
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { LangContext } from "../context/LangContext";
import { useLanguage } from "../context/LanguageContext";
import DatePicker from "./DatePicker";
import { useReporting, ReportingPayload } from "../hooks/useReporting";
import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import useNotification from "../hooks/useNotification";
import useFormLanguageRevalidation from "../hooks/useFormLanguageRevalidation";

const Reporting: React.FC = () => {
  // const { langauge } = useContext(LangContext);
  const { t } = useLanguage();
  const { sendReport, loading, error, result } = useReporting();
  const {triggerNotification, NotificationComponent} = useNotification();

  // React Hook Form setup
  const methods = useForm<ReportingPayload>({
    defaultValues: {
      product: "",
      reportType: "",
      startDate: "",
      endDate: "",
      emailTo: "",
      emailCc: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  // show error-toast on network/validation error from hook
  useEffect(() => {
    if (error) {
      triggerNotification({type: "error", message: error})
    }
  }, [error]);

  // show success-toast when backend responds
  useEffect(() => {
    if (result?.success) {
      triggerNotification({
        type: "success",
        message: t("Report created successfully!")
      });
      reset(); // clear form
    }
  }, [result, reset, t]);

  const onSubmit: SubmitHandler<ReportingPayload> = async (data) => {
    await sendReport(data);
  };

  // Re-trigger validation when language changes to update error messages
  useFormLanguageRevalidation(methods);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto mt-4 px-2 py-4 sm:p-6 bg-[#F9F9F9]"
        noValidate
      >
        <h2 className="text-lg font-bold text-left text-[#1B1B1B] mb-2">
          {t("Reporting")}
        </h2>
        <p className="text-left font-medium text-[#6A6A6A] mb-8">
          {t("Enter all the criteria for the report")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          {/* PRODUCT */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">
              {t("Product")}
            </label>

            <div className="relative">
              <select
                {...register("product", { required: t("Product is required") })}
                className={`appearance-none input-primary w-full pr-10
                ${errors.product ? "border-red-500" : "border-[#3a17c5]"}
              `}
              >
                <option value="">---</option>
                <option value="RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL"> 
                  {t("RIMI Canuck Voyage Travel Medical")}
                </option>
                <option value="RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL">
                  {t("RIMI Canuck Voyage Non-Medical Travel")}
                </option>
                <option value="RIMI_MONTHLY">{t("Rimi Monthly")}</option>
                <option value="RIMI_WEEKLY">{t("Rimi Weekly")}</option>
                <option value="SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA">
                  {t("Secure Study RIMI International Students to Canada")}
                </option>
                <option value="SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL">
                  {t("Secure Travel RIMI Visitors to Canada Travel")}
                </option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            {errors.product && (
              <p className="text-red-500 text-sm">{errors.product.message}</p>
            )}
          </div>

          {/* REPORT TYPE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">
              {t("Report Type")}
            </label>
            <div className="relative">
              <select
                {...register("reportType", {
                  required: t("Report type is required"),
                })}
                className={`appearance-none input-primary ${
                  errors.reportType ? "border-red-500" : "border-[#3a17c5]"
                }`}
              >
                <option value="">---</option>
                <option value="SALES">{t("Sales")}</option>
                <option value="CHANGE">{t("Change Logs")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            {errors.reportType && (
              <p className="text-red-500 text-sm">
                {errors.reportType.message}
              </p>
            )}
          </div>

          {/* START DATE */}
          <Controller
            name="startDate"
            control={control}
            rules={{ required: t("Start date is required") }}
            render={({ field }) => (
              <DatePicker
                label={t("Start Date")}
                value={field.value}
                onChange={field.onChange}
                error={errors.startDate?.message}
              />
            )}
          />

          {/* END DATE */}
          <Controller
            name="endDate"
            control={control}
            rules={{ required: t("End date is required") }}
            render={({ field }) => (
              <DatePicker
                label={t("End Date")}
                value={field.value}
                onChange={field.onChange}
                error={errors.endDate?.message}
              />
            )}
          />

          {/* EMAIL TO */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">
              {t("Email To")}
            </label>
            <input
              placeholder={t("Email")}
              {...register("emailTo", {
                setValueAs: (value) => value?.trim()?.toLowerCase() || "",
                required: t("Recipient email is required"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("Invalid email address"),
                },
              })}
              type="email"
              className={`input-primary ${
                errors.emailTo ? "border-red-500" : "border-[#3a17c5]"
              }`}
            />
            {errors.emailTo && (
              <p className="text-red-500 text-sm">{errors.emailTo.message}</p>
            )}
          </div>

          {/* EMAIL CC (optional) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">
              {t("Email CC")}
            </label>
            <input
              placeholder={t("CC email address")}
              {...register("emailCc", {
                setValueAs: (value) => value?.trim()?.toLowerCase() || "",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("Invalid CC email address"),
                },
              })}
              type="email"
              className={`input-primary ${
                errors.emailCc ? "border-red-500" : "border-[#3a17c5]"
              }`}
            />
            {errors.emailCc && (
              <p className="text-red-500 text-sm">{errors.emailCc.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mt-6">
          <button type="submit" disabled={loading} className="btn-primary">
            {t("SEND REPORT")}
          </button>
        </div>
      </form>
      {NotificationComponent}
    </>
  );
};

export default Reporting;
