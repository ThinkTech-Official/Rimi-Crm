// import { useAgentSummary } from "../../hooks/agent-dashboard/useAgentSummary";
// import MultiLineChart from "../analytics/admin-charts/MultiLineChart.tsx";
// import PolicyAnalysis from "../analytics/admin-charts/PolicyAnalysis.tsx";
// import QuotesAnalysis from "../analytics/admin-charts/QuotesAnalysis.tsx";
// import QuotesVsPolicyConversion from "../analytics/admin-charts/QuotesVsPolicyConversion.tsx";
// import AdminPolicySalesChart from "../analytics/admin-charts/AdminPolicySalesChart.tsx";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { AgentsTable, PoliciesTable, QuotesTable } from "../Tables.tsx";
// import Spinner from "../Spinner.tsx";

// export default function AdminHome() {
//   //   const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
//   const limit = 10;
//   const [filter, setFilter] = useState("Agent data");
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

//   const { data: summary, loading: sLoading, error: sError } = useAgentSummary();

//     const stats = [
//     { label: "Total Policies", value: summary?.totalPolicies || 0 },
//     { label: "Total Quotes", value: summary?.totalQuotes || 0 },
//     {
//       label: "Commission Percent",
//       value: `${summary?.commissionPercent || 0}%`,
//     },
//     { label: "Total Commissions", value: `$${summary?.totalCommissions || 0}` },
//     {
//       label: "Current Month Commissions",
//       value: `$${summary?.currentMonthCommissions || 0}`,
//     },
//     { label: "Monthly Premiums Count", value: summary?.monthlyPremiums?.length || 0 },
//   ];

//   const options = ["Agent data", "Policy data", "Quotes data"];
//   const toggleTableFilter = (option: string) => {
//     setFilter(option);
//     setIsFilterDropdownOpen(false);
//   };
//    if (!agents)
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
//          {/* Stats Cards */}
//         <div
//           className="grid grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 w-full"
//           role="stats"
//         >
//           {stats?.map((stat) => (
//             <div
//               key={stat.label}
//               data-testid="stat-card"
//               className="bg-white p-2 sm:p-6 sm:h-24 rounded-lg"
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
//         </div>
//         <h2 className="text-lg font-bold text-text-primary">
//           Quotes Statistics
//         </h2>
//         <div className=" mt-4">
//           <QuotesAnalysis />
//         </div>
//         <h2 className="text-lg font-bold mt-6 text-text-primary">
//           Policy Statistics
//         </h2>
//         <div className=" mt-4">
//           <PolicyAnalysis />
//         </div>
//         <h2 className="text-lg font-bold mt-6 text-text-primary">
//           Quotes vs Policies
//         </h2>
//         <div className=" mt-4">
//           <QuotesVsPolicyConversion />
//         </div>
//         <h2 className="text-lg font-bold mt-6 text-text-primary">
//           Agents Types Joined Per Month
//         </h2>
//         <div className=" mt-4">
//           <MultiLineChart />
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mt-6 text-text-primary">
//             Policy Sales
//           </h2>
//           <p className="text-base text-text-secondary -mt-1">Current Month</p>
//         </div>
//         <AdminPolicySalesChart />
//         <div className="relative mt-6">
//           <div className="flex gap-2 items-center absolute top-7 right-0">
//             <span className="text-text-light">Show</span>
//             <div className="relative">
//               <button
//                 className="flex items-center gap-2 text-text-secondary border border-[#e5e5e6] p-2 text-[16px] 2xl:text-xl font-medium relative cursor-pointer"
//                 onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
//               >
//                 {filter}
//                 <MdKeyboardArrowRight
//                   className={`h-4 w-4 2xl:w-6 2xl:h-6 transform transition ${
//                     isFilterDropdownOpen ? "rotate-90" : ""
//                   }`}
//                 />
//               </button>
//               {isFilterDropdownOpen && (
//                 <div className="absolute mt-1 w-full shadow-lg bg-white border border-[#e5e5e6] z-10">
//                   <ul className="py-1 2xl:text-lg text-gray-700">
//                     {options.map((option) => (
//                       <li
//                         key={option}
//                         onClick={() => toggleTableFilter(option)}
//                         className={`px-2 py-2 cursor-pointer hover:bg-primary hover:text-white`}
//                       >
//                         {option}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {filter == "Agent data" && <AgentsTable data={agents} />}
//         {/* {filter == "Policy data" && <PoliciesTable data={policies} />}
//         {filter == "Quotes data" && <QuotesTable data={quotes} />} */}
//       </div>
//     </>
//   );
// }

