import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { LangContext } from "../context/LangContext";
import {
  useSearchPolicies,
  SearchPoliciesCriteria,
  PolicyRecord,
} from "../hooks/useSearchPolicies";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useForm } from "react-hook-form";

const allProducts = [
  "RIMI Canuck Voyage Travel Medical",
  "RIMI Canuck Voyage Non-Medical Travel",
  "Secure Study RIMI International Students to Canada",
  "Secure Travel RIMI Visitors to Canada Travel",
];

const status = ["All", "Active", "Sold", "Cancelled", "Expired"];

const PoliciesSearch: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const navigate = useNavigate();
  const [isSelectStatusOpen, setIsSelectStatusOpen] = useState(false);

  const [criteria, setCriteria] = useState<
    Omit<SearchPoliciesCriteria, "page" | "limit">
  >({ products: ["All"] });
  const [page, setPage] = useState(1);
  const limit = 10;
  const { search, loading, error, data } = useSearchPolicies(limit);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SearchPoliciesCriteria>({
    defaultValues: {
      products: ["All"],
    },
  });
  useEffect(() => {
    register("status", { required: "Status is required" });
  }, [register]);

  const handleChange =
    (key: keyof Omit<SearchPoliciesCriteria, "page" | "limit">) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = e.target.value;
      setCriteria((prev) => ({ ...prev, [key]: val || undefined }));
    };

  const handleProductChange = (product: string) => {
    setCriteria((prev) => {
      const current = prev.products || [];
      if (product === "All") return { ...prev, products: ["All"] };
      const next = current.includes(product)
        ? current.filter((p) => p !== product)
        : [...current.filter((p) => p !== "All"), product];
      return { ...prev, products: next };
    });
  };

  const onSearch = (formData: SearchPoliciesCriteria) => {
    console.log(formData);
    setPage(1);
    search(formData, 1, limit);
  };

  const goToPage = (p: number) => {
    if (!data) return;
    const tp = data.totalPages;
    const np = Math.max(1, Math.min(p, tp));
    setPage(np);
    search(criteria, np, limit);
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 px-2 py-4 sm:p-6 bg-[#F9F9F9]">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-left text-[#1B1B1B] mb-2">
          {langauge === "En" ? "Search Policies" : "Rechercher Polices"}
        </h2>
        <p className="text-left font-medium text-[#6A6A6A] mb-8">
          {langauge === "En"
            ? "Fill in as many criteria as you can to search."
            : "Remplissez autant de critères que possible pour la recherche."}
        </p>
      </div>

      {/* // */}

      {/* Product Selector  */}
      {/* <div className="mt-6">
        <p className="text-[#1B1B1B]  font-[inter] mb-2">
          {langauge === "En" ? "Product" : "PRODUIT"}
        </p>
        <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto rounded text-sm font-[inter] text-[#1B1B1B] space-y-2">
          <label className="block">
            <input
              type="checkbox"
              className="mr-2 text-[#1B1B1B]"
              checked={criteria.products?.includes("All")}
              onChange={() => handleProductChange("All")}
            />
            All
          </label>
          {products.map((p) => (
            <label key={p.en} className="block text-[#1B1B1B]">
              <input
                type="checkbox"
                className="mr-2 text-[#1B1B1B]"
                checked={criteria.products?.includes(p.en)}
                onChange={() => handleProductChange(p.en)}
              />
              {langauge === "En" ? p.en : p.fr}
            </label>
          ))}
        </div>
      </div> */}

      {/*  */}
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          {/* First Name */}
          <div className="flex flex-col 1">
            <label className="text-sm">First Name</label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              // value={criteria.firstName || ""}
              // onChange={handleChange("firstName")}
              className="input-primary"
              placeholder="First Name"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          {/* Last Name */}
          <div className="flex flex-col 1">
            <label className="text-sm">Last Name</label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              // value={criteria.lastName || ""}
              // onChange={handleChange("lastName")}
              className="input-primary"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
          {/* Date of Birth */}
          <div className="flex flex-col 1">
            <label className="text-sm">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              // value={criteria.dateOfBirth || ""}
              // onChange={handleChange("dateOfBirth")}
              className="input-primary"
              placeholder="Date of Birth"
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
          {/* Policy Number */}
          <div className="flex flex-col 1">
            <label className="text-sm">Policy Number</label>
            <input
              {...register("policyNumber", {
                required: "Policy Number is required",
              })}
              // value={criteria.policyNumber || ""}
              // onChange={handleChange("policyNumber")}
              className="input-primary"
              placeholder="Policy Number"
            />
            {errors.policyNumber && (
              <span className="text-red-500 text-sm">
                {errors.policyNumber.message}
              </span>
            )}
          </div>
          {/* Phone Number */}
          <div className="flex flex-col 1">
            <label className="text-sm">Phone Number</label>
            <input
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              // value={criteria.phoneNumber || ""}
              // onChange={handleChange("phoneNumber")}
              className="input-primary"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col 1">
            <label className="text-sm">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              // value={criteria.email || ""}
              // onChange={handleChange("email")}
              className="input-primary"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* Sale Date From */}
          <div className="flex flex-col 1">
            <label className="text-sm">Sale Date From</label>
            <input
              type="date"
              {...register("saleDateFrom", {
                required: "Sale Date From is required",
              })}
              // value={criteria.saleDateFrom || ""}
              // onChange={handleChange("saleDateFrom")}
              className="input-primary"
            />
            {errors.saleDateFrom && (
              <span className="text-red-500 text-sm">
                {errors.saleDateFrom.message}
              </span>
            )}
          </div>
          {/* Sale Date To */}
          <div className="flex flex-col 1">
            <label className="text-sm">Sale Date To</label>
            <input
              type="date"
              {...register("saleDateTo", {
                required: "Sale Date To is required",
              })}
              // value={criteria.saleDateTo || ""}
              // onChange={handleChange("saleDateTo")}
              className="input-primary"
            />
            {errors.saleDateTo && (
              <span className="text-red-500 text-sm">
                {errors.saleDateTo.message}
              </span>
            )}
          </div>
          {/* Effective Date From */}
          <div className="flex flex-col 1">
            <label className="text-sm">Effective Date From</label>
            <input
              type="date"
              {...register("effectiveDateFrom", {
                required: "Effective Date From is required",
              })}
              // value={criteria.effectiveDateFrom || ""}
              // onChange={handleChange("effectiveDateFrom")}
              className="input-primary"
            />
            {errors.effectiveDateFrom && (
              <span className="text-red-500 text-sm">
                {errors.effectiveDateFrom.message}
              </span>
            )}
          </div>
          {/* Effective Date To */}
          <div className="flex flex-col 1">
            <label className="text-sm">Effective Date To</label>
            <input
              type="date"
              {...register("effectiveDateTo", {
                required: "Effective Date To is required",
              })}
              // value={criteria.effectiveDateTo || ""}
              // onChange={handleChange("effectiveDateTo")}
              className="input-primary"
            />
            {errors.effectiveDateTo && (
              <span className="text-red-500 text-sm">
                {errors.effectiveDateTo.message}
              </span>
            )}
          </div>
          {/* Application ID */}
          <div className="flex flex-col 1">
            <label className="text-sm">Application ID</label>
            <input
              {...register("applicationId", {
                required: "Application ID is required",
              })}
              // value={criteria.applicationId || ""}
              // onChange={handleChange("applicationId")}
              className="input-primary"
              placeholder="Application ID"
            />
            {errors.applicationId && (
              <span className="text-red-500 text-sm">
                {errors.applicationId.message}
              </span>
            )}
          </div>
          {/* Agent */}
          <div className="flex flex-col 1">
            <label className="text-sm">Agent</label>
            <input
              {...register("agent", { required: "Agent is required" })}
              // value={criteria.agent || ""}
              // onChange={handleChange("agent")}
              className="input-primary"
              placeholder="Agent"
            />
            {errors.agent && (
              <span className="text-red-500 text-sm">
                {errors.agent.message}
              </span>
            )}
          </div>
          {/* Status */}
          <div className="flex flex-col 1">
            <label className="text-sm">Status</label>
            {/* <select
            value={criteria.status || "All"}
            onChange={(e) =>
              setCriteria((prev) => ({
                ...prev,
                status: e.target.value === "All" ? undefined : e.target.value,
              }))
            }
            className="input-primary"
          >
            <option className="border-0 hover:bg-gray-100">All</option>
            <option>Active</option>
            <option>Sold</option>
            <option>Expired</option>
            <option>Cancelled</option>
          </select> */}
            <div className="relative bg-white">
              <button
                type="button"
                className="w-full border border-inputBorder py-2 sm:py-3 px-4 focus:border-0 focus:ring-1 focus:ring-primary capitalize flex items-center justify-between text-left text-text-light cursor-pointer"
                onClick={() => setIsSelectStatusOpen((prev) => !prev)}
              >
                <span className="capitalize">{criteria.status || "All"}</span>
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
                        criteria.status === s
                          ? "bg-primary text-white hover:bg-gray-200 hover:text-text-light"
                          : ""
                      }`}
                      onClick={() => {
                        setCriteria((prev) => ({ ...prev, status: s }));
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
            {errors.status && (
              <p className="text-red-500 text-sm text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>
      </form>

      {/* Product list */}
      <div className="mt-6">
        <p className="text-[#1B1B1B]  font-[inter] mb-2">
          {langauge === "En" ? "Product" : "PRODUIT"}
        </p>
        <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto rounded text-sm font-[inter] text-[#1B1B1B] space-y-2">
          <label className="block">
            <input
              type="checkbox"
              checked={(criteria.products || []).includes("All")}
              onChange={() => handleProductChange("All")}
              className="mr-2 text-[#1B1B1B] accent-primary cursor-pointer"
            />
            All
          </label>
          {allProducts.map((p) => (
            <label key={p} className="block">
              <input
                type="checkbox"
                checked={(criteria.products || []).includes(p)}
                onChange={() => handleProductChange(p)}
                className="mr-2 accent-primary cursor-pointer"
              />{" "}
              {p}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit(onSearch)}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Searching..." : "Search Policies"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <>
          <p>Found {data.total} policies.</p>
          <table className="min-w-full border mt-4">
            <thead className="bg-gray-100">
              <tr>
                {[
                  // "ID",
                  "Policy No.",
                  "Status",

                  "First Name",
                  "Last Name",
                  "DOB",
                  "Eff. Date",
                  "Exp. Date",
                  "Product",

                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.items.map((p) => (
                <tr key={p.id} className="border-t">
                  {/* <td className="px-4 py-2">{p.id}</td> */}
                  <td className="px-4 py-2">{p.policyNumber}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  {/* <td className="px-4 py-2">{p.policyType}</td> */}
                  <td className="px-4 py-2">{p.firstName}</td>
                  <td className="px-4 py-2">{p.lastName}</td>
                  <td className="px-4 py-2">{p.dateOfBirth?.split("T")[0]}</td>
                  <td className="px-4 py-2">{p.effectiveDate?.split("T")[0]}</td>
                  <td className="px-4 py-2">{p.expiryDate?.split("T")[0]}</td>
                  <td className="px-4 py-2">{p.product}</td>

                  <td className="px-4 py-2">
                    <Link
                      target="_blank"
                      to={`/policy-detail/${p.id}`}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-3 py-1 border rounded ${
                    p === page
                      ? "bg-purple-700 text-white"
                      : "bg-white text-purple-700"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= data.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PoliciesSearch;
