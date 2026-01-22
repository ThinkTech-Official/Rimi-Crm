import React, { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";
import {
  useSearchPolicies,
  SearchPoliciesCriteria,
} from "../hooks/useSearchPolicies";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RenderPageNumbers } from "./RenderPageNumbers";

const allProducts = [
  {
    label: "RIMI Canuck Voyage Travel Medical",
    value: "RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL",
  },
  {
    label: "RIMI Canuck Voyage Non-Medical Travel",
    value: "RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL",
  },
  {
    label: "Secure Study RIMI International Students to Canada",
    value: "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA",
  },
  {
    label: "Secure Travel RIMI Visitors to Canada Travel",
    value: "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL",
  },
];

const status = ["All", "Active", "Sold", "Cancelled", "Expired"];

const PoliciesSearch: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const [isSelectStatusOpen, setIsSelectStatusOpen] = useState(false);
  const [searchData, setSearchData] = useState<SearchPoliciesCriteria>({
    products: ["All"],
  });
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["All"]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { search, loading, error, data } = useSearchPolicies(limit);
  const totalPages = data?.totalPages || 0;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchPoliciesCriteria>({
    defaultValues: {
      products: ["All"],
    },
  });
  const handleProductChange = (product: string) => {
    setSelectedProducts((prev) => {
      const current = prev;
      if (product === "All") return ["All"];
      const next = current.includes(product)
        ? current.filter((p) => p !== product)
        : [...current.filter((p) => p !== "All"), product];
      return next;
    });
  };

  const handleStatusChange = (status: string) => {
    if (status === "All") {
      setSelectedStatus("");
      return;
    }
    setSelectedStatus(status);
    setIsSelectStatusOpen(false);
  };

  const onSearch = (formData: SearchPoliciesCriteria) => {
    if (errors.email) return;
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => {
        if (v === undefined || v === null) return false;
        if (typeof v === "string" && v.trim() === "") return false;
        if (Array.isArray(v) && v.length === 0) return false;
        return true;
      })
    ) as SearchPoliciesCriteria;

    const finalData: SearchPoliciesCriteria = {
      ...filteredData,
      products: selectedProducts,
      status: selectedStatus,
    };
    setSearchData(finalData);

    console.log("finalData", finalData);
    setPage(1);
    search(finalData, 1, limit);
  };

  const goToPage = (p: number) => {
    if (!data) return;
    const tp = data.totalPages;
    const np = Math.max(1, Math.min(p, tp));
    setPage(np);
    search(searchData, np, limit);
  };

  return (
    <div className="w-full mx-auto mt-4 px-2 py-4 sm:p-6 bg-[#F9F9F9]">
      <div className="space-y-2">
        <h2 className="text-lg 2xl:text-xl font-bold text-left text-[#1B1B1B] mb-2">
          {langauge === "En" ? "Search Policies" : "Rechercher Polices"}
        </h2>
        <p className="text-left font-medium text-[#6A6A6A] mb-8">
          {langauge === "En"
            ? "Fill in as many criteria as you can to search."
            : "Remplissez autant de critères que possible pour la recherche."}
        </p>
      </div>

      {/*  */}
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">First Name</label>
            <input
              {...register("firstName", {
                setValueAs: (value) => value.trim(),
              })}
              className="input-primary"
              placeholder="First Name"
            />
          </div>
          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Last Name</label>
            <input
              {...register("lastName", {
                setValueAs: (value) => value.trim(),
              })}
              className="input-primary"
              placeholder="Last Name"
            />
          </div>
          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="input-primary"
              placeholder="Date of Birth"
            />
          </div>
          {/* Policy Number */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Policy Number</label>
            <input
              {...register("policyNumber", {
                setValueAs: (value) => value.trim(),
              })}
              className="input-primary"
              placeholder="Policy Number"
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Phone Number</label>
            <input
              {...register("phoneNumber", {
                setValueAs: (value) => value.trim(),
              })}
              className="input-primary"
              placeholder="Phone Number"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Email</label>
            <input
              type="email"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="input-primary"
              placeholder="Email"
            />
          </div>
          {/* Sale Date From */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Sale Date From</label>
            <input
              type="date"
              {...register("saleDateFrom")}
              className="input-primary"
            />
          </div>
          {/* Sale Date To */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Sale Date To</label>
            <input
              type="date"
              {...register("saleDateTo")}
              className="input-primary"
            />
          </div>
          {/* Effective Date From */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Effective Date From</label>
            <input
              type="date"
              {...register("effectiveDateFrom")}
              className="input-primary"
            />
          </div>
          {/* Effective Date To */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Effective Date To</label>
            <input
              type="date"
              {...register("effectiveDateTo")}
              className="input-primary"
            />
          </div>
          {/* Application ID */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Application ID</label>
            <input
              {...register("applicationId", {
                setValueAs: (value) => value.trim(),
              })}
              className="input-primary"
              placeholder="Application ID"
            />
          </div>
          {/* Agent */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Agent Code</label>
            <input
              {...register("agent")}
              className="input-primary"
              placeholder="Agent Code"
            />
          </div>
          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">Status</label>
            <div className="relative bg-white">
              <button
                type="button"
                className="w-full border border-inputBorder py-2 sm:py-3 px-4 focus:border-0 focus:ring-1 focus:ring-primary capitalize flex items-center justify-between text-left text-text-light cursor-pointer"
                onClick={() => setIsSelectStatusOpen((prev) => !prev)}
              >
                <span className="capitalize">{selectedStatus || "All"}</span>
                <FaAngleDown
                  className={`ml-2 cusor-pointer transition-transform ${
                    isSelectStatusOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSelectStatusOpen && (
                <div className="absolute mt-[2px] top-full left-0 w-full bg-white border border-inputBorder shadow-md z-10 max-h-60 overflow-y-auto custom-scrollbar3 pr-[2px]">
                  {status.map((s, i) => (
                    <div
                      key={i}
                      className={`px-4 py-2 hover:bg-gray-200 text-text-light cursor-pointer capitalize ${
                        selectedStatus === s
                          ? "bg-primary text-white hover:bg-gray-200 hover:text-text-light"
                          : ""
                      }`}
                      onClick={() => {
                        handleStatusChange(s);
                        setValue("status", s, { shouldValidate: true });
                        setIsSelectStatusOpen(false);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Product list */}
        <div className="mt-6">
          <p className="text-[#1B1B1B]  font-[inter] mb-2">
            {langauge === "En" ? "Product" : "PRODUIT"}
          </p>
          <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto rounded text-sm font-[inter] text-[#1B1B1B] space-y-2">
            <label className="block">
              <input
                type="checkbox"
                checked={selectedProducts?.includes("All")}
                onChange={() => handleProductChange("All")}
                className="mr-2 text-[#1B1B1B] accent-primary cursor-pointer"
              />
              All
            </label>
            {allProducts.map((p) => (
              <label key={p.value} className="block">
                <input
                  type="checkbox"
                  checked={selectedProducts?.includes(p.value)}
                  onChange={() => handleProductChange(p.value)}
                  className="mr-2 accent-primary cursor-pointer"
                />{" "}
                {p.label}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Searching..." : "Search Policies"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <div className="mt-4">
            {!loading && (
              <p className="mb-1 text-text-primary">
                Found {data.total} policies.
              </p>
            )}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
              <tr>
                {[
                  // "ID",
                  "Policy No.",
                  "Status",
                  "Name",
                  // "DOB",
                  "Eff. Date",
                  "Exp. Date",
                  "Product",
                  "Actions",
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
                  <td className="p-2 text-primary text-center h-40" colSpan={9}>
                    Loading…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="p-2 text-red-500" colSpan={9}>
                    {error}
                  </td>
                </tr>
              ) : data?.items.length === 0 ? (
                <tr>
                  <td
                    className="p-2 text-text-secondary text-center"
                    colSpan={9}
                  >
                    No policies found
                  </td>
                </tr>
              ) : (
                data.items.map((p) => (
                  <tr key={p.id} className="text-[#808080] text-sm 2xl:text-base">
                    {/* <td className="px-4 py-2">{p.id}</td> */}
                    <td
                      className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.policyNumber}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.status}
                    </td>
                    {/* <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                    style={{
                      borderWidth: "0px 1px 1px 0px",
                      borderStyle: "solid",
                      borderColor: "#AAA9A9",
                    }}>{p.policyType}</td> */}
                    <td
                      className="px-2 sm:px-3 py-2 sm:py-3 min-w-[250px] break-words"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.firstName + " " + p.lastName}
                    </td>
                    {/* <td
                      className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.lastName}
                    </td> */}
                    {/* <td
                      className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.dateOfBirth?.split("T")[0]}
                    </td> */}
                    <td
                      className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.effectiveDate?.split("T")[0]}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.expiryDate?.split("T")[0]}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 sm:py-3 capitalize min-w-[250px] break-words"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      {p.product?.split("_").join(" ").toLowerCase()}
                    </td>

                    <td
                      className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"
                      style={{
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#AAA9A9",
                      }}
                    >
                      <Link
                        target="_blank"
                        to={`/policy-detail/${p.id}`}
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
    </div>
  );
};

export default PoliciesSearch;
