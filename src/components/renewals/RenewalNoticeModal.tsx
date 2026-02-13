import React, { useEffect } from 'react';
import { MdClose, MdPrint } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';

interface PolicyApplicant {
  id: string;
  policyNumber?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date | string;
  gender?: string;
  relation?: string;
  PreExCoverage?: string;
  premium?: number;
}

interface RenewalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy: {
    policyNumber?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date | string;
    gender?: string;
    PreExCoverage?: string;
    premium?: number;
    policyType?: string;
    coverage?: string;
    deductible?: string;
    countryOfOrigin?: string;
    applicantOnSuperVisa?: string;
    destination?: string;
    effectiveDate?: Date | string;
    expiryDate?: Date | string;
    applicants?: PolicyApplicant[];
    product?: string;
  };
}

const RenewalNoticeModal: React.FC<RenewalNoticeModalProps> = ({
  isOpen,
  onClose,
  policy,
}) => {
  const { t } = useLanguage();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDate = (date?: Date | string) => {
    if (!date) return t('N/A');
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      currencyDisplay: 'code'
    });
  };

  const calculateCoverageLength = () => {
    if (!policy.effectiveDate || !policy.expiryDate) return t('N/A');
    const start = new Date(policy.effectiveDate);
    const end = new Date(policy.expiryDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${t("Days")}`;
  };

  const allPolicyNumbers = [
    policy.policyNumber
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 h-full">
      <div className="bg-white shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar3">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-inputBorder px-3 sm:px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-semibold text-text-black">
              {t("View Renewal Notice")}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {t("Policy:")} <span className="text-primary font-medium">{policy.policyNumber}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 space-y-8">
          {/* Print Button */}
          <div className="flex justify-end">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium"
            >
              <MdPrint className="text-xl" />
              {t("View Printable Version")}
            </button>
          </div>

          {/* Logo and Summary Card */}
          <div className="bg-gray-50 border border-gray-200 p-3 sm:p-6">
            <div className="flex justify-between items-start mb-3">
              {/* <div className="text-2xl font-bold">
                <span className="text-blue-800">Secure</span>
                <span className="text-red-600">Travel</span>
              </div> */}
              <h1 className="text-[22px] font-bold text-primary mb-6">
              {t(policy.product?.split("_").join(" ") || '')}
            </h1>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase font-semibold">{t("Policy Number(s)")}</div>
                <div className="text-sm font-medium text-gray-900">{allPolicyNumbers}</div>
              </div>
            </div>

            {/* <h1 className="text-[22px] font-bold text-primary mb-6">
              {policy.product?.split("_").join(" ")}
            </h1> */}

            <div className="space-y-4 text-gray-700">
              <p>{t("Dear")} {policy.lastName || t('Valued Customer')},</p>
              <p>{t("Thank you for your confidence in RIMI Insurance Solutions Inc.")}</p>
              <p>
                {t("According to our records, your travel insurance policy is scheduled to expire shortly. If you have already received a new policy to continue your coverage, please disregard this notice.")}
              </p>
              <p>
                {t("If you wish to continue your coverage, please contact your agent or click")} <a href="#" className="text-primary font-medium underline">{t("here")}</a>.
                {t("Please note the new policy issuance is subject to the policy eligibility criteria.")}
              </p>
            </div>
          </div>

          {/* Primary Insured Person */}
          <section>
            <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">
              {t("Primary Insured Person")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoField label={t("Policy Number")} value={policy.policyNumber} />
              <InfoField label={t("First Name")} value={policy.firstName} />
              <InfoField label={t("Last Name")} value={policy.lastName} />
              <InfoField label={t("Date of Birth")} value={formatDate(policy.dateOfBirth)} />
              <InfoField label={t("Gender")} value={t(policy.gender || '')} />
              <InfoField
                label={t("Pre-Ex Coverage")}
                value={policy.PreExCoverage === 'yes' ? t('Yes') : t('No')}
                className="col-span-1 md:col-span-2 lg:col-span-2"
              />
              <InfoField
                label={t("Premium")}
                value={formatCurrency(policy.premium || 0)}
                valueClassName="text-green-600 font-bold"
              />
            </div>
          </section>

          {/* Additional Insured Persons */}
          {policy.applicants && policy.applicants.length > 0 && (
            <div className="space-y-8">
              {policy.applicants.map((applicant, index) => (
                <section key={applicant.id}>
                  <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">
                    {t("Insured Person")} {index + 2}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoField label={t("Policy Number")} value={applicant.policyNumber} />
                    <InfoField label={t("First Name")} value={applicant.firstName} />
                    <InfoField label={t("Last Name")} value={applicant.lastName} />
                    <InfoField label={t("Date of Birth")} value={formatDate(applicant.dateOfBirth)} />
                    <InfoField label={t("Gender")} value={t(applicant.gender || '')} />
                    <InfoField label={t("Relation")} value={t(applicant.relation || '')} />
                    <InfoField
                      label={t("Pre-Ex Coverage")}
                      value={applicant.PreExCoverage === "yes" ? t('Yes') : t('No')}
                      className="col-span-1 md:col-span-2"
                    />
                    <InfoField
                      label={t("Premium")}
                      value={formatCurrency(applicant.premium || 0)}
                      valueClassName="text-green-600 font-bold"
                    />
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Coverage Details */}
          <section className="bg-blue-50/50 border border-blue-100 p-3 sm:p-6">
            <h3 className="text-lg font-bold text-primary mb-4">{t("Coverage Details")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              <InfoField label={t("Plan Name")} value={t("Visitors to Canada")} />
              <InfoField label={t("Policy Type")} value={t(policy.policyType || 'Standard')} />
              <InfoField label={t("Coverage Amount")} value={policy.coverage} />
              <InfoField label={t("Deductible")} value={policy.deductible} />
              <InfoField label={t("Country of Origin")} value={t(policy.countryOfOrigin || '')} />
              <InfoField label={t("Super Visa?")} value={policy.applicantOnSuperVisa === "yes" ? t("Yes") : t("No")} />
              <InfoField label={t("Destination")} value={t(policy.destination || '')} />
              <InfoField label={t("Effective Date")} value={formatDate(policy.effectiveDate)} />
              <InfoField label={t("Expiry Date")} value={formatDate(policy.expiryDate)} />
              <InfoField
                label={t("Coverage Length")}
                value={calculateCoverageLength()}
                valueClassName="font-bold text-primary"
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-inputBorder p-3 sm:p-6 flex justify-end z-10">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-inputBorder hover:border-gray-400 font-semibold transition-all cursor-pointer"
          >
            {t("CLOSE")}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for structured info fields
const InfoField: React.FC<{
  label: string;
  value?: string | number;
  className?: string;
  valueClassName?: string;
}> = ({ label, value, className = '', valueClassName = '' }) => (
  <div className={className}>
    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
      {label}
    </div>
    <div className={`text-sm text-gray-900 ${valueClassName}`}>
      {value || '-'}
    </div>
  </div>
);

export default RenewalNoticeModal;