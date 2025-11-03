import React, { useState, useEffect } from 'react';

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
        setError('Please enter a valid number');
        return;
      }

      if (feeAmount < 0) {
        setError('Transaction fee cannot be negative');
        return;
      }

      if (feeAmount > maxRefundable) {
        setError('Transaction fee cannot exceed maximum refundable amount');
        return;
      }
    }
  };

  const handleConfirm = () => {
    if (!transactionFee) {
      setError('Transaction fee is required');
      return;
    }

    const feeAmount = parseFloat(transactionFee);
    
    if (isNaN(feeAmount) || feeAmount < 0) {
      setError('Please enter a valid transaction fee');
      return;
    }

    if (feeAmount > maxRefundable) {
      setError('Transaction fee cannot exceed maximum refundable amount');
      return;
    }

    onConfirm(feeAmount, netRefund);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Early Return - Refund Processing
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-gray-600">
            Policy modified for early return. Please review the refund details below:
          </p>

          {/* Date Information */}
          <div className="bg-gray-50 rounded p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Original Expiry:</span>
              <span className="font-medium">
                {new Date(originalExpiryDate).toLocaleDateString('en-CA')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Expiry:</span>
              <span className="font-medium">
                {new Date(newExpiryDate).toLocaleDateString('en-CA')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Days Reduced:</span>
              <span className="font-medium">{daysToRefund} days</span>
            </div>
          </div>

          {/* Refund Calculation */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Maximum Refundable:
              </span>
              <span className="text-lg font-semibold text-green-600">
                ${maxRefundable.toFixed(2)}
              </span>
            </div>

            {/* Transaction Fee Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Fee: <span className="text-red-500">*</span>
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
                  className={`w-full pl-7 pr-4 py-2 border rounded ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium text-gray-700">
                Net Refund Amount:
              </span>
              <span className="text-xl font-bold text-blue-600">
                ${netRefund.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Warning if net refund is $0 */}
          {netRefund === 0 && transactionFee && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                ℹ️ Net refund is $0.00 because the transaction fee equals the refundable amount.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !transactionFee || !!error}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <span>Process Refund & Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;