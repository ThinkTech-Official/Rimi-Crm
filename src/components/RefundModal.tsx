import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (transactionFee: number, netRefund: number) => void;
  originalExpiryDate: string;
  newExpiryDate: string;
  daysToRefund: number;
  maxRefundable: number;
  loading?: boolean;
}

const RefundModal: React.FC<RefundModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  originalExpiryDate,
  newExpiryDate,
  daysToRefund,
  maxRefundable,
  loading = false,
}) => {
  const { t } = useLanguage();
  const [transactionFee, setTransactionFee] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setTransactionFee('');
      setError('');
    }
  }, [isOpen]);

  const netRefund = transactionFee
    ? Math.max(0, maxRefundable - parseFloat(transactionFee))
    : 0;

  const handleTransactionFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTransactionFee(value);
    setError('');

    // Validate
    if (value) {
      const feeAmount = parseFloat(value);

      if (isNaN(feeAmount)) {
        setError(t('Please enter a valid number'));
        return;
      }

      if (feeAmount < 0) {
        setError(t('Transaction fee cannot be negative'));
        return;
      }

      if (feeAmount > maxRefundable) {
        setError(t('Transaction fee cannot exceed maximum refundable amount'));
        return;
      }
    }
  };

  const handleConfirm = () => {
    if (!transactionFee) {
      setError(t('Transaction fee is required'));
      return;
    }

    const feeAmount = parseFloat(transactionFee);

    if (isNaN(feeAmount) || feeAmount < 0) {
      setError(t('Please enter a valid transaction fee'));
      return;
    }

    if (feeAmount > maxRefundable) {
      setError(t('Transaction fee cannot exceed maximum refundable amount'));
      return;
    }

    onConfirm(feeAmount, netRefund);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 h-full">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto custom-scrollbar3">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-inputBorder px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-text-black">
            {t("Early Return - Refund Processing")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          <p className="text-sm text-text-secondary">
            {t("Policy modified for early return. Please review the refund details below:")}
          </p>

          {/* Date Information */}
          <div className="bg-gray-50 rounded p-4 space-y-2 text-sm border border-inputBorder">
            <div className="flex justify-between">
              <span className="text-gray-600">{t("Original Expiry:")}</span>
              <span className="font-medium">
                {new Date(originalExpiryDate).toLocaleDateString('en-CA')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t("New Expiry:")}</span>
              <span className="font-medium">
                {new Date(newExpiryDate).toLocaleDateString('en-CA')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t("Days Reduced:")}</span>
              <span className="font-medium">{daysToRefund} {t("days")}</span>
            </div>
          </div>

          {/* Refund Calculation */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {t("Maximum Refundable:")}
              </span>
              <span className="text-lg font-semibold text-green-600">
                {maxRefundable.toFixed(2)} CAD
              </span>
            </div>

            {/* Transaction Fee Input */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                {t("Transaction Fee")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={maxRefundable}
                  value={transactionFee}
                  onChange={handleTransactionFeeChange}
                  className={`input-primary pl-7 ${error ? 'border-red-500' : ''
                    }`}
                  placeholder="0.00"
                  disabled={loading}
                />
                <span className="absolute right-3 top-2.5 text-gray-500">CAD</span>
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Net Refund Display */}
            <div className="flex justify-between items-center pt-4 border-t border-inputBorder">
              <span className="text-sm font-medium text-gray-700">
                {t("Net Refund Amount:")}
              </span>
              <span className="text-xl font-bold text-primary">
                {netRefund.toFixed(2)} CAD
              </span>
            </div>
          </div>

          {/* Warning if net refund is $0 */}
          {netRefund === 0 && transactionFee && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                ℹ️ {t("Net refund is 0.00 CAD because the transaction fee equals the refundable amount.")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-inputBorder px-6 py-4 flex justify-end space-x-3 z-10">
          <button
            onClick={onClose}
            disabled={loading}
            className="py-2 px-4 border border-inputBorder hover:border-gray-400 cursor-pointer transition delay-100 rounded text-sm font-medium text-gray-700"
          >
            {t("Cancel")}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !transactionFee || !!error}
            className="bg-primary text-white py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 rounded text-sm flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{t("Processing...")}</span>
              </>
            ) : (
              <span>{t("Process Refund & Save")}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;