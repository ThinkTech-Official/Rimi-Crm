// src/components/Users.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { LangContext } from "../context/LangContext";
import { useLanguage } from "../context/LanguageContext";
import { useSearchUsers, SearchCriteria, User } from "../hooks/useSearchUsers";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import { RenderPageNumbers } from "./RenderPageNumbers";
import DatePicker from "./DatePicker";
import { isAfterDate } from "../utils/dateUtils";
import useNotification from "../hooks/useNotification";

const Users: React.FC = () => {
  // const { langauge } = useContext(LangContext);
  const { t } = useLanguage();

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
    limit: 10,
  });

  const {
    users,
    loading,
    error,
    total,
    page,
    // limit,
    totalPages,
    search,
  } = useSearchUsers();

  const { triggerNotification, NotificationComponent } = useNotification();
  const { register, handleSubmit, control } = useForm<SearchCriteria>({
    defaultValues: criteria
  });

  // trigger search with current criteria
  const onSearch = (formData: SearchCriteria) => {
    console.log(".............", formData);

    if (formData.createdAfter && formData.createdBefore) {
      if (isAfterDate(formData.createdAfter, formData.createdBefore)) {
        triggerNotification({
          message: t("Created After date must be before Created Before date"),
          type: "error",
        });
        return;
      }
    }

    const updated = { ...formData, page: 1 };
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
    <div className="w-full mx-auto mt-4 px-2 py-4 sm:p-6 bg-[#F9F9F9]">
      <h2 className="text-lg 2xl:text-xl font-bold text-left text-[#1B1B1B] mb-2">
        {t("Search Users")}
      </h2>
      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        {t("Fill in as many of the following criteria as you can to generate a search.")}
      </p>

      {/* ── Search Form ───────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">{t("First Name")}</label>
            <input
              {...register("firstName", {
                setValueAs: (value) => value?.trim() || "",
              })}
              className="input-primary"
              placeholder={t("First Name")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">{t("Last Name")}</label>
            <input
              {...register("lastName", {
                setValueAs: (value) => value?.trim() || "",
              })}
              className="input-primary"
              placeholder={t("Last Name")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">{t("Email")}</label>
            <input
              {...register("email", {
                setValueAs: (value) => value?.trim()?.toLowerCase() || "",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t("Invalid email format"),
                },
              })}
              className="input-primary"
              placeholder={t("Email")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">{t("Agent Code")}</label>
            <input
              {...register("agentCode", {
                setValueAs: (value) => value?.trim() || "",
              })}
              className="input-primary"
              placeholder={t("Agent Code")}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="createdAfter"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label={t("Created After")}
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="createdBefore"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label={t("Created Before")}
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">{t("Company")}</label>
            <input
              {...register("company", {
                setValueAs: (value) => value?.trim() || "",
              })}
              className="input-primary"
              placeholder={t("Company")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">
              {t("User Type")}
            </label>
            <div className="relative">
              <select
                {...register("userType")}
                className="input-primary appearance-none cursor-pointer"
              >
                <option value="">{t("All")}</option>
                <option value="ADMIN">{t("Admin")}</option>
                <option value="MGA">{t("MGA")}</option>
                <option value="AGENT">{t("Agent")}</option>
                <option value="READONLY">{t("Read Only")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">
              {t("Status")}
            </label>
            <div className="relative">
              <select
                {...register("status")}
                className="input-primary appearance-none cursor-pointer"
              >
                <option value="">{t("All")}</option>
                <option value="ACTIVE">{t("Active")}</option>
                <option value="INACTIVE">{t("Inactive")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-center mb-6 mt-8">
        <button onClick={handleSubmit(onSearch)} disabled={loading} className="btn-primary">
          {loading
            ? t("Searching...")
            : t("Search Users")}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {users && (
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <div className="mt-4">
            {!loading && (
              <p className="mb-1 text-text-primary">
                {t("Found")} {total} {t("users.")}
              </p>
            )}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
              <tr>
                {[
                  t("Agent Code"),
                  t("Name"),
                  t("Email"),
                  t("Company"),
                  t("User Type"),
                  t("Status"),
                  t("Actions"),
                ].map((h) => (
                  <th
                    key={h}
                    className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap"
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
                    {t("Loading...")}
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
                  <td
                    className="p-2 text-text-secondary text-center"
                    colSpan={9}
                  >
                    {t("No users found")}
                  </td>
                </tr>
              ) : (
                users.map((u: User) => (
                  <tr
                    key={u.id}
                    className="text-[#808080] text-sm 2xl:text-base"
                  >
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.agentCode}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.firstName + " " + u.lastName}
                    </td>
                    {/* <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.lastName}
                    </td> */}
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.email}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 max-w-[180px] break-words border-r border-b border-[#AAA9A9]"
                    >
                      {u.company}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.userType}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.status}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      <Link
                        target="_blank"
                        to={`/userdetail/${u.id}`}
                        className="text-primary hover:underline hover:underline-offset-2 cursor-pointer font-medium px-4 text-center w-full"
                      >
                        {t("View")}
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
            onPageChange={goToPage}
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
      {NotificationComponent}
    </div>
  );
};

export default Users;
