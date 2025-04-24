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

  // combined search & pagination criteria
  const [criteria, setCriteria] = useState<SearchCriteria>({
    firstName: "",
    lastName: "",
    email: "",
    agentCode: "",
    createdAfter: "",
    createdBefore: "",
    company: "",
    userType: "",
    status: "",
    page: 1,
    limit: 20,
  });

  const {
    users,
    loading,
    error,
    // total,
    page,
    // limit,
    totalPages,
    hasPrevPage,
    hasNextPage,
    search,
  } = useSearchUsers();

  // trigger search with current criteria
  const onSearch = () => {
    const updated = { ...criteria, page: 1 };
    setCriteria(updated);
    search(updated);
  };

  // navigate to specific page
  const goToPage = (newPage: number) => {
    const updated = { ...criteria, page: newPage };
    setCriteria(updated);
    search(updated);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 rounded-lg shadow-2xl bg-white">
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
          { label: "FIRST NAME", key: "firstName" },
          { label: "LAST NAME", key: "lastName" },
          { label: "EMAIL", key: "email" },
          { label: "AGENT CODE", key: "agentCode" },
          { label: "CREATED AFTER", key: "createdAfter", type: "date" },
          { label: "CREATED BEFORE", key: "createdBefore", type: "date" },
          { label: "COMPANY", key: "company" },
        ].map(({ label, key, type }) => (
          <div key={key}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={(type as string) || "text"}
              value={(criteria as any)[key]}
              onChange={(e) =>
                setCriteria((c) => ({ ...c, [key]: e.target.value }))
              }
              className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700">
            {langauge === "En" ? "USER TYPE" : `TYPE D'UTILISATEUR`}
          </label>
          <select
            value={criteria.userType}
            onChange={(e) =>
              setCriteria((c) => ({ ...c, userType: e.target.value }))
            }
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
            value={criteria.status}
            onChange={(e) =>
              setCriteria((c) => ({ ...c, status: e.target.value }))
            }
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
          className="w-[250px] bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition"
        >
          {langauge === "En" ? "SEARCH" : "RECHERCHE"}
        </button>
      </div>

      {/* ── Results Table ─────────────────────────────────────── */}
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length > 0 && (
        <>
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
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Pagination Controls ────────────────────────────── */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={!hasPrevPage}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 rounded border ${
                  p === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={!hasNextPage}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default Users;

