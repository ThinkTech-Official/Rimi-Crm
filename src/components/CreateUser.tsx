import React, { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { LangContext } from "../context/LangContext";

const CreateUser: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [userType, setUserType] = useState("");
  const [agentSearch, setAgentSearch] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const dummyAgents = ["21KANC", "15KASC", "rimidual1", "483L2C", "ZETA88"];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6  rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">
        {langauge === "En" ? "CREATE USER" : "CRÉER UN UTILISATEUR"}
      </h2>
      <p className="text-center text-gray-600 mb-4">
        {langauge === "En"
          ? "** Changes to User Type will restore User Permissions to default settings **"
          : `** Les modifications apportées au type d'utilisateur restaureront les autorisations utilisateur aux paramètres par défaut **`}
      </p>

      <div className="grid grid-cols-3 gap-4 text-gray-700">
        <div className="col-span-3 text-[#3a17c5] font-semibold">
          {langauge === "En" ? "USER INFORMATION" : "INFORMATIONS UTILISATEUR"}
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">
            {langauge === "En" ? "First Name" : "Prénom"}
          </label>
          <input className="p-2 border rounded" placeholder="FIRST NAME" />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">
            {langauge === "En" ? "Last Name" : "Nom de famille"}
          </label>
          <input className="p-2 border rounded" placeholder="LAST NAME" />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">Email</label>
          <input
            className="p-2 border rounded"
            type="email"
            placeholder="EMAIL"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">
            {langauge === "En" ? "Agent Code" : `Code de l'agent`}
          </label>
          <input className="p-2 border rounded" placeholder="AGENT CODE" />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">
            {langauge === "En" ? "Company" : "Entreprise"}
          </label>
          <input className="p-2 border rounded" placeholder="COMPANY" />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">
            {langauge === "En" ? "User Type" : `Type d'utilisateur`}
          </label>
          <select
            className="p-2 border rounded"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">---</option>
            <option value="Admin">Admin</option>
            <option value="MGA">Mga</option>
            <option value="Agent">Agent</option>
            <option value="Read Only">Read Only</option>
          </select>
        </div>
        <div className="col-span-1 space-y-2">
          <label className="block text-gray-700">
            {langauge === "En" ? "STATUS" : "STATUT"}
          </label>
          <div className="flex space-x-4">
            <label>
              <input type="radio" name="status" value="active" /> Active
            </label>
            <label>
              <input type="radio" name="status" value="inactive" /> Inactive
            </label>
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <label className="block text-gray-700">
            {langauge === "En" ? "PASSWORD" : "MOT DE PASSE"}
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-2 border rounded"
              placeholder="New Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
          </div>
          <label className="block text-gray-700">
            {langauge === "En"
              ? "RE-ENTER PASSWORD"
              : "ENTREZ À NOUVEAU LE MOT DE PASSE"}
          </label>
          <div className="relative mt-2">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="w-full p-2 border rounded"
              placeholder="Re-enter Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
          </div>

          {userType === "MGA" && (
  <div className="mt-6 col-span-3 border-t pt-4">
    <label className="block mb-2 text-sm font-semibold text-gray-700">
      {langauge === "En" ? "Agent Codes" : "Codes des agents"}
    </label>

    <input
      type="text"
      value={agentSearch}
      onChange={(e) => setAgentSearch(e.target.value)}
      placeholder="Search agent codes..."
      className="w-full p-2 border rounded mb-2"
    />

    <p className="text-sm mb-2">Agent List:</p>
    <div className="max-h-40 overflow-y-scroll border rounded p-2 space-y-1 text-sm">
      {dummyAgents
        .filter((agent) => agent.toLowerCase().includes(agentSearch.toLowerCase()))
        .map((agent) => (
          <div key={agent}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAgents.includes(agent)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAgents([...selectedAgents, agent]);
                  } else {
                    setSelectedAgents(selectedAgents.filter((a) => a !== agent));
                  }
                }}
              />
              {agent}
            </label>
          </div>
        ))}
    </div>

    <p className="text-sm mt-4 font-medium">Selected Agents:</p>
    <ul className="list-disc ml-6 text-sm text-gray-600">
      {selectedAgents.map((agent) => (
        <li key={agent}>{agent}</li>
      ))}
    </ul>
  </div>
)}

        </div>
      </div>
      <div className=" w-full flex justify-center items-center mt-2">
        <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition flex justify-center items-center cursor-pointer">
          {langauge === "En" ? "CREATE USER" : "CRÉER UN UTILISATEUR"}
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
