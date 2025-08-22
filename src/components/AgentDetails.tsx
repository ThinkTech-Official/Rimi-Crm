import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { PoliciesTable, QuotesTable } from "./Tables";
import { usePolicies } from "../hooks/agent-dashboard/usePolicies";
import { useQuotes } from "../hooks/agent-dashboard/useQuotes";

const AgentDetails = () => {
  const [pPage, setPPage] = useState(1);
  const [qPage, setQPage] = useState(1);
  const limit = 10; 
  const {
    data: policies,
    loading: pLoading,
    error: pError,
  } = usePolicies(pPage, limit);
  const {
    data: quotes,
    loading: qLoading,
    error: qError,
  } = useQuotes(qPage, limit);
  const agentCode = useParams<{ agentCode: string }>().agentCode;
  console.log(agentCode);
  const [filter, setFilter] = useState("Policies");
  const toggleTableFilter = (option: string) => setFilter(option);
  return (
    <div className="px-8">
      {/* agent details */}
      <div className="flex gap-4 items-center">
        <FaUser className="text-3xl text-text-primary" />
        <div className="flex flex-col">
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Name:</div>
            <div className="text-text-secondary">John Doe</div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Email:</div>
            <div className="text-text-secondary">Johndoe@gmail.com</div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Agent Code:</div>
            <div className="text-text-secondary">{agentCode}</div>
          </div>
          <div className="flex gap-2">
            <div className="text-text-primary font-semibold">Joined Date :</div>
            <div className="text-text-secondary">2023-01-15</div>
          </div>
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
