import React from 'react';
import { PaymentScheduleItem } from '../../hooks/usePaymentSchedule';

interface PaymentScheduleTableProps {
  schedule: PaymentScheduleItem[];
  loading: boolean;
  error: string | null;
  onProcessRefund?: (paymentHistoryId: string, amount: number, paymentType: string) => void; // ✅ Updated
}

export const PaymentScheduleTable: React.FC<PaymentScheduleTableProps> = ({
  schedule,
  loading,
  error,
  onProcessRefund,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading payment schedule...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!schedule || schedule.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-500 text-sm">No payment schedule available</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      refunded: 'bg-purple-100 text-purple-800',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'policy-issue-fee': 'Policy Issue Fee',
      'initial-premium': 'Initial Premium',
      'monthly-installment': 'Recurring Premium',
      'lump-sum': 'Lump Sum',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return amount.toLocaleString('en-CA', {
      style: 'currency',
      currency: currency || 'CAD',
      currencyDisplay: 'code',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm text-nowrap">
        <thead>
          <tr className="bg-gray-100 border border-inputBorder">
            <th className="px-3 py-2 text-left w-12">#</th>
            <th className="px-3 py-2 text-left w-24">Method</th>
            <th className="px-3 py-2 text-left w-32">Cardholder Name</th>
            <th className="px-3 py-2 text-left w-24">Brand</th>
            <th className="px-3 py-2 text-left w-20">Last 4</th>
            <th className="px-3 py-2 text-right w-28">Charged Amount</th>
            <th className="px-3 py-2 text-right w-24">Transaction Fee</th>
            <th className="px-3 py-2 text-left w-32">Type</th>
            <th className="px-3 py-2 text-left w-24">Status</th>
            <th className="px-3 py-2 text-left w-28">Date</th>
            {onProcessRefund && (
              <th className="px-3 py-2 text-center w-24">Select Payment</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y border-x border-inputBorder">
          {schedule.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {/* # */}
              <td className="px-3 py-2 text-left">{index + 1}</td>

              {/* Payment Method */}
              <td className="px-3 py-2 text-left">
                {item.paymentHistory ? 'Credit Card' : item.status === 'pending' ? 'Card' : 'N/A'}
              </td>

              {/* Cardholder Name */}
              <td className="px-3 py-2 text-left truncate">
                {item.paymentHistory?.cardholderName || 'N/A'}
              </td>

              {/* Brand */}
              <td className="px-3 py-2 text-left capitalize">
                {item.paymentHistory?.brand || 'N/A'}
              </td>

              {/* Card Last 4 */}
              <td className="px-3 py-2 text-left">
                {item.paymentHistory?.last4 || 'N/A'}
              </td>

              {/* Charged Amount */}
              <td className="px-3 py-2 text-right font-medium">
                {formatCurrency(item.amount, item.currency)}
              </td>

              {/* Transaction Fee */}
              <td className="px-3 py-2 text-right">
                {item.paymentHistory?.fee !== null && item.paymentHistory?.fee !== undefined
                  ? formatCurrency(item.paymentHistory.fee, item.currency)
                  : 'N/A'}
              </td>

              {/* Type */}
              <td className="px-3 py-2 text-left">
                <span className="text-xs">{getPaymentTypeLabel(item.paymentType)}</span>
              </td>

              {/* Status */}
              <td className="px-3 py-2 text-left">{getStatusBadge(item.status)}</td>

              {/* Date */}
              <td className="px-3 py-2 text-left">
                {item.status === 'paid' && item.processedAt
                  ? formatDate(item.processedAt)
                  : item.status === 'pending'
                  ? formatDate(item.scheduledDate)
                  : formatDate(item.scheduledDate)}
              </td>

              {/* Actions (Refund Button) */}
              {onProcessRefund && (
                <td className="px-3 py-2 text-center">
                  {item.paymentType === 'policy-issue-fee' && item.status === 'paid' && item.paymentHistoryId && (
                    <button
                    //   onClick={() => onProcessRefund(item.id)}
                     onClick={() => onProcessRefund(
                        item.paymentHistoryId!,  //  paymentHistoryId
                        item.amount,              // amount
                        item.paymentType          //Pass paymentType
                      )}
                      className="inline-flex items-center justify-center w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-150"
                      title="Process refund"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};