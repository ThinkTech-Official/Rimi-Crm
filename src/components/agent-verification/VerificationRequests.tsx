import { useEffect, useState } from 'react';
import { useGetVerificationRequests } from '../../hooks/agent-verification/useGetVerificationRequests';
import { useVerifyAgent } from '../../hooks/agent-verification/useVerifyAgent';
import { CheckCircleIcon, ClockIcon, DocumentIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { format } from 'date-fns';
import { API_BASE } from '../../utils/urls';
import { useMgaCodes } from '../../hooks/agent-verification/useMgaCodes'; 
import { VerifiedAgentsTable } from './VerifiedAgentsTable';
import useNotification from '../../hooks/useNotification';
import VerificationModal from './VerifyAgentModal';
import { useLanguage } from '../../context/LanguageContext';
import { RenderPageNumbers } from '../RenderPageNumbers';








export default function VerificationRequests() {
  const { t } = useLanguage();
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
    
    setValidityDate(new Date().toISOString().split('T')[0]);
    setShowVerifyModal(true);
  };


  // Auto-populate commission when MGA is selected
// 
useEffect(() => {
  if (adminAssignments.mgaId && mgas.length > 0) {
    const selectedMga = mgas.find(m => m.id === adminAssignments.mgaId);
    if (selectedMga) {
      // Store commission value to avoid TypeScript null issues in callback
      const mgaCommission = selectedMga.commissionPercent;
      
      // Auto-populate commission from MGA
      if (mgaCommission !== null) {
        setAdminAssignments(prev => ({
          ...prev,
          commissionPercent: mgaCommission.toString(),
        }));
      } else {
        // MGA has no commission set - leave empty for manual entry
        setAdminAssignments(prev => ({
          ...prev,
          commissionPercent: '',
        }));
      }
    }
  }
}, [adminAssignments.mgaId, mgas]);

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
        throw new Error(t('Failed to check availability'));
      }

      const data = await response.json();
      setAgentCodeAvailability({
        status: data.available ? 'available' : 'taken',
        lastChecked: adminAssignments.agentCode,
      });
    } catch (error) {
      triggerNotification({
        type: 'error',
        message: t('Failed to check agent code availability. Please try again.'),
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
      triggerNotification({
        type: 'error',
        message: t('Please provide an Agent Code'),
        duration: 3000,
      });
      return;
    }

    if (agentCodeAvailability.lastChecked !== adminAssignments.agentCode || 
        agentCodeAvailability.status !== 'available') {
      triggerNotification({
        type: 'error',
        message: t('Please check agent code availability first'),
        duration: 3000,
      });
      return;
    }

    //  Skip commission validation for WFG agents
    if (!isWfgAgent && (!adminAssignments.commissionPercent || parseFloat(adminAssignments.commissionPercent) <= 0)) {
      triggerNotification({
        type: 'error',
        message: t('Please provide a valid Commission Percentage'),
        duration: 3000,
      });
      return;
    }

    // Only require MGA assignment for "under_mga" with "other" type
   if (selectedAgent.applicantType === 'under_mga' && !adminAssignments.mgaId){
      triggerNotification({
        type: 'error',
        message: t('Please select an MGA for this agent'),
        duration: 3000,
      });
      return;
    }
  }

  const verificationDate = isWfgAgent 
  ? (() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 100);
      return date.toISOString().split('T')[0];
    })()
  : validityDate;

  const payload: any = {
    agentId: selectedAgent.id,
    verificationValidTill: verificationDate,
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
    if (selectedAgent.applicantType === 'under_mga' && adminAssignments.mgaId) {
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
      window.open(url, '_blank');
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
        {t("Independent Agent")}
      </span>
    );
  }

  // Support new structure first
  if (agent.applicantType === 'wfg') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        {t("WFG Agent")}
      </span>
    );
  }

  // Support old structure for backward compatibility
  if (agent.applicantType === 'under_mga' && agent.mgaType === 'wfg') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        {t("WFG Agent (Legacy)")}
      </span>
    );
  }

  if (agent.applicantType === 'under_mga' && agent.mgaType === 'other') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
        {t("Agent under MGA")}
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
      {NotificationComponent}
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        {t("Verification Requests")}
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
                {t("Unverified Requests")}
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
                {t("Verified Agents")}
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
            <div className="flex flex-col h-full">
              <div className="flex-1 min-h-[400px]">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B00B7]"></div>
                  </div>
                ) : requests && requests.data.length > 0 ? (
                  <div className="space-y-4">
                    {requests.data.map((agent) => (
                      <div
                        key={agent.id}
                        className="border border-inputBorder rounded-lg p-4 sm:p-5 hover:shadow-sm transition-shadow duration-200 bg-white"
                      >
                        {/* Mobile Layout - Stacked */}
                        <div className="flex flex-col gap-4 lg:hidden">
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
                                  <span className="text-text-secondary min-w-[80px]">{t("Email")}:</span>
                                  <span className="text-gray-900 font-medium break-all">{agent.email}</span>
                                </div>
                                
                                <div className="flex items-start gap-1 text-sm">
                                  <span className="text-text-secondary min-w-[80px]">{t("Agent Code")}:</span>
                                  <span className="text-gray-900 font-medium font-mono">{agent.agentCode}</span>
                                </div>
                                
                                {agent.company && (
                                  <div className="flex items-start gap-1 text-sm">
                                    <span className="text-text-secondary min-w-[80px]">{t("Company")}:</span>
                                    <span className="text-gray-900 font-medium">{agent.company}</span>
                                  </div>
                                )}

                                {agent.applicantType === 'under_mga' && agent.mgaType === 'wfg' && agent.wfgCode && (
                                  <div className="flex items-start gap-1 text-sm">
                                    <span className="text-text-secondary min-w-[80px]">{t("WFG Code")}:</span>
                                    <span className="text-purple-700 font-medium font-mono">{agent.wfgCode}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-start gap-1 text-sm">
                                  <span className="text-text-secondary min-w-[80px]">{t("User Type")}:</span>
                                  <span className="text-gray-900 font-medium">
                                    {agent.userType || "AGENT"}
                                  </span>
                                </div>
                              </div>

                              {agent.isImportedAgent && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                    {t("Imported Agent")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bottom Section - Upload Date, Documents & Action */}
                          <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
                            <div className="flex flex-col gap-3">
                              <div>
                                <p className="text-xs text-text-secondary mb-0.5">{t("Document Upload Status")}</p>
                                <p className="text-sm font-medium text-gray-700">
                                  {agent.documentsUploadedAt
                                    ? format(new Date(agent.documentsUploadedAt), "MMM dd, yyyy")
                                    : agent.applicantType === 'under_mga' && agent.mgaType === 'wfg'
                                    ? t("WFG Code Provided")
                                    : t("Not uploaded")}
                                </p>
                              </div>

                              {hasDocuments(agent) && (
                                <div className="flex flex-col gap-2">
                                  <span className="text-text-secondary text-sm font-medium">{t("Documents")}:</span>
                                  <div className="flex flex-wrap gap-2">
                                    {agent.docLink1 && (
                                      <button
                                        onClick={() => openDocument(agent.docLink1)}
                                        className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                        title={t("Insurance License")}
                                      >
                                        <DocumentIcon className="h-4 w-4" />
                                        <span>{t("Insurance License")}</span>
                                      </button>
                                    )}
                                    {agent.docLink2 && (
                                      <button
                                        onClick={() => openDocument(agent.docLink2)}
                                        className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                        title={t("E&O Insurance")}
                                      >
                                        <DocumentIcon className="h-4 w-4" />
                                        <span>{t("E&O Insurance")}</span>
                                      </button>
                                    )}
                                    {agent.docLink3 && (
                                      <button
                                        onClick={() => openDocument(agent.docLink3)}
                                        className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                        title={t("Bank Details")}
                                      >
                                        <DocumentIcon className="h-4 w-4" />
                                        <span>{t("Bank Details")}</span>
                                      </button>
                                    )}
                                    {agent.docLink4 && (
                                      <button
                                        onClick={() => openDocument(agent.docLink4)}
                                        className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                        title={t("Agency Agreement")}
                                      >
                                        <DocumentIcon className="h-4 w-4" />
                                        <span>{t("Agency Agreement")}</span>
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
                              {t("Verify Agent")}
                            </button>
                          </div>
                        </div>

                        {/* Desktop/Tablet Layout - Side by Side */}
                        <div className="hidden lg:flex lg:flex-row items-start justify-between gap-6">
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
                              
                              <div className="grid grid-cols-1 gap-x-8 gap-y-1">
                                <div className="flex items-start gap-1">
                                  <span className="text-text-secondary min-w-[90px]">{t("Email")}:</span>
                                  <span className="text-gray-900 font-medium break-all">{agent.email}</span>
                                </div>
                                
                                <div className="flex items-start gap-1">
                                  <span className="text-text-secondary min-w-[90px]">{t("Agent Code")}:</span>
                                  <span className="text-gray-900 font-medium font-mono">{agent.agentCode}</span>
                                </div>
                                
                                {agent.company && (
                                  <div className="flex items-start gap-1">
                                    <span className="text-text-secondary min-w-[90px]">{t("Company")}:</span>
                                    <span className="text-gray-900 font-medium">{agent.company}</span>
                                  </div>
                                )}

                                {agent.applicantType === 'under_mga' && agent.mgaType === 'wfg' && agent.wfgCode && (
                                  <div className="flex items-start gap-1">
                                    <span className="text-text-secondary min-w-[90px]">{t("WFG Code")}:</span>
                                    <span className="text-purple-700 font-medium font-mono">{agent.wfgCode}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-start gap-1">
                                  <span className="text-text-secondary min-w-[90px]">{t("User Type")}:</span>
                                  <span className="text-gray-900 font-medium">
                                    {agent.userType || "AGENT"}
                                  </span>
                                </div>
                              </div>

                              {agent.isImportedAgent && (
                                <div className="mt-3">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                    {t("Imported Agent")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Section - Actions */}
                          <div className="flex flex-col items-end gap-3 flex-shrink-0">
                            <div className="text-right">
                              <p className="text-xs text-text-secondary mb-1">{t("Document Upload Status")}</p>
                              <p className="text-sm font-medium text-gray-700">
                                {agent.documentsUploadedAt
                                  ? format(new Date(agent.documentsUploadedAt), "MMM dd, yyyy")
                                  : agent.applicantType === 'under_mga' && agent.mgaType === 'wfg'
                                  ? t("WFG Code Provided")
                                  : t("Not uploaded")}
                              </p>
                            </div>

                             {hasDocuments(agent) && (
                               <div className="flex flex-col items-end gap-2">
                                 <span className="text-text-secondary text-sm font-medium">{t("Documents")}:</span>
                                 <div className="flex flex-wrap justify-end gap-2">
                                   {agent.docLink1 && (
                                     <button
                                       onClick={() => openDocument(agent.docLink1)}
                                       className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                       title={t("Insurance License")}
                                     >
                                       <DocumentIcon className="h-4 w-4" />
                                       <span>{t("Insurance License")}</span>
                                     </button>
                                   )}
                                   {agent.docLink2 && (
                                     <button
                                       onClick={() => openDocument(agent.docLink2)}
                                       className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                       title={t("E&O Insurance")}
                                     >
                                       <DocumentIcon className="h-4 w-4" />
                                       <span>{t("E&O Insurance")}</span>
                                     </button>
                                   )}
                                   {agent.docLink3 && (
                                     <button
                                       onClick={() => openDocument(agent.docLink3)}
                                       className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                       title={t("Bank Details")}
                                     >
                                       <DocumentIcon className="h-4 w-4" />
                                       <span>{t("Bank Details")}</span>
                                     </button>
                                   )}
                                   {agent.docLink4 && (
                                     <button
                                       onClick={() => openDocument(agent.docLink4)}
                                       className="inline-flex items-center gap-1 text-[#2B00B7] hover:text-[#2309A1] transition-colors cursor-pointer text-sm font-medium"
                                       title={t("Agency Agreement")}
                                     >
                                       <DocumentIcon className="h-4 w-4" />
                                       <span>{t("Agency Agreement")}</span>
                                     </button>
                                   )}
                                 </div>
                               </div>
                             )}
                            
                            <button
                              onClick={() => handleVerifyClick(agent)}
                              className="px-4 py-2 bg-primary hover:bg-[#2309A1] text-white cursor-pointer rounded transition-colors"
                            >
                              {t("Verify Agent")}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-text-secondary bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <div className="bg-gray-100 p-3 rounded-full mb-3">
                      <ClockIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium">{t("No pending requests")}</p>
                    <p className="text-sm">{t("All agents are currently processed")}</p>
                  </div>
                )}
              </div>

              {/* Pagination for Unverified - Outside of loading conditional */}
              {requests && requests.totalPages > 1 && (
                <div
                  className="mt-8 flex items-center justify-center p-4 space-x-2 border-t border-gray-100"
                  role="pagination"
                >
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title={t("Previous")}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <RenderPageNumbers
                    onPageChange={setCurrentPage}
                    totalPages={requests.totalPages}
                    page={currentPage}
                  />
                  <button
                    disabled={currentPage === requests.totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title={t("Next")}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
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
