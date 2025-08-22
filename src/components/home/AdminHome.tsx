import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary";
import MultiLineChart from "../analytics/admin-charts/MultiLineChart.tsx";
import PolicyAnalysis from "../analytics/admin-charts/PolicyAnalysis.tsx";
import QuotesAnalysis from "../analytics/admin-charts/QuotesAnalysis.tsx";
import QuotesVsPolicyConversion from "../analytics/admin-charts/QuotesVsPolicyConversion.tsx";
import AdminPolicySalesChart from "../analytics/admin-charts/AdminPolicySalesChart.tsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AgentsTable, PoliciesTable, QuotesTable } from "../Tables.tsx";
import Spinner from "../Spinner.tsx";

export default function AdminHome() {
  //   const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const limit = 10;
  const [filter, setFilter] = useState("Agent data");
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
  const options = ["Agent data", "Policy data", "Quotes data"];
  const toggleTableFilter = (option: string) => {
    setFilter(option);
    setIsFilterDropdownOpen(false);
  };
   if (!agents)
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
          {/* {summary?.map((stat) => (
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
          ))} */}
        </div>
        <h2 className="text-lg font-bold text-text-primary">
          Quotes Statistics
        </h2>
        <div className=" mt-4">
          <QuotesAnalysis />
        </div>
        <h2 className="text-lg font-bold mt-6 text-text-primary">
          Policy Statistics
        </h2>
        <div className=" mt-4">
          <PolicyAnalysis />
        </div>
        <h2 className="text-lg font-bold mt-6 text-text-primary">
          Quotes vs Policies
        </h2>
        <div className=" mt-4">
          <QuotesVsPolicyConversion />
        </div>
        <h2 className="text-lg font-bold mt-6 text-text-primary">
          Agents Types Joined Per Month
        </h2>
        <div className=" mt-4">
          <MultiLineChart />
        </div>
        <div>
          <h2 className="text-lg font-bold mt-6 text-text-primary">
            Policy Sales
          </h2>
          <p className="text-base text-text-secondary -mt-1">Current Month</p>
        </div>
        <AdminPolicySalesChart />
        <div className="relative mt-6">
          <div className="flex gap-2 items-center absolute top-7 right-0">
            <span className="text-text-light">Show</span>
            <div className="relative">
              <button
                className="flex items-center gap-2 text-text-secondary border border-[#e5e5e6] p-2 text-[16px] 2xl:text-xl font-medium relative cursor-pointer"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              >
                {filter}
                <MdKeyboardArrowRight
                  className={`h-4 w-4 2xl:w-6 2xl:h-6 transform transition ${
                    isFilterDropdownOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {isFilterDropdownOpen && (
                <div className="absolute mt-1 w-full shadow-lg bg-white border border-[#e5e5e6] z-10">
                  <ul className="py-1 2xl:text-lg text-gray-700">
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => toggleTableFilter(option)}
                        className={`px-2 py-2 cursor-pointer hover:bg-primary hover:text-white`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {filter == "Agent data" && <AgentsTable data={agents} />}
        {/* {filter == "Policy data" && <PoliciesTable data={policies} />}
        {filter == "Quotes data" && <QuotesTable data={quotes} />} */}
      </div>
    </>
  );
}
