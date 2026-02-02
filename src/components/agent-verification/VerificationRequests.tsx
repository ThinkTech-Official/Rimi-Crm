// import React, { useEffect, useState } from 'react';
// import { useGetVerificationRequests } from '../../hooks/agent-verification/useGetVerificationRequests';
// import { useVerifyAgent } from '../../hooks/agent-verification/useVerifyAgent';
// import { CheckCircleIcon, ClockIcon, DocumentIcon, UserIcon } from '@heroicons/react/24/outline';
// import { format } from 'date-fns';
// import { API_BASE } from '../../utils/urls';

// export default function VerificationRequests() {
//   const [adminAssignments, setAdminAssignments] = useState<{
//   agentCode: string;
//   userType: string;
//   commissionPercent: string;
//   mgaOverridePercent: string;
// }>({
//   agentCode: '',
//   userType: 'AGENT',
//   commissionPercent: '',
//   mgaOverridePercent: '',
// });
//   const [activeTab, setActiveTab] = useState<'unverified' | 'verified'>('unverified');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedAgent, setSelectedAgent] = useState<any>(null);
//   const [showVerifyModal, setShowVerifyModal] = useState(false);
//   const [validityDate, setValidityDate] = useState('');
  
//   const { data: requests, loading, fetchRequests } = useGetVerificationRequests();
//   const { verifyAgent, loading: verifying } = useVerifyAgent();

//   useEffect(() => {
//     const status = activeTab === 'unverified' ? 'PENDING' : 'VERIFIED';
//     fetchRequests(status, currentPage, 10);
//   }, [activeTab, currentPage, fetchRequests]);

//   // const handleVerifyClick = (agent: any) => {
//   //   setSelectedAgent(agent);
//   //   // Set default validity date to 1 year from now
//   //   const oneYearFromNow = new Date();
//   //   oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
//   //   setValidityDate(oneYearFromNow.toISOString().split('T')[0]);
//   //   setShowVerifyModal(true);
//   // };


//   const handleVerifyClick = (agent: any) => {
//   setSelectedAgent(agent);
  
//   // Check if this is a public registration (needs admin assignment)
//   const needsAssignment = agent.agentCode?.startsWith('TEMP-') || !agent.commissionPercent;
  
//   // Pre-fill existing values or defaults
//   setAdminAssignments({
//     agentCode: needsAssignment ? '' : (agent.agentCode || ''),
//     userType: agent.userType || 'AGENT',
//     commissionPercent: agent.commissionPercent?.toString() || '',
//     mgaOverridePercent: agent.mgaOverridePercent?.toString() || '',
//   });
  
//   // Set default validity date to 1 year from now
//   const oneYearFromNow = new Date();
//   oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
//   setValidityDate(oneYearFromNow.toISOString().split('T')[0]);
//   setShowVerifyModal(true);
// };

//   // const handleVerifySubmit = async () => {
//   //   if (selectedAgent && validityDate) {
//   //     const result = await verifyAgent(selectedAgent.id, validityDate);
//   //     if (result) {
//   //       setShowVerifyModal(false);
//   //       setSelectedAgent(null);
//   //       // Refresh the list
//   //       fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
//   //     }
//   //   }
//   // };


//   const handleVerifySubmit = async () => {
//   if (!selectedAgent || !validityDate) return;

//   // Check if this agent needs admin assignment
//   const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
  
//   if (needsAssignment) {
//     // Validate required fields
//     if (!adminAssignments.agentCode || !adminAssignments.agentCode.trim()) {
//       alert('Please provide an Agent Code');
//       return;
//     }
//     if (!adminAssignments.commissionPercent || parseFloat(adminAssignments.commissionPercent) <= 0) {
//       alert('Please provide a valid Commission Percentage');
//       return;
//     }
//   }

//   const payload: any = {
//     agentId: selectedAgent.id,
//     verificationValidTill: validityDate,
//   };

//   // Include admin assignments if needed
//   if (needsAssignment) {
//     payload.agentCode = adminAssignments.agentCode.trim();
//     payload.userType = adminAssignments.userType;
//     payload.commissionPercent = parseFloat(adminAssignments.commissionPercent);
    
//     if (adminAssignments.userType === 'MGA' && adminAssignments.mgaOverridePercent) {
//       payload.mgaOverridePercent = parseFloat(adminAssignments.mgaOverridePercent);
//     }
//   }

//   const result = await verifyAgent(payload);
//   if (result) {
//     setShowVerifyModal(false);
//     setSelectedAgent(null);
//     setAdminAssignments({
//       agentCode: '',
//       userType: 'AGENT',
//       commissionPercent: '',
//       mgaOverridePercent: '',
//     });
//     // Refresh the list
//     fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
//   }
// };

//   const openDocument = (url: string | null) => {
//     if (url) {
//       window.open(`${API_BASE}${url}`, '_blank');
//     }
//   };

//   return (
//     <div className="px-8 py-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Verification Requests</h1>
      
