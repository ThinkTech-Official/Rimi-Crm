import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary.ts";
import PolicySalesChart from "../analytics/charts/PolicySalesChart.tsx";

export default function MGAHome() {
  const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [filter, setFilter] = useState("Policies");
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
  const toggleTableFilter = (option: string) => setFilter(option);
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
        <PolicySalesChart />
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-lg font-bold text-text-primary">
            All Policies issued by agent
          </h2>
          <div className="px-2 sm:px-4 py-1 sm:py-3">
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                Agent Code
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                Joined Date
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                Name
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium">
                Validity
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-center font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {agents.map((agent: any) => (
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
                  <button className="text-primary hover:underline hover:underline-offset-2 cursor-pointer font-medium px-4 text-center w-full">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div
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
        </div>
      </div>
    </>
  );
}
