import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";

const EmailQuoteNonMed = ({
  premiumBreakdown,
  setIsEmailModalOpen,
  quoteNumber = "Q-12345",
  quoteLink = "#",
}: {
    premiumBreakdown: any;
  setIsEmailModalOpen: (val: boolean) => void;
  quoteNumber: string | null;
  quoteLink?: string;
}) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleModalClose = () => setIsEmailModalOpen(false);

  const handleSendEmail = async () => {
    console.log("Send to:", email);
  };
  const subject = `${t("Your Insurance Quote")} ${quoteNumber} ${t("from RIMI Insurance")}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full flex flex-col max-h-[90%] overflow-auto custom-scrollbar3">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-inputBorder">
          <h2 className="text-xl font-bold text-primary text-center">
            {t("Email Quote Preview")}
          </h2>
        </div>

        {/* Email Input */}
        <div className="px-6 py-4">
          <label className="block text-sm mb-1">{t("Recipient Email")}</label>
          <input
            type="email"
            placeholder={t("Enter email address")}
            className="input-primary w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Email Preview */}
        <div className="px-6 py-4 bg-greyBg">
          <div className="bg-white p-6 shadow-sm">
            {/* Subject */}
            <p className="mb-4 text-text-primary text-base">
              <strong>{t("Subject:")} </strong>
              {subject}
            </p>
            {/* Greeting */}
            <p className="mb-4 text-gray-700">{t("Hi,")}</p>

            {/* Email body */}
            <p className="mb-4 text-gray-700">
              {t("Thank you for requesting a quote with RIMI Insurance. Your quote amount details are provided below. You can view your full quote by clicking the quote number.")}
            </p>

            {/* Quote Number as clickable link */}
            <p className="mb-4 text-gray-700">
              {t("Quote Number:")}{" "}
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {quoteNumber}
              </a>
            </p>

            <div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>{t("Base Premium:")}</span>
                <span>${premiumBreakdown.basePremium.toFixed(2)}</span>
              </div>
              {premiumBreakdown.deluxePremium && (
                <div className="flex justify-between">
                  <span>{t("Deluxe Option (+25%):")}</span>
                  <span>+${premiumBreakdown.deluxePremium.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base">
                <span>{t("Total Premium:")}</span>
                <span className="">
                  ${premiumBreakdown.finalPremium.toFixed(2)} {t("CAD")}
                </span>
              </div>
            </div>
          </div>

            {/* Footer */}
            <p className="mt-6 text-gray-700">
              {t("Kind regards,")}
              <br />
              {t("RIMI Insurance Team")}
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 flex justify-end gap-2">
          <button
            className="py-2 px-4 border border-inputBorder hover:border-gray-700 cursor-pointer transition delay-100"
            onClick={handleModalClose}
          >
            {t("Close")}
          </button>
          <button
            className="btn-primary disabled:opacity-70"
            onClick={handleSendEmail}
            disabled={sending}
          >
            {sending ? t("Sending...") : t("Send Email")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailQuoteNonMed;
