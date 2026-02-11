import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../../../context/LanguageContext";

export default function BulkUpload() {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B]">
        {t("Bulk Upload")}
      </h2>
      <p className="text-[#3a17c5] text-left mb-6">
      {t("Secure Study RIMI International Students To Canada")}
      </p>

      <div className="p-6 shadow-sm bg-white w-full border-inputBorder text-text-secondary">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          {t("CSV FILE")}
        </label>

        <label htmlFor="csvFile" className="w-full border-2 border-dashed border-inputBorder p-6 flex flex-col items-center justify-center text-center mb-4 cursor-pointer hover:bg-gray-50 transition">
          <ArrowUpTrayIcon className="h-8 w-8 text-[#3a17c5]" />
          <p className="text-sm text-gray-500 mt-2">{t("Upload CSV here")}</p>
          <input type="file" id="csvFile" className="hidden" accept=".csv"/>
        </label>

        <label className="block text-text-secondary text-sm font-medium mb-2">
        {t("Fulfillment Options")}
        </label>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="separateEmails" className="mr-2 accent-primary cursor-pointer" />
          <label htmlFor="separateEmails" className="text-text-secondary text-sm">
            {t("Separate Emails")}
          </label>
        </div>

        <label className="block text-text-secondary text-sm font-medium mb-2">
          {t("Email")}
        </label>
        <input
          type="email"
          className="input-primary"
          placeholder={t("Enter your email")}
        />

        <button className="btn-primary w-full mt-4">
          {t("Upload CSV")}
        </button>
      </div>
    </div>
  );
}
