import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ConfirmEligibilityNonMedical({
  confirmEligibility,
  setShowConfirmEligibility,
  setIsConfirmed,
}: any) {
  const { t } = useLanguage();
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (confirmEligibility) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [confirmEligibility]);

  // Detect if user scrolled to the end of list
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      setScrolledToEnd(isAtBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  const handleCloseConfirmEligibility = () => {
    setShowConfirmEligibility(false);
  };
  const handleAccept = () => {
    setIsConfirmed(true);
    handleCloseConfirmEligibility();
  };
  if (!confirmEligibility) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 shadow-md w-full max-w-xl overflow-auto m-2">
        <div className="border-b border-inputBorder pb-2 text-lg font-semibold">
          {t("Please read the following conditions before proceeding:")}
        </div>

        <ul
          ref={listRef}
          className="text-sm sm:text-base list-decimal pl-8 mt-2 text-text-secondary space-y-2 max-h-[360px] overflow-auto custom-scrollbar3 my-5"
        >
          <li>
            {t("Be at least 15 days of age and less than 86 years of age traveling for no more than 90 days; and")}
          </li>
          <li>
            {t("Be a member in good standing of an association or organization, or a client of a tour operator, that has agreed to participate in this insurance plan, or be the spouse or dependent child of a member insured under the same policy; and")}
          </li>
          <li>
            {t("Purchase coverage within 10 days of the initial deposit for your trip or prior to any cancellation penalties being applicable; and")}
          </li>
          <li>
            {t("Purchase coverage for the full value of the non-refundable, pre-paid travel arrangements; and")}
          </li>
          <li>
            {t("Purchase coverage for the entire duration of your trip; and")}
          </li>
          <li>
            {t("For traveling Canadians, purchase coverage prior to the date of departure from your province or territory of residence or Canada or; for visitors to Canada, purchase coverage prior to the date of departure from your home country; and")}
          </li>
          <li>
            {t("Know of no reason that you, an immediate family member, a travel companion, a travel companion’s immediate family member, or business partner would be unable to start or complete the trip as booked.")}
          </li>
        </ul>

        <div className="w-full flex justify-end gap-4">
          <button
            onClick={handleCloseConfirmEligibility}
            className="bg-white border border-inputBorder py-2 px-4 hover:border-gray-700 transition delay-100 cursor-pointer"
          >
            {t("Cancel")}
          </button>

          <button
            onClick={handleAccept}
            className={`btn-primary ${
              !scrolledToEnd ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!scrolledToEnd}
          >
            {t("Accept")}
          </button>
        </div>

        {!scrolledToEnd && (
          <p className="text-xs text-gray-500 italic mt-2 text-center">
            {t("Please scroll through all conditions to enable the “Accept” button.")}
          </p>
        )}
      </div>
    </div>
  );
}
