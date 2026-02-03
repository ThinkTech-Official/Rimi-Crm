import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PolicyRow, QuoteRow } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Agent } from "../hooks/admin-dashboard";
import Spinner from "./Spinner";
import { RenderPageNumbers } from "./RenderPageNumbers";

export function PoliciesTable({
  data,
  loading,
  pError,
}: {
  data: PolicyRow[] | undefined;
  loading?: boolean;
  pError?: string;
}) {
  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-lg font-bold text-text-primary">
        All Policies issued by agent
      </h2>
      <div className="overflow-auto custom-scrollbar-x">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-white text-base 2xl:text-xl capitalize text-nowrap">
          <tr>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Policy no.
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Name
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Type
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Premium
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Status
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Issued at
            </th>
          </tr>
        </thead>
        <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
          {loading ? (
            <tr>
              <td className="p-2 text-primary text-center h-40" colSpan={6}>
                Loading…
              </td>
            </tr>
          ) : pError ? (
            <tr>
              <td className="p-2 text-red-500 text-center" colSpan={6}>
                {pError}
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td className="p-2 text-text-secondary text-center" colSpan={6}>
                No policies issued
              </td>
            </tr>
          ) : (
            data?.map((p: PolicyRow, i) => (
              <tr key={i} className="text-[#808080] text-sm 2xl:text-xl">
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {p.policyNumber}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {p.firstName} {p.lastName}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {p.policyType}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {p.premium != null ? p.premium.toFixed(2) : "-"}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {p.status}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {p.dateIssued
                    ? new Date(p.dateIssued).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export function QuotesTable({
  data,
  loading,
  qError,
}: {
  data: QuoteRow[] | undefined;
  loading?: boolean;
  qError?: string;
}) {
  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-lg font-bold text-text-primary">
        All Quotes issued by agent
      </h2>
      <div className="overflow-auto w-full custom-scrollbar-x"><table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-white text-base 2xl:text-xl capitalize text-nowrap">
          <tr>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Quote no.
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Name
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Type
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Premium
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Product
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Status
            </th>
            <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
              Created at
            </th>
          </tr>
        </thead>
        <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
          {loading ? (
            <tr>
              <td className="p-2 text-primary text-center h-40" colSpan={6}>
                Loading…
              </td>
            </tr>
          ) : qError ? (
            <tr>
              <td className="p-2 text-red-500 text-center" colSpan={6}>
                {qError}
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td className="p-2 text-text-secondary text-center" colSpan={7}>
                No quotes found
              </td>
            </tr>
          ) : (
            data?.map((q: QuoteRow, i) => (
              <tr key={i} className="text-[#808080] text-sm 2xl:text-xl">
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {q.quoteNumber}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {q.firstName} {q.lastName}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {q.policyType}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {q.premium != null ? q.premium.toFixed(2) : "-"}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {q.product}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {q.status}
                </td>
                <td
                  className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                  style={{
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#AAA9A9",
                  }}
                >
                  {" "}
                  {q.createdAt
                    ? new Date(q.createdAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table></div>
      
    </div>
  );
}

export function CommissionsTable({
  data,
  loading,
  isUnderMGA,
  selectedIds,
  onSelect,
  onSelectAll,
  onUpdateStatus,
  isPending,
}: {
  data: any[];
  loading?: boolean;
  isUnderMGA: boolean;
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateStatus: (id: string, nextStatus: string) => void;
  isPending: boolean;
}) {
  const getNextStatus = (currentStatus: string, isUnderMGA: boolean): string | null => {
    const transitions: Record<string, string> = {
      'pending': 'approved',
      'verified': 'approved',
      'approved': isUnderMGA ? 'paid_to_mga' : 'paid',
    };
    return transitions[currentStatus] || null;
  };

  return (
    <div className="mt-6 space-y-2">
      <div className="bg-white  border border-inputBorder overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-primary text-white text-base capitalize text-nowrap">
            <tr>
              {/* <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length > 0 && 
                    selectedIds.length === data.filter((c: any) => 
                      !['reversed', 'partially_reversed', 'paid', 'paid_to_agent'].includes(c.status)
                    ).length
                  }
                  onChange={onSelectAll}
                  className="accent-primary cursor-pointer "
                />
              </th> */}
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Policy #</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Payment</th>
              {/* <th className="px-4 py-3 text-right font-medium">Total Commission</th> */}
              {isUnderMGA && (
                <>
                  <th className="px-4 py-3 text-right font-medium text-nowrap">MGA Share</th>
                  <th className="px-4 py-3 text-right font-medium text-nowrap">Agent Share</th>
                </>
              )}
              {/* {!isUnderMGA && (
                <th className="px-4 py-3 text-right font-medium">Commission</th>
              )} */}
              {/* <th className="px-4 py-3 text-left font-medium">Status</th> */}
              {/* <th className="px-4 py-3 text-center font-medium">Actions</th> */}
            </tr>
          </thead>
          <tbody className="bg-white text-[#808080]">
            {loading ? (
              <tr>
                <td colSpan={isUnderMGA ? 11 : 10} className="p-8 text-center bg-white h-40">
                  <div className="flex justify-center flex-col items-center gap-2">
                    <div className="spinner w-8 h-8"></div>
                    <p className="text-primary font-medium">Loading commissions…</p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={isUnderMGA ? 11 : 10} className="px-4 py-3a text-center">
                  No commissions found
                </td>
              </tr>
            ) : (
              data.map((commission: any) => {
                const isReversal = ['reversed', 'partially_reversed'].includes(commission.status) || 
                                  commission.reversalOf;
                const canBeActedUpon = !['reversed', 'partially_reversed', 'paid', 'paid_to_agent'].includes(commission.status);
                const nextStatus = getNextStatus(commission.status, isUnderMGA);
                
                const cellStyle = {
                  borderWidth: "0px 1px 1px 0px",
                  borderStyle: "solid" as const,
                  borderColor: "#AAA9A9",
                };

                return (
                  <tr 
                    key={commission.id} 
                    className={`hover:bg-gray-30 ${isReversal ? 'bg-red-50' : ''}`}
                  >
                    {/* <td className="px-4 py-3" style={cellStyle}>
                      {canBeActedUpon && (
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(commission.id)}
                          onChange={() => onSelect(commission.id)}
                          className="cursor-pointer accent-primary"
                        />
                      )}
                    </td> */}
                    <td className="px-4 py-3 text-nowrap text-sm" style={cellStyle}>
                      {new Date(commission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-primary text-nowrap" style={cellStyle}>
                      {commission.policy?.policyNumber || 'N/A'}
                    </td>
                    <td className="px-4 py-3" style={cellStyle}>
                      <span className="text-[10px] px-2 py-1 bg-gray-100 text-text-primary capitalize text-nowrap">
                        {commission.paymentHistory?.paymentType?.replace(/-/g, ' ') || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-nowrap" style={cellStyle}>
                      ${commission.paymentHistory?.amount?.toLocaleString() || '0'}
                    </td>
                    {/* <td className="px-4 py-3 text-right font-semibold text-nowrap" style={cellStyle}>
                      <span className={isReversal ? 'text-red-600' : 'text-green-600'}>
                        {isReversal && '-'}
                        ${Math.abs(commission.commissionAmount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                    </td> */}
                    {/* {isUnderMGA && (
                      <>
                        <td className="px-4 py-3 text-right text-nowrap" style={cellStyle}>
                          <span className={isReversal ? 'text-red-600' : ''}>
                            {isReversal && '-'}
                            ${Math.abs(commission.mgaShare || 0).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-nowrap" style={cellStyle}>
                          <span className={isReversal ? 'text-red-600' : 'text-green-600'}>
                            {isReversal && '-'}
                            ${Math.abs(commission.agentShare || 0).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        </td>
                      </>
                    )} */}
                    {/* {!isUnderMGA && (
                      <td className="px-4 py-3 text-right font-semibold text-nowrap" style={cellStyle}>
                        <span className={isReversal ? 'text-red-600' : 'text-green-600'}>
                          {isReversal && '-'}
                          ${Math.abs(commission.commissionAmount).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </td>
                    )} */}
                    {/* <td className="px-4 py-3" style={cellStyle}>
                      <span className={`px-2 py-1 text-[10px] font-semibold whitespace-nowrap ${
                        commission.status === 'paid' || commission.status === 'paid_to_agent'
                          ? 'bg-green-100 text-green-800'
                          : commission.status === 'verified'
                          ? 'bg-blue-100 text-blue-800'
                          : commission.status === 'approved'
                          ? 'bg-purple-100 text-purple-800'
                          : commission.status === 'paid_to_mga'
                          ? 'bg-yellow-100 text-yellow-800'
                          : commission.status === 'reversed' || commission.status === 'partially_reversed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {commission.status.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </td> */}
                    {/* <td className="px-4 py-3" style={cellStyle}>
                      <div className="flex gap-1 justify-center">
                        {nextStatus && (
                          <button
                            onClick={() => onUpdateStatus(commission.id, nextStatus)}
                            disabled={isPending}
                            className={`px-3 py-1 text-sm text-white flex items-center gap-1 ${
                              nextStatus === 'approved' ? 'bg-green-500 hover:bg-green-600' :
                              nextStatus === 'paid' || nextStatus === 'paid_to_mga' ? 'bg-purple-500 hover:bg-purple-600' :
                              'bg-blue-500 hover:bg-blue-600'
                            } disabled:opacity-50 cursor-pointer transition-all duration-200`}
                          >
                            {nextStatus === 'approved' && 'Approve'}
                            {nextStatus === 'paid' && 'Pay'}
                            {nextStatus === 'paid_to_mga' && 'Pay MGA'}
                          </button>
                        )}
                      </div>
                    </td> */}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
type AgentsTableProps = {
  data: Agent[];
  loading?: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function AgentsTable({
  data,
  loading,
  totalPages,
  currentPage,
  onPageChange,
}: AgentsTableProps) {
  const navigate = useNavigate();
  const handleAgentDetails = (agentCode: string) => {
    navigate(`/agent-details/${agentCode}`);
  };
  return (
    <div className="mt-6 space-y-2 w-full">
      <h2 className="text-lg font-bold text-text-primary">All Agents</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Agent Code
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Joined Date
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Name
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Validity
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-center font-medium text-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {loading ? (
              <Spinner className="w-8 h-8" />
            ) : (
              data?.map((agent: any) => (
                <tr
                  key={agent.agentCode}
                  className="text-[#808080] text-sm 2xl:text-xl"
                >
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {" "}
                    {agent.agentCode}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {" "}
                    {agent.joinedDate}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 min-w-[200px] max-w-[250px] text-wrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {" "}
                    {agent.name}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {" "}
                    {agent.validity}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {" "}
                    <button
                      className="text-primary hover:underline hover:underline-offset-2 cursor-pointer font-medium px-4 text-center w-full"
                      onClick={() => handleAgentDetails(agent.agentCode)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div
        className="flex items-center justify-center p-4 space-x-2"
        role="pagination"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
          title="Previous"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <RenderPageNumbers
          onPageChange={onPageChange}
          totalPages={totalPages}
          page={currentPage}
        />
        <button
          // disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
          title="Next"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
