import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import Spinner from "../Spinner";
import { RenderPageNumbers } from "../RenderPageNumbers";

type VerifiedAgent = {
  id: string;
  agentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  userType?: string | null;
  verifiedAt: string | null;
  verificationValidTill: string | null;
};

type VerifiedAgentsTableProps = {
  data: VerifiedAgent[];
  loading?: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function VerifiedAgentsTable({
  data,
  loading,
  totalPages,
  currentPage,
  onPageChange,
}: VerifiedAgentsTableProps) {
  return (
    <div className="mt-6 space-y-2 w-full">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Agent Code
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Name
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Email
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                User Type
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Verified Date
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Valid Until
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  <Spinner className="w-8 h-8 mx-auto" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-text-secondary">
                  No verified agents found
                </td>
              </tr>
            ) : (
              data.map((agent) => (
                <tr
                  key={agent.id}
                  className="text-[#808080] text-sm 2xl:text-xl"
                >
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-mono"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {agent.agentCode}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 min-w-[150px] max-w-[200px] text-wrap capitalize"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {agent.firstName} {agent.lastName}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 min-w-[200px] max-w-[250px] break-all"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {agent.email}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {agent.userType || "N/A"}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {agent.verifiedAt
                      ? format(new Date(agent.verifiedAt), "MMM dd, yyyy")
                      : "N/A"}
                  </td>
                  <td
                    className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {agent.verificationValidTill
                      ? format(new Date(agent.verificationValidTill), "MMM dd, yyyy")
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div
          className="flex items-center justify-center p-4 space-x-2"
          role="pagination"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
