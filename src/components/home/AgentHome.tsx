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
import { useLanguage } from "../../context/LanguageContext";

export default function AgentHome() {
  const [pPage, setPPage] = useState(1);
  const [qPage, setQPage] = useState(1);
  const [filter, setFilter] = useState("Policies");
  const limit = 10;
  const { t } = useLanguage();

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
  } = useQuoteTypeDistribution();
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

  const stats = [
    { label: t("Total Policies"), value: summary?.totalPolicies || 0 },
    { label: t("Total Quotes"), value: summary?.totalQuotes || 0 },
    {
      label: t("Commission Percent"),
      value: `${summary?.commissionPercent?.toFixed(2) || 0}%`,
    },
    { label: t("Total Commissions"), value: `$${summary?.totalCommissions?.toFixed(2) || 0}` },
    {
      label: t("Current Month Commissions"),
      value: `$${summary?.currentMonthCommissions?.toFixed(2) || 0}`,
    },
    { label: t("Monthly Premiums Count"), value: summary?.monthlyPremiums?.length || 0 },
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
        <p>{t("Loading...")}</p>
      </div>
    );

  if (sError || pdError || qdError || pError || qError) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-red-500">{t("Error loading dashboard data")}</p>
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

        {/* Chart Section with Filter Toggle */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                {t("Distribution by Type")}
              </h2>
              <p className="text-base text-text-secondary">
                {filter === "Policies" ? t("Policy type breakdown") : t("Quote type breakdown")}
              </p>
            </div>
            
            {/* Filter Toggle */}
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
                <span className="ml-2 capitalize">{t("Policies")}</span>
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
                <span className="ml-2 capitalize">{t("Quotes")}</span>
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
            {filter === "Policies" ? t("Recent Policies") : t("Recent Quotes")}
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
                    title={t("Previous")}
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
                    title={t("Next")}
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
                    title={t("Previous")}
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
                    title={t("Next")}
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