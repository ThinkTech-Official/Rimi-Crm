import React from 'react';

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
  };
}

const RenewalNoticeModal: React.FC<RenewalNoticeModalProps> = ({
  isOpen,
  onClose,
  policy,
}) => {
  if (!isOpen) return null;

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)} CAD`;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            View Renewal Notice
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Print Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              View Printable Version
            </button>
          </div>

          {/* Logo and Header */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold">
                <span className="text-blue-800">Secure</span>
                <span className="text-red-600">Travel</span>
              </div>
            </div>

            <div className="text-right text-gray-600 mb-4">
              Policy Number(s):
              <br />
              {allPolicyNumbers}
            </div>

            <h1 className="text-2xl font-bold text-blue-800 mb-6">
              Insurance Expiry Notice
            </h1>
          </div>

          {/* Letter Content */}
          <div className="mb-6 space-y-4">
            <p>Dear {policy.lastName || 'Valued Customer'},</p>

            <p>Thank you for your confidence in RIMI Insurance Solutions Inc.</p>

            <p>
              According to our records, your travel insurance policy is scheduled to
              expire shortly. If you have already received a new policy to continue
              your coverage, please disregard this notice.
            </p>

            <p>
              If you wish to continue your coverage, please contact your agent or
              click{' '}
              <a href="#" className="text-blue-600 underline">
                here
              </a>
              . Please note the new policy issuance is subject to the policy
              eligibility criteria.
            </p>
          </div>

          {/* Primary Insured Person */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-4">
              Primary Insured Person
            </h2>
            <div className="space-y-2 text-sm">
              <InfoRow label="Policy Number" value={policy.policyNumber || 'N/A'} />
              <InfoRow label="First Name" value={policy.firstName || 'N/A'} />
              <InfoRow label="Last Name" value={policy.lastName || 'N/A'} />
              <InfoRow
                label="Date of Birth"
                value={formatDate(policy.dateOfBirth)}
              />
              <InfoRow label="Gender" value={policy.gender || 'Not specified'} />
              <InfoRow
                label="Include coverage for stable pre-existing medical conditions"
                value={policy.PreExCoverage || 'No'}
              />
              <InfoRow label="Premium" value={formatCurrency(policy.premium || 0)} />
            </div>
          </div>

          {/* Additional Insured Persons */}
          {policy.applicants && policy.applicants.length > 0 && (
            <>
              {policy.applicants.map((applicant, index) => (
                <div key={applicant.id} className="mb-6">
                  <h2 className="text-lg font-bold text-blue-800 mb-4">
                    Insured Person {index + 2}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <InfoRow
                      label="Policy Number"
                      value={applicant.policyNumber || 'N/A'}
                    />
                    <InfoRow label="First Name" value={applicant.firstName || 'N/A'} />
                    <InfoRow label="Last Name" value={applicant.lastName || 'N/A'} />
                    <InfoRow
                      label="Date of Birth"
                      value={formatDate(applicant.dateOfBirth)}
                    />
                    <InfoRow label="Gender" value={applicant.gender || 'Not specified'} />
                    <InfoRow
                      label="Relationship to Primary Insured Person"
                      value={applicant.relation || '-'}
                    />
                    <InfoRow
                      label="Include coverage for stable pre-existing medical conditions"
                      value={applicant.PreExCoverage || 'No'}
                    />
                    <InfoRow
                      label="Premium"
                      value={formatCurrency(applicant.premium || 0)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Coverage */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-4">Coverage</h2>
            <div className="space-y-2 text-sm">
              <InfoRow label="Plan Name" value="Visitors to Canada" />
              <InfoRow
                label="Policy Type"
                value={policy.policyType || 'Standard'}
              />
              <InfoRow
                label="Amount of Coverage for Each Person"
                value={policy.coverage || '$25,000.00 CAD'}
              />
              <InfoRow
                label="Deductible"
                value={policy.deductible || '$0.00 CAD'}
              />
              <InfoRow
                label="Country of Origin"
                value={policy.countryOfOrigin || '-'}
              />
              <InfoRow
                label="Are applicants travelling to Canada on a Super Visa?"
                value={policy.applicantOnSuperVisa || 'No'}
              />
              <InfoRow
                label="Destination Province"
                value={policy.destination || 'ON'}
              />
              <InfoRow
                label="Effective Date"
                value={formatDate(policy.effectiveDate)}
              />
              <InfoRow
                label="Expiry Date"
                value={formatDate(policy.expiryDate)}
              />
              <InfoRow label="Coverage Length" value={calculateCoverageLength()} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for info rows
const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex">
    <span className="font-semibold text-gray-700 min-w-[300px]">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default RenewalNoticeModal;