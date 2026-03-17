import { useLanguage } from "../context/LanguageContext";

export const getApplicantTypeBadge = (agent: any) => {
  const { t } = useLanguage();
  if (!agent.applicantType) return null;

  if (agent.applicantType === 'independent') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {t("Independent Agent")}
      </span>
    );
  }

  // Support new structure first
  if (agent.applicantType === 'wfg') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        {t("WFG Agent")}
      </span>
    );
  }

  // Support old structure for backward compatibility
  if (agent.applicantType === 'under_mga' && agent.mgaType === 'wfg') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        {t("WFG Agent (Legacy)")}
      </span>
    );
  }

  if (agent.applicantType === 'under_mga' && agent.mgaType === 'other') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
        {t("Agent under MGA")}
      </span>
    );
  }

  return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        {t("MGA Agent")}
      </span>;
};