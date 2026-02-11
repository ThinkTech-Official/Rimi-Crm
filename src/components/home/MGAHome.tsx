// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";
// import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary.ts";
// import PolicySalesChart from "../analytics/charts/PolicySalesChart.tsx";
// import { AgentsTable } from "../Tables.tsx";
// import Spinner from "../Spinner.tsx";

// export default function MGAHome() {
//   const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 10;
//   console.log("summary", summary);
//   const agents = [
//     {
//       agentCode: "AGT001",
//       joinedDate: "2023-01-15",
//       name: "John Doe",
//       validity: "2025-01-15",
//       action: "Active",
//     },
//     {
//       agentCode: "AGT002",
//       joinedDate: "2023-03-10",
//       name: "Jane Smith",
//       validity: "2024-03-10",
//       action: "Suspended",
//     },
//     {
//       agentCode: "AGT003",
//       joinedDate: "2022-11-05",
//       name: "Michael Johnson",
//       validity: "2024-11-05",
//       action: "Active",
//     },
//     {
//       agentCode: "AGT004",
//       joinedDate: "2024-02-20",
//       name: "Emily Brown",
//       validity: "2026-02-20",
//       action: "Pending",
//     },
//     {
//       agentCode: "AGT005",
//       joinedDate: "2023-07-25",
//       name: "David Wilson",
//       validity: "2025-07-25",
//       action: "Active",
//     },
//   ];
//   const stats = [
//     { label: "Total Policies", value: summary?.totalPolicies },
//     { label: "Total Quotes", value: summary?.totalQuotes },
//     { label: "Commission Percent", value: summary?.commissionPercent + "%" },
//     { label: "Total Commissions", value: summary?.totalCommissions },
//     {
//       label: "Current Month Commissions",
//       value: summary?.currentMonthCommissions,
//     },
//     { label: "Monthly Premiums", value: summary?.monthlyPremiums.length },
//   ];
//  if (sLoading)
//     return (
//       <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2">
//         <Spinner className="w-10 h-10" />
//         <p>Loading...</p>
//       </div>
//     );
//   return (
//     <>
//       <div className="w-full flex flex-col gap-4">
//         <div
//           className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8 w-full"
//           role="stats"
//         >
//           {stats?.map((stat) => (
//             <div
//               key={stat.label}
//               data-testid="stat-card"
//               className="bg-white p-2 sm:p-6 sm:h-24"
//               style={{
//                 boxShadow: "0px 4px 6.7px 0px rgba(0, 0, 0, 0.04)",
//                 border: "1px solid rgba(235, 235, 235, 1)",
//               }}
//             >
//               <div className="text-lg 2xl:text-2xl leading-6 font-bold text-[#232323]">
//                 {stat.value}
//               </div>
//               <div className="text-sm 2xl:text-lg leading-[20px] text-[#6F6B7D] mt-1">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mt-6 text-text-primary">
//             Policy Sales
//           </h2>
//           <p className="text-base text-text-secondary -mt-1">Current Month</p>
//         </div>
//         <PolicySalesChart data={""} loading={false} error={""} />
//         <AgentsTable data={agents} loading={sLoading} />
//       </div>
//     </>
//   );
// }

// ================================================

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useMgaSummary } from "../../hooks/mga-dashboard/useMgaSummary.ts";
import { useMgaPolicyTypeDistribution } from "../../hooks/mga-dashboard/useMgaPolicyTypeDistribution.ts";
import { useMgaAgents } from "../../hooks/mga-dashboard/useMgaAgents.ts";
import PolicySalesChart from "../analytics/charts/PolicySalesChart.tsx";
import { AgentsTable } from "../Tables.tsx";
import Spinner from "../Spinner.tsx";
import { useLanguage } from "../../context/LanguageContext";

