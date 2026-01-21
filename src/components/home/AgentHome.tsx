// import { useState } from "react";
// import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary.ts";
// import PolicySalesChart from "../analytics/charts/PolicySalesChart.tsx";
// import { usePolicyTypeDistribution } from "../../hooks/agent-dashboard/usePolicyTypeDistribution.ts";
// import { usePolicies } from "../../hooks/agent-dashboard/usePolicies.ts";
// import { useQuotes } from "../../hooks/agent-dashboard/useQuotes.ts";
// import { PoliciesTable, QuotesTable } from "../Tables.tsx";
// import Spinner from "../Spinner.tsx";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// export default function AdminHome() {
//   const [pPage, setPPage] = useState(1);
//   const [qPage, setQPage] = useState(1);
//   const limit = 10;
//   const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
//   const {
//     data: dist,
//     loading: dLoading,
//     error: dError,
//   } = usePolicyTypeDistribution();
//   const {
//     data: policies,
//     loading: pLoading,
//     error: pError,
//   } = usePolicies(pPage, limit);
//   const {
//     data: quotes,
//     loading: qLoading,
//     error: qError,
//   } = useQuotes(qPage, limit);
//   const [filter, setFilter] = useState("Policies");
//   console.log("distribution", dist);
//   console.log("policies", policies);
//   console.log("perror", pError);

//   const stats = [
//     { label: "Total Policies", value: summary?.totalPolicies },
//     { label: "Total Quotes", value: summary?.totalQuotes },
//     {
//       label: "Commission Percent",
//       value: summary?.commissionPercent || "" + "%",
//     },
//     { label: "Total Commissions", value: summary?.totalCommissions },
//     {
//       label: "Current Month Commissions",
//       value: summary?.currentMonthCommissions,
//     },
//     { label: "Monthly Premiums", value: summary?.monthlyPremiums.length },
//   ];
//   const toggleTableFilter = (option: string) => setFilter(option);
//   if (sLoading || dLoading || pLoading || qLoading)
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
//           className="grid grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 w-full"
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
//         <PolicySalesChart data={dist} loading={dLoading} error={dError} />
//         <div className="relative mt-6">
//           <div className="px-2 sm:px-4 py-1 sm:py-3 absolute top-7 right-0">
//             <label className="inline-flex items-center mr-4 text-[#4B465C] opacity-80">
//               <input
//                 type="radio"
//                 name="filter"
//                 value="all"
//                 checked={filter === "Policies"}
//                 onChange={() => toggleTableFilter("Policies")}
//                 className="form-radio cursor-pointer checked:accent-primary"
//               />
//               <span className="ml-2 capitalize">Policies</span>
//             </label>
//             <label className="inline-flex items-center text-[#4B465C] opacity-80">
//               <input
//                 type="radio"
//                 name="filter"
//                 value="certified"
//                 checked={filter === "Quotes"}
//                 onChange={() => toggleTableFilter("Quotes")}
//                 className="form-radio cursor-pointer checked:accent-primary"
//               />
//               <span className="ml-2 capitalize">Quotes</span>
//             </label>
//           </div>
//         </div>
//         {/* Policies issued table */}
//         {filter === "Policies" && (
//           <div>
//             <PoliciesTable
//               data={policies?.items}
//               loading={pLoading}
//               pError={pError}
//             />
//             {/* Pagination */}
//             <div
//             className="flex items-center justify-center p-4 space-x-2"
//             role="pagination"
//           >
//             <button
//               disabled={currentPage === 1}
//               // onClick={() => setCurrentPage((p) => p - 1)}
//               className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
//               title="Previous"
//             >
//               <ChevronLeftIcon className="h-5 w-5" />
//             </button>
//             {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
//               <button
//                 key={num}
//                 //   onClick={() => setCurrentPage(num)}
//                 className={`px-3 py-2 cursor-pointer ${
//                   currentPage === num
//                     ? "bg-primary text-white"
//                     : "bg-[#F1F0F2] text-[#808080]"
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}
//             <button
//               // disabled={currentPage === totalPages}
//               // onClick={() => setCurrentPage((p) => p + 1)}
//               className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
//               title="Next"
//             >
//               <ChevronRightIcon className="h-5 w-5" />
//             </button>
//           </div>
//           </div>
//         )}
//         {/* Quotes issued table */}
//         {filter === "Quotes" && (
//           <div>
//             <QuotesTable
//               data={quotes?.items}
//               loading={qLoading}
//               qError={qError}
//             />
//             {/* Pagination */}
//             <div
//             className="flex items-center justify-center p-4 space-x-2"
//             role="pagination"
//           >
//             <button
//               disabled={currentPage === 1}
//               // onClick={() => setCurrentPage((p) => p - 1)}
//               className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
//               title="Previous"
//             >
//               <ChevronLeftIcon className="h-5 w-5" />
//             </button>
//             {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
//               <button
//                 key={num}
//                 //   onClick={() => setCurrentPage(num)}
//                 className={`px-3 py-2 cursor-pointer ${
//                   currentPage === num
//                     ? "bg-primary text-white"
//                     : "bg-[#F1F0F2] text-[#808080]"
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}
//             <button
//               // disabled={currentPage === totalPages}
//               // onClick={() => setCurrentPage((p) => p + 1)}
//               className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
//               title="Next"
//             >
//               <ChevronRightIcon className="h-5 w-5" />
//             </button>
//           </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }



