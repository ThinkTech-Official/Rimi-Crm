import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  useMgaAgentDetails,
  useMgaAgentPolicies,
  useMgaAgentQuotes,
  useMgaAgentStatusUpdate,
  useMgaAgentCommissions,
} from "../hooks/mga-dashboard";
import { PoliciesTable, QuotesTable } from "../components/Tables";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Spinner from "../components/Spinner";
import { CommissionsTable } from "../components/CommissionsTable";
import DatePicker from "../components/DatePicker";
import { RenderPageNumbers } from "../components/RenderPageNumbers";
import { formatDate } from "../utils/dateUtils";

const MGAAgentDetails = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { agentCode } = useParams<{ agentCode: string }>();

  // State for tab filtering and pagination
  const [filter, setFilter] = useState("Policies");
  const [policiesPage, setPoliciesPage] = useState(1);
  const [quotesPage, setQuotesPage] = useState(1);
  const limit = 10;

  const [commissionsPage, setCommissionsPage] = useState(1);

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Fetch agent details using existing hook
  const {
    data: agentData,
    loading: detailsLoading,
    error: detailsError,
  } = useMgaAgentDetails(agentCode || "");

  // Fetch policies (only when Policies tab is active)
  const { data: policiesData, loading: policiesLoading } = useMgaAgentPolicies(
    agentCode || "",
    policiesPage,
    limit,
  );

  // Fetch quotes (only when Quotes tab is active)
  const { data: quotesData, loading: quotesLoading } = useMgaAgentQuotes(
    agentCode || "",
    quotesPage,
    limit,
  );

  // Status update hook
  const { updateAgentStatus, loading: statusLoading } =
    useMgaAgentStatusUpdate();
  const [statusSuccess, setStatusSuccess] = useState(false);

  const { data: commissionsData, loading: commissionsLoading } =
    useMgaAgentCommissions(
      agentCode || "",
      commissionsPage,
      limit,
      dateFrom,
      dateTo,
    );

  const toggleTableFilter = (option: string) => setFilter(option);

  // Handle status toggle
  const handleStatusToggle = async () => {
    if (!agentData) return;

    const newStatus = agentData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus === "ACTIVE" ? "activate" : "suspend"} this agent?`,
    );

    if (confirmed) {
      const result = await updateAgentStatus(agentData.agentCode, newStatus);
      if (result) {
        setStatusSuccess(true);
        // Refresh page to show updated status
        setTimeout(() => window.location.reload(), 1500);
      }
    }
  };

  // Handle loading state
  if (detailsLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner className="w-10 h-10" />
        <p>{t("Loading agent details...")}</p>
      </div>
    );
  }

  // Handle error state
  if (detailsError || !agentData) {
    return (
      <div className="px-8">
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <div className="text-red-500 text-lg">
            {t("Failed to load agent details")}
          </div>
          <button
            onClick={() => navigate("/mga/dashboard")}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            {t("Back to Dashboard")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pb-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/mga/dashboard")}
        className="mb-4 text-primary flex items-center gap-2 cursor-pointer"
      >
        <ChevronLeftIcon className="w-4 h-4" /> {t("Back to Dashboard")}
      </button>

      {/* Header with agent info and actions */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-start">
          <div className="bg-primary/10 p-4 rounded-full">
            <FaUser className="text-3xl text-primary" />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-text-primary">
              {agentData.firstName} {agentData.lastName}
            </h1>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">
                  {t("Email")}:
                </span>
                <span className="text-text-secondary">{agentData.email}</span>
              </div>

              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">
                  {t("Agent Code")}:
                </span>
                <span className="text-text-secondary font-mono">
                  {agentData.agentCode}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">
                  {t("Status")}:
                </span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded text-sm ${
                    agentData.status === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {t(agentData.status)}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">
                  {t("Commission")}:
                </span>
                <span className="text-text-secondary font-semibold">
                  {agentData.commissionPercent}%
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">
                  {t("Company")}:
                </span>
                <span className="text-text-secondary">
                  {agentData.company || t("N/A")}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">
                  {t("Joined")}:
                </span>
                <span className="text-text-secondary">
                  {formatDate(agentData.joinedDate)}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">
                  {t("Valid until")}:
                </span>
                <span className="text-text-secondary">
                  {formatDate(agentData.validity)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MGA-specific: Status toggle action */}
        {/* <div className="flex gap-2">
          {agentData.status === 'ACTIVE' ? (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
              onClick={handleStatusToggle}
              disabled={statusLoading}
            >
              <FaBan /> {statusLoading ? 'Updating...' : 'Suspend Agent'}
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
              onClick={handleStatusToggle}
              disabled={statusLoading}
            >
              <FaCheckCircle /> {statusLoading ? 'Updating...' : 'Activate Agent'}
            </button>
          )}
        </div> */}
      </div>

      {/* Success message */}
      {statusSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg border border-green-300">
          {t("✓ Agent status updated successfully! Refreshing...")}
        </div>
      )}

      {/* Stats Grid - MGA Perspective */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-text-secondary text-sm font-medium mb-2">Total Quotes</div>
          <div className="text-3xl font-bold text-blue-600">
            {agentData.totalQuotes}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-text-secondary text-sm font-medium mb-2">Total Policies</div>
          <div className="text-3xl font-bold text-green-600">
            {agentData.totalPolicies}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-text-secondary text-sm font-medium mb-2">Total Commissions</div>
          <div className="text-3xl font-bold text-purple-600">
            ${agentData.totalCommissions?.toLocaleString() || 0}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-text-secondary text-sm font-medium mb-2">This Month</div>
          <div className="text-3xl font-bold text-orange-600">
            ${agentData.currentMonthCommissions?.toLocaleString() || 0}
          </div>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="relative mt-8">
        <div className="flex gap-6 border-b border-gray-200">
          <button
            onClick={() => toggleTableFilter("Policies")}
            className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${filter === "Policies"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {t("Policies")} ({policiesData?.total || 0})
          </button>
          <button
            onClick={() => toggleTableFilter("Quotes")}
            className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${filter === "Quotes"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {t("Quotes")} ({quotesData?.total || 0})
          </button>
          <button
            onClick={() => toggleTableFilter("Commissions")}
            className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${filter === "Commissions"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {t("Commissions")} ({commissionsData?.total || 0})
          </button>
        </div>
      </div>

      {/* Commission Search  */}

      {/* Tables with Pagination */}
      <div className="mt-6">
        {filter === "Policies" && (
          <div>
            <PoliciesTable
              data={policiesData?.items || []}
              loading={policiesLoading}
              pError={undefined}
            />

            {/* Pagination */}
            <div className="flex items-center justify-center p-4 space-x-2">
              <button
                disabled={policiesPage === 1}
                onClick={() => setPoliciesPage(policiesPage - 1)}
                className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={t("Previous")}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <RenderPageNumbers
                onPageChange={setPoliciesPage}
                totalPages={policiesData?.totalPages || 1}
                page={policiesPage}
              />

              <button
                disabled={policiesPage >= (policiesData?.totalPages || 1)}
                onClick={() => setPoliciesPage(policiesPage + 1)}
                className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={t("Next")}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {filter === "Quotes" && (
          <div>
            <QuotesTable
              data={quotesData?.items || []}
              loading={quotesLoading}
              qError={undefined}
            />

            {/* Pagination */}
            <div className="flex items-center justify-center p-4 space-x-2">
              <button
                disabled={quotesPage === 1}
                onClick={() => setQuotesPage(quotesPage - 1)}
                className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={t("Previous")}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <RenderPageNumbers
                onPageChange={setQuotesPage}
                totalPages={quotesData?.totalPages || 1}
                page={quotesPage}
              />

              <button
                disabled={quotesPage >= (quotesData?.totalPages || 1)}
                onClick={() => setQuotesPage(quotesPage + 1)}
                className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={t("Next")}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {filter === "Commissions" && (
          <div>
            <div className="mb-4 p-4 rounded-lg">
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[200px] max-w-[350px]">
                  <DatePicker
                    label={t("From Date")}
                    value={dateFrom}
                    onChange={(date: Date) => {
                      if (date) {
                        // Convert Date object to YYYY-MM-DD string
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0",
                        );
                        const day = String(date.getDate()).padStart(2, "0");
                        setDateFrom(`${year}-${month}-${day}`);
                      } else {
                        setDateFrom("");
                      }
                      setCommissionsPage(1);
                    }}
                  />
                </div>

                <div className="flex-1 min-w-[200px] max-w-[350px]">
                  <DatePicker
                    label={t("To Date")}
                    value={dateTo}
                    onChange={(date: Date) => {
                      if (date) {
                        // Convert Date object to YYYY-MM-DD string
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0",
                        );
                        const day = String(date.getDate()).padStart(2, "0");
                        setDateTo(`${year}-${month}-${day}`);
                      } else {
                        setDateTo("");
                      }
                      setCommissionsPage(1);
                    }}
                  />
                </div>

                <button
                  onClick={() => {
                    setDateFrom("");
                    setDateTo("");
                    setCommissionsPage(1);
                  }}
                  disabled={!dateFrom && !dateTo}
                  className="btn-primary"
                >
                  {t("Clear Filters")}
                </button>
              </div>

              {/* Show active filter info */}
              {(dateFrom || dateTo) && (
                <div className="mt-2 text-sm text-gray-600">
                  {t("Showing commissions")}
                  {dateFrom &&
                    ` ${t("from")} ${formatDate(dateFrom)}`}
                  {dateTo &&
                    ` ${t("to")} ${formatDate(dateTo)}`}
                </div>
              )}
            </div>

            <CommissionsTable
              data={commissionsData?.items || []}
              loading={commissionsLoading}
              error={undefined}
            />

            {/* Summary Stats */}
            {commissionsData?.summary && (
              <div className="mt-4 p-6 bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {t("Commission Summary")}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {dateFrom || dateTo ? t("Filtered Period") : t("All Time")}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 border border-blue-200">
                    <div className="text-sm text-text-secondary mb-1">
                      {t("Total Commissions")}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {commissionsData.summary.totalCommissions}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {t("Total")}: {commissionsData.summary.totalAmount.toFixed(2)} CAD
                    </div>
                  </div>

                  <div className="bg-white p-4 border border-blue-200">
                    <div className="text-sm text-text-secondary mb-1">
                      {t("MGA Override Share")}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {commissionsData.summary.totalMgaShare.toFixed(2)} CAD
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {t("Your earnings from this agent")}
                    </div>
                  </div>

                  <div className="bg-white p-4 border border-blue-200">
                    <div className="text-sm text-text-secondary mb-1">
                      {t("Agent Share")}
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      {commissionsData.summary.totalAgentShare.toFixed(2)} CAD
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {t("Amount payable to agent")}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center p-4 space-x-2">
              <button
                disabled={commissionsPage === 1}
                onClick={() => setCommissionsPage(commissionsPage - 1)}
                className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={t("Previous")}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <RenderPageNumbers
                onPageChange={setCommissionsPage}
                totalPages={commissionsData?.totalPages || 1}
                page={commissionsPage}
              />

              <button
                disabled={commissionsPage >= (commissionsData?.totalPages || 1)}
                onClick={() => setCommissionsPage(commissionsPage + 1)}
                className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={t("Next")}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MGAAgentDetails;
