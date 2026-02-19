// import { useState } from "react";
// import { FaUser, FaEdit, FaBan, FaCheckCircle } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// // import { PoliciesTable, QuotesTable } from "./Tables";
// import { useAgentDetails } from "../hooks/admin-dashboard"; // Using admin hook
// import { PoliciesTable, QuotesTable } from "../components/Tables";

// const AdminAgentDetails = () => {
//   const [pPage, setPPage] = useState(1);
//   const [qPage, setQPage] = useState(1);
//   const limit = 10;
  
//   const { agentCode } = useParams<{ agentCode: string }>();
  
//   //   Use admin hook (calls /admin/agents/:agentCode)
//   const { data: agentData, isLoading, error } = useAgentDetails(agentCode || "");
  
//   const [filter, setFilter] = useState("Policies");
//   const toggleTableFilter = (option: string) => setFilter(option);

//   // Handle loading state
//   if (isLoading) {
//     return (
//       <div className="px-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-text-secondary">Loading agent details...</div>
//         </div>
//       </div>
//     );
//   }

//   // Handle error state
//   if (error || !agentData) {
//     return (
//       <div className="px-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-red-500">
//             Failed to load agent details
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Extract recent policies and quotes from agent data
//   const recentPolicies = agentData.policy || [];
//   const recentQuotes = agentData.quotes || [];

//   return (
//     <div className="px-8">
//       {/* Header with actions */}
//       <div className="flex justify-between items-start mb-6">
//         <div className="flex gap-4 items-start">
//           <FaUser className="text-4xl text-text-primary mt-2" />
//           <div className="flex flex-col gap-2">
//             <h1 className="text-2xl font-bold text-text-primary">
//               {agentData.firstName} {agentData.lastName}
//             </h1>
            
//             <div className="grid grid-cols-2 gap-x-8 gap-y-2">
//               <div className="flex gap-2">
//                 <span className="text-text-primary font-semibold">Email:</span>
//                 <span className="text-text-secondary">{agentData.email}</span>
//               </div>
              
//               <div className="flex gap-2">
//                 <span className="text-text-primary font-semibold">Agent Code:</span>
//                 <span className="text-text-secondary">{agentData.agentCode}</span>
//               </div>
              
//               <div className="flex gap-2">
//                 <span className="text-text-primary font-semibold">Status:</span>
//                 <span className={`font-semibold ${
//                   agentData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {agentData.status}
//                 </span>
//               </div>
              
//               <div className="flex gap-2">
//                 <span className="text-text-primary font-semibold">Commission:</span>
//                 <span className="text-text-secondary">{agentData.commissionPercent}%</span>
//               </div>
              
//               <div className="flex gap-2">
//                 <span className="text-text-primary font-semibold">Joined:</span>
//                 <span className="text-text-secondary">
//                   {new Date(agentData.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
              
//               <div className="flex gap-2">
//                 <span className="text-text-primary font-semibold">Valid Until:</span>
//                 <span className="text-text-secondary">
//                   {agentData.validUpto 
//                     ? new Date(agentData.validUpto).toLocaleDateString()
//                     : 'N/A'
//                   }
//                 </span>
//               </div>

//               {/*   Admin-specific: Show MGA info */}
//               {agentData.mga && (
//                 <div className="flex gap-2 col-span-2">
//                   <span className="text-text-primary font-semibold">MGA:</span>
//                   <span className="text-text-secondary">
//                     {agentData.mga.firstName} {agentData.mga.lastName} ({agentData.mga.agentCode})
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/*   Admin-specific: Action buttons */}
//         <div className="flex gap-2">
//           <button
//             className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => {/* TODO: Edit agent */}}
//           >
//             <FaEdit /> Edit
//           </button>
          
