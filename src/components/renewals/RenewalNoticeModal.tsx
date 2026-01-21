import React, { useEffect } from 'react';
import { MdClose, MdPrint } from 'react-icons/md';

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
    if (!date) return 'N/A';
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
    if (!policy.effectiveDate || !policy.expiryDate) return 'N/A';
    const start = new Date(policy.effectiveDate);
    const end = new Date(policy.expiryDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days`;
  };

  const allPolicyNumbers = [
    policy.policyNumber || 'N/A',
    ...(policy.applicants?.map(a => a.policyNumber || 'N/A') || []),
  ].filter(Boolean).join(', ');

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
              View Renewal Notice
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Policy: <span className="text-primary font-medium">{policy.policyNumber}</span>
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
              View Printable Version
            </button>
          </div>

          {/* Logo and Summary Card */}
          <div className="bg-gray-50 border border-gray-200 p-3 sm:p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="text-2xl font-bold">
                <span className="text-blue-800">Secure</span>
                <span className="text-red-600">Travel</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase font-semibold">Policy Number(s)</div>
                <div className="text-sm font-medium text-gray-900">{allPolicyNumbers}</div>
              </div>
            </div>

            <h1 className="text-[22px] font-bold text-primary mb-6">
              {policy.product?.split("_").join(" ")}
            </h1>

            <div className="space-y-4 text-gray-700">
              <p>Dear {policy.lastName || 'Valued Customer'},</p>
              <p>Thank you for your confidence in RIMI Insurance Solutions Inc.</p>
              <p>
                According to our records, your travel insurance policy is scheduled to
                expire shortly. If you have already received a new policy to continue
                your coverage, please disregard this notice.
              </p>
              <p>
                If you wish to continue your coverage, please contact your agent or
                click <a href="#" className="text-primary font-medium underline">here</a>.
                Please note the new policy issuance is subject to the policy eligibility criteria.
              </p>
            </div>
          </div>

          {/* Primary Insured Person */}
          <section>
            <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">
              Primary Insured Person
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoField label="Policy Number" value={policy.policyNumber} />
              <InfoField label="First Name" value={policy.firstName} />
              <InfoField label="Last Name" value={policy.lastName} />
              <InfoField label="Date of Birth" value={formatDate(policy.dateOfBirth)} />
              <InfoField label="Gender" value={policy.gender} />
              <InfoField
                label="Pre-Ex Coverage"
                value={policy.PreExCoverage || 'No'}
                className="col-span-1 md:col-span-2 lg:col-span-2"
              />
              <InfoField
                label="Premium"
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
                    Insured Person {index + 2}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoField label="Policy Number" value={applicant.policyNumber} />
                    <InfoField label="First Name" value={applicant.firstName} />
                    <InfoField label="Last Name" value={applicant.lastName} />
                    <InfoField label="Date of Birth" value={formatDate(applicant.dateOfBirth)} />
                    <InfoField label="Gender" value={applicant.gender} />
                    <InfoField label="Relation" value={applicant.relation} />
                    <InfoField
                      label="Pre-Ex Coverage"
                      value={applicant.PreExCoverage || 'No'}
                      className="col-span-1 md:col-span-2"
                    />
                    <InfoField
                      label="Premium"
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
            <h3 className="text-lg font-bold text-primary mb-4">Coverage Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              <InfoField label="Plan Name" value="Visitors to Canada" />
              <InfoField label="Policy Type" value={policy.policyType || 'Standard'} />
              <InfoField label="Coverage Amount" value={policy.coverage} />
              <InfoField label="Deductible" value={policy.deductible} />
              <InfoField label="Country of Origin" value={policy.countryOfOrigin} />
              <InfoField label="Super Visa?" value={policy.applicantOnSuperVisa} />
              <InfoField label="Destination" value={policy.destination} />
              <InfoField label="Effective Date" value={formatDate(policy.effectiveDate)} />
              <InfoField label="Expiry Date" value={formatDate(policy.expiryDate)} />
              <InfoField
                label="Coverage Length"
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
            CLOSE
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