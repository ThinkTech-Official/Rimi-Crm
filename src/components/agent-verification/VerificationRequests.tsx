import React, { useEffect, useState } from 'react';
import { useGetVerificationRequests } from '../../hooks/agent-verification/useGetVerificationRequests';
import { useVerifyAgent } from '../../hooks/agent-verification/useVerifyAgent';
import { CheckCircleIcon, ClockIcon, DocumentIcon, UserIcon, ExclamationTriangleIcon, XMarkIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { API_BASE } from '../../utils/urls';
import { useMgaCodes, MgaOption } from '../../hooks/agent-verification/useMgaCodes'; 
import { VerifiedAgentsTable } from './VerifiedAgentsTable';
import useNotification from '../../hooks/useNotification';




const getDocumentLabel = (docType: string | null): string => {
  const labels: Record<string, string> = {
    'insurance_license': 'Insurance License',
    'eo_insurance': 'E&O Insurance',
    'bank_details': 'Bank Details',
    'agency_agreement': 'Agency Agreement',
  };
  return docType && labels[docType] ? labels[docType] : 'Document';
};



export default function VerificationRequests() {
  const { NotificationComponent, triggerNotification } = useNotification();
  const [adminAssignments, setAdminAssignments] = useState<{
    agentCode: string;
    userType: string;
    commissionPercent: string;
    mgaOverridePercent: string;
    mgaId: string;
  }>({
    agentCode: '',
    userType: 'AGENT',
    commissionPercent: '',
    mgaOverridePercent: '',
    mgaId: '',
  });

  const [agentCodeAvailability, setAgentCodeAvailability] = useState<{
    status: 'idle' | 'checking' | 'available' | 'taken';
    lastChecked: string;
  }>({ status: 'idle', lastChecked: '' });

  const [mgaSearch, setMgaSearch] = useState('');
  const { mgas, loading: mgasLoading, error: mgasError } = useMgaCodes(mgaSearch);

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
    
    const needsAssignment = agent.agentCode?.startsWith('TEMP-') || !agent.commissionPercent;
    
    setAdminAssignments({
      agentCode: needsAssignment ? '' : (agent.agentCode || ''),
      userType: agent.userType || 'AGENT',
      commissionPercent: agent.commissionPercent?.toString() || '',
      mgaOverridePercent: agent.mgaOverridePercent?.toString() || '',
      mgaId: '',
    });
    
    setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
    setMgaSearch('');
    
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    setValidityDate(oneYearFromNow.toISOString().split('T')[0]);
    setShowVerifyModal(true);
  };

  const handleCheckAgentCode = async () => {
    if (!adminAssignments.agentCode || adminAssignments.agentCode.trim().length === 0) {
      return;
    }

    setAgentCodeAvailability({ status: 'checking', lastChecked: '' });

    try {
      const response = await fetch(
        `${API_BASE}/auth/check?code=${encodeURIComponent(adminAssignments.agentCode)}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      setAgentCodeAvailability({
        status: data.available ? 'available' : 'taken',
        lastChecked: adminAssignments.agentCode,
      });
    } catch (error) {
      triggerNotification({
        type: 'error',
        message: 'Failed to check agent code availability. Please try again.',
        duration: 5000,
      });
      setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
    }
  };

//   const handleVerifySubmit = async () => {
//     if (!selectedAgent || !validityDate) return;

//     const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
    
//     if (needsAssignment) {
//       if (!adminAssignments.agentCode || !adminAssignments.agentCode.trim()) {
//         alert('Please provide an Agent Code');
//         return;
//       }

//       if (agentCodeAvailability.lastChecked !== adminAssignments.agentCode || 
//           agentCodeAvailability.status !== 'available') {
//         alert('Please check agent code availability first');
//         return;
//       }

//       if (!adminAssignments.commissionPercent || parseFloat(adminAssignments.commissionPercent) <= 0) {
//         alert('Please provide a valid Commission Percentage');
//         return;
//       }

//       // if (selectedAgent.applicantType === 'under_mga' && !adminAssignments.mgaId) {
//       //   alert('Please select an MGA for this agent');
//       //   return;
//       // }

//       if (selectedAgent.applicantType === 'under_mga' && 
//     selectedAgent.mgaType === 'other' && 
//     !adminAssignments.mgaId) {
//   alert('Please select an MGA for this agent');
//   return;
// }
      
//     }

//     const payload: any = {
//       agentId: selectedAgent.id,
//       verificationValidTill: validityDate,
//     };

//     if (needsAssignment) {
//       payload.agentCode = adminAssignments.agentCode.trim();
//       payload.userType = adminAssignments.userType;
//       payload.commissionPercent = parseFloat(adminAssignments.commissionPercent);
      
//       // if (selectedAgent.applicantType === 'under_mga' && adminAssignments.mgaId) {
//       //   payload.mgaId = adminAssignments.mgaId; //This is now the UUID
        
//       //   // ADD DEBUG LOGGING
//       //   console.log('═══════════════════════════════════');
//       //   console.log('Sending MGA Assignment');
//       //   console.log('mgaId:', payload.mgaId);
//       //   console.log('mgaId type:', typeof payload.mgaId);
//       //   console.log('Is UUID format:', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(payload.mgaId));
//       //   console.log('═══════════════════════════════════');
//       // }

//       //Only include mgaId for "other" type, NOT for WFG
// if (selectedAgent.applicantType === 'under_mga' && 
//     selectedAgent.mgaType === 'other' && 
//     adminAssignments.mgaId) {
//   payload.mgaId = adminAssignments.mgaId;
  
//   console.log('═══════════════════════════════════');
//   console.log(' Sending MGA Assignment');
//   console.log('mgaId:', payload.mgaId);
//   console.log('═══════════════════════════════════');
// }
      
//       if (adminAssignments.userType === 'MGA' && adminAssignments.mgaOverridePercent) {
//         payload.mgaOverridePercent = parseFloat(adminAssignments.mgaOverridePercent);
//       }
//     }

//     const result = await verifyAgent(payload);
//     if (result) {
//       setShowVerifyModal(false);
//       setSelectedAgent(null);
//       setAdminAssignments({
//         agentCode: '',
//         userType: 'AGENT',
//         commissionPercent: '',
//         mgaOverridePercent: '',
//         mgaId: '',
//       });
//       setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
//       setMgaSearch('');
//       fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
//     }
//   };



const handleVerifySubmit = async () => {
  if (!selectedAgent || !validityDate) return;

  const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
  const isWfgAgent = selectedAgent.applicantType === 'wfg';
  
  if (needsAssignment) {
    if (!adminAssignments.agentCode || !adminAssignments.agentCode.trim()) {
      alert('Please provide an Agent Code');
      return;
    }

    if (agentCodeAvailability.lastChecked !== adminAssignments.agentCode || 
        agentCodeAvailability.status !== 'available') {
      alert('Please check agent code availability first');
      return;
    }

    //  Skip commission validation for WFG agents
    if (!isWfgAgent && (!adminAssignments.commissionPercent || parseFloat(adminAssignments.commissionPercent) <= 0)) {
      alert('Please provide a valid Commission Percentage');
      return;
    }

    // Only require MGA assignment for "under_mga" with "other" type
    if (selectedAgent.applicantType === 'under_mga' && 
        selectedAgent.mgaType === 'other' && 
        !adminAssignments.mgaId) {
      alert('Please select an MGA for this agent');
      return;
    }
  }

  const payload: any = {
    agentId: selectedAgent.id,
    verificationValidTill: validityDate,
  };

  if (needsAssignment) {
    payload.agentCode = adminAssignments.agentCode.trim();
    payload.userType = adminAssignments.userType;
    
    // Set commission to 0 for WFG agents, otherwise use admin input
    if (isWfgAgent) {
      payload.commissionPercent = 0;
    } else {
      payload.commissionPercent = parseFloat(adminAssignments.commissionPercent);
    }
    
    // Only include mgaId for "other" type, NOT for WFG
    if (selectedAgent.applicantType === 'under_mga' && 
        selectedAgent.mgaType === 'other' && 
        adminAssignments.mgaId) {
      payload.mgaId = adminAssignments.mgaId;
      
      console.log('═══════════════════════════════════');
      console.log('Sending MGA Assignment');
      console.log('mgaId:', payload.mgaId);
      console.log('═══════════════════════════════════');
    }
    
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
      mgaId: '',
    });
    setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
    setMgaSearch('');
    fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
  }
};


  const openDocument = (url: string | null) => {
    if (url) {
      window.open(`${API_BASE}${url}`, '_blank');
    }
  };

  // const getApplicantTypeBadge = (agent: any) => {
  //   if (!agent.applicantType) return null;

  //   if (agent.applicantType === 'independent') {
  //     return (
  //       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  //         Independent Agent
  //       </span>
  //     );
  //   }

  //   if (agent.applicantType === 'under_mga' && agent.mgaType === 'wfg') {
  //     return (
  //       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
  //         WFG Agent
  //       </span>
  //     );
  //   }

  //   if (agent.applicantType === 'under_mga' && agent.mgaType === 'other') {
  //     return (
  //       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
  //         Agent under MGA
  //       </span>
  //     );
  //   }

  //   return null;
  // };




  const getApplicantTypeBadge = (agent: any) => {
  if (!agent.applicantType) return null;

  if (agent.applicantType === 'independent') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Independent Agent
      </span>
    );
  }

  // Support new structure first
  if (agent.applicantType === 'wfg') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        WFG Agent
      </span>
    );
  }

  // Support old structure for backward compatibility
  if (agent.applicantType === 'under_mga' && agent.mgaType === 'wfg') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        WFG Agent (Legacy)
      </span>
    );
  }

  if (agent.applicantType === 'under_mga' && agent.mgaType === 'other') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
        Agent under MGA
      </span>
    );
  }

  return null;
};


  // const hasDocuments = (agent: any) => {
  //   return agent.applicantType === 'independent' || 
  //          (agent.applicantType === 'under_mga' && agent.mgaType === 'other');
  // };

  const hasDocuments = (agent: any) => {
  // only independent agents have documents
  if (agent.applicantType === 'independent') return true;
  
  // Old structure fOr backward compatibility
  if (agent.applicantType === 'under_mga' && agent.mgaType === 'other') return true;
  
  return false;
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
              } whitespace-nowrap py-4 px-1 sm:px-3 border-b-2 font-medium text-sm transition-colors cursor-pointer`}
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
              } whitespace-nowrap py-4 px-1 sm:px-3 border-b-2 font-medium text-sm transition-colors cursor-pointer`}
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
        <div className="p-3 sm:p-6">
          {activeTab === "verified" ? (
            <VerifiedAgentsTable
              data={requests?.data || []}
              loading={loading}
              totalPages={requests?.totalPages || 1}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          ) : (
            // Unverified Agents
            <>
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
                        className="border border-inputBorder rounded-lg p-4 sm:p-5 hover:shadow-sm transition-shadow duration-200 bg-white"
                      >
                        {/* Mobile Layout - Stacked */}
                        <div className="flex flex-col gap-4 md:hidden">
                          {/* Top Section - Agent Info */}
                          <div className="flex items-start gap-3">
                            <div className="bg-gradient-to-br from-[#2B00B7]/10 to-[#2B00B7]/5 rounded-full p-2.5 flex-shrink-0">
                              <UserIcon className="h-6 w-6 text-[#2B00B7]" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="text-base font-semibold text-gray-900 capitalize">
                                  {agent.firstName} {agent.lastName}
                                </h3>
                                {getApplicantTypeBadge(agent)}
                              </div>
                              
                              <div className="grid grid-cols-1 gap-y-1.5">
                                <div className="flex items-start gap-1 text-sm">
                                  <span className="text-text-secondary min-w-[80px]">Email:</span>
                                  <span className="text-gray-900 font-medium break-all">{agent.email}</span>
                                </div>
                                
                                <div className="flex items-start gap-1 text-sm">
                                  <span className="text-text-secondary min-w-[80px]">Agent Code:</span>
                                  <span className="text-gray-900 font-medium font-mono">{agent.agentCode}</span>
                                </div>
                                
                                {agent.company && (
                                  <div className="flex items-start gap-1 text-sm">
                                    <span className="text-text-secondary min-w-[80px]">Company:</span>
                                    <span className="text-gray-900 font-medium">{agent.company}</span>
                                  </div>
                                )}

                                {agent.applicantType === 'under_mga' && agent.mgaType === 'wfg' && agent.wfgCode && (
                                  <div className="flex items-start gap-1 text-sm">
                                    <span className="text-text-secondary min-w-[80px]">WFG Code:</span>
                                    <span className="text-purple-700 font-medium font-mono">{agent.wfgCode}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-start gap-1 text-sm">
                                  <span className="text-text-secondary min-w-[80px]">User Type:</span>
                                  <span className="text-gray-900 font-medium">
                                    {agent.userType || "AGENT"}
                                  </span>
                                </div>
                              </div>

                              {agent.isImportedAgent && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                    Imported Agent
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bottom Section - Upload Date, Documents & Action */}
                          <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
                            <div className="flex flex-col gap-3">
                              <div>
                                <p className="text-xs text-text-secondary mb-0.5">Uploaded</p>
                                <p className="text-sm font-medium text-gray-700">
                                  {agent.documentsUploadedAt
                                    ? format(new Date(agent.documentsUploadedAt), "MMM dd, yyyy")
                                    : agent.applicantType === 'under_mga' && agent.mgaType === 'wfg'
                                    ? 'WFG Code Provided'
                                    : 'Not uploaded'}
                                </p>
                              </div>

                              {hasDocuments(agent) && (
                                <div className="flex items-center gap-2">
                                  <span className="text-text-secondary text-sm">Documents:</span>
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
                            </div>
                            
                            <button
                              onClick={() => handleVerifyClick(agent)}
                              className="w-full px-4 py-2 bg-primary hover:bg-[#2309A1] text-white cursor-pointer rounded transition-colors"
                            >
                              Verify Agent
                            </button>
                          </div>
                        </div>

                        {/* Desktop/Tablet Layout - Side by Side */}
                        <div className="hidden md:flex md:flex-row items-start justify-between gap-6">
                          {/* Left Section - Agent Info */}
                          <div className="flex items-start gap-4 flex-1">
                            <div className="bg-gradient-to-br from-[#2B00B7]/10 to-[#2B00B7]/5 rounded-full p-3 flex-shrink-0">
                              <UserIcon className="h-7 w-7 text-[#2B00B7]" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                  {agent.firstName} {agent.lastName}
                                </h3>
                                {getApplicantTypeBadge(agent)}
                              </div>
                              
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2">
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

                                {agent.applicantType === 'under_mga' && agent.mgaType === 'wfg' && agent.wfgCode && (
                                  <div className="flex items-start gap-1">
                                    <span className="text-text-secondary min-w-[90px]">WFG Code:</span>
                                    <span className="text-purple-700 font-medium font-mono">{agent.wfgCode}</span>
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

                          {/* Right Section - Actions */}
                          <div className="flex flex-col items-end gap-3 flex-shrink-0">
                            <div className="text-right">
                              <p className="text-xs text-text-secondary mb-1">Uploaded</p>
                              <p className="text-sm font-medium text-gray-700">
                                {agent.documentsUploadedAt
                                  ? format(new Date(agent.documentsUploadedAt), "MMM dd, yyyy")
                                  : agent.applicantType === 'under_mga' && agent.mgaType === 'wfg'
                                  ? 'WFG Code Provided'
                                  : 'Not uploaded'}
                              </p>
                            </div>

                            {hasDocuments(agent) && (
                              <div className="flex items-center gap-2">
                                <span className="text-text-secondary">Documents:</span>
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
                              className="px-4 py-2 bg-primary hover:bg-[#2309A1] text-white cursor-pointer rounded transition-colors"
                            >
                              Verify Agent
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination for Unverified */}
                  {requests.totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={!requests.hasPrevPage}
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-gray-700">
                          Page {currentPage} of {requests.totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={!requests.hasNextPage}
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-text-secondary">
                  No pending verification requests
                </div>
              )}
            </>
          )}
        </div>

        {showVerifyModal && selectedAgent && (
          <VerificationModal
            selectedAgent={selectedAgent}
            adminAssignments={adminAssignments}
            setAdminAssignments={setAdminAssignments}
            agentCodeAvailability={agentCodeAvailability}
            handleCheckAgentCode={handleCheckAgentCode}
            mgaSearch={mgaSearch}
            setMgaSearch={setMgaSearch}
            mgas={mgas} // Now passing MgaOption[] instead of string[]
            mgasLoading={mgasLoading}
            mgasError={mgasError}
            validityDate={validityDate}
            setValidityDate={setValidityDate}
            verifying={verifying}
            handleVerifySubmit={handleVerifySubmit}
            onClose={() => {
              setShowVerifyModal(false);
              setSelectedAgent(null);
              setAdminAssignments({
                agentCode: '',
                userType: 'AGENT',
                commissionPercent: '',
                mgaOverridePercent: '',
                mgaId: '',
              });
              setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
              setMgaSearch('');
            }}
            openDocument={openDocument}
          />
        )}
      </div>
    </div>
  );
}

// 
interface VerificationModalProps {
  selectedAgent: any;
  adminAssignments: any;
  setAdminAssignments: any;
  agentCodeAvailability: any;
  handleCheckAgentCode: () => void;
  mgaSearch: string;
  setMgaSearch: (value: string) => void;
  mgas: MgaOption[]; // ✅ CHANGED from string[]
  mgasLoading: boolean;
  mgasError: string | null;
  validityDate: string;
  setValidityDate: (value: string) => void;
  verifying: boolean;
  handleVerifySubmit: () => void;
  onClose: () => void;
  openDocument: (url: string | null) => void;
}

function VerificationModal({
  selectedAgent,
  adminAssignments,
  setAdminAssignments,
  agentCodeAvailability,
  handleCheckAgentCode,
  mgaSearch,
  setMgaSearch,
  mgas,
  mgasLoading,
  mgasError,
  validityDate,
  setValidityDate,
  verifying,
  handleVerifySubmit,
  onClose,
  openDocument,
}: VerificationModalProps) {
  const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
  // const needsMgaAssignment = selectedAgent.applicantType === 'under_mga';

  // Only need MGA assignment for "other" type, NOT for WFG
const needsMgaAssignment = 
  selectedAgent.applicantType === 'under_mga' && 
  selectedAgent.mgaType === 'other';
  const isWfgAgent = selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'wfg';
  const hasDocuments = selectedAgent.applicantType === 'independent' || 
                      (selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'other');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">Verify Agent</h3>
        
        <div className="space-y-4">
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
              
              {selectedAgent.applicantType && (
                <div className="mt-2">
                  {selectedAgent.applicantType === 'independent' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Independent Agent
                    </span>
                  )}
                  {selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'wfg' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      WFG Agent
                    </span>
                  )}
                  {selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'other' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Agent under MGA
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {isWfgAgent && (
            <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-purple-900">
                    WFG Agent Verification
                  </p>
                  <p className="text-sm text-purple-700 mt-1">
                    <strong>WFG Code:</strong> <span className="font-mono bg-white px-2 py-0.5 rounded">{selectedAgent.wfgCode}</span>
                  </p>
                  <p className="text-xs text-purple-600 mt-2">
                    ⚠️ Please verify this WFG code with WFG before approving this application.
                  </p>
                </div>
              </div>
            </div>
          )}

          {needsAssignment && (
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adminAssignments.agentCode}
                      onChange={(e) => {
                        setAdminAssignments({
                          ...adminAssignments,
                          agentCode: e.target.value
                        });
                      }}
                      placeholder="Enter unique agent code (e.g., AG12345)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
                    />
                    <button
                      type="button"
                      onClick={handleCheckAgentCode}
                      disabled={!adminAssignments.agentCode || agentCodeAvailability.status === 'checking'}
                      className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
                        agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'available'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'taken'
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {agentCodeAvailability.status === 'checking'
                        ? 'Checking...'
                        : agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'available'
                        ? '✓ Available'
                        : agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'taken'
                        ? '✗ Taken'
                        : 'Check'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the agent's unique identifier
                  </p>
                </div>

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

                {/* MGA Assignment Section */}
                {needsMgaAssignment && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign to MGA <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={mgaSearch}
                      onChange={(e) => setMgaSearch(e.target.value)}
                      placeholder="Search MGA codes..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
                    />
                    
                    {mgasLoading && <p className="text-xs text-gray-500 mt-1">Loading MGAs...</p>}
                    {mgasError && <p className="text-xs text-red-500 mt-1">{mgasError}</p>}
                    
                    {mgaSearch.length > 0 && (
                      mgas.length > 0 ? (
                        <div className="mt-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md">
                          {/* Use mga.id as value, display full info */}
                          {mgas.map((mga) => (
                            <label key={mga.id} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                              <input
                                type="radio"
                                name="mgaSelection"
                                value={mga.id}  
                                checked={adminAssignments.mgaId === mga.id}  
                                onChange={(e) => setAdminAssignments({
                                  ...adminAssignments,
                                  mgaId: e.target.value  // This sets the UUID
                                })}
                                className="mr-2"
                              />
                              <span className="text-sm">
                                {mga.agentCode} - {mga.firstName} {mga.lastName} 
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : !mgasLoading && (
                        <p className="text-xs text-gray-500 mt-1">No MGAs found matching "{mgaSearch}"</p>
                      )
                    )}
                    
                    {adminAssignments.mgaId && (
                      <div className="mt-2 bg-green-50 border border-green-200 rounded px-2 py-1 text-sm">
                        <strong>Selected MGA:</strong>{' '}
                        {/* Display code, not UUID */}
                        {mgas.find(m => m.id === adminAssignments.mgaId)?.agentCode || adminAssignments.mgaId}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      This agent will work under the selected MGA
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
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

          {hasDocuments && (selectedAgent.docLink1 || selectedAgent.docLink2 || selectedAgent.docLink3) && (
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
          )}

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
              onClick={onClose}
              disabled={verifying}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}