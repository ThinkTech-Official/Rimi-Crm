import React, { useEffect, useState } from 'react';
import { useGetVerificationRequests } from '../../hooks/agent-verification/useGetVerificationRequests';
import { useVerifyAgent } from '../../hooks/agent-verification/useVerifyAgent';
import { CheckCircleIcon, ClockIcon, DocumentIcon, UserIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { API_BASE } from '../../utils/urls';

export default function VerificationRequests() {
  const [activeTab, setActiveTab] = useState<'unverified' | 'verified'>('unverified');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [validityDate, setValidityDate] = useState('');
  
  const { data: requests, loading, fetchRequests } = useGetVerificationRequests();
  const { verifyAgent, loading: verifying } = useVerifyAgent();

  useEffect(() => {
    const status = activeTab === 'unverified' ? 'PENDING' : 'VERIFIED';
    fetchRequests(status, currentPage, 10);
  }, [activeTab, currentPage, fetchRequests]);

  const handleVerifyClick = (agent: any) => {
    setSelectedAgent(agent);
    // Set default validity date to 1 year from now
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    setValidityDate(oneYearFromNow.toISOString().split('T')[0]);
    setShowVerifyModal(true);
  };

  const handleVerifySubmit = async () => {
    if (selectedAgent && validityDate) {
      const result = await verifyAgent(selectedAgent.id, validityDate);
      if (result) {
        setShowVerifyModal(false);
        setSelectedAgent(null);
        // Refresh the list
        fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
      }
    }
  };

  const openDocument = (url: string | null) => {
    if (url) {
      window.open(`${API_BASE}${url}`, '_blank');
    }
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Verification Requests</h1>
      
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => {
                setActiveTab('unverified');
                setCurrentPage(1);
              }}
              className={`${
                activeTab === 'unverified'
                  ? 'border-[#2B00B7] text-[#2B00B7]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Unverified Requests
                {requests && activeTab === 'unverified' && requests.total > 0 && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
                    {requests.total}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab('verified');
                setCurrentPage(1);
              }}
              className={`${
                activeTab === 'verified'
                  ? 'border-[#2B00B7] text-[#2B00B7]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
            >
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                Verified Agents
                {requests && activeTab === 'verified' && requests.total > 0 && (
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
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 rounded-full p-3">
                          <UserIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {agent.firstName} {agent.lastName}
                          </h3>
                          <div className="mt-1 text-sm text-gray-500 space-y-1">
                            <p>Email: {agent.email}</p>
                            <p>Agent Code: {agent.agentCode}</p>
                            {agent.company && <p>Company: {agent.company}</p>}
                            <p>User Type: <span className="font-medium">{agent.userType || 'AGENT'}</span></p>
                            {agent.isImportedAgent && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                Imported Agent
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {activeTab === 'unverified' ? (
                          <>
                            <p className="text-sm text-gray-500 mb-2">
                              Uploaded: {agent.documentsUploadedAt 
                                ? format(new Date(agent.documentsUploadedAt), 'MMM dd, yyyy')
                                : 'Not uploaded'}
                            </p>
                            <div className="flex justify-end space-x-2 mb-3">
                              {agent.docLink1 && (
                                <button
                                  onClick={() => openDocument(agent.docLink1)}
                                  className="text-[#2B00B7] hover:text-[#1e007f]"
                                  title="View Document 1"
                                >
                                  <DocumentIcon className="h-5 w-5" />
                                </button>
                              )}
                              {agent.docLink2 && (
                                <button
                                  onClick={() => openDocument(agent.docLink2)}
                                  className="text-[#2B00B7] hover:text-[#1e007f]"
                                  title="View Document 2"
                                >
                                  <DocumentIcon className="h-5 w-5" />
                                </button>
                              )}
                              {agent.docLink3 && (
                                <button
                                  onClick={() => openDocument(agent.docLink3)}
                                  className="text-[#2B00B7] hover:text-[#1e007f]"
                                  title="View Document 3"
                                >
                                  <DocumentIcon className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                            <button
                              onClick={() => handleVerifyClick(agent)}
                              className="bg-[#2B00B7] text-white px-4 py-2 rounded hover:bg-[#1e007f] text-sm"
                            >
                              Verify Agent
                            </button>
                          </>
                        ) : (
                          <div className="text-sm">
                            <p className="text-green-600 font-medium mb-1">Verified</p>
                            <p className="text-gray-500">
                              Valid until: {agent.verificationValidTill 
                                ? format(new Date(agent.verificationValidTill), 'MMM dd, yyyy')
                                : 'N/A'}
                            </p>
                            <p className="text-gray-500">
                              Verified on: {agent.verifiedAt 
                                ? format(new Date(agent.verifiedAt), 'MMM dd, yyyy')
                                : 'N/A'}
                            </p>
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
            <div className="text-center py-8 text-gray-500">
              No {activeTab === 'unverified' ? 'pending' : 'verified'} verification requests
            </div>
          )}
        </div>

        {/* Verify Modal */}
        {showVerifyModal && selectedAgent && (
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
        )}
      </div>
    </div>
  );
}