//           {agentData.status === 'ACTIVE' ? (
//             <button
//               className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               onClick={() => {/* TODO: Suspend agent */}}
//             >
//               <FaBan /> Suspend
//             </button>
//           ) : (
//             <button
//               className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               onClick={() => {/* TODO: Activate agent */}}
//             >
//               <FaCheckCircle /> Activate
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <div className="text-text-primary text-sm font-semibold mb-1">Total Quotes</div>
//           <div className="text-2xl font-bold text-blue-600">
//             {agentData._count?.quotes || 0}
//           </div>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <div className="text-text-primary text-sm font-semibold mb-1">Total Policies</div>
//           <div className="text-2xl font-bold text-green-600">
//             {agentData._count?.policy || 0}
//           </div>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <div className="text-text-primary text-sm font-semibold mb-1">Commission Rate</div>
//           <div className="text-2xl font-bold text-purple-600">
//             {agentData.commissionPercent}%
//           </div>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <div className="text-text-primary text-sm font-semibold mb-1">Account Status</div>
//           <div className={`text-2xl font-bold ${
//             agentData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
//           }`}>
//             {agentData.status}
//           </div>
//         </div>
//       </div>

//       {/*   Admin-specific: Commission Summary */}
//       {agentData.commissionSummary && (
//         <div className="mb-6 bg-white p-4 rounded-lg border">
//           <h3 className="text-lg font-semibold mb-3">Commission Summary</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {Object.entries(agentData.commissionSummary).map(([status, data]: [string, any]) => (
//               <div key={status} className="bg-gray-50 p-3 rounded">
//                 <div className="text-sm text-text-primary capitalize">{status}</div>
//                 <div className="text-xl font-bold">${data.total?.toLocaleString()}</div>
//                 <div className="text-xs text-text-secondary">{data.count} commissions</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="relative mt-6">
//         <div className="px-2 sm:px-4 sm:py-3 absolute -top-2 right-0">
//           <label className="inline-flex items-center mr-4 text-[#4B465C] opacity-80">
//             <input
//               type="radio"
//               name="filter"
//               checked={filter === "Policies"}
//               onChange={() => toggleTableFilter("Policies")}
//               className="form-radio cursor-pointer checked:accent-primary"
//             />
//             <span className="ml-2 capitalize">Policies ({recentPolicies.length})</span>
//           </label>
//           <label className="inline-flex items-center text-[#4B465C] opacity-80">
//             <input
//               type="radio"
//               name="filter"
//               checked={filter === "Quotes"}
//               onChange={() => toggleTableFilter("Quotes")}
//               className="form-radio cursor-pointer checked:accent-primary"
//             />
//             <span className="ml-2 capitalize">Quotes ({recentQuotes.length})</span>
//           </label>
//           <label className="inline-flex items-center ml-4 text-[#4B465C] opacity-80">
//             <input
//               type="radio"
//               name="filter"
//               checked={filter === "Commissions"}
//               onChange={() => toggleTableFilter("Commissions")}
//               className="form-radio cursor-pointer checked:accent-primary"
//             />
//             <span className="ml-2 capitalize">Commissions</span>
//           </label>
//         </div>
//       </div>

//       {/* Tables */}
//       <div className="mt-12">
//         {filter === "Policies" && (
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Recent Policies</h3>
//             <PoliciesTable
//               data={recentPolicies}
//               loading={false}
//               pError={null}
//             />
//           </div>
//         )}
        
//         {filter === "Quotes" && (
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Recent Quotes</h3>
//             <QuotesTable
//               data={recentQuotes}
//               loading={false}
//               qError={null}
//             />
//           </div>
//         )}

