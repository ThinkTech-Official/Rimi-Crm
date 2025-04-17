// src/components/Users.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../context/LangContext";
import {
  useSearchUsers,
  SearchCriteria,
  User,
} from "../hooks/useSearchUsers";

const Users: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const navigate = useNavigate();
  const { users, loading, error, search } = useSearchUsers();

  // form fields
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [email, setEmail]             = useState("");
  const [agentCode, setAgentCode]     = useState("");
  const [createdAfter, setCreatedAfter]   = useState("");
  const [createdBefore, setCreatedBefore] = useState("");
  const [company, setCompany]         = useState("");
  const [userType, setUserType]       = useState("");
  const [status, setStatus]           = useState("");

  const onSearch = () => {
    const criteria: SearchCriteria = {
      firstName,
      lastName,
      email,
      agentCode,
      createdAfter,
      createdBefore,
      company,
      userType,
      status,
      page: 1,
      limit: 20,
    };
    search(criteria);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl bg-white">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">
        {langauge === "En" ? "SEARCH USERS" : "Rechercher Utilisateurs"}
      </h2>
      <p className="text-center text-gray-600 mb-4">
        {langauge === "En"
          ? "Fill in as many of the following criteria as you can to generate a search."
          : "Remplissez autant de critères suivants que possible pour générer une recherche."}
      </p>

      {/* ── Search Form ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "FIRST NAME",      value: firstName,    setter: setFirstName },
          { label: "LAST NAME",       value: lastName,     setter: setLastName  },
          { label: "EMAIL",           value: email,        setter: setEmail     },
          { label: "AGENT CODE",      value: agentCode,    setter: setAgentCode },
          { label: "CREATED AFTER",   value: createdAfter, setter: setCreatedAfter,   type: "date" },
          { label: "CREATED BEFORE",  value: createdBefore, setter: setCreatedBefore, type: "date" },
          { label: "COMPANY",         value: company,      setter: setCompany },
        ].map(({ label, value, setter, type }) => (
          <div key={label}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={(type as string) || "text"}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700">
            {langauge === "En" ? "USER TYPE" : `TYPE D'UTILISATEUR`}
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
          >
            <option value="">All</option>
            <option value="ADMIN">Admin</option>
            <option value="MGA">Mga</option>
            <option value="AGENT">Agent</option>
            <option value="READONLY">Read Only</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">
            {langauge === "En" ? "STATUS" : "STATUT"}
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
          >
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={onSearch}
          className="w-[250px] bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition cursor-pointer"
        >
          {langauge === "En" ? "SEARCH" : "RECHERCHE"}
        </button>
      </div>

      {/* ── Results Table ─────────────────────────────────────── */}
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length > 0 && (
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Agent Code",
                "First Name",
                "Last Name",
                "Email",
                "User Type",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u: User) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.agentCode}</td>
                <td className="px-4 py-2">{u.firstName}</td>
                <td className="px-4 py-2">{u.lastName}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.userType}</td>
                <td className="px-4 py-2">{u.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/userdetail/${u.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default Users;