// ==================================================

import { useState } from "react";
import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary.ts";
import PolicySalesChart from "../analytics/charts/PolicySalesChart.tsx";
import { usePolicyTypeDistribution } from "../../hooks/agent-dashboard/usePolicyTypeDistribution.ts";
import { useQuoteTypeDistribution } from "../../hooks/agent-dashboard/useQuoteTypeDistribution.ts"; 
import { usePolicies } from "../../hooks/agent-dashboard/usePolicies.ts";
import { useQuotes } from "../../hooks/agent-dashboard/useQuotes.ts";
import { PoliciesTable, QuotesTable } from "../Tables.tsx";
import Spinner from "../Spinner.tsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function AgentHome() {
  const [pPage, setPPage] = useState(1);
  const [qPage, setQPage] = useState(1);
  const [filter, setFilter] = useState("Policies");
  const limit = 10;

  const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
  const {
    data: policyDist,
    loading: pdLoading,
    error: pdError,
  } = usePolicyTypeDistribution();
  const {
    data: quoteDist,
    loading: qdLoading,
    error: qdError,
  } = useQuoteTypeDistribution(); // NEW HOOK
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

  console.log("policy distribution", policyDist);
  console.log("quote distribution", quoteDist);
  console.log("policies", policies);
  console.log("quotes", quotes);

  const stats = [
    { label: "Total Policies", value: summary?.totalPolicies || 0 },
    { label: "Total Quotes", value: summary?.totalQuotes || 0 },
    {
      label: "Commission Percent",
      value: `${summary?.commissionPercent || 0}%`,
    },
    { label: "Total Commissions", value: `$${summary?.totalCommissions || 0}` },
    {
      label: "Current Month Commissions",
      value: `$${summary?.currentMonthCommissions || 0}`,
    },
    { label: "Monthly Premiums Count", value: summary?.monthlyPremiums?.length || 0 },
  ];

  const toggleTableFilter = (option: string) => setFilter(option);

  // Pagination handlers for policies
  const handlePolicyPageChange = (newPage: number) => {
    setPPage(newPage);
  };

  const handlePolicyPrevious = () => {
    if (pPage > 1) setPPage(pPage - 1);
  };

  const handlePolicyNext = () => {
    if (policies && pPage < policies.totalPages) setPPage(pPage + 1);
  };

  // Pagination handlers for quotes
  const handleQuotePageChange = (newPage: number) => {
    setQPage(newPage);
  };

  const handleQuotePrevious = () => {
    if (qPage > 1) setQPage(qPage - 1);
  };

  const handleQuoteNext = () => {
    if (quotes && qPage < quotes.totalPages) setQPage(qPage + 1);
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

  if (sLoading || pdLoading || qdLoading || pLoading || qLoading)
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner className="w-10 h-10" />
        <p>Loading...</p>
      </div>
    );

  if (sError || pdError || qdError || pError || qError) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-red-500">Error loading dashboard data</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {/* Stats Cards */}
        {/* <div
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
        </div> */}

        {/* Chart Section with Filter Toggle */}
        <div className="mt-6 hidden">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                Distribution by Type
              </h2>
              <p className="text-base text-text-secondary">
                {filter === "Policies" ? "Policy" : "Quote"} type breakdown
              </p>
            </div>
            
            {/* Filter Toggle - Moved Here */}
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center text-[#4B465C] opacity-80 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="Policies"
                  checked={filter === "Policies"}
                  onChange={() => toggleTableFilter("Policies")}
                  className="form-radio cursor-pointer checked:accent-primary"
                />
                <span className="ml-2 capitalize">Policies</span>
              </label>
              <label className="inline-flex items-center text-[#4B465C] opacity-80 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="Quotes"
                  checked={filter === "Quotes"}
                  onChange={() => toggleTableFilter("Quotes")}
                  className="form-radio cursor-pointer checked:accent-primary"
                />
                <span className="ml-2 capitalize">Quotes</span>
              </label>
            </div>
          </div>

          {/* Chart Component */}
          <PolicySalesChart 
            data={filter === "Policies" ? policyDist : quoteDist}
            loading={filter === "Policies" ? pdLoading : qdLoading}
            error={filter === "Policies" ? pdError : qdError}
            filter={filter}
          />
        </div>

        {/* Tables Section */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">
            {filter === "Policies" ? "Recent Policies" : "Recent Quotes"}
          </h2>
          
          {/* Policies Table */}
          {filter === "Policies" && (
            <div>
              <PoliciesTable
                data={policies?.items}
                loading={pLoading}
                pError={pError}
              />
              {/* Policies Pagination */}
              {policies && policies.totalPages > 1 && (
                <div className="flex items-center justify-center p-4 space-x-2" role="pagination">
                  <button
                    disabled={pPage === 1}
                    onClick={handlePolicyPrevious}
                    className={`px-2 py-[10px] ${
                      pPage === 1 
                        ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed" 
                        : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                    }`}
                    title="Previous"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  
                  {generatePageNumbers(pPage, policies.totalPages).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePolicyPageChange(pageNum)}
                      className={`px-3 py-2 cursor-pointer ${
                        pPage === pageNum
                          ? "bg-primary text-white"
                          : "bg-[#F1F0F2] text-[#808080] hover:bg-[#E1E0E2]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button
                    disabled={pPage === policies.totalPages}
                    onClick={handlePolicyNext}
                    className={`px-2 py-[10px] ${
                      pPage === policies.totalPages
                        ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed"
                        : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                    }`}
                    title="Next"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quotes Table */}
          {filter === "Quotes" && (
            <div>
              <QuotesTable
                data={quotes?.items}
                loading={qLoading}
                qError={qError}
              />
              {/* Quotes Pagination */}
              {quotes && quotes.totalPages > 1 && (
                <div className="flex items-center justify-center p-4 space-x-2" role="pagination">
                  <button
                    disabled={qPage === 1}
                    onClick={handleQuotePrevious}
                    className={`px-2 py-[10px] ${
                      qPage === 1 
                        ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed" 
                        : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                    }`}
                    title="Previous"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  
                  {generatePageNumbers(qPage, quotes.totalPages).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handleQuotePageChange(pageNum)}
                      className={`px-3 py-2 cursor-pointer ${
                        qPage === pageNum
                          ? "bg-primary text-white"
                          : "bg-[#F1F0F2] text-[#808080] hover:bg-[#E1E0E2]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button
                    disabled={qPage === quotes.totalPages}
                    onClick={handleQuoteNext}
                    className={`px-2 py-[10px] ${
                      qPage === quotes.totalPages
                        ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed"
                        : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                    }`}
                    title="Next"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}