export default function MGAHome() {
  const { t } = useLanguage();
  const [agentsPage, setAgentsPage] = useState(1);
  const limit = 10;

  const { data: summary, loading: sLoading, error: sError } = useMgaSummary();
  const {
    data: distribution,
    loading: dLoading,
    error: dError,
  } = useMgaPolicyTypeDistribution();
  const {
    data: agents,
    loading: aLoading,
    error: aError,
  } = useMgaAgents(agentsPage, limit);

  console.log("MGA summary", summary);
  console.log("MGA agents", agents);

  const stats = [
    { label: t("Total Policies"), value: summary?.totalPolicies || 0 },
    { label: t("Total Quotes"), value: summary?.totalQuotes || 0 },
    {
      label: t("Commission Percent"),
      value: `${summary?.commissionPercent || 0}%`,
    },
    { label: t("Total Commissions"), value: `$${summary?.totalCommissions || 0}` },
    {
      label: t("Current Month Commissions"),
      value: `$${summary?.currentMonthCommissions || 0}`,
    },
    { label: t("Total Agents"), value: summary?.totalAgents || 0 },
  ];

  // Pagination handlers for agents
  const handleAgentsPageChange = (newPage: number) => {
    setAgentsPage(newPage);
  };

  const handleAgentsPrevious = () => {
    if (agentsPage > 1) setAgentsPage(agentsPage - 1);
  };

  const handleAgentsNext = () => {
    if (agents && agentsPage < agents.totalPages) setAgentsPage(agentsPage + 1);
  };

  // Generate page numbers for pagination
  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (sLoading || dLoading || aLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner className="w-10 h-10" />
        <p>{t("Loading MGA Dashboard...")}</p>
      </div>
    );
  }

  if (sError || dError || aError) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-red-500">{t("Error loading MGA dashboard data")}</p>
        <p className="text-sm text-gray-500">{sError || dError || aError}</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {/* Stats Cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 w-full"
          role="stats"
        >
          {stats?.map((stat) => (
            <div
              key={stat.label}
              data-testid="stat-card"
              className="bg-white p-2 sm:p-6 sm:h-24 rounded-lg"
              style={{
                boxShadow: "0px 4px 6.7px 0px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(235, 235, 235, 1)",
              }}
            >
              <div className="text-lg 2xl:text-2xl leading-6 font-bold text-[#232323]">
                {stat.value}
              </div>
              <div className="text-sm 2xl:text-lg leading-[20px] text-[#6F6B7D] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Policy Sales Chart */}
        <div>
          <h2 className="text-lg font-bold mt-6 text-text-primary">
            {t("Policy Sales Distribution")}
          </h2>
          <p className="text-base text-text-secondary -mt-1">
            {t("All Agents Under Management")}
          </p>
        </div>
        <PolicySalesChart data={distribution} loading={dLoading} error={dError || ""} />

        {/* Agents Table */}
        <div className="mt-6 space-y-2 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-text-primary">
              {t("All Agents")} ({agents?.total || 0})
            </h2>
            <div className="text-sm text-gray-500">
              {t("Showing {{start}} to {{end}} of {{total}} agents", {
                start: ((agentsPage - 1) * limit + 1).toString(),
                end: Math.min(agentsPage * limit, agents?.total || 0).toString(),
                total: (agents?.total || 0).toString()
              })}
            </div>
          </div>

          <div className="overflow-auto custom-scrollbar-x">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary text-white text-base 2xl:text-xl capitalize text-nowrap">
                <tr>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                    {t("Agent Code")}
                  </th>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                    {t("Joined Date")}
                  </th>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                    {t("Name")}
                  </th>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                    {t("Validity")}
                  </th>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                    {t("Status")}
                  </th>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                    {t("Policies")}
                  </th>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                    {t("Quotes")}
                  </th>
                  <th className="px-2 sm:px-6 py-1 sm:py-3 text-center font-medium">
                    {t("Action")}
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white"
                style={{ border: "1px solid #AAA9A9" }}
              >
                {aLoading ? (
                  <tr>
                    <td
                      className="p-2 text-primary text-center h-40"
                      colSpan={8}
                    >
                      {t("Loading agents...")}
                    </td>
                  </tr>
                ) : aError ? (
                  <tr>
                    <td className="p-2 text-red-500 text-center" colSpan={8}>
                      {t(aError)}
                    </td>
                  </tr>
                ) : agents?.items?.length === 0 ? (
                  <tr>
                    <td
                      className="p-2 text-text-secondary text-center"
                      colSpan={8}
                    >
                      {t("No agents found")}
                    </td>
                  </tr>
                ) : (
                  agents?.items?.map((agent: any) => (
                    <tr
                      key={agent.agentCode}
                      className="text-[#808080] text-sm 2xl:text-xl hover:bg-gray-50"
                    >
                      <td
                        className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-medium"
                        style={{
                          borderWidth: "0px 1px 1px 0px",
                          borderStyle: "solid",
                          borderColor: "#AAA9A9",
                        }}
                      >
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
                        <div>
                          <div className="font-medium text-gray-900">
                            {agent.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {agent.email}
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                        style={{
                          borderWidth: "0px 1px 1px 0px",
                          borderStyle: "solid",
                          borderColor: "#AAA9A9",
                        }}
                      >
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
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {agent.status}
                        </span>
                      </td>
                      <td
                        className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"
                        style={{
                          borderWidth: "0px 1px 1px 0px",
                          borderStyle: "solid",
                          borderColor: "#AAA9A9",
                        }}
                      >
                        {agent.totalPolicies}
                      </td>
                      <td
                        className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"
                        style={{
                          borderWidth: "0px 1px 1px 0px",
                          borderStyle: "solid",
                          borderColor: "#AAA9A9",
                        }}
                      >
                        {agent.totalQuotes}
                      </td>
                      <td
                        className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                        style={{
                          borderWidth: "0px 1px 1px 0px",
                          borderStyle: "solid",
                          borderColor: "#AAA9A9",
                        }}
                      >
                        <button
                          className="text-primary hover:underline hover:underline-offset-2 cursor-pointer font-medium px-4 text-center w-full"
                          onClick={() => {
                            // Navigate to agent details page
                            window.location.href = `/mga/agent-details/${agent.agentCode}`;
                          }}
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

          {/* Agents Pagination */}
          {agents && agents.totalPages > 1 && (
            <div
              className="flex items-center justify-center p-4 space-x-2"
              role="pagination"
            >
              <button
                disabled={agentsPage === 1}
                onClick={handleAgentsPrevious}
                className={`px-2 py-[10px] ${
                  agentsPage === 1
                    ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed"
                    : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                }`}
                title={t("Previous")}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              {generatePageNumbers(agentsPage, agents.totalPages).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handleAgentsPageChange(pageNum)}
                    className={`px-3 py-2 cursor-pointer ${
                      agentsPage === pageNum
                        ? "bg-primary text-white"
                        : "bg-[#F1F0F2] text-[#808080] hover:bg-[#E1E0E2]"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                disabled={agentsPage === agents.totalPages}
                onClick={handleAgentsNext}
                className={`px-2 py-[10px] ${
                  agentsPage === agents.totalPages
                    ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed"
                    : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                }`}
                title={t("Next")}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