// ===========================================

// components/AdminHome.tsx
import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { MdKeyboardArrowRight, MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { useLanguage } from "../../context/LanguageContext";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  useAdminStats,
  useQuotesAnalysis,
  usePolicyAnalysis,
  useQuotesPolicyConversion,
  useAgentTypesMonthly,
  usePolicySales,
  useAgents,
  usePolicies,
  useQuotes,
  useRefreshDashboard,
} from "../../hooks/admin-dashboard";
import { useQueryClient } from "@tanstack/react-query";

// Import chart components (assuming these exist)
import MultiLineChart from "../analytics/admin-charts/MultiLineChart";
import PolicyAnalysis from "../analytics/admin-charts/PolicyAnalysis";
import QuotesAnalysis from "../analytics/admin-charts/QuotesAnalysis";
import QuotesVsPolicyConversion from "../analytics/admin-charts/QuotesVsPolicyConversion";
import AdminPolicySalesChart from "../analytics/admin-charts/AdminPolicySalesChart";
import { RenderPageNumbers } from "../RenderPageNumbers";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { pastelColors } from "../Products/SecureTravelRIMIVisitorstoCanadaTravel/step1/Constants";

export default function AdminHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [filter, setFilter] = useState("Agent data");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Pagination states for tables
  const [agentsPage, setAgentsPage] = useState(1);
  const [policiesPage, setPoliciesPage] = useState(1);
  const [quotesPage, setQuotesPage] = useState(1);
  const limit = 10;

  // Fetch admin stats
  const { data: stats, isLoading: statsLoading } = useAdminStats();

  // Fetch table data based on filter
  const { data: agentsData, isLoading: agentsLoading } = useAgents(
    agentsPage,
    limit
  );
  const { data: policiesData, isLoading: policiesLoading } = usePolicies(
    policiesPage,
    limit
  );
  const { data: quotesData, isLoading: quotesLoading } = useQuotes(
    quotesPage,
    limit
  );

  const queryClient = useQueryClient();
  const { mutate: refreshDashboard, isPending: isRefreshing } = useRefreshDashboard();

  const handleRefresh = () => {
    refreshDashboard(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        queryClient.invalidateQueries({ queryKey: ["quotes-analysis"] });
        queryClient.invalidateQueries({ queryKey: ["policy-analysis"] });
        queryClient.invalidateQueries({ queryKey: ["quotes-policy-conversion"] });
        queryClient.invalidateQueries({ queryKey: ["agent-types-monthly"] });
        queryClient.invalidateQueries({ queryKey: ["policy-sales"] });
      },
    });
  };

  const tableDropDownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(tableDropDownRef as React.RefObject<HTMLElement>, () => {
    setIsFilterDropdownOpen(false);
  });
  const options = ["Agent data", "Policy data", "Quotes data"];

  const targetRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    console.log("Downloading PDF...");
    if (!targetRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      // The dimensions of A4 format in points
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const paddingX = 20; // ~14mm padding left and right
      const paddingY = 20; // ~14mm padding top and bottom

      const usableWidth = pdfWidth - paddingX * 2;
      const usableHeight = pdfHeight - paddingY * 2;

      // Find all the individual page wrappers inside the targetRef
      const pages = targetRef.current.querySelectorAll('.pdf-page');

      for (let p = 0; p < pages.length; p++) {
        const pageEl = pages[p] as HTMLElement;
        const pageCanvas = await html2canvas(pageEl, {
          scale: 3,
          useCORS: true,
          logging: false,
          onclone: (documentClone) => {
            const elts = documentClone.getElementsByTagName("*");
            for (let i = 0; i < elts.length; i++) {
              const el = elts[i] as HTMLElement;
              const style = window.getComputedStyle(el);
              if (style.backgroundColor && (style.backgroundColor.includes("oklch") || style.backgroundColor.includes("oklab"))) {
                el.style.backgroundColor = "transparent";
              }
              if (style.color && (style.color.includes("oklch") || style.color.includes("oklab"))) {
                el.style.color = "#000000";
              }
              if (style.borderColor && (style.borderColor.includes("oklch") || style.borderColor.includes("oklab"))) {
                el.style.borderColor = "transparent";
              }
            }
          }
        });

        const imgData = pageCanvas.toDataURL("image/png");

        // Scale the canvas image down to fit the usable width
        const ratio = usableWidth / pageCanvas.width;
        let scaledCanvasHeight = pageCanvas.height * ratio;

        // Ensure we don't exceed the max usable height for a single page
        if (scaledCanvasHeight > usableHeight) {
          scaledCanvasHeight = usableHeight;
        }

        if (p > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", paddingX, paddingY, usableWidth, scaledCanvasHeight);
      }

      pdf.save("admin_dashboard.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleTableFilter = (option: string) => {
    setFilter(option);
    setIsFilterDropdownOpen(false);
  };

  const handleAgentDetails = (agentCode: string) => {
    navigate(`/admin/agent-details/${agentCode}`);
  };

if (statsLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2">
        <Spinner className="w-10 h-10" />
        <p>{t("Loading dashboard...")}</p>
      </div>
    );
  }

  
  if (!statsLoading && stats && !stats.computedAt) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-gray-500 text-lg">{t("No dashboard data yet.")}</p>
        <p className="text-gray-400 text-sm">{t("Click below to generate dashboard data.")}</p>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded cursor-pointer disabled:opacity-70"
        >
          {isRefreshing ? <Spinner className="w-5 h-5" /> : null}
          {isRefreshing ? t("Generating...") : t("Generate Dashboard Data")}
        </button>
      </div>
    );
  }

  

  const statsCards = [
    { label: t("Total Policies"), value: stats?.totalPolicies || 0 },
    { label: t("Total Quotes"), value: stats?.totalQuotes || 0 },
    { label: t("Total Agents"), value: stats?.totalAgents || 0 },
    { label: t("Active Agents"), value: stats?.activeAgents || 0 },
    // {
    //   label: "Avg Commission Rate",
    //   value: `${stats?.commissionPercent?.toFixed(2) || 0}%`,
    // },
    // {
    //   label: t("Total Commissions"),
    //   value: `$${(stats?.totalCommissions || 0).toLocaleString()}`,
    // },
    // {
    //   label: t("Current Month Commissions"),
    //   value: `$${(stats?.currentMonthCommissions || 0).toLocaleString()}`,
    // },
    // {
    //   label: t("Monthly Premiums"),
    //   value: stats?.monthlyPremiums || 0,
    // },
  ];

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4">
        {/* Last updated timestamp */}
        <p className="text-sm text-gray-400">
          {stats?.computedAt
            ? `${t("Last updated")}: ${new Date(stats.computedAt).toLocaleString()}`
            : ""}
        </p>

        <div className="flex items-center gap-3 -mt-4">
          {/* Manual refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            title={t("Refresh dashboard data")}
            className={`flex gap-2 items-center text-sm text-primary border border-primary px-3 py-1 rounded ${
              isRefreshing ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:bg-primary hover:text-white transition-colors"
            }`}
          >
            {isRefreshing ? <Spinner className="w-4 h-4" /> : null}
            {isRefreshing ? t("Refreshing...") : t("Refresh Data")}
          </button>

          {/* PDF download */}
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex gap-2 items-center ${isDownloading ? "opacity-90 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isDownloading ? (
              <Spinner className="w-7 h-7 text-primary" />
            ) : (
              <MdDownload className="h-7 w-7 text-primary" />
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 pb-4 bg-white" ref={targetRef}>

        {/* ================= PAGE 1 ================= */}
        <div className="flex flex-col gap-6 pdf-page">
          {/* Stats Cards */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8 w-full"
            role="stats"
          >
            {statsCards.map((stat, index) => (
              <div
                key={stat.label}
                data-testid="stat-card"
                className="p-2 sm:p-6 sm:h-24 rounded-lg transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: pastelColors[index],
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

          {/* Quotes Statistics */}
          <section className="mt-2">
            <h2 className="text-lg font-bold text-text-primary mb-4">
              {t("Quotes Statistics")}
            </h2>
            <QuotesAnalysisChart />
          </section>
        </div>

        {/* ================= PAGE 2 ================= */}
        <div className="flex flex-col gap-6 pdf-page">

          {/* Policy Statistics */}
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-4">
              {t("Policy Statistics")}
            </h2>
            <PolicyAnalysisChart />
          </section>
          {/* Quotes vs Policies */}
          <section className="mt-2">
            <h2 className="text-lg font-bold text-text-primary mb-4">
              {t("Quotes vs Policies Conversion")}
            </h2>
            <QuotesVsPolicyConversionChart />
          </section>
        </div>

        {/* ================= PAGE 3 ================= */}
        <div className="flex flex-col gap-6 pdf-page">
          {/* Agent Types Per Month */}
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-4">
              {t("Agent Types Joined Per Month")}
            </h2>
            <AgentTypesMonthlyChart />
          </section>

          {/* Policy Sales */}
          <section className="mt-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">{t("Policy Sales")}</h2>
              <p className="text-base text-text-secondary">{t("Current Month")}</p>
            </div>
            <PolicySalesChart />
          </section>
        </div>

        {/* Table Section (Ignored in PDF) */}
        <section className="mt-8 pt-8 border-t border-gray-200" data-html2canvas-ignore="true">
          <div className="relative" ref={tableDropDownRef}>
            <div className="flex gap-2 items-center absolute top-0 right-0">
              <span className="text-text-light">{t("Show")}</span>
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-text-secondary border border-[#e5e5e6] p-2 text-[16px] 2xl:text-xl font-medium relative cursor-pointer"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                >
                  {t(filter)}
                  <MdKeyboardArrowRight
                    className={`h-4 w-4 2xl:w-6 2xl:h-6 transform transition ${isFilterDropdownOpen ? "rotate-90" : ""
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
                          {t(option)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            {filter === "Agent data" && (
              <AgentsTable
                data={agentsData}
                loading={agentsLoading}
                currentPage={agentsPage}
                onPageChange={setAgentsPage}
                onAgentClick={handleAgentDetails}
              />
            )}
            {filter === "Policy data" && (
              <PoliciesTable
                data={policiesData}
                loading={policiesLoading}
                currentPage={policiesPage}
                onPageChange={setPoliciesPage}
              />
            )}
            {filter === "Quotes data" && (
              <QuotesTable
                data={quotesData}
                loading={quotesLoading}
                currentPage={quotesPage}
                onPageChange={setQuotesPage}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// Chart wrapper components that fetch their own data
function QuotesAnalysisChart() {
  const { data, isLoading, error } = useQuotesAnalysis();

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-red-500">Failed to load quotes analysis</div>;

  return <QuotesAnalysis data={data} />;
}

function PolicyAnalysisChart() {
  const { data, isLoading, error } = usePolicyAnalysis();

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-red-500">Failed to load policy analysis</div>;

  return <PolicyAnalysis data={data} />;
}

function QuotesVsPolicyConversionChart() {
  const { data, isLoading, error } = useQuotesPolicyConversion();

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-red-500">Failed to load conversion data</div>;

  return <QuotesVsPolicyConversion data={data} />;
}

function AgentTypesMonthlyChart() {
  const { data, isLoading, error } = useAgentTypesMonthly();

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-red-500">Failed to load agent types data</div>;

  return <MultiLineChart data={data} />;
}

function PolicySalesChart() {
  const { data, isLoading, error } = usePolicySales();

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-red-500">Failed to load sales data</div>;

  return <AdminPolicySalesChart data={data} />;
}

// Table Components
function AgentsTable({
  data,
  loading,
  currentPage,
  onPageChange,
  onAgentClick,
}: any) {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const agents = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-lg font-bold text-text-primary">
        All Agents ({data?.total || 0})
      </h2>
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <table className="min-w-full divide-y divide-gray-200 overflow-auto custom-scrollbar">
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
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Quotes
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Policies
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-center font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {agents.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No agents found
                </td>
              </tr>
            ) : (
              agents.map((agent: any) => (
                <tr
                  key={agent.agentCode}
                  className="text-[#808080] text-sm 2xl:text-base"
                >
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {agent.agentCode}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {agent.joinedDate}
                  </td>
                  <td className="px-2 sm:px-3 py-2 min-w-[200px] max-w-[250px] text-wrap border-r border-b border-[#AAA9A9]">
                    {agent.name}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {agent.validity}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {agent.quotesCount}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {agent.policiesCount}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    <button
                      className="text-primary hover:underline hover:underline-offset-2 cursor-pointer font-medium px-4 text-center w-full"
                      onClick={() => onAgentClick(agent.agentCode)}
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

      {/* Pagination */}
      <div
        className="flex items-center justify-center p-4 space-x-2"
        role="pagination"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-2 py-[10px] ${currentPage === 1 ? "bg-gray-300" : "bg-[#CCCCCC] cursor-pointer"
            } text-[#6F6B7D]`}
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
          className={`px-2 py-[10px] ${currentPage === totalPages
            ? "bg-gray-300"
            : "bg-[#CCCCCC] cursor-pointer"
            } text-[#6F6B7D]`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function PoliciesTable({ data, loading, currentPage, onPageChange }: any) {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const policies = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-lg font-bold text-text-primary">
        All Policies ({data?.total || 0})
      </h2>
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <table className="min-w-full divide-y divide-gray-200 overflow-auto custom-scrollbar">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Policy No.
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Name
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Type
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Premium
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Status
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Issued at
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {policies.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No policies found
                </td>
              </tr>
            ) : (
              policies.map((policy: any) => (
                <tr
                  key={policy.id}
                  className="text-[#808080] text-sm 2xl:text-base"
                >
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {policy.policyNumber}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {policy.firstName} {policy.lastName}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {policy.policyType || "N/A"}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    ${policy.premium?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {policy.status || "N/A"}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {policy.dateIssued
                      ? new Date(policy.dateIssued).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-center p-4 space-x-2"
        role="pagination"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-2 py-[10px] ${currentPage === 1 ? "bg-gray-300" : "bg-[#CCCCCC] cursor-pointer"
            } text-[#6F6B7D]`}
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
          className={`px-2 py-[10px] ${currentPage === totalPages
            ? "bg-gray-300"
            : "bg-[#CCCCCC] cursor-pointer"
            } text-[#6F6B7D]`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function QuotesTable({ data, loading, currentPage, onPageChange }: any) {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const quotes = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-lg font-bold text-text-primary">
        All Quotes ({data?.total || 0})
      </h2>
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <table className="min-w-full divide-y divide-gray-200 overflow-auto custom-scrollbar">
          <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
            <tr>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Quote No.
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Name
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Type
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Premium
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Product
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Status
              </th>
              <th className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap">
                Created at
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No quotes found
                </td>
              </tr>
            ) : (
              quotes.map((quote: any) => (
                <tr
                  key={quote.id}
                  className="text-[#808080] text-sm 2xl:text-base"
                >
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {quote.quoteNumber}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {quote.firstName} {quote.lastName}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {quote.policyType || "N/A"}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    ${quote.premium?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap capitalize border-r border-b border-[#AAA9A9]">
                    {quote.product.split("_").join(" ").toLowerCase() || "N/A"}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {quote.status || "N/A"}
                  </td>
                  <td className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]">
                    {quote.createdAt
                      ? new Date(quote.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-center p-4 space-x-2"
        role="pagination"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-2 py-[10px] ${currentPage === 1 ? "bg-gray-300" : "bg-[#CCCCCC] cursor-pointer"
            } text-[#6F6B7D]`}
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
          className={`px-2 py-[10px] ${currentPage === totalPages
            ? "bg-gray-300"
            : "bg-[#CCCCCC] cursor-pointer"
            } text-[#6F6B7D]`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
