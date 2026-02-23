import { useRef, useEffect } from "react";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ConfirmEligibilityStudents({
  confirmEligibility,
  setShowConfirmEligibility,
  setIsConfirmed,
}: any) {
  const { t } = useLanguage();
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
            {t("At least 15 days old and less than 65 years of age; and")}
          </li>
          <li>
            {t("Ineligible for benefits under a government health insurance plan; and")}
          </li>
          <li>
            {t("Residing in Canada on a temporary basis; and")}
          </li>
          <li>
            {t("One of the following:")}
            <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
              <li>
                {t("A student attending classes on a full-time basis at a recognized Canadian institution of learning; or")}
              </li>
              <li>
                {t("A student completing post-doctorate research in a recognized Canadian institution of learning; or")}
              </li>
              <li>
                {t("The spouse or dependent child of the insured student and residing with them on a full-time basis; or")}
              </li>
              <li>
                {t("The parent, legal guardian, teacher or chaperone of the insured student.")}
              </li>
            </ul>
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
            className={`btn-primary`}
          >
            {t("Accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
