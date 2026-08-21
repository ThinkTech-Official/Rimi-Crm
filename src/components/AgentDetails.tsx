// import { useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { PoliciesTable, QuotesTable } from "./Tables";
// import { usePolicies } from "../hooks/agent-dashboard/usePolicies";
// import { useQuotes } from "../hooks/agent-dashboard/useQuotes";

// const AgentDetails = () => {
//   const [pPage, setPPage] = useState(1);
//   const [qPage, setQPage] = useState(1);
//   const limit = 10; 
//   const {
//     data: policies,
//     loading: pLoading,
//     error: pError,
//   } = usePolicies(pPage, limit);
//   const {
//     data: quotes,
//     loading: qLoading,
//     error: qError,
//   } = useQuotes(qPage, limit);
//   const agentCode = useParams<{ agentCode: string }>().agentCode;
//   console.log(agentCode);
//   const [filter, setFilter] = useState("Policies");
//   const toggleTableFilter = (option: string) => setFilter(option);
//   return (
//     <div className="px-8">
//       {/* agent details */}
//       <div className="flex gap-4 items-center">
//         <FaUser className="text-3xl text-text-primary" />
//         <div className="flex flex-col">
//           <div className="flex gap-2">
//             <div className="text-text-primary font-semibold">Name:</div>
//             <div className="text-text-secondary">John Doe</div>
//           </div>
//           <div className="flex gap-2">
//             <div className="text-text-primary font-semibold">Email:</div>
//             <div className="text-text-secondary">Johndoe@gmail.com</div>
//           </div>
//           <div className="flex gap-2">
//             <div className="text-text-primary font-semibold">Agent Code:</div>
//             <div className="text-text-secondary">{agentCode}</div>
//           </div>
//           <div className="flex gap-2">
//             <div className="text-text-primary font-semibold">Joined Date :</div>
//             <div className="text-text-secondary">2023-01-15</div>
//           </div>
//         </div>
//       </div>
//       <div className="relative mt-6">
//         <div className="px-2 sm:px-4 sm:py-3 absolute -top-2 right-0">
//           <label className="inline-flex items-center mr-4 text-[#4B465C] opacity-80">
//             <input
//               type="radio"
//               name="filter"
//               value="all"
//               checked={filter === "Policies"}
//               onChange={() => toggleTableFilter("Policies")}
//               className="form-radio cursor-pointer checked:accent-primary"
//             />
//             <span className="ml-2 capitalize">Policies</span>
//           </label>
//           <label className="inline-flex items-center text-[#4B465C] opacity-80">
//             <input
//               type="radio"
//               name="filter"
//               value="certified"
//               checked={filter === "Quotes"}
//               onChange={() => toggleTableFilter("Quotes")}
//               className="form-radio cursor-pointer checked:accent-primary"
//             />
//             <span className="ml-2 capitalize">Quotes</span>
//           </label>
//         </div>
//       </div>
//       {/* tables */}
//       {filter === "Policies" && (
//         <div>
//           <PoliciesTable
//             data={policies?.items}
//             loading={pLoading}
//             pError={pError}
//           />
//         </div>
//       )}
//       {/* Quotes issued table */}
//       {filter === "Quotes" && (
//         <div>
//           <QuotesTable
//             data={quotes?.items}
//             loading={qLoading}
//             qError={qError}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AgentDetails;


// =============================



import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { PoliciesTable, QuotesTable } from "./Tables";
// import { usePolicies } from "../hooks/agent-dashboard/usePolicies";
// import { useQuotes } from "../hooks/agent-dashboard/useQuotes";
import { useMgaAgentDetails } from "../hooks/mga-dashboard/useMgaAgentDetails"; // Add this import
import { useMgaAgentPolicies } from "../hooks/mga-dashboard/useMgaAgentPolicies";
import { useMgaAgentQuotes } from "../hooks/mga-dashboard/useMgaAgentQuotes";
import { formatDate } from "../utils/dateUtils";