//       <div className="bg-white rounded-lg shadow">
//         {/* Tabs */}
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex">
//             <button
//               onClick={() => {
//                 setActiveTab('unverified');
//                 setCurrentPage(1);
//               }}
//               className={`${
//                 activeTab === 'unverified'
//                   ? 'border-[#2B00B7] text-[#2B00B7]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
//             >
//               <div className="flex items-center gap-2">
//                 <ClockIcon className="h-5 w-5" />
//                 Unverified Requests
//                 {requests && activeTab === 'unverified' && requests.total > 0 && (
//                   <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
//                     {requests.total}
//                   </span>
//                 )}
//               </div>
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('verified');
//                 setCurrentPage(1);
//               }}
//               className={`${
//                 activeTab === 'verified'
//                   ? 'border-[#2B00B7] text-[#2B00B7]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
//             >
//               <div className="flex items-center gap-2">
//                 <CheckCircleIcon className="h-5 w-5" />
//                 Verified Agents
//                 {requests && activeTab === 'verified' && requests.total > 0 && (
//                   <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
//                     {requests.total}
//                   </span>
//                 )}
//               </div>
//             </button>
//           </nav>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {loading ? (
//             <div className="flex justify-center items-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B00B7]"></div>
//             </div>
//           ) : requests && requests.data.length > 0 ? (
//             <>
//               <div className="space-y-4">
//                 {requests.data.map((agent) => (
//                   <div
//                     key={agent.id}
//                     className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4">
//                         <div className="bg-gray-100 rounded-full p-3">
//                           <UserIcon className="h-6 w-6 text-gray-600" />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-medium text-gray-900">
//                             {agent.firstName} {agent.lastName}
//                           </h3>
//                           <div className="mt-1 text-sm text-gray-500 space-y-1">
//                             <p>Email: {agent.email}</p>
//                             <p>Agent Code: {agent.agentCode}</p>
//                             {agent.company && <p>Company: {agent.company}</p>}
//                             <p>User Type: <span className="font-medium">{agent.userType || 'AGENT'}</span></p>
//                             {agent.isImportedAgent && (
//                               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                                 Imported Agent
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         {activeTab === 'unverified' ? (
//                           <>
//                             <p className="text-sm text-gray-500 mb-2">
//                               Uploaded: {agent.documentsUploadedAt 
//                                 ? format(new Date(agent.documentsUploadedAt), 'MMM dd, yyyy')
//                                 : 'Not uploaded'}
//                             </p>
//                             <div className="flex justify-end space-x-2 mb-3">
//                               {agent.docLink1 && (
//                                 <button
//                                   onClick={() => openDocument(agent.docLink1)}
//                                   className="text-[#2B00B7] hover:text-[#1e007f]"
//                                   title="View Document 1"
//                                 >
//                                   <DocumentIcon className="h-5 w-5" />
//                                 </button>
//                               )}
//                               {agent.docLink2 && (
//                                 <button
//                                   onClick={() => openDocument(agent.docLink2)}
//                                   className="text-[#2B00B7] hover:text-[#1e007f]"
//                                   title="View Document 2"
//                                 >
//                                   <DocumentIcon className="h-5 w-5" />
//                                 </button>
//                               )}
//                               {agent.docLink3 && (
//                                 <button
//                                   onClick={() => openDocument(agent.docLink3)}
//                                   className="text-[#2B00B7] hover:text-[#1e007f]"
//                                   title="View Document 3"
//                                 >
//                                   <DocumentIcon className="h-5 w-5" />
//                                 </button>
//                               )}
//                             </div>
//                             <button
//                               onClick={() => handleVerifyClick(agent)}
//                               className="bg-[#2B00B7] text-white px-4 py-2 rounded hover:bg-[#1e007f] text-sm"
//                             >
//                               Verify Agent
//                             </button>
//                           </>
//                         ) : (
//                           <div className="text-sm">
//                             <p className="text-green-600 font-medium mb-1">Verified</p>
//                             <p className="text-gray-500">
//                               Valid until: {agent.verificationValidTill 
//                                 ? format(new Date(agent.verificationValidTill), 'MMM dd, yyyy')
//                                 : 'N/A'}
//                             </p>
//                             <p className="text-gray-500">
//                               Verified on: {agent.verifiedAt 
//                                 ? format(new Date(agent.verifiedAt), 'MMM dd, yyyy')
//                                 : 'N/A'}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {requests.totalPages > 1 && (
//                 <div className="mt-6 flex justify-center">
//                   <nav className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={!requests.hasPrevPage}
//                       className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Previous
//                     </button>
//                     <span className="text-sm text-gray-700">
//                       Page {currentPage} of {requests.totalPages}
//                     </span>
//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={!requests.hasNextPage}
//                       className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </nav>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               No {activeTab === 'unverified' ? 'pending' : 'verified'} verification requests
//             </div>
//           )}
//         </div>

//         {/* Verify Modal */}
//         {/* {showVerifyModal && selectedAgent && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full">
//               <h3 className="text-lg font-medium mb-4">Verify Agent</h3>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Agent Details:</p>
//                   <p className="font-medium">{selectedAgent.firstName} {selectedAgent.lastName}</p>
//                   <p className="text-sm text-gray-500">{selectedAgent.email}</p>
//                   <p className="text-sm text-gray-500">Code: {selectedAgent.agentCode}</p>
//                   <p className="text-sm text-gray-500">Type: {selectedAgent.userType || 'AGENT'}</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Verification Valid Until
//                   </label>
//                   <input
//                     type="date"
//                     value={validityDate}
//                     onChange={(e) => setValidityDate(e.target.value)}
//                     min={new Date().toISOString().split('T')[0]}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                   />
//                 </div>

//                 <div className="flex space-x-3 mt-6">
//                   <button
//                     onClick={handleVerifySubmit}
//                     disabled={verifying}
//                     className="flex-1 bg-[#2B00B7] text-white px-4 py-2 rounded-md hover:bg-[#1e007f] disabled:opacity-50"
//                   >
//                     {verifying ? 'Verifying...' : 'Verify Agent'}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowVerifyModal(false);
//                       setSelectedAgent(null);
//                     }}
//                     className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )} */}

//           {/* NEWWW Verify Modal */}
// {showVerifyModal && selectedAgent && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//       <h3 className="text-lg font-medium mb-4">Verify Agent</h3>
      
//       <div className="space-y-4">
//         {/* Agent Details */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-sm text-gray-600 mb-2">Agent Details:</p>
//           <div className="space-y-1">
//             <p className="font-medium text-gray-900">
//               {selectedAgent.firstName} {selectedAgent.lastName}
//             </p>
//             <p className="text-sm text-gray-600">{selectedAgent.email}</p>
//             {selectedAgent.company && (
//               <p className="text-sm text-gray-600">Company: {selectedAgent.company}</p>
//             )}
//             <p className="text-sm text-gray-600">
//               Current Code: {selectedAgent.agentCode}
//               {selectedAgent.agentCode?.startsWith('TEMP-') && (
//                 <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
//                   Temporary
//                 </span>
//               )}
//             </p>
//             <p className="text-sm text-gray-600">
//               Status: <span className="font-medium">{selectedAgent.status}</span>
//             </p>
//           </div>
//         </div>

//         {/* Admin Assignment Section (if needed) */}
//         {(selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent) && (
//           <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg">
//             <div className="flex items-start gap-2 mb-3">
//               <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <p className="text-sm font-medium text-yellow-900">
//                   Admin Assignment Required
//                 </p>
//                 <p className="text-xs text-yellow-700 mt-1">
//                   This is a public registration. Please assign credentials before verification.
//                 </p>
//               </div>
//             </div>
            
//             <div className="space-y-3 mt-4">
//               {/* Agent Code */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Agent Code <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={adminAssignments.agentCode}
//                   onChange={(e) => setAdminAssignments({
//                     ...adminAssignments,
//                     agentCode: e.target.value
//                   })}
//                   placeholder="Enter unique agent code (e.g., AG12345)"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   This will be the agent's unique identifier
//                 </p>
//               </div>

//               {/* User Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   User Type
//                 </label>
//                 <select
//                   value={adminAssignments.userType}
//                   onChange={(e) => setAdminAssignments({
//                     ...adminAssignments,
//                     userType: e.target.value
//                   })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                 >
//                   <option value="AGENT">AGENT</option>
//                   <option value="MGA">MGA</option>
//                 </select>
//               </div>

//               {/* Commission Percentage */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Commission Percentage <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     max="100"
//                     value={adminAssignments.commissionPercent}
//                     onChange={(e) => setAdminAssignments({
//                       ...adminAssignments,
//                       commissionPercent: e.target.value
//                     })}
//                     placeholder="e.g., 15.50"
//                     className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                   />
//                   <span className="absolute right-3 top-2.5 text-gray-500">%</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Agent's commission on each policy
//                 </p>
//               </div>

//               {/* MGA Override (if userType is MGA) */}
//               {adminAssignments.userType === 'MGA' && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     MGA Override Percentage
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       max="100"
//                       value={adminAssignments.mgaOverridePercent}
//                       onChange={(e) => setAdminAssignments({
//                         ...adminAssignments,
//                         mgaOverridePercent: e.target.value
//                       })}
//                       placeholder="e.g., 5.00"
//                       className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                     />
//                     <span className="absolute right-3 top-2.5 text-gray-500">%</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     MGA's share from sub-agent commissions
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
        
//         {/* Verification Valid Until */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Verification Valid Until <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             value={validityDate}
//             onChange={(e) => setValidityDate(e.target.value)}
//             min={new Date().toISOString().split('T')[0]}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Agent verification will expire after this date
//           </p>
//         </div>

//         {/* Documents Preview */}
//         <div className="bg-gray-50 p-3 rounded-lg">
//           <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
//           <div className="flex flex-wrap gap-2">
//             {selectedAgent.docLink1 && (
//               <button
//                 onClick={() => openDocument(selectedAgent.docLink1)}
//                 className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
//               >
//                 <DocumentIcon className="h-4 w-4" />
//                 Doc 1
//               </button>
//             )}
//             {selectedAgent.docLink2 && (
//               <button
//                 onClick={() => openDocument(selectedAgent.docLink2)}
//                 className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
//               >
//                 <DocumentIcon className="h-4 w-4" />
//                 Doc 2
//               </button>
//             )}
//             {selectedAgent.docLink3 && (
//               <button
//                 onClick={() => openDocument(selectedAgent.docLink3)}
//                 className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
//               >
//                 <DocumentIcon className="h-4 w-4" />
//                 Doc 3
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex space-x-3 mt-6 pt-4 border-t">
//           <button
//             onClick={handleVerifySubmit}
//             disabled={verifying}
//             className="flex-1 bg-[#2B00B7] text-white px-4 py-2.5 rounded-md hover:bg-[#1e007f] disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
//           >
//             {verifying ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Verifying...
//               </span>
//             ) : (
//               'Verify & Activate Agent'
//             )}
//           </button>
//           <button
//             onClick={() => {
//               setShowVerifyModal(false);
//               setSelectedAgent(null);
//               setAdminAssignments({
//                 agentCode: '',
//                 userType: 'AGENT',
//                 commissionPercent: '',
//                 mgaOverridePercent: '',
//               });
//             }}
//             disabled={verifying}
//             className="flex-1 bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//       </div>
//     </div>
//   );
// }


// ===============================================



// import React, { useEffect, useState } from 'react';
// import { useGetVerificationRequests } from '../../hooks/agent-verification/useGetVerificationRequests';
// import { useVerifyAgent } from '../../hooks/agent-verification/useVerifyAgent';
// import { CheckCircleIcon, ClockIcon, DocumentIcon, UserIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// import { format } from 'date-fns';
// import { API_BASE } from '../../utils/urls';
// import { useMgaCodes } from '../../hooks/agent-verification/useMgaCodes';


// export default function VerificationRequests() {
//   const [adminAssignments, setAdminAssignments] = useState<{
//     agentCode: string;
//     userType: string;
//     commissionPercent: string;
//     mgaOverridePercent: string;
//     mgaId: string; // ✅ NEW: For MGA assignment
//   }>({
//     agentCode: '',
//     userType: 'AGENT',
//     commissionPercent: '',
//     mgaOverridePercent: '',
//     mgaId: '', // ✅ NEW
//   });

//   // ✅ NEW: Agent code availability check
//   const [agentCodeAvailability, setAgentCodeAvailability] = useState<{
//     status: 'idle' | 'checking' | 'available' | 'taken';
//     lastChecked: string;
//   }>({ status: 'idle', lastChecked: '' });

//   // ✅ NEW: MGA search functionality
//   const [mgaSearch, setMgaSearch] = useState('');
//   const { mgas, loading: mgasLoading, error: mgasError } = useMgaCodes(mgaSearch);

//   const [activeTab, setActiveTab] = useState<'unverified' | 'verified'>('unverified');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedAgent, setSelectedAgent] = useState<any>(null);
//   const [showVerifyModal, setShowVerifyModal] = useState(false);
//   const [validityDate, setValidityDate] = useState('');
  
//   const { data: requests, loading, fetchRequests } = useGetVerificationRequests();
//   const { verifyAgent, loading: verifying } = useVerifyAgent();

//   useEffect(() => {
//     const status = activeTab === 'unverified' ? 'PENDING' : 'VERIFIED';
//     fetchRequests(status, currentPage, 10);
//   }, [activeTab, currentPage, fetchRequests]);

//   const handleVerifyClick = (agent: any) => {
//     setSelectedAgent(agent);
    
//     // Check if this is a public registration (needs admin assignment)
//     const needsAssignment = agent.agentCode?.startsWith('TEMP-') || !agent.commissionPercent;
    
//     // Pre-fill existing values or defaults
//     setAdminAssignments({
//       agentCode: needsAssignment ? '' : (agent.agentCode || ''),
//       userType: agent.userType || 'AGENT',
//       commissionPercent: agent.commissionPercent?.toString() || '',
//       mgaOverridePercent: agent.mgaOverridePercent?.toString() || '',
//       mgaId: '', // ✅ NEW: Start empty
//     });
    
//     // Reset states
//     setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
//     setMgaSearch('');
    
//     // Set default validity date to 1 year from now
//     const oneYearFromNow = new Date();
//     oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
//     setValidityDate(oneYearFromNow.toISOString().split('T')[0]);
//     setShowVerifyModal(true);
//   };

//   // ✅ NEW: Check agent code availability
//   const handleCheckAgentCode = async () => {
//     if (!adminAssignments.agentCode || adminAssignments.agentCode.trim().length === 0) {
//       return;
//     }

//     setAgentCodeAvailability({ status: 'checking', lastChecked: '' });

//     try {
//       const response = await fetch(
//         `${API_BASE}/auth/check?code=${encodeURIComponent(adminAssignments.agentCode)}`,
//         {
//           credentials: 'include',
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to check availability');
//       }

//       const data = await response.json();
//       setAgentCodeAvailability({
//         status: data.available ? 'available' : 'taken',
//         lastChecked: adminAssignments.agentCode,
//       });
//     } catch (error) {
//       alert('Failed to check agent code availability');
//       setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
//     }
//   };

//   const handleVerifySubmit = async () => {
//     if (!selectedAgent || !validityDate) return;

//     // Check if this agent needs admin assignment
//     const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
    
//     if (needsAssignment) {
//       // Validate required fields
//       if (!adminAssignments.agentCode || !adminAssignments.agentCode.trim()) {
//         alert('Please provide an Agent Code');
//         return;
//       }

//       // ✅ Check agent code availability
//       if (agentCodeAvailability.lastChecked !== adminAssignments.agentCode || 
//           agentCodeAvailability.status !== 'available') {
//         alert('Please check agent code availability first');
//         return;
//       }

//       if (!adminAssignments.commissionPercent || parseFloat(adminAssignments.commissionPercent) <= 0) {
//         alert('Please provide a valid Commission Percentage');
//         return;
//       }

//       // ✅ NEW: Validate MGA assignment for agents under MGA
//       if (selectedAgent.applicantType === 'under_mga' && !adminAssignments.mgaId) {
//         alert('Please select an MGA for this agent');
//         return;
//       }
//     }

//     const payload: any = {
//       agentId: selectedAgent.id,
//       verificationValidTill: validityDate,
//     };

//     // Include admin assignments if needed
//     if (needsAssignment) {
//       payload.agentCode = adminAssignments.agentCode.trim();
//       payload.userType = adminAssignments.userType;
//       payload.commissionPercent = parseFloat(adminAssignments.commissionPercent);
      
//       // ✅ NEW: Include MGA assignment for agents under MGA
//       if (selectedAgent.applicantType === 'under_mga' && adminAssignments.mgaId) {
//         payload.mgaId = adminAssignments.mgaId;
//       }
      
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
//       // Refresh the list
//       fetchRequests(activeTab === 'unverified' ? 'PENDING' : 'VERIFIED', currentPage, 10);
//     }
//   };

//   const openDocument = (url: string | null) => {
//     if (url) {
//       window.open(`${API_BASE}${url}`, '_blank');
//     }
//   };

//   // ✅ NEW: Helper function to get applicant type badge
//   const getApplicantTypeBadge = (agent: any) => {
//     if (!agent.applicantType) return null;

//     if (agent.applicantType === 'independent') {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//           Independent Agent
//         </span>
//       );
//     }

//     if (agent.applicantType === 'under_mga' && agent.mgaType === 'wfg') {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//           WFG Agent
//         </span>
//       );
//     }

//     if (agent.applicantType === 'under_mga' && agent.mgaType === 'other') {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
//           Agent under MGA
//         </span>
//       );
//     }

//     return null;
//   };

//   // ✅ NEW: Check if documents are available for this agent
//   const hasDocuments = (agent: any) => {
//     // Documents are available for independent or "other" MGA agents
//     return agent.applicantType === 'independent' || 
//            (agent.applicantType === 'under_mga' && agent.mgaType === 'other');
//   };

//   return (
//     <div className="px-8 py-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Verification Requests</h1>
      
//       <div className="bg-white rounded-lg shadow">
//         {/* Tabs */}
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex">
//             <button
//               onClick={() => {
//                 setActiveTab('unverified');
//                 setCurrentPage(1);
//               }}
//               className={`${
//                 activeTab === 'unverified'
//                   ? 'border-[#2B00B7] text-[#2B00B7]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
//             >
//               <div className="flex items-center gap-2">
//                 <ClockIcon className="h-5 w-5" />
//                 Unverified Requests
//                 {requests && activeTab === 'unverified' && requests.total > 0 && (
//                   <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
//                     {requests.total}
//                   </span>
//                 )}
//               </div>
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('verified');
//                 setCurrentPage(1);
//               }}
//               className={`${
//                 activeTab === 'verified'
//                   ? 'border-[#2B00B7] text-[#2B00B7]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
//             >
//               <div className="flex items-center gap-2">
//                 <CheckCircleIcon className="h-5 w-5" />
//                 Verified Agents
//                 {requests && activeTab === 'verified' && requests.total > 0 && (
//                   <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
//                     {requests.total}
//                   </span>
//                 )}
//               </div>
//             </button>
//           </nav>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {loading ? (
//             <div className="flex justify-center items-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B00B7]"></div>
//             </div>
//           ) : requests && requests.data.length > 0 ? (
//             <>
//               <div className="space-y-4">
//                 {requests.data.map((agent) => (
//                   <div
//                     key={agent.id}
//                     className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4">
//                         <div className="bg-gray-100 rounded-full p-3">
//                           <UserIcon className="h-6 w-6 text-gray-600" />
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <h3 className="text-lg font-medium text-gray-900">
//                               {agent.firstName} {agent.lastName}
//                             </h3>
//                             {getApplicantTypeBadge(agent)}
//                           </div>
//                           <div className="mt-1 text-sm text-gray-500 space-y-1">
//                             <p>Email: {agent.email}</p>
//                             <p>Agent Code: {agent.agentCode}</p>
//                             {agent.company && <p>Company: {agent.company}</p>}
                            
//                             {/* ✅ NEW: Show WFG Code for WFG agents */}
//                             {agent.applicantType === 'under_mga' && agent.mgaType === 'wfg' && agent.wfgCode && (
//                               <div className="bg-purple-50 border border-purple-200 rounded px-2 py-1 inline-block mt-1">
//                                 <strong className="text-purple-900">WFG Code:</strong>{' '}
//                                 <span className="text-purple-700 font-mono">{agent.wfgCode}</span>
//                               </div>
//                             )}
                            
//                             <p>User Type: <span className="font-medium">{agent.userType || 'AGENT'}</span></p>
//                             {agent.isImportedAgent && (
//                               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                                 Imported Agent
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         {activeTab === 'unverified' ? (
//                           <>
//                             <p className="text-sm text-gray-500 mb-2">
//                               {agent.documentsUploadedAt 
//                                 ? `Uploaded: ${format(new Date(agent.documentsUploadedAt), 'MMM dd, yyyy')}`
//                                 : agent.applicantType === 'under_mga' && agent.mgaType === 'wfg'
//                                 ? 'WFG Code Provided'
//                                 : 'Not uploaded'}
//                             </p>
                            
//                             {/* ✅ UPDATED: Conditional document buttons */}
//                             {hasDocuments(agent) && (
//                               <div className="flex justify-end space-x-2 mb-3">
//                                 {agent.docLink1 && (
//                                   <button
//                                     onClick={() => openDocument(agent.docLink1)}
//                                     className="text-[#2B00B7] hover:text-[#1e007f]"
//                                     title="View Document 1"
//                                   >
//                                     <DocumentIcon className="h-5 w-5" />
//                                   </button>
//                                 )}
//                                 {agent.docLink2 && (
//                                   <button
//                                     onClick={() => openDocument(agent.docLink2)}
//                                     className="text-[#2B00B7] hover:text-[#1e007f]"
//                                     title="View Document 2"
//                                   >
//                                     <DocumentIcon className="h-5 w-5" />
//                                   </button>
//                                 )}
//                                 {agent.docLink3 && (
//                                   <button
//                                     onClick={() => openDocument(agent.docLink3)}
//                                     className="text-[#2B00B7] hover:text-[#1e007f]"
//                                     title="View Document 3"
//                                   >
//                                     <DocumentIcon className="h-5 w-5" />
//                                   </button>
//                                 )}
//                               </div>
//                             )}
                            
//                             <button
//                               onClick={() => handleVerifyClick(agent)}
//                               className="bg-[#2B00B7] text-white px-4 py-2 rounded hover:bg-[#1e007f] text-sm"
//                             >
//                               Verify Agent
//                             </button>
//                           </>
//                         ) : (
//                           <div className="text-sm">
//                             <p className="text-green-600 font-medium mb-1">Verified</p>
//                             <p className="text-gray-500">
//                               Valid until: {agent.verificationValidTill 
//                                 ? format(new Date(agent.verificationValidTill), 'MMM dd, yyyy')
//                                 : 'N/A'}
//                             </p>
//                             <p className="text-gray-500">
//                               Verified on: {agent.verifiedAt 
//                                 ? format(new Date(agent.verifiedAt), 'MMM dd, yyyy')
//                                 : 'N/A'}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {requests.totalPages > 1 && (
//                 <div className="mt-6 flex justify-center">
//                   <nav className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={!requests.hasPrevPage}
//                       className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Previous
//                     </button>
//                     <span className="text-sm text-gray-700">
//                       Page {currentPage} of {requests.totalPages}
//                     </span>
//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={!requests.hasNextPage}
//                       className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </nav>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               No {activeTab === 'unverified' ? 'pending' : 'verified'} verification requests
//             </div>
//           )}
//         </div>

//         {/* VERIFICATION MODAL - Continued in next part due to length */}
//         {showVerifyModal && selectedAgent && (
//           <VerificationModal
//             selectedAgent={selectedAgent}
//             adminAssignments={adminAssignments}
//             setAdminAssignments={setAdminAssignments}
//             agentCodeAvailability={agentCodeAvailability}
//             handleCheckAgentCode={handleCheckAgentCode}
//             mgaSearch={mgaSearch}
//             setMgaSearch={setMgaSearch}
//             mgas={mgas}
//             mgasLoading={mgasLoading}
//             mgasError={mgasError}
//             validityDate={validityDate}
//             setValidityDate={setValidityDate}
//             verifying={verifying}
//             handleVerifySubmit={handleVerifySubmit}
//             onClose={() => {
//               setShowVerifyModal(false);
//               setSelectedAgent(null);
//               setAdminAssignments({
//                 agentCode: '',
//                 userType: 'AGENT',
//                 commissionPercent: '',
//                 mgaOverridePercent: '',
//                 mgaId: '',
//               });
//               setAgentCodeAvailability({ status: 'idle', lastChecked: '' });
//               setMgaSearch('');
//             }}
//             openDocument={openDocument}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// // ✅ Separate Modal Component
// interface VerificationModalProps {
//   selectedAgent: any;
//   adminAssignments: any;
//   setAdminAssignments: any;
//   agentCodeAvailability: any;
//   handleCheckAgentCode: () => void;
//   mgaSearch: string;
//   setMgaSearch: (value: string) => void;
//   mgas: string[];
//   mgasLoading: boolean;
//   mgasError: string | null;
//   validityDate: string;
//   setValidityDate: (value: string) => void;
//   verifying: boolean;
//   handleVerifySubmit: () => void;
//   onClose: () => void;
//   openDocument: (url: string | null) => void;
// }

// function VerificationModal({
//   selectedAgent,
//   adminAssignments,
//   setAdminAssignments,
//   agentCodeAvailability,
//   handleCheckAgentCode,
//   mgaSearch,
//   setMgaSearch,
//   mgas,
//   mgasLoading,
//   mgasError,
//   validityDate,
//   setValidityDate,
//   verifying,
//   handleVerifySubmit,
//   onClose,
//   openDocument,
// }: VerificationModalProps) {
//   const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
//   const needsMgaAssignment = selectedAgent.applicantType === 'under_mga';
//   const isWfgAgent = selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'wfg';
//   const hasDocuments = selectedAgent.applicantType === 'independent' || 
//                       (selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'other');

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <h3 className="text-lg font-medium mb-4">Verify Agent</h3>
        
//         <div className="space-y-4">
//           {/* Agent Details */}
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-600 mb-2">Agent Details:</p>
//             <div className="space-y-1">
//               <p className="font-medium text-gray-900">
//                 {selectedAgent.firstName} {selectedAgent.lastName}
//               </p>
//               <p className="text-sm text-gray-600">{selectedAgent.email}</p>
//               {selectedAgent.company && (
//                 <p className="text-sm text-gray-600">Company: {selectedAgent.company}</p>
//               )}
//               <p className="text-sm text-gray-600">
//                 Current Code: {selectedAgent.agentCode}
//                 {selectedAgent.agentCode?.startsWith('TEMP-') && (
//                   <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
//                     Temporary
//                   </span>
//                 )}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Status: <span className="font-medium">{selectedAgent.status}</span>
//               </p>
              
//               {/* Show applicant type */}
//               {selectedAgent.applicantType && (
//                 <div className="mt-2">
//                   {selectedAgent.applicantType === 'independent' && (
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       Independent Agent
//                     </span>
//                   )}
//                   {selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'wfg' && (
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                       WFG Agent
//                     </span>
//                   )}
//                   {selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'other' && (
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
//                       Agent under MGA
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ✅ WFG Code Warning Box */}
//           {isWfgAgent && (
//             <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-lg">
//               <div className="flex items-start gap-2 mb-2">
//                 <ExclamationTriangleIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-purple-900">
//                     WFG Agent Verification
//                   </p>
//                   <p className="text-sm text-purple-700 mt-1">
//                     <strong>WFG Code:</strong> <span className="font-mono bg-white px-2 py-0.5 rounded">{selectedAgent.wfgCode}</span>
//                   </p>
//                   <p className="text-xs text-purple-600 mt-2">
//                     ⚠️ Please verify this WFG code with WFG before approving this application.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Admin Assignment Section (if needed) */}
//           {needsAssignment && (
//             <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg">
//               <div className="flex items-start gap-2 mb-3">
//                 <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 <div>
//                   <p className="text-sm font-medium text-yellow-900">
//                     Admin Assignment Required
//                   </p>
//                   <p className="text-xs text-yellow-700 mt-1">
//                     This is a public registration. Please assign credentials before verification.
//                   </p>
//                 </div>
//               </div>
              
//               <div className="space-y-3 mt-4">
//                 {/* Agent Code with Check */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Agent Code <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={adminAssignments.agentCode}
//                       onChange={(e) => {
//                         setAdminAssignments({
//                           ...adminAssignments,
//                           agentCode: e.target.value
//                         });
//                         // Reset availability when code changes
//                         if (agentCodeAvailability.lastChecked === e.target.value) return;
//                         // Reset if different
//                       }}
//                       placeholder="Enter unique agent code (e.g., AG12345)"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleCheckAgentCode}
//                       disabled={!adminAssignments.agentCode || agentCodeAvailability.status === 'checking'}
//                       className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
//                         agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'available'
//                           ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                           : agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'taken'
//                           ? 'bg-red-100 text-red-800 hover:bg-red-200'
//                           : 'bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed'
//                       }`}
//                     >
//                       {agentCodeAvailability.status === 'checking'
//                         ? 'Checking...'
//                         : agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'available'
//                         ? '✓ Available'
//                         : agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'taken'
//                         ? '✗ Taken'
//                         : 'Check'}
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     This will be the agent's unique identifier
//                   </p>
//                 </div>

//                 {/* Commission Percentage */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Commission Percentage <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       max="100"
//                       value={adminAssignments.commissionPercent}
//                       onChange={(e) => setAdminAssignments({
//                         ...adminAssignments,
//                         commissionPercent: e.target.value
//                       })}
//                       placeholder="e.g., 15.50"
//                       className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                     />
//                     <span className="absolute right-3 top-2.5 text-gray-500">%</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Agent's commission on each policy
//                   </p>
//                 </div>

//                 {/* ✅ MGA Assignment (for agents under MGA) */}
//                 {needsMgaAssignment && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Assign to MGA <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={mgaSearch}
//                       onChange={(e) => setMgaSearch(e.target.value)}
//                       placeholder="Search MGA codes..."
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//                     />
                    
//                     {mgasLoading && <p className="text-xs text-gray-500 mt-1">Loading MGAs...</p>}
//                     {mgasError && <p className="text-xs text-red-500 mt-1">{mgasError}</p>}
                    
//                     {mgaSearch.length > 0 && (
//                       mgas.length > 0 ? (
//                         <div className="mt-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md">
//                           {mgas.map((mgaCode) => (
//                             <label key={mgaCode} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name="mgaSelection"
//                                 checked={adminAssignments.mgaId === mgaCode}
//                                 onChange={() => setAdminAssignments({
//                                   ...adminAssignments,
//                                   mgaId: mgaCode
//                                 })}
//                                 className="mr-2"
//                               />
//                               <span className="text-sm">{mgaCode}</span>
//                             </label>
//                           ))}
//                         </div>
//                       ) : !mgasLoading && (
//                         <p className="text-xs text-gray-500 mt-1">No MGAs found matching "{mgaSearch}"</p>
//                       )
//                     )}
                    
//                     {adminAssignments.mgaId && (
//                       <div className="mt-2 bg-green-50 border border-green-200 rounded px-2 py-1 text-sm">
//                         <strong>Selected MGA:</strong> {adminAssignments.mgaId}
//                       </div>
//                     )}
                    
//                     <p className="text-xs text-gray-500 mt-1">
//                       This agent will work under the selected MGA
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
          
//           {/* Verification Valid Until */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Verification Valid Until <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               value={validityDate}
//               onChange={(e) => setValidityDate(e.target.value)}
//               min={new Date().toISOString().split('T')[0]}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B00B7]"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Agent verification will expire after this date
//             </p>
//           </div>

//           {/* Documents Preview (if applicable) */}
//           {hasDocuments && (selectedAgent.docLink1 || selectedAgent.docLink2 || selectedAgent.docLink3) && (
//             <div className="bg-gray-50 p-3 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
//               <div className="flex flex-wrap gap-2">
//                 {selectedAgent.docLink1 && (
//                   <button
//                     onClick={() => openDocument(selectedAgent.docLink1)}
//                     className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
//                   >
//                     <DocumentIcon className="h-4 w-4" />
//                     Doc 1
//                   </button>
//                 )}
//                 {selectedAgent.docLink2 && (
//                   <button
//                     onClick={() => openDocument(selectedAgent.docLink2)}
//                     className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
//                   >
//                     <DocumentIcon className="h-4 w-4" />
//                     Doc 2
//                   </button>
//                 )}
//                 {selectedAgent.docLink3 && (
//                   <button
//                     onClick={() => openDocument(selectedAgent.docLink3)}
//                     className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
//                   >
//                     <DocumentIcon className="h-4 w-4" />
//                     Doc 3
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex space-x-3 mt-6 pt-4 border-t">
//             <button
//               onClick={handleVerifySubmit}
//               disabled={verifying}
//               className="flex-1 bg-[#2B00B7] text-white px-4 py-2.5 rounded-md hover:bg-[#1e007f] disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
//             >
//               {verifying ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Verifying...
//                 </span>
//               ) : (
//                 'Verify & Activate Agent'
//               )}
//             </button>
//             <button
//               onClick={onClose}
//               disabled={verifying}
//               className="flex-1 bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// ======================================================


import React, { useEffect, useState } from 'react';
import { useGetVerificationRequests } from '../../hooks/agent-verification/useGetVerificationRequests';
import { useVerifyAgent } from '../../hooks/agent-verification/useVerifyAgent';
import { CheckCircleIcon, ClockIcon, DocumentIcon, UserIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { API_BASE } from '../../utils/urls';
import { useMgaCodes, MgaOption } from '../../hooks/agent-verification/useMgaCodes'; 




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
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      setAgentCodeAvailability({
        status: data.available ? 'available' : 'taken',
        lastChecked: adminAssignments.agentCode,
      });
    } catch (error) {
      alert('Failed to check agent code availability');
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
    // if (selectedAgent.applicantType === 'under_mga' && 
    //     selectedAgent.mgaType === 'other' && 
    //     !adminAssignments.mgaId) {
    //   alert('Please select an MGA for this agent');
    //   return;
    // }

    if (selectedAgent.applicantType === 'under_mga' && !adminAssignments.mgaId) {
  alert('Please select an MGA for this agent');
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
    // if (selectedAgent.applicantType === 'under_mga' && 
    //     selectedAgent.mgaType === 'other' && 
    //     adminAssignments.mgaId) {
    //   payload.mgaId = adminAssignments.mgaId;
      
    //   console.log('═══════════════════════════════════');
    //   console.log('Sending MGA Assignment');
    //   console.log('mgaId:', payload.mgaId);
    //   console.log('═══════════════════════════════════');
    // }

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
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Verification Requests</h1>
      
      <div className="bg-white rounded-lg shadow">
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {agent.firstName} {agent.lastName}
                            </h3>
                            {getApplicantTypeBadge(agent)}
                          </div>
                          <div className="mt-1 text-sm text-gray-500 space-y-1">
                            <p>Email: {agent.email}</p>
                            <p>Agent Code: {agent.agentCode}</p>
                            {agent.company && <p>Company: {agent.company}</p>}
                            
                            {agent.applicantType === 'under_mga' && agent.mgaType === 'wfg' && agent.wfgCode && (
                              <div className="bg-purple-50 border border-purple-200 rounded px-2 py-1 inline-block mt-1">
                                <strong className="text-purple-900">WFG Code:</strong>{' '}
                                <span className="text-purple-700 font-mono">{agent.wfgCode}</span>
                              </div>
                            )}
                            
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
                              {agent.documentsUploadedAt 
                                ? `Uploaded: ${format(new Date(agent.documentsUploadedAt), 'MMM dd, yyyy')}`
                                : agent.applicantType === 'under_mga' && agent.mgaType === 'wfg'
                                ? 'WFG Code Provided'
                                : 'Not uploaded'}
                            </p>
                            
                            {/* {hasDocuments(agent) && (
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
                            )} */}

                            {hasDocuments(agent) && (
  <div className="flex justify-end space-x-2 mb-3">
    {agent.docLink1 && (
      <button
        onClick={() => openDocument(agent.docLink1)}
        className="text-[#2B00B7] hover:text-[#1e007f] flex items-center gap-1 text-xs"
        title={getDocumentLabel(agent.docType1)}
      >
        <DocumentIcon className="h-5 w-5" />
        <span className="hidden sm:inline">{getDocumentLabel(agent.docType1)}</span>
      </button>
    )}
    {agent.docLink2 && (
      <button
        onClick={() => openDocument(agent.docLink2)}
        className="text-[#2B00B7] hover:text-[#1e007f] flex items-center gap-1 text-xs"
        title={getDocumentLabel(agent.docType2)}
      >
        <DocumentIcon className="h-5 w-5" />
        <span className="hidden sm:inline">{getDocumentLabel(agent.docType2)}</span>
      </button>
    )}
    {agent.docLink3 && (
      <button
        onClick={() => openDocument(agent.docLink3)}
        className="text-[#2B00B7] hover:text-[#1e007f] flex items-center gap-1 text-xs"
        title={getDocumentLabel(agent.docType3)}
      >
        <DocumentIcon className="h-5 w-5" />
        <span className="hidden sm:inline">{getDocumentLabel(agent.docType3)}</span>
      </button>
    )}
    {/* 4th document */}
    {agent.docLink4 && (
      <button
        onClick={() => openDocument(agent.docLink4)}
        className="text-[#2B00B7] hover:text-[#1e007f] flex items-center gap-1 text-xs"
        title={getDocumentLabel(agent.docType4)}
      >
        <DocumentIcon className="h-5 w-5" />
        <span className="hidden sm:inline">{getDocumentLabel(agent.docType4)}</span>
      </button>
    )}
  </div>
)}
                            
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
// const needsMgaAssignment = 
//   selectedAgent.applicantType === 'under_mga' && 
//   selectedAgent.mgaType === 'other';

const needsMgaAssignment = 
  selectedAgent.applicantType === 'under_mga' && 
  (selectedAgent.mgaType === 'other' || selectedAgent.mgaType === null);
  // const isWfgAgent = selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'wfg';
  const isWfgAgent = selectedAgent.applicantType === 'wfg';
  // const hasDocuments = selectedAgent.applicantType === 'independent' || 
  //                     (selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'other');
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

                {/* Commiison Percentage  */}

                {!isWfgAgent && (

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

                )}

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
          
          {/* <div>
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
          </div> */}

          {/* ✅ UPDATED: Hide date field for WFG agents */}
{!isWfgAgent && (
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
)}

          {/* {hasDocuments && (selectedAgent.docLink1 || selectedAgent.docLink2 || selectedAgent.docLink3) && (
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
          )} */}

          {hasDocuments && (selectedAgent.docLink1 || selectedAgent.docLink2 || selectedAgent.docLink3 || selectedAgent.docLink4) && (
  <div className="bg-gray-50 p-3 rounded-lg">
    <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
    <div className="flex flex-wrap gap-2">
      {selectedAgent.docLink1 && (
        <button
          onClick={() => openDocument(selectedAgent.docLink1)}
          className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
        >
          <DocumentIcon className="h-4 w-4" />
          {getDocumentLabel(selectedAgent.docType1)}
        </button>
      )}
      {selectedAgent.docLink2 && (
        <button
          onClick={() => openDocument(selectedAgent.docLink2)}
          className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
        >
          <DocumentIcon className="h-4 w-4" />
          {getDocumentLabel(selectedAgent.docType2)}
        </button>
      )}
      {selectedAgent.docLink3 && (
        <button
          onClick={() => openDocument(selectedAgent.docLink3)}
          className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
        >
          <DocumentIcon className="h-4 w-4" />
          {getDocumentLabel(selectedAgent.docType3)}
        </button>
      )}
      {/* NEW: Add 4th document */}
      {selectedAgent.docLink4 && (
        <button
          onClick={() => openDocument(selectedAgent.docLink4)}
          className="flex items-center gap-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
        >
          <DocumentIcon className="h-4 w-4" />
          {getDocumentLabel(selectedAgent.docType4)}
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