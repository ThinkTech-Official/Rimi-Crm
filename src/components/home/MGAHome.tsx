import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary.ts";
import PolicySalesChart from "../analytics/charts/PolicySalesChart.tsx";
import { AgentsTable } from "../Tables.tsx";
import Spinner from "../Spinner.tsx";

export default function MGAHome() {
  const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  console.log("summary", summary);
  const agents = [
    {
      agentCode: "AGT001",
      joinedDate: "2023-01-15",
      name: "John Doe",
      validity: "2025-01-15",
      action: "Active",
    },
    {
      agentCode: "AGT002",
      joinedDate: "2023-03-10",
      name: "Jane Smith",
      validity: "2024-03-10",
      action: "Suspended",
    },
    {
      agentCode: "AGT003",
      joinedDate: "2022-11-05",
      name: "Michael Johnson",
      validity: "2024-11-05",
      action: "Active",
    },
    {
      agentCode: "AGT004",
      joinedDate: "2024-02-20",
      name: "Emily Brown",
      validity: "2026-02-20",
      action: "Pending",
    },
    {
      agentCode: "AGT005",
      joinedDate: "2023-07-25",
      name: "David Wilson",
      validity: "2025-07-25",
      action: "Active",
    },
  ];
  const stats = [
    { label: "Total Policies", value: summary?.totalPolicies },
    { label: "Total Quotes", value: summary?.totalQuotes },
    { label: "Commission Percent", value: summary?.commissionPercent + "%" },
    { label: "Total Commissions", value: summary?.totalCommissions },
    {
      label: "Current Month Commissions",
      value: summary?.currentMonthCommissions,
    },
    { label: "Monthly Premiums", value: summary?.monthlyPremiums.length },
  ];
 if (sLoading)
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2">
        <Spinner className="w-10 h-10" />
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8 w-full"
          role="stats"
        >
          {stats?.map((stat) => (
            <div
              key={stat.label}
              data-testid="stat-card"
              className="bg-white p-2 sm:p-6 sm:h-24"
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
        <div>
          <h2 className="text-lg font-bold mt-6 text-text-primary">
            Policy Sales
          </h2>
          <p className="text-base text-text-secondary -mt-1">Current Month</p>
        </div>
        <PolicySalesChart data={""} loading={false} error={""} />
        <AgentsTable data={agents} loading={sLoading} />
      </div>
    </>
  );
}
