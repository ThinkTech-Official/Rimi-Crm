import React from 'react';

interface CommissionRow {
  id: string;
  policyNumber: string;
  agentCode: string;
  grossAmount: number;
  ratePercent: number;
  commissionAmount: number;
  mgaOverridePercent?: number;
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
    return (
      <div className="mt-6 p-8 text-center bg-white border border-inputBorder h-40">
        <div className="flex justify-center flex-col items-center gap-2">
          <div className="spinner w-8 h-8"></div>
          <p className="text-primary font-medium">Loading commissions…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-8 text-center bg-white border border-inputBorder text-red-500">
        Error loading commissions
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-6 p-8 text-center bg-white border border-inputBorder text-gray-500">
        No commissions found
      </div>
    );
  }

  const cellStyle = {
    borderWidth: "0px 1px 1px 0px",
    borderStyle: "solid" as const,
    borderColor: "#AAA9A9",
  };

  return (
    <div className="mt-6 overflow-x-auto custom-scrollbar-x border border-inputBorder">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-white text-base 2xl:text-xl capitalize text-nowrap">
          <tr>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Date</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Policy</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Customer</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Payment Type</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Gross Amount</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Comm. %</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Comm. Amount</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">MGA Override %</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">MGA Share</th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">Agent Share</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((commission) => (
            <tr key={commission.id} className="text-[#808080] text-sm 2xl:text-xl">
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {new Date(commission.paymentHistory.date).toLocaleDateString()}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-medium text-primary" style={cellStyle}>
                {commission.policy.policyNumber || 'N/A'}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {commission.policy.firstName} {commission.policy.lastName}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                <span className="text-[10px] px-2 py-1 bg-gray-100 text-text-primary capitalize">
                  {commission.paymentHistory.paymentType?.replace(/-/g, ' ') || 'N/A'}
                </span>
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                ${commission.grossAmount?.toFixed(2) || '0.00'}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {commission.ratePercent}%
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-semibold" style={cellStyle}>
                ${commission.commissionAmount?.toFixed(2) || '0.00'}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                {(commission.mgaOverridePercent || 0).toFixed(2)}%
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap" style={cellStyle}>
                ${(commission.mgaShare || 0).toFixed(2)}
              </td>
              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-semibold" style={cellStyle}>
                ${(commission.agentShare || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
