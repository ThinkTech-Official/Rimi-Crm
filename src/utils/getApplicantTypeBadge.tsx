import { useLanguage } from "../context/LanguageContext";

/**
 * Renders the applicant-type pill.
 *
 * This must stay a component, not a helper function. It reads language
 * context, and it is used inside .map() calls — as a plain function that made
 * the caller's hook count vary with the number of rows, which React reports as
 * "change in the order of Hooks".
 */
export const ApplicantTypeBadge = ({ agent }: { agent: any }) => {
  const { t } = useLanguage();

  if (!agent?.applicantType) return null;

  const base =
    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium";

  if (agent.applicantType === "independent") {
    return (
      <span className={`${base} bg-blue-100 text-blue-800`}>
        {t("Independent Agent")}
      </span>
    );
  }

  // Support new structure first
  if (agent.applicantType === "wfg") {
    return (
      <span className={`${base} bg-purple-100 text-purple-800`}>
        {t("WFG Agent")}
      </span>
    );
  }

  // Support old structure for backward compatibility
  if (agent.applicantType === "under_mga" && agent.mgaType === "wfg") {
    return (
      <span className={`${base} bg-purple-100 text-purple-800`}>
        {t("WFG Agent (Legacy)")}
      </span>
    );
  }

  if (agent.applicantType === "under_mga" && agent.mgaType === "other") {
    return (
      <span className={`${base} bg-orange-100 text-orange-800`}>
        {t("Agent under MGA")}
      </span>
    );
  }

  return (
    <span className={`${base} bg-red-100 text-red-800`}>{t("MGA Agent")}</span>
  );
};
