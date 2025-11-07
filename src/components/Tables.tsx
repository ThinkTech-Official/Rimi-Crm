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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
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
              <td className="p-2 text-text-secondary text-center" colSpan={9}>
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
      </table>
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
