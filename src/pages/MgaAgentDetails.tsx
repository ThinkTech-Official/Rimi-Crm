import { useState } from "react";
import { FaUser, FaBan, FaCheckCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { 
  useMgaAgentDetails, 
  useMgaAgentPolicies, 
  useMgaAgentQuotes,
  useMgaAgentStatusUpdate,
  useMgaAgentCommissions  
} from "../hooks/mga-dashboard";
import { PoliciesTable, QuotesTable } from "../components/Tables";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Spinner from "../components/Spinner";
import { CommissionsTable } from "../components/CommissionsTable";

const MGAAgentDetails = () => {
  const navigate = useNavigate();
  const { agentCode } = useParams<{ agentCode: string }>();
  
  // State for tab filtering and pagination
  const [filter, setFilter] = useState("Policies");
  const [policiesPage, setPoliciesPage] = useState(1);
  const [quotesPage, setQuotesPage] = useState(1);
  const limit = 10;

    const [commissionsPage, setCommissionsPage] = useState(1);

  // Fetch agent details using existing hook
  const { data: agentData, loading: detailsLoading, error: detailsError } = useMgaAgentDetails(agentCode || "");
  
  // Fetch policies (only when Policies tab is active)
  const { data: policiesData, loading: policiesLoading } = useMgaAgentPolicies(
    agentCode || "", 
    policiesPage, 
    limit
  );
  
  // Fetch quotes (only when Quotes tab is active)
  const { data: quotesData, loading: quotesLoading } = useMgaAgentQuotes(
    agentCode || "", 
    quotesPage, 
    limit
  );

  // Status update hook
  const { updateAgentStatus, loading: statusLoading } = useMgaAgentStatusUpdate();
  const [statusSuccess, setStatusSuccess] = useState(false);


  const { data: commissionsData, loading: commissionsLoading } = useMgaAgentCommissions(
  agentCode || "",
  commissionsPage,
  limit
);



  const toggleTableFilter = (option: string) => setFilter(option);

  // Handle status toggle
  const handleStatusToggle = async () => {
    if (!agentData) return;
    
    const newStatus = agentData.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus === 'ACTIVE' ? 'activate' : 'suspend'} this agent?`
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

  // Pagination helpers
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

  // Handle loading state
  if (detailsLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner className="w-10 h-10" />
        <p>Loading agent details...</p>
      </div>
    );
  }

  // Handle error state
  if (detailsError || !agentData) {
    return (
      <div className="px-8">
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <div className="text-red-500 text-lg">
            Failed to load agent details
          </div>
          <button 
            onClick={() => navigate('/mga/dashboard')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pb-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/mga/dashboard')}
        className="mb-4 text-primary flex items-center gap-2 cursor-pointer"
      >
        <ChevronLeftIcon className="w-4 h-4" /> Back to Dashboard
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
                <span className="text-text-primary font-semibold">Email:</span>
                <span className="text-text-secondary">{agentData.email}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Agent Code:</span>
                <span className="text-text-secondary font-mono">{agentData.agentCode}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Status:</span>
                <span className={`font-semibold px-2 py-0.5 rounded text-sm ${
                  agentData.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {agentData.status}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Commission:</span>
                <span className="text-text-secondary font-semibold">{agentData.commissionPercent}%</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Company:</span>
                <span className="text-text-secondary">{agentData.company || 'N/A'}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Joined:</span>
                <span className="text-text-secondary">{agentData.joinedDate}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Valid Until:</span>
                <span className="text-text-secondary">{agentData.validity}</span>
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
          ✓ Agent status updated successfully! Refreshing...
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
            className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${
              filter === "Policies"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Policies ({policiesData?.total || 0})
          </button>
          <button
            onClick={() => toggleTableFilter("Quotes")}
            className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${
              filter === "Quotes"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Quotes ({quotesData?.total || 0})
          </button>
          <button
  onClick={() => toggleTableFilter("Commissions")}
  className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${
    filter === "Commissions"
      ? "text-primary border-b-2 border-primary"
      : "text-gray-500 hover:text-gray-700"
  }`}
>
  Commissions ({commissionsData?.total || 0})
</button>
        </div>
      </div>

      {/* Tables with Pagination */}
      <div className="mt-6">
        {filter === "Policies" && (
          <div>
            {policiesLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner className="w-8 h-8" />
              </div>
            ) : (
              <>
                <PoliciesTable
                  data={policiesData?.items || []}
                  loading={false}
                  pError={null}
                />
                
                {/* Pagination */}
                {policiesData && policiesData.totalPages > 1 && (
                  <div className="flex items-center justify-center p-4 space-x-2">
                    <button
                      disabled={policiesPage === 1}
                      onClick={() => setPoliciesPage(policiesPage - 1)}
                      className={`px-2 py-[10px] rounded ${
                        policiesPage === 1 
                          ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed" 
                          : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                      }`}
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    
                    {generatePageNumbers(policiesPage, policiesData.totalPages).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPoliciesPage(pageNum)}
                        className={`px-3 py-2 cursor-pointer rounded ${
                          policiesPage === pageNum
                            ? "bg-primary text-white"
                            : "bg-[#F1F0F2] text-[#808080] hover:bg-[#E1E0E2]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    
                    <button
                      disabled={policiesPage === policiesData.totalPages}
                      onClick={() => setPoliciesPage(policiesPage + 1)}
                      className={`px-2 py-[10px] rounded ${
                        policiesPage === policiesData.totalPages
                          ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed"
                          : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                      }`}
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        {filter === "Quotes" && (
          <div>
            {quotesLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner className="w-8 h-8" />
              </div>
            ) : (
              <>
                <QuotesTable
                  data={quotesData?.items || []}
                  loading={false}
                  qError={null}
                />
                
                {/* Pagination */}
                {quotesData && quotesData.totalPages > 1 && (
                  <div className="flex items-center justify-center p-4 space-x-2">
                    <button
                      disabled={quotesPage === 1}
                      onClick={() => setQuotesPage(quotesPage - 1)}
                      className={`px-2 py-[10px] rounded ${
                        quotesPage === 1 
                          ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed" 
                          : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                      }`}
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    
                    {generatePageNumbers(quotesPage, quotesData.totalPages).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setQuotesPage(pageNum)}
                        className={`px-3 py-2 cursor-pointer rounded ${
                          quotesPage === pageNum
                            ? "bg-primary text-white"
                            : "bg-[#F1F0F2] text-[#808080] hover:bg-[#E1E0E2]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    
                    <button
                      disabled={quotesPage === quotesData.totalPages}
                      onClick={() => setQuotesPage(quotesPage + 1)}
                      className={`px-2 py-[10px] rounded ${
                        quotesPage === quotesData.totalPages
                          ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed"
                          : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
                      }`}
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}



        {filter === "Commissions" && (
  <div>
    {commissionsLoading ? (
      <div className="flex justify-center items-center py-20">
        <Spinner className="w-8 h-8" />
      </div>
    ) : (
      <>
        {/* Summary Stats */}
        {/* {commissionsData?.summary && (
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600 font-medium">Total Commissions</div>
              <div className="text-2xl font-bold text-blue-900">
                {commissionsData.summary.totalCommissions}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-600 font-medium">Total Amount</div>
              <div className="text-2xl font-bold text-purple-900">
                ${commissionsData.summary.totalAmount.toFixed(2)}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 font-medium">Agent Share</div>
              <div className="text-2xl font-bold text-green-900">
                ${commissionsData.summary.totalAgentShare.toFixed(2)}
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-sm text-yellow-600 font-medium">MGA Share</div>
              <div className="text-2xl font-bold text-yellow-900">
                ${commissionsData.summary.totalMgaShare.toFixed(2)}
              </div>
            </div>
          </div>
        )} */}

        <CommissionsTable
          data={commissionsData?.items || []}
          loading={false}
          error={null}
        />

        {/* Pagination */}
        {commissionsData && commissionsData.totalPages > 1 && (
          <div className="flex items-center justify-center p-4 space-x-2">
            <button
              disabled={commissionsPage === 1}
              onClick={() => setCommissionsPage(commissionsPage - 1)}
              className={`px-2 py-[10px] rounded ${
                commissionsPage === 1 
                  ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed" 
                  : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            
            {generatePageNumbers(commissionsPage, commissionsData.totalPages).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCommissionsPage(pageNum)}
                className={`px-3 py-2 cursor-pointer rounded ${
                  commissionsPage === pageNum
                    ? "bg-primary text-white"
                    : "bg-[#F1F0F2] text-[#808080] hover:bg-[#E1E0E2]"
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              disabled={commissionsPage === commissionsData.totalPages}
              onClick={() => setCommissionsPage(commissionsPage + 1)}
              className={`px-2 py-[10px] rounded ${
                commissionsPage === commissionsData.totalPages
                  ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed"
                  : "bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer hover:bg-[#BBBBBB]"
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </>
    )}
  </div>
)}


      </div>
    </div>
  );
};

export default MGAAgentDetails;