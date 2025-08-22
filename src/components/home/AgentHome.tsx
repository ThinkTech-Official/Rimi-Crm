import { useState } from "react";
import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary.ts";
import PolicySalesChart from "../analytics/charts/PolicySalesChart.tsx";
import { usePolicyTypeDistribution } from "../../hooks/agent-dashboard/usePolicyTypeDistribution.ts";
import { usePolicies } from "../../hooks/agent-dashboard/usePolicies.ts";
import { useQuotes } from "../../hooks/agent-dashboard/useQuotes.ts";
import { PoliciesTable, QuotesTable } from "../Tables.tsx";
import Spinner from "../Spinner.tsx";

export default function AdminHome() {
  const [pPage, setPPage] = useState(1);
  const [qPage, setQPage] = useState(1);
  const limit = 10;
  const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
  const {
    data: dist,
    loading: dLoading,
    error: dError,
  } = usePolicyTypeDistribution();
  const {
    data: policies,
    loading: pLoading,
    error: pError,
  } = usePolicies(pPage, limit);
  const {
    data: quotes,
    loading: qLoading,
    error: qError,
  } = useQuotes(qPage, limit);
  const [filter, setFilter] = useState("Quotes");
  console.log("distribution", dist);
  console.log("policies", policies);
  console.log("perror", pError);
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
  const stats = [
    { label: "Total Policies", value: summary?.totalPolicies },
    { label: "Total Quotes", value: summary?.totalQuotes },
    {
      label: "Commission Percent",
      value: summary?.commissionPercent || "" + "%",
    },
    { label: "Total Commissions", value: summary?.totalCommissions },
    {
      label: "Current Month Commissions",
      value: summary?.currentMonthCommissions,
    },
    { label: "Monthly Premiums", value: summary?.monthlyPremiums.length },
  ];
  const toggleTableFilter = (option: string) => setFilter(option);
  if (sLoading || dLoading || pLoading || qLoading)
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
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 w-full"
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
        <PolicySalesChart data={dist} loading={dLoading} error={dError} />
        <div className="relative mt-6">
          <div className="px-2 sm:px-4 py-1 sm:py-3 absolute top-7 right-0">
            <label className="inline-flex items-center mr-4 text-[#4B465C] opacity-80">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === "Policies"}
                onChange={() => toggleTableFilter("Policies")}
                className="form-radio cursor-pointer checked:accent-primary"
              />
              <span className="ml-2 capitalize">Policies</span>
            </label>
            <label className="inline-flex items-center text-[#4B465C] opacity-80">
              <input
                type="radio"
                name="filter"
                value="certified"
                checked={filter === "Quotes"}
                onChange={() => toggleTableFilter("Quotes")}
                className="form-radio cursor-pointer checked:accent-primary"
              />
              <span className="ml-2 capitalize">Quotes</span>
            </label>
          </div>
        </div>
        {/* Policies issued table */}
        {filter === "Policies" && (
          <div>
            <PoliciesTable
              data={policies?.items}
              loading={pLoading}
              pError={pError}
            />
            {/* Pagination */}
            {/* <div
            className="flex items-center justify-center p-4 space-x-2"
            role="pagination"
          >
            <button
              disabled={currentPage === 1}
              // onClick={() => setCurrentPage((p) => p - 1)}
              className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
              title="Previous"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                //   onClick={() => setCurrentPage(num)}
                className={`px-3 py-2 cursor-pointer ${
                  currentPage === num
                    ? "bg-primary text-white"
                    : "bg-[#F1F0F2] text-[#808080]"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              // disabled={currentPage === totalPages}
              // onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
              title="Next"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div> */}
          </div>
        )}
        {/* Quotes issued table */}
        {filter === "Quotes" && (
          <div>
            <QuotesTable
              data={quotes?.items}
              loading={qLoading}
              qError={qError}
            />
            {/* Pagination */}
            {/* <div
            className="flex items-center justify-center p-4 space-x-2"
            role="pagination"
          >
            <button
              disabled={currentPage === 1}
              // onClick={() => setCurrentPage((p) => p - 1)}
              className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
              title="Previous"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                //   onClick={() => setCurrentPage(num)}
                className={`px-3 py-2 cursor-pointer ${
                  currentPage === num
                    ? "bg-primary text-white"
                    : "bg-[#F1F0F2] text-[#808080]"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              // disabled={currentPage === totalPages}
              // onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
              title="Next"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div> */}
          </div>
        )}
      </div>
    </>
  );
}
