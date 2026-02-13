import React, { useState, useEffect } from 'react';
import { usePolicySplit } from '../../hooks/admin-dashboard/usePolicySplit';
import { MdClose } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';


interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  effectiveDate: string;
  expiryDate: string;
  relation?: string;
  preMedCoverage?: string;
  isPrimary?: boolean;
}

interface PolicySplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyId: string;
  policyNumber: string;
  primaryApplicant: Applicant;
  additionalApplicants: Applicant[];
  totalPremium: number;
  paymentOption: 'lump-sum' | 'monthly';
  onSuccess: () => void;
}

type WizardStep = 'select' | 'preview' | 'confirm';

export const PolicySplitModal: React.FC<PolicySplitModalProps> = ({
  isOpen,
  onClose,
  policyId,
  policyNumber,
  primaryApplicant,
  additionalApplicants,
  totalPremium,
  paymentOption,
  onSuccess,
}) => {
  const { t } = useLanguage();
  const { loading, error, preview, getPreview, executeSplit } = usePolicySplit(policyId);

  const [currentStep, setCurrentStep] = useState<WizardStep>('select');
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());
  const [splitMode, setSplitMode] = useState<'individual' | 'grouped'>('individual');
  const [adminNotes, setAdminNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // All applicants (primary + additional)
  const allApplicants: Applicant[] = [
    { ...primaryApplicant, isPrimary: true },
    ...additionalApplicants.map(a => ({ ...a, isPrimary: false })),
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentStep('select');
      setSelectedApplicants(new Set());
      setSplitMode('individual');
      setAdminNotes('');
      setValidationErrors([]);
    }
  }, [isOpen]);

  /**
   * Validate travel dates within groups
   */
  const validateTravelDates = (): boolean => {
    const errors: string[] = [];

    if (splitMode === 'grouped') {
      // Check if selected applicants have same travel dates
      const selectedApps = allApplicants.filter(a => 
        selectedApplicants.has(a.id) || (a.isPrimary && selectedApplicants.size === 0)
      );

      const dates = selectedApps.map(a => ({
        effective: a.effectiveDate,
        expiry: a.expiryDate,
      }));

      const firstDate = dates[0];
      const hasDifferentDates = dates.some(
        d => d.effective !== firstDate.effective || d.expiry !== firstDate.expiry
      );

      if (hasDifferentDates) {
        errors.push(
          t('Selected applicants have different travel dates. They cannot be grouped together.')
        );
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  /**
   * Build split groups configuration
   */
  const buildSplitGroups = () => {
    if (splitMode === 'individual') {
      // Each applicant becomes their own policy
      return allApplicants.map(applicant => ({
        applicantIds: applicant.isPrimary ? [] : [applicant.id],
        effectiveDate: applicant.effectiveDate,
        expiryDate: applicant.expiryDate,
        isPrimaryInGroup: applicant.isPrimary ?? false,
      }));
    } else {
      // Grouped mode: selected together, others separate
      const selected = allApplicants.filter(a => 
        selectedApplicants.has(a.id) || (a.isPrimary && selectedApplicants.size === 0)
      );
      const notSelected = allApplicants.filter(a => 
        !(selectedApplicants.has(a.id) || (a.isPrimary && selectedApplicants.size === 0))
      );

      const groups = [];

      // Group 1: Selected applicants
      if (selected.length > 0) {
        const hasPrimary = selected.some(a => a.isPrimary);
        groups.push({
          applicantIds: selected.filter(a => !a.isPrimary).map(a => a.id),
          effectiveDate: selected[0].effectiveDate,
          expiryDate: selected[0].expiryDate,
          isPrimaryInGroup: hasPrimary,
        });
      }

      // Group 2+: Each non-selected applicant
      for (const applicant of notSelected) {
        groups.push({
          applicantIds: applicant.isPrimary ? [] : [applicant.id],
          effectiveDate: applicant.effectiveDate,
          expiryDate: applicant.expiryDate,
          isPrimaryInGroup: applicant.isPrimary ?? false,
        });
      }

      return groups;
    }
  };

  /**
   * Handle preview button click
   */
  const handlePreview = async () => {
    if (!validateTravelDates()) {
      return;
    }

    try {
      const splitGroups = buildSplitGroups();
      await getPreview(splitGroups);
      setCurrentStep('preview');
    } catch (err) {
      console.error('Preview failed:', err);
    }
  };

  /**
   * Handle confirm split
   */
  const handleConfirmSplit = async () => {
    if (!adminNotes.trim()) {
      setValidationErrors([t('Please provide a reason for the split')]);
      return;
    }

    try {
      const splitGroups = buildSplitGroups();
      await executeSplit(splitGroups, adminNotes);
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Split execution failed:', err);
    }
  };

  /**
   * Toggle applicant selection
   */
  const toggleApplicant = (applicantId: string) => {
    const newSelected = new Set(selectedApplicants);
    if (newSelected.has(applicantId)) {
      newSelected.delete(applicantId);
    } else {
      newSelected.add(applicantId);
    }
    setSelectedApplicants(newSelected);
  };

  /**
   * Format date for display
   */
  const calculateDays = (start: string, end: string) => {
    const diffTime = new Date(end).getTime() - new Date(start).getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 h-full" onClick={onClose}>
      {/* Modal */}
        <div className="bg-white shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar3" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-inputBorder px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-primary">{t("Split Policy")}</h2>
              <p className="text-sm text-text-secondary mt-1">
                {t("Policy:")} {policyNumber} | {t("Step")} {currentStep === 'select' ? '1' : currentStep === 'preview' ? '2' : '3'} {t("of")} 3
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
          <div className="p-6">
            {/* Error Display */}
            {(error || validationErrors.length > 0) && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">{t("Errors:")}</p>
                <ul className="list-disc list-inside text-red-700 text-sm mt-2">
                  {error && <li>{t(error)}</li>}
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{t(err)}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* STEP 1: SELECT APPLICANTS */}
            {currentStep === 'select' && (
              <div>
                {/* Split Mode Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    {t("How would you like to split this policy?")}
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start p-4 border border-inputBorder cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="splitMode"
                        value="individual"
                        checked={splitMode === 'individual'}
                        onChange={(e) => setSplitMode(e.target.value as 'individual')}
                        className="mt-1 h-4 w-4 text-blue-600 accent-primary"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-text-primary">{t("Split into individual policies")}</span>
                        <p className="text-sm text-gray-600 mt-1">
                          {t("Each insured person will have their own separate policy")}
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border border-inputBorder cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="splitMode"
                        value="grouped"
                        checked={splitMode === 'grouped'}
                        onChange={(e) => setSplitMode(e.target.value as 'grouped')}
                        className="mt-1 h-4 w-4 text-blue-600 accent-primary"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-text-primary">{t("Group selected applicants")}</span>
                        <p className="text-sm text-gray-600 mt-1">
                          {t("Keep selected applicants together on one policy, separate others")}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Applicant Selection Grid */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {splitMode === 'individual' 
                      ? t('Insured Persons (each will become a separate policy)')
                      : t('Select applicants to keep together')}
                  </h3>

                  <div className="space-y-3">
                    {allApplicants.map((applicant) => {
                      const isSelected = selectedApplicants.has(applicant.id);
                      const days = calculateDays(applicant.effectiveDate, applicant.expiryDate);

                      return (
                        <div
                          key={applicant.id}
                          className={`border p-4 transition-all ${
                            splitMode === 'grouped' && isSelected
                              ? 'border-primary bg-blue-50/50'
                              : 'border-inputBorder hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-start">
                            {/* Checkbox (only in grouped mode) */}
                            {splitMode === 'grouped' && (
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleApplicant(applicant.id)}
                                className="mt-1 h-5 w-5 text-blue-600 rounded accent-primary cursor-pointer"
                              />
                            )}

                            {/* Applicant Details */}
                            <div className={splitMode === 'grouped' ? 'ml-3 flex-1' : 'flex-1'}>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">
                                  {applicant.firstName} {applicant.lastName}
                                </h4>
                                {applicant.isPrimary && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                    {t("Primary")}
                                  </span>
                                )}
                              </div>

                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-text-secondary">{t("DOB:")}</span>
                                  <span className="ml-2 text-text-primary">{new Date(applicant.dateOfBirth).toLocaleDateString('en-CA')}</span>
                                </div>
                                <div>
                                  <span className="text-text-secondary">{t("Relation:")}</span>
                                  <span className="ml-2 text-text-primary">
                                    {t(applicant.relation || 'Primary')}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-text-secondary">{t("Coverage:")}</span>
                                  <span className="ml-2 text-text-primary">
                                    {new Date(applicant.effectiveDate).toLocaleDateString('en-CA')} - {new Date(applicant.expiryDate).toLocaleDateString('en-CA')}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-text-secondary">{t("Days:")}</span>
                                  <span className="ml-2 text-text-primary font-medium">{days} {t("days")}</span>
                                </div>
                                <div>
                                  <span className="text-text-secondary">{t("Pre-Med:")}</span>
                                  <span className="ml-2 text-text-primary">
                                    {applicant.preMedCoverage === 'yes' ? t('Yes') : t('No')}
                                  </span>
                                </div>
                              </div>

                              {/* Warning for different dates */}
                              {splitMode === 'grouped' && 
                               isSelected && 
                               applicant.expiryDate !== allApplicants[0].expiryDate && (
                                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                  <p className="text-yellow-800 text-sm">
                                    ⚠️ {t("Different expiry date from other selected applicants")}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="py-2 px-4 border border-inputBorder hover:border-gray-400 cursor-pointer transition delay-100"
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    onClick={handlePreview}
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? t('Loading...') : t('Preview Split')}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PREVIEW */}
            {currentStep === 'preview' && preview && (
              <div>
                {/* Original Policy Summary */}
                <div className="mb-6 p-4 bg-gray-50/30 border border-inputBorder">
                  <h3 className="font-semibold text-gray-900 mb-2">{t("Original Policy")}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">{t("Policy Number:")}</span>
                      <span className="ml-2 font-medium">{preview.original.policyNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t("Total Premium:")}</span>
                      <span className="ml-2 font-medium">${preview.original.totalPremium.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t("Payment:")}</span>
                      <span className="ml-2 font-medium capitalize">{t(preview.original.paymentOption)}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    → {t("Status will change to:")} <span className="font-semibold text-yellow-700">{t("PAUSED")}</span>
                  </p>
                </div>

                {/* New Split Policies */}
                <h3 className="font-semibold text-text-primary mb-4">{t("New Policies After Split:")}</h3>
                <div className="space-y-4">
                  {preview.splitPolicies.map((policy, idx) => (
                    <div key={idx} className="border border-green-200 bg-green-50/30 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-green-900">
                          {t("Policy")} {String.fromCharCode(65 + idx)}: {policy.newPolicyNumber}
                        </h4>
                        <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium">
                          {t("ACTIVE")}
                        </span>
                      </div>

                      {/* Applicants in this policy */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">{t("Insured Persons:")}</p>
                        <ul className="text-sm text-gray-900">
                          {policy.applicants.map((app: any, i: number) => (
                            <li key={i}>• {app.firstName} {app.lastName}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Coverage & Premium Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-700">{t("Coverage Period:")}</span>
                          <p className="font-medium text-gray-900">
                            {new Date(policy.coveragePeriod.effectiveDate).toLocaleDateString('en-CA')} - {new Date(policy.coveragePeriod.expiryDate).toLocaleDateString('en-CA')}
                          </p>
                          <p className="text-gray-600">({policy.coveragePeriod.days} {t("days")})</p>
                        </div>
                        <div>
                          <span className="text-gray-700">{t("Premium:")}</span>
                          <p className="font-medium text-gray-900 text-lg">
                            ${policy.premium.total.toFixed(2)}
                          </p>
                          {/* {policy.payment.type === 'monthly-installments' && (
                            <p className="text-gray-600">
                              ${policy.premium.monthly.toFixed(2)}/month × {policy.payment.remainingPayments} months
                            </p>
                          )} */}
                        </div>
                        {policy.premium.policyFeeAllocation > 0 && (
                          <div className="col-span-2">
                            <span className="text-gray-700">{t("Policy Fee Allocation:")}</span>
                            <span className="ml-2 font-medium text-gray-900">
                              ${policy.premium.policyFeeAllocation.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Refund Info */}
                      {policy.payment.refundDue > 0 && (
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-blue-900 text-sm">
                            💰 {t("Refund:")} ${policy.payment.refundDue.toFixed(2)} {t("will be processed")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                {/* <div className="mt-6 p-4 bg-blue-50/30 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3">Financial Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Original Total Premium:</span>
                      <span className="font-medium">${preview.financial.originalPremium.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">New Total Premium:</span>
                      <span className="font-medium">${preview.financial.newTotalPremium.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-blue-900">Total Refund to Customer:</span>
                      <span className="text-green-700">${preview.financial.totalRefund.toFixed(2)}</span>
                    </div>
                  </div>
                </div> */}

                {/* Warnings */}
                {preview.warnings && preview.warnings.length > 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-semibold text-yellow-900 mb-2">⚠️ {t("Warnings:")}</p>
                    <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                      {preview.warnings.map((warning, idx) => (
                        <li key={idx}>{t(warning)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setCurrentStep('select')}
                    className="py-2 px-4 border border-inputBorder hover:border-gray-400 cursor-pointer transition delay-100"
                  >
                    {t("Back")}
                  </button>
                  <button
                    onClick={() => setCurrentStep('confirm')}
                    className="btn-primary"
                  >
                    {t("Continue to Confirm")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRM */}
            {currentStep === 'confirm' && (
              <div>
                <div className="mb-6 p-4 bg-red-50/30 border border-red-200">
                  <p className="font-semibold text-red-900 mb-2">⚠️ {t("Important: This action cannot be easily undone")}</p>
                  <p className="text-red-800 text-sm">
                    {t("After confirmation, the original policy will be PAUSED and new policies will be created.")} 
                    {t("You will have a 5-minute window to undo this action if needed.")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    {t("Admin Notes (Required)")} <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder={t("e.g., Person B returning home early due to family emergency")}
                    rows={4}
                    className="input-primary"
                  />
                  <p className="mt-1 text-sm text-gray-600">
                    {t("Explain the reason for splitting this policy. This will be logged in the policy activity.")}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gray-50/30 border border-inputBorder">
                  <h4 className="font-semibold text-gray-900 mb-2">{t("What happens next:")}</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                    <li>{t("Original policy")} {policyNumber} {t("will be set to PAUSED status")}</li>
                    <li>{preview?.splitPolicies.length} {t("new policies will be created (ACTIVE status)")}</li>
                    {paymentOption === 'monthly' && (
                      <li>{t("Original Stripe subscription will be cancelled, new subscriptions created")}</li>
                    )}
                    <li>{t("All documents and notes will be cloned to new policies")}</li>
                    <li>{t("Email notifications will be sent to all insured persons and the agent")}</li>
                    <li className="text-text-secondary">{t("Refunds (if any) will be processed to the original payment method")}</li>
                  </ol>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setCurrentStep('preview')}
                    className="py-2 px-4 border border-inputBorder hover:border-gray-400 cursor-pointer transition delay-100"
                  >
                    {t("Back")}
                  </button>
                  <button
                    onClick={handleConfirmSplit}
                    disabled={loading || !adminNotes.trim()}
                    className="bg-red-600 text-white py-2 sm:py-3 px-5 font-semibold hover:bg-red-700 transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70 flex gap-1 items-center text-nowrap w-fit"
                  >
                    {loading ? t('Processing...') : t('Confirm Split Policy')}
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};