const AgentDetails = () => {
  const [pPage, setPPage] = useState(1);
  const [qPage, setQPage] = useState(1);
  const limit = 10;
  
  const agentCode = useParams<{ agentCode: string }>().agentCode;
  
  // Use the MGA agent details hook
  const {
    data: agentData,
    loading: agentLoading,
    error: agentError,
  } = useMgaAgentDetails(agentCode || "");
  
  const {
    data: policies,
    loading: pLoading,
    error: pError,
  } = useMgaAgentPolicies(agentCode || "", pPage, limit);
  
  const {
    data: quotes,
    loading: qLoading,
    error: qError,
  } = useMgaAgentQuotes(agentCode || "", qPage, limit);

  console.log('agent data', agentData)
  console.log('policy data', policies)
  
  const [filter, setFilter] = useState("Policies");
  const toggleTableFilter = (option: string) => setFilter(option);

  // Handle loading state
  if (agentLoading) {
    return (
      <div className="px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-text-secondary">Loading agent details...</div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (agentError || !agentData) {
    return (
      <div className="px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">
            {agentError?.message || "Failed to load agent details"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8">
      {/* agent details */}
      <div className="flex gap-4 items-center">
        <FaUser className="text-3xl text-text-primary" />
        <div className="flex flex-col">
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Name:</div>
            <div className="text-text-secondary">
              {agentData.name || `${agentData.firstName} ${agentData.lastName}`}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Email:</div>
            <div className="text-text-secondary">{agentData.email}</div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Agent Code:</div>
            <div className="text-text-secondary">{agentData.agentCode}</div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Company:</div>
            <div className="text-text-secondary">{agentData.company}</div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Status:</div>
            <div className={`text-text-secondary ${agentData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
              {agentData.status}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Joined Date:</div>
            <div className="text-text-secondary">
              {formatDate(agentData.joinedDate)}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Validity:</div>
            <div className="text-text-secondary">
              {formatDate(agentData.validity)}
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-text-primary font-semibold">Total Quotes</div>
          <div className="text-2xl font-bold text-blue-600">{agentData.totalQuotes}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-text-primary font-semibold">Total Policies</div>
          <div className="text-2xl font-bold text-green-600">{agentData.totalPolicies}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-text-primary font-semibold">Total Commissions</div>
          <div className="text-2xl font-bold text-purple-600">
            ${agentData.totalCommissions.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-text-primary font-semibold">This Month</div>
          <div className="text-2xl font-bold text-orange-600">
            ${agentData.currentMonthCommissions.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-text-primary font-semibold">Commission Percentage</div>
          <div className="text-2xl font-bold text-cyan-600">{agentData.commissionPercent ? agentData.commissionPercent : 0} %</div>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="px-2 sm:px-4 sm:py-3 absolute -top-2 right-0">
          <label className="inline-flex items-center mr-4 text-[#4B465C] opacity-80">
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filter === "Policies"}
              onChange={() => toggleTableFilter("Policies")}
              className="form-radio cursor-pointer checked:accent-primary"
            />
            <span className="ml-2 capitalize">Policies</span>
          </label>
          <label className="inline-flex items-center text-[#4B465C] opacity-80">
            <input
              type="radio"
              name="filter"
              value="certified"
              checked={filter === "Quotes"}
              onChange={() => toggleTableFilter("Quotes")}
              className="form-radio cursor-pointer checked:accent-primary"
            />
            <span className="ml-2 capitalize">Quotes</span>
          </label>
        </div>
      </div>

      {/* tables */}
      {filter === "Policies" && (
        <div>
          <PoliciesTable
            data={policies?.items}
            loading={pLoading}
            pError={pError}
          />
        </div>
      )}
      
      {/* Quotes issued table */}
      {filter === "Quotes" && (
        <div>
          <QuotesTable
            data={quotes?.items}
            loading={qLoading}
            qError={qError}
          />
        </div>
      )}
    </div>
  );
};

export default AgentDetails;