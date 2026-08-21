import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ConfirmEligibilityMedical({
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
      // If content is not scrollable, it's considered scrolled to end
      const isNotScrollable = el.scrollHeight <= el.clientHeight;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      setScrolledToEnd(isNotScrollable || isAtBottom);
    };

    handleScroll(); // Initial check
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
            {t("Be a Canadian resident travelling outside their home province;")}
          </li>
          <li>
            {t("Be at least 15 days of age and less than 80 years of age;")}
          </li>
          <li>
            {t("Not be travelling against the advice of a physician and/or have not been diagnosed with a terminal illness;")}
          </li>
          <li>
            {t("Not be experiencing new or undiagnosed signs or symptoms and/or know of any reason to seek medical attention;")}
          </li>
          <li>
            {t("Not require assistance with the activities of daily living (eating, bathing, dressing, functional mobility, using the toilet).")}
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
