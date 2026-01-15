import React from "react";
import { PaymentScheduleItem } from "../../hooks/usePaymentSchedule";

interface PaymentScheduleTableProps {
  schedule: PaymentScheduleItem[];
  loading: boolean;
  error: string | null;
  onProcessRefund?: (paymentHistoryId: string, amount: number) => void;
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
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
      refunded: "bg-purple-100 text-purple-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      "policy-issue-fee": "Policy Issue Fee",
      "initial-premium": "Initial Premium",
      "monthly-installment": "Recurring Premium",
      "lump-sum": "Lump Sum",
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return amount.toLocaleString("en-CA", {
      style: "currency",
      currency: currency || "CAD",
      currencyDisplay: "code",
    });
  };

  const cellStyle = {
    borderWidth: "0px 1px 1px 0px",
    borderStyle: "solid" as const,
    borderColor: "#AAA9A9",
  };

  return (
    <div className="overflow-x-auto custom-scrollbar-x">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-white text-sm 2xl:text-base capitalize">
          <tr>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">#</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">Method</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">Cardholder Name</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">Brand</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">Last 4</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-right font-medium text-nowrap">Charged Amount</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-right font-medium text-nowrap">Transaction Fee</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">Type</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">Status</th>
            <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">Date</th>
            {onProcessRefund && (
              <th className="px-2 sm:px-3 py-1 sm:py-3 text-center font-medium w-24 text-nowrap">Select Payment</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
          {schedule.map((item, index) => (
            <tr key={item.id} className="text-[#808080] text-sm 2xl:text-base hover:bg-gray-50">
              {/* # */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>{index + 1}</td>

              {/* Payment Method */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {item.paymentHistory
                  ? "Credit Card"
                  : item.status === "pending"
                  ? "Card"
                  : "N/A"}
              </td>

              {/* Cardholder Name */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {item.paymentHistory?.cardholderName || "N/A"}
              </td>

              {/* Brand */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap capitalize" style={cellStyle}>
                {item.paymentHistory?.brand || "N/A"}
              </td>

              {/* Card Last 4 */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {item.paymentHistory?.last4 || "N/A"}
              </td>

              {/* Charged Amount */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right font-medium" style={cellStyle}>
                {formatCurrency(item.amount, item.currency)}
              </td>

              {/* Transaction Fee */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right" style={cellStyle}>
                {item.paymentHistory?.fee !== null &&
                item.paymentHistory?.fee !== undefined
                  ? formatCurrency(item.paymentHistory.fee, item.currency)
                  : "N/A"}
              </td>

              {/* Type */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                <span className="text-xs">
                  {getPaymentTypeLabel(item.paymentType)}
                </span>
              </td>

              {/* Status */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {getStatusBadge(item.status)}
              </td>

              {/* Date */}
              <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {item.status === "paid" && item.processedAt
                  ? formatDate(item.processedAt)
                  : item.status === "pending"
                  ? formatDate(item.scheduledDate)
                  : formatDate(item.scheduledDate)}
              </td>

              {/* Actions (Refund Button) */}
              {onProcessRefund && (
                <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-center" style={cellStyle}>
                  {item.paymentType === "policy-issue-fee" &&
                    item.status === "paid" &&
                    item.paymentHistoryId && (
                      <button
                        onClick={() =>
                          onProcessRefund(
                            item.paymentHistoryId!, 
                            item.amount
                          )
                        }
                        className="inline-flex items-center justify-center w-7 h-7 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded border border-red-200 transition-all duration-150"
                        title="Process refund"
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
