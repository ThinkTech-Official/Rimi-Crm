import { useEffect, useState } from "react";
import { useGetVerificationRequests } from "../../hooks/agent-verification/useGetVerificationRequests";
import { useVerifyAgent } from "../../hooks/agent-verification/useVerifyAgent";
import {
  CheckCircleIcon,
  ClockIcon,
  DocumentIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { API_BASE } from "../../utils/urls";
import VerifyAgentModal from "./VerifyAgentModal";

export default function VerificationRequests() {
  const [adminAssignments, setAdminAssignments] = useState<{
  agentCode: string;
  userType: string;
  commissionPercent: string;
  mgaOverridePercent: string;
}>({
  agentCode: '',
  userType: 'AGENT',
  commissionPercent: '',
  mgaOverridePercent: '',
});
  const [activeTab, setActiveTab] = useState<'unverified' | 'verified'>('unverified');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [validityDate, setValidityDate] = useState("");

  const {
    data: requests,
    loading,
    fetchRequests,
  } = useGetVerificationRequests();
  const { verifyAgent, loading: verifying } = useVerifyAgent();

  useEffect(() => {
    const status = activeTab === "unverified" ? "PENDING" : "VERIFIED";
    fetchRequests(status, currentPage, 10);
  }, [activeTab, currentPage, fetchRequests]);

  // const handleVerifyClick = (agent: any) => {
  //   setSelectedAgent(agent);
  //   // Set default validity date to 1 year from now
  //   const oneYearFromNow = new Date();
  //   oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  //   setValidityDate(oneYearFromNow.toISOString().split('T')[0]);
  //   setShowVerifyModal(true);
  // };


  const handleVerifyClick = (agent: any) => {
  setSelectedAgent(agent);
  
  // Check if this is a public registration (needs admin assignment)
  const needsAssignment = agent.agentCode?.startsWith('TEMP-') || !agent.commissionPercent;
  
  // Pre-fill existing values or defaults
  setAdminAssignments({
    agentCode: needsAssignment ? '' : (agent.agentCode || ''),
    userType: agent.userType || 'AGENT',
    commissionPercent: agent.commissionPercent?.toString() || '',
    mgaOverridePercent: agent.mgaOverridePercent?.toString() || '',
  });
  
  // Set default validity date to 1 year from now
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  setValidityDate(oneYearFromNow.toISOString().split('T')[0]);
  setShowVerifyModal(true);
};

  // const handleVerifySubmit = async () => {
  //   if (selectedAgent && validityDate) {
  //     const result = await verifyAgent(selectedAgent.id, validityDate);
  //     if (result) {
  //       setShowVerifyModal(false);
  //       setSelectedAgent(null);
  //       // Refresh the list
  //       fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
  //     }
  //   }
  // };


  const handleVerifySubmit = async () => {
  if (!selectedAgent || !validityDate) return;

  // Check if this agent needs admin assignment
  const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
  
  if (needsAssignment) {
    // Validate required fields
    if (!adminAssignments.agentCode || !adminAssignments.agentCode.trim()) {
      alert('Please provide an Agent Code');
      return;
    }
    if (!adminAssignments.commissionPercent || parseFloat(adminAssignments.commissionPercent) <= 0) {
      alert('Please provide a valid Commission Percentage');
      return;
    }
  }

  const payload: any = {
    agentId: selectedAgent.id,
    verificationValidTill: validityDate,
  };

  // Include admin assignments if needed
  if (needsAssignment) {
    payload.agentCode = adminAssignments.agentCode.trim();
    payload.userType = adminAssignments.userType;
    payload.commissionPercent = parseFloat(adminAssignments.commissionPercent);
    
    if (adminAssignments.userType === 'MGA' && adminAssignments.mgaOverridePercent) {
      payload.mgaOverridePercent = parseFloat(adminAssignments.mgaOverridePercent);
    }
  }

  const result = await verifyAgent(payload);
  if (result) {
    setShowVerifyModal(false);
    setSelectedAgent(null);
    setAdminAssignments({
      agentCode: '',
      userType: 'AGENT',
      commissionPercent: '',
      mgaOverridePercent: '',
    });
    // Refresh the list
    fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
  }
};

  const openDocument = (url: string | null) => {
    if (url) {
      window.open(`${API_BASE}${url}`, "_blank");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Verification Requests
      </h1>

      <div className="bg-white shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-2">
            <button
              onClick={() => {
                setActiveTab("unverified");
                setCurrentPage(1);
              }}
              className={`${
                activeTab === "unverified"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Unverified Requests
                {!loading && requests &&
                  activeTab === "unverified" &&
                  requests.total > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
                      {requests.total}
                    </span>
                  )}
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab("verified");
                setCurrentPage(1);
              }}
              className={`${
                activeTab === "verified"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                Verified Agents
                {!loading && requests && activeTab === "verified" && requests.total > 0 && (
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                    {requests.total}
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B00B7]"></div>
            </div>
          ) : requests && requests.data.length > 0 ? (
            <>
              <div className="space-y-4">
                {requests.data.map((agent) => (
                  <div
                    key={agent.id}
                    className="border border-inputBorder rounded-lg p-5 hover:shadow-sm transition-shadow duration-200 bg-white"
                  >
                    <div className="flex items-start justify-between gap-6">
                      {/* Left Section - Agent Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-gradient-to-br from-[#2B00B7]/10 to-[#2B00B7]/5 rounded-full p-3 flex-shrink-0">
                          <UserIcon className="h-7 w-7 text-[#2B00B7]" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                            {agent.firstName} {agent.lastName}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            <div className="flex items-start gap-1">
                              <span className="text-text-secondary min-w-[90px]">Email:</span>
                              <span className="text-gray-900 font-medium break-all">{agent.email}</span>
                            </div>
                            
                            <div className="flex items-start gap-1">
                              <span className="text-text-secondary min-w-[90px]">Agent Code:</span>
                              <span className="text-gray-900 font-medium font-mono">{agent.agentCode}</span>
                            </div>
                            
                            {agent.company && (
                              <div className="flex items-start gap-1">
                                <span className="text-text-secondary min-w-[90px]">Company:</span>
                                <span className="text-gray-900 font-medium">{agent.company}</span>
                              </div>
                            )}
                            
                            <div className="flex items-start gap-1">
                              <span className="text-text-secondary min-w-[90px]">User Type:</span>
                              <span className="text-gray-900 font-medium">
                                {agent.userType || "AGENT"}
                              </span>
                            </div>
                          </div>

                          {agent.isImportedAgent && (
                            <div className="mt-3">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                Imported Agent
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Section - Actions/Status */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        {activeTab === "unverified" ? (
                          <>
                            <div className="text-right">
                              <p className="text-xs text-text-secondary mb-1">Uploaded</p>
                              <p className="text-sm font-medium text-gray-700">
                                {agent.documentsUploadedAt
                                  ? format(
                                      new Date(agent.documentsUploadedAt),
                                      "MMM dd, yyyy"
                                    )
                                  : "Not uploaded"}
                              </p>
                            </div>

                            {(agent.docLink1 || agent.docLink2 || agent.docLink3) && (
                              <div className="flex items-center gap-2">
                                <span className="text- text-text-secondary">Documents:</span>
                                <div className="flex gap-1">
                                  {agent.docLink1 && (
                                    <button
                                      onClick={() => openDocument(agent.docLink1)}
                                      className="p-1.5 text-[#2B00B7] hover:bg-[#2B00B7]/10 rounded transition-colors cursor-pointer"
                                      title="View Document 1"
                                    >
                                      <DocumentIcon className="h-5 w-5" />
                                    </button>
                                  )}
                                  {agent.docLink2 && (
                                    <button
                                      onClick={() => openDocument(agent.docLink2)}
                                      className="p-1.5 text-[#2B00B7] hover:bg-[#2B00B7]/10 rounded transition-colors cursor-pointer"
                                      title="View Document 2"
                                    >
                                      <DocumentIcon className="h-5 w-5" />
                                    </button>
                                  )}
                                  {agent.docLink3 && (
                                    <button
                                      onClick={() => openDocument(agent.docLink3)}
                                      className="p-1.5 text-[#2B00B7] hover:bg-[#2B00B7]/10 rounded transition-colors cursor-pointer"
                                      title="View Document 3"
                                    >
                                      <DocumentIcon className="h-5 w-5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            <button
                              onClick={() => handleVerifyClick(agent)}
                              className="px-4 py-2 bg-primary hover:bg-[#2309A1] text-white cursor-pointer"
                            >
                              Verify Agent
                            </button>
                          </>
                        ) : (
                          <div className=" border border-green-400 rounded-sm px-4 py-3 text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircleIcon className="h-5 w-5 text-green-600" />
                              <p className="text-text-primary font-semibold text-sm">Verified</p>
                            </div>
                            <div className="space-y-1">
                              <div>
                                <p className="text-xs text-text-secondary">Valid until</p>
                                <p className="text-sm font-medium text-text-primary">
                                  {agent.verificationValidTill
                                    ? format(
                                        new Date(agent.verificationValidTill),
                                        "MMM dd, yyyy"
                                      )
                                    : "N/A"}
                                </p>
                              </div>
                              <div className="pt-1 border-t border-green-200">
                                <p className="text-xs text-text-secondary">Verified on</p>
                                <p className="text-sm font-medium text-text-primary">
                                  {agent.verifiedAt
                                    ? format(
                                        new Date(agent.verifiedAt),
                                        "MMM dd, yyyy"
                                      )
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {requests.totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!requests.hasPrevPage}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {requests.totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!requests.hasNextPage}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-text-secondary">
              No {activeTab === "unverified" ? "pending" : "verified"}{" "}
              verification requests
            </div>
          )}
        </div>

        {/* Verify Modal */}
        {/* {showVerifyModal && selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Verify Agent</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Agent Details:</p>
                  <p className="font-medium">{selectedAgent.firstName} {selectedAgent.lastName}</p>
                  <p className="text-sm text-gray-500">{selectedAgent.email}</p>
                  <p className="text-sm text-gray-500">Code: {selectedAgent.agentCode}</p>
                  <p className="text-sm text-gray-500">Type: {selectedAgent.userType || 'AGENT'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Valid Until
                  </label>
                  <input
                    type="date"
                    value={validityDate}
                    onChange={(e) => setValidityDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleVerifySubmit}
                    disabled={verifying}
                    className="flex-1 bg-[#2B00B7] text-white px-4 py-2 rounded-md hover:bg-[#1e007f] disabled:opacity-50"
                  >
                    {verifying ? 'Verifying...' : 'Verify Agent'}
                  </button>
                  <button
                    onClick={() => {
                      setShowVerifyModal(false);
                      setSelectedAgent(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}

          {/* NEWWW Verify Modal */}
{showVerifyModal && selectedAgent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-medium mb-4">Verify Agent</h3>
      
      <div className="space-y-4">
        {/* Agent Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Agent Details:</p>
          <div className="space-y-1">
            <p className="font-medium text-gray-900">
              {selectedAgent.firstName} {selectedAgent.lastName}
            </p>
            <p className="text-sm text-gray-600">{selectedAgent.email}</p>
            {selectedAgent.company && (
              <p className="text-sm text-gray-600">Company: {selectedAgent.company}</p>
            )}
            <p className="text-sm text-gray-600">
              Current Code: {selectedAgent.agentCode}
              {selectedAgent.agentCode?.startsWith('TEMP-') && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                  Temporary
                </span>
              )}
            </p>
            <p className="text-sm text-gray-600">
              Status: <span className="font-medium">{selectedAgent.status}</span>
            </p>
          </div>
        </div>

        {/* Admin Assignment Section (if needed) */}
        {(selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent) && (
          <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg">
            <div className="flex items-start gap-2 mb-3">
              <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Admin Assignment Required
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  This is a public registration. Please assign credentials before verification.
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              {/* Agent Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agent Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={adminAssignments.agentCode}
                  onChange={(e) => setAdminAssignments({
                    ...adminAssignments,
                    agentCode: e.target.value
                  })}
                  placeholder="Enter unique agent code (e.g., AG12345)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be the agent's unique identifier
                </p>
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Type
                </label>
                <select
                  value={adminAssignments.userType}
                  onChange={(e) => setAdminAssignments({
                    ...adminAssignments,
                    userType: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
                >
                  <option value="AGENT">AGENT</option>
                  <option value="MGA">MGA</option>
                </select>
              </div>

              {/* Commission Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commission Percentage <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={adminAssignments.commissionPercent}
                    onChange={(e) => setAdminAssignments({
                      ...adminAssignments,
                      commissionPercent: e.target.value
                    })}
                    placeholder="e.g., 15.50"
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Agent's commission on each policy
                </p>
              </div>

              {/* MGA Override (if userType is MGA) */}
              {adminAssignments.userType === 'MGA' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MGA Override Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={adminAssignments.mgaOverridePercent}
                      onChange={(e) => setAdminAssignments({
                        ...adminAssignments,
                        mgaOverridePercent: e.target.value
                      })}
                      placeholder="e.g., 5.00"
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    MGA's share from sub-agent commissions
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Verification Valid Until */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Valid Until <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={validityDate}
            onChange={(e) => setValidityDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Agent verification will expire after this date
          </p>
        </div>

        {/* Documents Preview */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
          <div className="flex flex-wrap gap-2">
            {selectedAgent.docLink1 && (
              <button
                onClick={() => openDocument(selectedAgent.docLink1)}
                className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
              >
                <DocumentIcon className="h-4 w-4" />
                Doc 1
              </button>
            )}
            {selectedAgent.docLink2 && (
              <button
                onClick={() => openDocument(selectedAgent.docLink2)}
                className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
              >
                <DocumentIcon className="h-4 w-4" />
                Doc 2
              </button>
            )}
            {selectedAgent.docLink3 && (
              <button
                onClick={() => openDocument(selectedAgent.docLink3)}
                className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
              >
                <DocumentIcon className="h-4 w-4" />
                Doc 3
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6 pt-4 border-t">
          <button
            onClick={handleVerifySubmit}
            disabled={verifying}
            className="flex-1 bg-[#2B00B7] text-white px-4 py-2.5 rounded-md hover:bg-[#1e007f] disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {verifying ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify & Activate Agent'
            )}
          </button>
          <button
            onClick={() => {
              setShowVerifyModal(false);
              setSelectedAgent(null);
              setAdminAssignments({
                agentCode: '',
                userType: 'AGENT',
                commissionPercent: '',
                mgaOverridePercent: '',
              });
            }}
            disabled={verifying}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}