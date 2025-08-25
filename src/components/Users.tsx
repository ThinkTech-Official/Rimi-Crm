// src/components/Users.tsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../context/LangContext";
import { useSearchUsers, SearchCriteria, User } from "../hooks/useSearchUsers";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { RenderPageNumbers } from "./RenderPageNumbers";

const Users: React.FC = () => {
  const { langauge } = useContext(LangContext);

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
    search,
  } = useSearchUsers();

  const { register, handleSubmit } = useForm<SearchCriteria>({});

  // trigger search with current criteria
  const onSearch = (user: SearchCriteria) => {
    console.log(".............", user);
    const updated = { ...user, page: 1 };
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
    <div className="max-w-5xl mx-auto mt-4 px-2 py-4 sm:p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B] mb-2">
        {langauge === "En" ? "Search Users" : "Rchercher utilisateurs"}
      </h2>
      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        {langauge === "En"
          ? "Fill in as many of the following criteria as you can to generate a search."
          : "Remplissez autant de critères suivants que possible pour générer une recherche."}
      </p>

      {/* ── Search Form ───────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          {[
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
            { label: "Email", key: "email" },
            { label: "Agent Code", key: "agentCode" },
            { label: "Created After", key: "createdAfter", type: "date" },
            { label: "Created Before", key: "createdBefore", type: "date" },
            { label: "Company", key: "company" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-sm">{label}</label>
              <input
                type={type || "text"}
                {...register(key as keyof SearchCriteria, {
                  ...(key === "email" && {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  }),
                })}
                className="input-primary"
              />

              {/* {errors[key as keyof SearchCriteria] && (
                <p className="text-red-500 text-sm mt-1">
                  {(errors[key as keyof SearchCriteria]?.message as string) ||
                    ""}
                </p>
              )} */}
            </div>
          ))}

          <div>
            <label className="text-sm">
              {langauge === "En" ? "User Type" : `Type D'Utilisateur`}
            </label>
            <div className="relative">
              <select
                value={criteria.userType}
                onChange={(e) =>
                  setCriteria((c) => ({ ...c, userType: e.target.value }))
                }
                className="input-primary appearance-none cursor-pointer"
              >
                <option value="">All</option>
                <option value="ADMIN">Admin</option>
                <option value="MGA">Mga</option>
                <option value="AGENT">Agent</option>
                <option value="READONLY">Read Only</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm">
              {langauge === "En" ? "Status" : "Statut"}
            </label>
            <div className="relative">
              <select
                value={criteria.status}
                onChange={(e) =>
                  setCriteria((c) => ({ ...c, status: e.target.value }))
                }
                className="input-primary appearance-none cursor-pointer"
              >
                <option value="">All</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-center mb-6 mt-8">
        <button onClick={handleSubmit(onSearch)} className="btn-primary">
          {loading
            ? "Searching..."
            : langauge === "En"
            ? "SEARCH"
            : "RECHERCHE"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {users.length > 0 && (
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
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
                    className="px-2 sm:px-6 py-1 sm:py-3 text-left font-medium text-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
              {loading ? (
                <tr>
                  <td
                    className="p-2 text-primary text-center h-40 "
                    colSpan={9}
                  >
                    Loading…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="p-2 text-red-500" colSpan={9}>
                    {error}
                  </td>
                </tr>
              ) : users?.length === 0 ? (
                <tr>
                  <td className="p-2 text-text-secondary" colSpan={9}>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u: User) => (
                  <tr key={u.id} className="text-[#808080] text-sm 2xl:text-xl">
                    <td
                      className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {u.agentCode}
                    </td>
                    <td
                      className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {u.firstName}
                    </td>
                    <td
                      className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {u.lastName}
                    </td>
                    <td
                      className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {u.email}
                    </td>
                    <td
                      className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {u.userType}
                    </td>
                    <td
                      className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {u.status}
                    </td>
                    <td
                      className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      <Link
                        target="_blank"
                        to={`/userdetail/${u.id}`}
                        className="text-primary hover:underline hover:underline-offset-2 cursor-pointer font-medium px-4 text-center w-full"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* ── Pagination Controls ────────────────────────────── */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <RenderPageNumbers
            goToPage={goToPage}
            totalPages={totalPages}
            page={page}
          />

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className="px-2 py-[10px] bg-[#CCCCCC] text-[#6F6B7D] cursor-pointer"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
