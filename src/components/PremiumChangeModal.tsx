import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PremiumChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  originalPremium: number;
  newPremium: number;
  premiumDifference: number;
  reason?: string;
  isAgeBracketChange?: boolean;
}

const PremiumChangeModal: React.FC<PremiumChangeModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  originalPremium,
  newPremium,
  premiumDifference,
  reason,
  isAgeBracketChange = false,
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const isIncrease = premiumDifference > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            {isAgeBracketChange && (
              <span className="text-yellow-600">⚠️</span>
            )}
            <span>{t("Premium Recalculation Required")}</span>
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Age Bracket Warning */}
          {isAgeBracketChange && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 font-medium">
                    {t("Age Bracket Change Detected")}
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    {reason || t('The effective date change has resulted in a different age bracket, affecting the premium rate.')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Premium Comparison */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t("Original Premium:")}</span>
              <span className="text-lg font-semibold text-gray-900">
                {originalPremium.toFixed(2)} CAD
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t("New Premium:")}</span>
              <span className="text-lg font-semibold text-gray-900">
                {newPremium.toFixed(2)} CAD
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {isIncrease ? t('Additional Payment Due:') : t('Refund Due:')}
              </span>
              <span className={`text-xl font-bold ${isIncrease ? 'text-red-600' : 'text-green-600'
                }`}>
                {isIncrease ? '+' : '-'}{Math.abs(premiumDifference).toFixed(2)} CAD
              </span>
            </div>
          </div>

          {/* Recommendation for Increase */}
          {isIncrease && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm font-medium text-blue-900 mb-2">
                💡 {t("Recommendation:")}
              </p>
              <p className="text-sm text-blue-800">
                {t("Consider reducing coverage days to stay within the original budget, or proceed with the additional payment.")}
              </p>
            </div>
          )}

          {/* Note */}
          <p className="text-xs text-gray-500 italic">
            {t("Note:")} {isIncrease
              ? t('Additional payment will need to be collected separately after saving these changes.')
              : t('The refund will be processed automatically when you save these changes.')
            }
          </p>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            {isIncrease ? t('Cancel & Adjust') : t('Cancel')}
          </button>
          <button
            onClick={onProceed}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {t("Save Changes")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumChangeModal;