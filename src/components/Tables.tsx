import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PolicyRow, QuoteRow } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Agent } from "../hooks/admin-dashboard";
import Spinner from "./Spinner";
import { RenderPageNumbers } from "./RenderPageNumbers";
import { useLanguage } from "../context/LanguageContext";

export function PoliciesTable({
  data,
  loading,
  pError,
}: {
  data: PolicyRow[] | undefined;
  loading?: boolean;
  pError?: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-lg font-bold text-text-primary">
        {t("All Policies issued by agent")}
      </h2>
      <div className="overflow-auto custom-scrollbar-x">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize text-nowrap">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Policy no.")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Name")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Type")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Premium")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Status")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Issued at")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {loading ? (
              <tr>
                <td className="p-2 text-primary text-center h-40" colSpan={6}>
                  {t("Loading Policies...")}
                </td>
              </tr>
            ) : pError ? (
              <tr>
                <td className="p-2 text-red-500 text-center" colSpan={6}>
                  {t(pError)}
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td className="p-2 text-text-secondary text-center" colSpan={6}>
                  {t("No policies issued")}
                </td>
              </tr>
            ) : (
              data?.map((p: PolicyRow, i) => (
                <tr key={i} className="text-[#808080] text-base 2xl:text-lg">
                  <td
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9] capitalize"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
  const { t } = useLanguage();
  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-lg font-bold text-text-primary">
        {t("All Quotes issued by agent")}
      </h2>
      <div className="overflow-auto w-full custom-scrollbar-x">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize text-nowrap">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Quote no.")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Name")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Type")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Premium")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Product")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Status")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                {t("Created at")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {loading ? (
              <tr>
                <td className="p-2 text-primary text-center h-40" colSpan={7}>
                  {t("Loading Quotes...")}
                </td>
              </tr>
            ) : qError ? (
              <tr>
                <td className="p-2 text-red-500 text-center" colSpan={7}>
                  {t(qError)}
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td className="p-2 text-text-secondary text-center" colSpan={7}>
                  {t("No quotes found")}
                </td>
              </tr>
            ) : (
              data?.map((q: QuoteRow, i) => (
                <tr key={i} className="text-[#808080] text-base 2xl:text-lg">
                  <td
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9] capitalize"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}
                  >
                    {" "}
                    {q.product?.split("_").join(" ").toLocaleLowerCase()}
                  </td>
                  <td
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
                    className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
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
    </div>
  );
}

export function CommissionsTable({
  data,
  loading,
  isUnderMGA,
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
  const { t } = useLanguage();
  // const getNextStatus = (
  //   currentStatus: string,
  //   isUnderMGA: boolean,
  // ): string | null => {
  //   const transitions: Record<string, string> = {
  //     pending: "approved",
  //     verified: "approved",
  //     approved: isUnderMGA ? "paid_to_mga" : "paid",
  //   };
  //   return transitions[currentStatus] || null;
  // };

  return (
    <div className="mt-6 space-y-2">
      <div className="bg-white  border border-inputBorder overflow-auto custom-scrollbar-x">
        <table className="min-w-full">
          <thead className="bg-primary text-white text-base capitalize text-nowrap">
            <tr>
              <th className="px-4 py-3 text-left font-medium">{t("Date")}</th>
              <th className="px-4 py-3 text-left font-medium">
                {t("Policy #")}
              </th>
              <th className="px-4 py-3 text-left font-medium">{t("Type")}</th>
              <th className="px-4 py-3 text-left font-medium">
                {t("Agent Code")}
              </th>
              <th className="px-4 py-3 text-left font-medium">
                {t("MGA Code")}
              </th>
              <th className="px-4 py-3 text-left font-medium">
                {t("Gross Amount")}
              </th>
              <th className="px-4 py-3 text-left font-medium">
                {t("Comm. Amount")}
              </th>
              <th className="px-4 py-3 text-left font-medium">
                {t("MGA Override %")}
              </th>
              <th className="px-4 py-3 text-left font-medium">
                {t("Agent Share")}
              </th>
              <th className="px-4 py-3 text-left font-medium">
                {t("MGA Share")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-[#808080]">
            {loading ? (
              <tr>
                <td
                  colSpan={12}
                  className="p-8 text-center bg-white h-40"
                >
                  <div className="flex justify-center flex-col items-center gap-2">
                    <div className="spinner w-8 h-8"></div>
                    <p className="text-primary font-medium">
                      {t("Loading commissions...")}
                    </p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="px-4 py-3 text-center"
                >
                  {t("No commissions found")}
                </td>
              </tr>
            ) : (
              data.map((commission: any) => {
                const isReversal =
                  ["reversed", "partially_reversed"].includes(
                    commission.status,
                  ) || commission.reversalOf;

                return (
                  <tr
                    key={commission.id}
                    className={`hover:bg-gray-30 ${
                      isReversal ? "bg-red-50 text-red-700" : ""
                    }`}
                  >
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {new Date(commission.createdAt).toLocaleDateString()}
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.policy?.policyNumber || t("N/A")}
                    </td>
                    <td  className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                      <span className="text-[10px] px-2 py-1 bg-gray-100 text-text-primary capitalize text-nowrap">
                        {t(
                          commission.paymentHistory?.paymentType?.replace(
                            /-/g,
                            " ",
                          ) || "N/A",
                        )}
                      </span>
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.agentCode}
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.mgaCode || "N/A"}
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.grossAmount}
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.commissionAmount}
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.mgaOverridePercent}
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.agentShare}
                    </td>
                    <td
                       className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {commission.mgaShare || "-"}
                    </td>
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
  const { t } = useLanguage();
  const handleAgentDetails = (agentCode: string) => {
    navigate(`/agent-details/${agentCode}`);
  };
  return (
    <div className="mt-6 space-y-2 w-full">
      <h2 className="text-lg font-bold text-text-primary">{t("All Agents")}</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                {t("Agent Code")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                {t("Joined Date")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                {t("Name")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                {t("Validity")}
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-center font-medium text-nowrap">
                {t("Action")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center bg-white h-40">
                  <Spinner className="w-8 h-8" />
                </td>
              </tr>
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
                      {t("View Details")}
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
          title={t("Previous")}
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
          title={t("Next")}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