//         {filter === "Commissions" && (
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Recent Commissions</h3>
//             <div className="bg-white rounded-lg border overflow-hidden">
//               <table className="min-w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold">Policy #</th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold">MGA Share</th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold">Agent Share</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {agentData.agentCommissions?.map((commission: any) => (
//                     <tr key={commission.id} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 text-sm">
//                         {new Date(commission.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-3 text-sm">{commission.policyNumber}</td>
//                       <td className="px-4 py-3 text-sm font-semibold">
//                         ${commission.commissionAmount.toLocaleString()}
//                       </td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className={`px-2 py-1 rounded text-xs ${
//                           commission.status === 'paid' 
//                             ? 'bg-green-100 text-green-800'
//                             : commission.status === 'verified'
//                             ? 'bg-blue-100 text-blue-800'
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {commission.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">
//                         ${commission.mgaShare?.toLocaleString() || '0'}
//                       </td>
//                       <td className="px-4 py-3 text-sm">
//                         ${commission.agentShare?.toLocaleString() || '0'}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminAgentDetails;



// =====================================



import { useState } from "react";
import { FaUser, FaEdit, FaBan, FaCheckCircle, FaCoins, FaSpinner, FaUndo, FaArrowUp, FaArrowDown, FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAgentDetails } from "../hooks/admin-dashboard";
import { PoliciesTable, QuotesTable } from "../components/Tables";
import { useUpdateCommissionStatus, useBulkUpdateCommissionStatus, useMarkCommissionsAsPaid } from "../hooks/admin-dashboard/useCommission";
import { CommissionsTable } from "../components/CommissionsTable";
import Spinner from "../components/Spinner";

const AdminAgentDetails = () => {
  const [pPage, setPPage] = useState(1);
  const { t } = useLanguage();
  const [qPage, setQPage] = useState(1);
  const limit = 10;
  
  const { agentCode } = useParams<{ agentCode: string }>();
  
  const { data: agentData, isLoading, error, refetch } = useAgentDetails(agentCode || "");
  
  const [filter, setFilter] = useState("Policies");
  const [selectedCommissionIds, setSelectedCommissionIds] = useState<string[]>([]);
  
  const toggleTableFilter = (option: string) => setFilter(option);

  // ✅ Use custom hooks
  const updateCommissionStatus = useUpdateCommissionStatus();
  const bulkUpdateStatus = useBulkUpdateCommissionStatus();
  const markAsPaid = useMarkCommissionsAsPaid();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="px-8 flex flex-col items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8 mx-auto mb-2" />
        <div className="text-text-secondary">{t("Loading agent details...")}</div>
      </div>
    );
  }

  if (error || !agentData) {
    return (
      <div className="px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">{t("Failed to load agent details")}</div>
        </div>
      </div>
    );
  }
  // Extract data
  const recentPolicies = agentData.policy || [];
  const recentQuotes = agentData.quotes || [];
  const commissions = agentData.agentCommissions || [];
  
  // ✅ Calculate commission metrics
  const isUnderMGA = !!agentData.mgaId;
  
  const positiveCommissions = commissions.filter(
    (c: any) => !c.isReversed && !['reversed', 'partially_reversed'].includes(c.status)
  );
  
  const reversalCommissions = commissions.filter(
    (c: any) => ['reversed', 'partially_reversed'].includes(c.status) || c.reversalOf
  );
  
  const totalEarned = positiveCommissions.reduce(
    (sum: number, c: any) => sum + (isUnderMGA ? (c.agentShare || 0) : c.commissionAmount),
    0
  );
  
  const totalReversed = reversalCommissions.reduce(
    (sum: number, c: any) => sum + Math.abs(isUnderMGA ? (c.agentShare || 0) : c.commissionAmount),
    0
  );
  
  const netCommissions = totalEarned - totalReversed;
  
  // Status breakdown
  const statusGroups = commissions.reduce((acc: any, c: any) => {
    if (!acc[c.status]) {
      acc[c.status] = {
        count: 0,
        total: 0,
      };
    }
    acc[c.status].count++;
    acc[c.status].total += isUnderMGA ? (c.agentShare || 0) : c.commissionAmount;
    return acc;
  }, {});

  // ✅ Helper functions for commission management
  const handleSelectAllCommissions = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Only select commissions that can be acted upon
      const actionableCommissions = commissions
        .filter((c: any) => !['reversed', 'partially_reversed', 'paid', 'paid_to_agent'].includes(c.status))
        .map((c: any) => c.id);
      setSelectedCommissionIds(actionableCommissions);
    } else {
      setSelectedCommissionIds([]);
    }
  };

  const handleSelectCommission = (id: string) => {
    setSelectedCommissionIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedCommissionsTotal = commissions
    .filter((c: any) => selectedCommissionIds.includes(c.id))
    .reduce((sum: number, c: any) => sum + c.commissionAmount, 0);

  // ✅ Handle bulk actions with callbacks to clear selections
  const handleBulkApprove = () => {
    bulkUpdateStatus.mutate(
      { commissionIds: selectedCommissionIds, newStatus: 'approved' },
      {
        onSuccess: () => {
          setSelectedCommissionIds([]);
          refetch();
        }
      }
    );
  };

  const handleMarkAsPaid = () => {
    markAsPaid.mutate(
      { commissionIds: selectedCommissionIds },
      {
        onSuccess: () => {
          setSelectedCommissionIds([]);
          refetch();
        }
      }
    );
  };

  const handleUpdateStatus = (commissionId: string, newStatus: string) => {
    updateCommissionStatus.mutate(
      { commissionId, newStatus },
      {
        onSuccess: () => {
          refetch();
        }
      }
    );
  };

  return (
    <div className="px-8">
      {/* Header with actions */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-start">
          <FaUser className="text-4xl text-text-primary mt-2" />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-text-primary">
              {agentData.firstName} {agentData.lastName}
            </h1>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">{t("Email")}:</span>
                <span className="text-text-secondary">{agentData.email}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">{t("Agent Code")}:</span>
                <span className="text-text-secondary">{agentData.agentCode}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">{t("Status")}:</span>
                <span className={`font-semibold ${
                  agentData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {t(agentData.status)}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">{t("Commission")}:</span>
                <span className="text-text-secondary">
                  {isUnderMGA && agentData.mga ? (
                    <>
                      {agentData.mga.commissionPercent}% 
                      <span className="text-xs text-gray-500"> ({t("MGA rate")})</span>
                    </>
                  ) : (
                    `${agentData.commissionPercent}%`
                  )}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">{t("Joined")}:</span>
                <span className="text-text-secondary">
                  {new Date(agentData.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">{t("Valid Until")}:</span>
                <span className="text-text-secondary">
                  {agentData.validUpto 
                    ? new Date(agentData.validUpto).toLocaleDateString()
                    : t("N/A")
                  }
                </span>
              </div>

              {agentData.mga && (
                <>
                  <div className="flex gap-2 col-span-2">
                    <span className="text-text-primary font-semibold">{t("MGA")}:</span>
                    <span className="text-text-secondary">
                      {agentData.mga.firstName} {agentData.mga.lastName} ({agentData.mga.agentCode})
                    </span>
                  </div>
                  <div className="flex gap-2 col-span-2">
                    <span className="text-text-primary font-semibold">{t("MGA Override:")}</span>
                    <span className="text-text-secondary">
                      {agentData.mga.mgaOverridePercent}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* <div className="flex gap-2">
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => {}}
          >
            <FaEdit /> Edit
          </button>
          
          {agentData.status === 'ACTIVE' ? (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-all duration-200"
              onClick={() => {}}
            >
              <FaBan /> Suspend
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-green-600 text-white cursor-pointer hover:bg-green-700 transition-all duration-200 flex items-center gap-2"
              onClick={() => {}}
            >
              <FaCheckCircle /> Activate
            </button>
          )}
        </div> */}
      </div>

      {/*  Commission Flow Summary */}
      <div className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 hidden">
        <div className="flex items-center gap-2 mb-4">
          <FaCoins className="text-2xl text-blue-600" />
          <h3 className="text-xl font-bold text-text-primary">
            {t("Commission Flow")} {isUnderMGA && <span className="text-sm text-gray-600">{t("(Agent Share Only)")}</span>}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Earned */}
          <div className="bg-white p-4 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">{t("Total Earned")}</span>
              <FaArrowUp className="text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">
              ${totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {positiveCommissions.length} {positiveCommissions.length !== 1 ? t("commissions") : t("commission")}
            </div>
          </div>

          {/* Total Reversed */}
          <div className="bg-white p-4 rounded-lg border-2 border-red-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">{t("Total Reversed")}</span>
              <FaArrowDown className="text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-600">
              -${totalReversed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {reversalCommissions.length} {reversalCommissions.length !== 1 ? t("reversals") : t("reversal")}
            </div>
          </div>

          {/* Net Commissions */}
          <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">{t("Net Commission")}</span>
              <FaCoins className="text-purple-600" />
            </div>
            <div className={`text-3xl font-bold ${netCommissions >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
              ${netCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {t("After reversals")}
            </div>
          </div>

          {/* Pending/In Progress */}
          <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">{t("Pending")}</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-3xl font-bold text-yellow-600">
              ${(
                (statusGroups['pending']?.total || 0) + 
                (statusGroups['verified']?.total || 0) + 
                (statusGroups['approved']?.total || 0)
              ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {t("Awaiting payment")}
            </div>
          </div>
        </div>

        {/*  MGA Split Breakdown (if agent under MGA) */}
         {isUnderMGA && agentData.mga && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm font-semibold text-blue-900 mb-2">
              💼 {t("MGA Commission Split Structure")}
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">{t("Total Commission Rate:")}</span>
                <div className="font-bold text-blue-900">{agentData.mga.commissionPercent}%</div>
              </div>
              <div>
                <span className="text-gray-600">{t("MGA Override:")}</span>
                <div className="font-bold text-purple-700">{agentData.mga.mgaOverridePercent}%</div>
              </div>
              <div>
                <span className="text-gray-600">{t("Agent Receives:")}</span>
                <div className="font-bold text-green-700">
                  {(agentData.mga.commissionPercent * (1 - agentData.mga.mgaOverridePercent / 100)).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-text-primary text-sm font-semibold mb-1">Total Quotes</div>
          <div className="text-2xl font-bold text-blue-600">
            {agentData._count?.quotes || 0}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-text-primary text-sm font-semibold mb-1">Total Policies</div>
          <div className="text-2xl font-bold text-green-600">
            {agentData._count?.policy || 0}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-text-primary text-sm font-semibold mb-1">Commission Rate</div>
          <div className="text-2xl font-bold text-purple-600">
            {isUnderMGA && agentData.mga 
              ? `${agentData.mga.commissionPercent}%` 
              : `${agentData.commissionPercent}%`
            }
          </div>
          {isUnderMGA && (
            <div className="text-xs text-gray-500 mt-1">MGA rate</div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-text-primary text-sm font-semibold mb-1">Account Status</div>
          <div className={`text-2xl font-bold ${
            agentData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
          }`}>
            {agentData.status}
          </div>
        </div>
      </div> */}

      {/*  Commission Status Breakdown */}
      {/* {Object.keys(statusGroups).length > 0 && (
        <div className="mb-6 bg-white p-6 rounded-md border border-inputBorder">
          <h3 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
            <FaCoins className="text-primary/70" />
            Commission Status Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Object.entries(statusGroups)
              .sort(([a], [b]) => {
                const order = ['pending', 'verified', 'approved', 'paid', 'paid_to_mga', 'paid_to_agent', 'reversed', 'partially_reversed'];
                return order.indexOf(a) - order.indexOf(b);
              })
              .map(([status, data]: [string, any]) => {
                const isNegative = ['reversed', 'partially_reversed'].includes(status);
                const colorMap: Record<string, string> = {
                  'paid': 'bg-green-500',
                  'paid_to_agent': 'bg-green-500',
                  'pending': 'bg-yellow-500',
                  'approved': 'bg-purple-500',
                  'verified': 'bg-blue-500',
                  'paid_to_mga': 'bg-orange-500',
                  'reversed': 'bg-red-500',
                  'partially_reversed': 'bg-red-400'
                };
                
                const bgColor = colorMap[status] || 'bg-gray-500';
                
                return (
                  <div key={status} className="relative group overflow-hidden bg-white rounded-xl border border-inputBorder hover:shadow-md transition-all duration-200">
                    <div className={`h-1 w-full ${bgColor}`}></div>
                    <div className="p-4">
                      <div className="text-xs font-bold text-[#808080] uppercase tracking-wider mb-1 flex items-center justify-between">
                        {status.replace(/_/g, ' ')}
                        {isNegative && <FaUndo className="text-red-500 text-[10px]" />}
                      </div>
                      <div className={`text-xl font-bold truncate ${
                        isNegative ? 'text-red-600' : 'text-text-primary'
                      }`}>
                        {isNegative && '-'}${Math.abs(data.total).toLocaleString('en-US', { 
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2 
                        })}
                      </div>
                      <div className="text-[14px] font-medium text-[#AAA9A9] mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        {data.count} transaction{data.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )} */}

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
              {t("Policies")} ({recentPolicies.length})
            </button>
            <button
              onClick={() => toggleTableFilter("Quotes")}
              className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${
                filter === "Quotes"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("Quotes")} ({recentQuotes.length})
            </button>
            <button
              onClick={() => toggleTableFilter("Commissions")}
              className={`pb-3 px-1 font-medium cursor-pointer transition-colors relative ${
                filter === "Commissions"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("Commissions")} ({commissions.length})
            </button>
        </div>
      </div>

      {/* Tables */}
      <div className="mt-6">
        {filter === "Policies" && (
          <div>
            <PoliciesTable
              data={recentPolicies}
              loading={false}
              pError={null}
            />
          </div>
        )}
        
        {filter === "Quotes" && (
          <div>
            <QuotesTable
              data={recentQuotes}
              loading={false}
              qError={null}
            />
          </div>
        )}

        {filter === "Commissions" && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{t("Commission History")}</h3>
              
              {/* ✅ Bulk Actions */}
              {selectedCommissionIds.length > 0 && (
                <div className="flex gap-2 items-center bg-violet-50 px-4 py-2 mt-5 border border-violet-200">
                  <span className="text-sm font-semibold">
                    {selectedCommissionIds.length} {t("selected")} (${selectedCommissionsTotal.toFixed(2)})
                  </span>
                  <button
                    onClick={handleBulkApprove}
                    disabled={bulkUpdateStatus.isPending}
                    className="px-3 py-1 bg-green-500 text-white text-sm hover:bg-green-600 disabled:opacity-50 flex items-center gap-1 cursor-pointer transition-all duration-200"
                  >
                    {bulkUpdateStatus.isPending ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaCheck />
                    )}
                    {t("Approve")}
                  </button>
                  <button
                    onClick={handleMarkAsPaid}
                    disabled={markAsPaid.isPending}
                    className="px-3 py-1 bg-purple-500 text-white text-sm hover:bg-purple-600 disabled:opacity-50 flex items-center gap-1 cursor-pointer transition-all duration-200"
                  >
                    {markAsPaid.isPending ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaCheck />
                    )}
                    {t("Mark Paid")}
                  </button>
                  <button
                    onClick={() => setSelectedCommissionIds([])}
                    className="px-3 py-1 bg-gray-500 text-white text-sm hover:bg-gray-600 cursor-pointer transition-all duration-200"
                  >
                    {t("Clear")}
                  </button>
                </div>
              )}
            </div>
            
            <CommissionsTable
              data={commissions}
              loading={isLoading}
              showCustomer = {false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAgentDetails;