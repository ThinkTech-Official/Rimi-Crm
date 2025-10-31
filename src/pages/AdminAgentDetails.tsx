import { useState } from "react";
import { FaUser, FaEdit, FaBan, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
// import { PoliciesTable, QuotesTable } from "./Tables";
import { useAgentDetails } from "../hooks/admin-dashboard"; // Using admin hook
import { PoliciesTable, QuotesTable } from "../components/Tables";

const AdminAgentDetails = () => {
  const [pPage, setPPage] = useState(1);
  const [qPage, setQPage] = useState(1);
  const limit = 10;
  
  const { agentCode } = useParams<{ agentCode: string }>();
  
  //   Use admin hook (calls /admin/agents/:agentCode)
  const { data: agentData, isLoading, error } = useAgentDetails(agentCode || "");
  
  const [filter, setFilter] = useState("Policies");
  const toggleTableFilter = (option: string) => setFilter(option);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-text-secondary">Loading agent details...</div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !agentData) {
    return (
      <div className="px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">
            Failed to load agent details
          </div>
        </div>
      </div>
    );
  }

  // Extract recent policies and quotes from agent data
  const recentPolicies = agentData.policy || [];
  const recentQuotes = agentData.quotes || [];

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
                <span className="text-text-primary font-semibold">Email:</span>
                <span className="text-text-secondary">{agentData.email}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Agent Code:</span>
                <span className="text-text-secondary">{agentData.agentCode}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Status:</span>
                <span className={`font-semibold ${
                  agentData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {agentData.status}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Commission:</span>
                <span className="text-text-secondary">{agentData.commissionPercent}%</span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Joined:</span>
                <span className="text-text-secondary">
                  {new Date(agentData.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-text-primary font-semibold">Valid Until:</span>
                <span className="text-text-secondary">
                  {agentData.validUpto 
                    ? new Date(agentData.validUpto).toLocaleDateString()
                    : 'N/A'
                  }
                </span>
              </div>

              {/*   Admin-specific: Show MGA info */}
              {agentData.mga && (
                <div className="flex gap-2 col-span-2">
                  <span className="text-text-primary font-semibold">MGA:</span>
                  <span className="text-text-secondary">
                    {agentData.mga.firstName} {agentData.mga.lastName} ({agentData.mga.agentCode})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*   Admin-specific: Action buttons */}
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {/* TODO: Edit agent */}}
          >
            <FaEdit /> Edit
          </button>
          
          {agentData.status === 'ACTIVE' ? (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {/* TODO: Suspend agent */}}
            >
              <FaBan /> Suspend
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => {/* TODO: Activate agent */}}
            >
              <FaCheckCircle /> Activate
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
            {agentData.commissionPercent}%
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-text-primary text-sm font-semibold mb-1">Account Status</div>
          <div className={`text-2xl font-bold ${
            agentData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
          }`}>
            {agentData.status}
          </div>
        </div>
      </div>

      {/*   Admin-specific: Commission Summary */}
      {agentData.commissionSummary && (
        <div className="mb-6 bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Commission Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(agentData.commissionSummary).map(([status, data]: [string, any]) => (
              <div key={status} className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-text-primary capitalize">{status}</div>
                <div className="text-xl font-bold">${data.total?.toLocaleString()}</div>
                <div className="text-xs text-text-secondary">{data.count} commissions</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="relative mt-6">
        <div className="px-2 sm:px-4 sm:py-3 absolute -top-2 right-0">
          <label className="inline-flex items-center mr-4 text-[#4B465C] opacity-80">
            <input
              type="radio"
              name="filter"
              checked={filter === "Policies"}
              onChange={() => toggleTableFilter("Policies")}
              className="form-radio cursor-pointer checked:accent-primary"
            />
            <span className="ml-2 capitalize">Policies ({recentPolicies.length})</span>
          </label>
          <label className="inline-flex items-center text-[#4B465C] opacity-80">
            <input
              type="radio"
              name="filter"
              checked={filter === "Quotes"}
              onChange={() => toggleTableFilter("Quotes")}
              className="form-radio cursor-pointer checked:accent-primary"
            />
            <span className="ml-2 capitalize">Quotes ({recentQuotes.length})</span>
          </label>
          <label className="inline-flex items-center ml-4 text-[#4B465C] opacity-80">
            <input
              type="radio"
              name="filter"
              checked={filter === "Commissions"}
              onChange={() => toggleTableFilter("Commissions")}
              className="form-radio cursor-pointer checked:accent-primary"
            />
            <span className="ml-2 capitalize">Commissions</span>
          </label>
        </div>
      </div>

      {/* Tables */}
      <div className="mt-12">
        {filter === "Policies" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Recent Policies</h3>
            <PoliciesTable
              data={recentPolicies}
              loading={false}
              pError={null}
            />
          </div>
        )}
        
        {filter === "Quotes" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Recent Quotes</h3>
            <QuotesTable
              data={recentQuotes}
              loading={false}
              qError={null}
            />
          </div>
        )}

        {filter === "Commissions" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Recent Commissions</h3>
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Policy #</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">MGA Share</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Agent Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {agentData.agentCommissions?.map((commission: any) => (
                    <tr key={commission.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        {new Date(commission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">{commission.policyNumber}</td>
                      <td className="px-4 py-3 text-sm font-semibold">
                        ${commission.commissionAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          commission.status === 'paid' 
                            ? 'bg-green-100 text-green-800'
                            : commission.status === 'verified'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {commission.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        ${commission.mgaShare?.toLocaleString() || '0'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        ${commission.agentShare?.toLocaleString() || '0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAgentDetails;