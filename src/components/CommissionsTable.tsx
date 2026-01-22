import React from 'react';
import { format } from 'date-fns';

interface CommissionRow {
  id: string;
  policyNumber: string;
  agentCode: string;
  grossAmount: number;
  ratePercent: number;
  commissionAmount: number;
  mgaShare: number;
  agentShare: number;
  status: string;
  currency: string;
  createdAt: string;
  paymentHistory: {
    date: string;
    paymentType: string;
    amount: number;
  };
  policy: {
    policyNumber: string;
    firstName: string;
    lastName: string;
    premium: number;
  };
}

interface CommissionsTableProps {
  data: CommissionRow[];
  loading: boolean;
  error: any;
}

export function CommissionsTable({ data, loading, error }: CommissionsTableProps) {
  if (loading) {
    return <div className="text-center py-8">Loading commissions...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading commissions</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No commissions found</div>;
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-800',
      verified: 'bg-blue-100 text-blue-800',
      approved: 'bg-purple-100 text-purple-800',
      paid: 'bg-green-100 text-green-800',
      paid_to_mga: 'bg-yellow-100 text-yellow-800',
      paid_to_agent: 'bg-green-100 text-green-800',
      reversed: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || styles.pending}`}>
        {status.replace(/_/g, ' ').toUpperCase()}
      </span>
    );
  };

  const getPaymentTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      'lump-sum': 'Lump Sum',
      'monthly-installment': 'Monthly',
      'policy-issue-fee': 'Policy Fee',
    };
    
    return (
      <span className="text-xs text-gray-600">
        {labels[type] || type}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Type</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gross Amount</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rate</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Comm.</th>
            {/* <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">MGA Share</th> */}
            {/* <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Agent Share</th> */}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((commission) => (
            <tr key={commission.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">
                {formatDate(commission.paymentHistory.date)}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">
                {commission.policy.policyNumber || 'N/A'}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {commission.policy.firstName} {commission.policy.lastName}
              </td>
              <td className="px-4 py-3 text-sm">
                {getPaymentTypeBadge(commission.paymentHistory.paymentType)}
              </td>
              <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                ${commission.grossAmount.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm text-right text-gray-600">
                {commission.ratePercent}%
              </td>
              <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                ${commission.commissionAmount.toFixed(2)}
              </td>
              {/* <td className="px-4 py-3 text-sm text-right font-semibold text-purple-600">
                ${(commission.mgaShare || 0).toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">
                ${(commission.agentShare || 0).toFixed(2)}
              </td> */}
              <td className="px-4 py-3 text-sm">
                {getStatusBadge(commission.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}