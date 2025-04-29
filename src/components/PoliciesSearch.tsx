import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { LangContext } from "../context/LangContext";
import {
  useSearchPolicies,
  SearchPoliciesCriteria,
  PolicyRecord,
} from "../hooks/useSearchPolicies";
import { useNavigate } from "react-router-dom";

const allProducts = [
  "RIMI Canuck Voyage Travel Medical",
  "RIMI Canuck Voyage Non-Medical Travel",
  "Secure Study RIMI International Students to Canada",
  "Secure Travel RIMI Visitors to Canada Travel",
];

const PoliciesSearch: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const navigate = useNavigate();

  const [criteria, setCriteria] = useState<
    Omit<SearchPoliciesCriteria, "page" | "limit">
  >({ products: ["All"] });
  const [page, setPage] = useState(1);
  const limit = 10;
  const { search, loading, error, data } = useSearchPolicies(limit);

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

  const onSearch = () => {
    setPage(1);
    search(criteria, 1, limit);
  };

  const goToPage = (p: number) => {
    if (!data) return;
    const tp = data.totalPages;
    const np = Math.max(1, Math.min(p, tp));
    setPage(np);
    search(criteria, np, limit);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#f9f9f9] space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold font-[inter]">
          {langauge === "En" ? "Search Policies" : "Rechercher Polices"}
        </h2>
        <p className="text-gray-700 font-[inter]">
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



      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[#1B1B1B]  font-[inter] mb-2">
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <input
            value={criteria.firstName || ""}
            onChange={handleChange("firstName")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <label>Last Name</label>
          <input
            value={criteria.lastName || ""}
            onChange={handleChange("lastName")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <label>Date of Birth</label>
          <input
            type="date"
            value={criteria.dateOfBirth || ""}
            onChange={handleChange("dateOfBirth")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Policy Number */}
        <div className="flex flex-col gap-2">
          <label>Policy Number</label>
          <input
            value={criteria.policyNumber || ""}
            onChange={handleChange("policyNumber")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label>Phone Number</label>
          <input
            value={criteria.phoneNumber || ""}
            onChange={handleChange("phoneNumber")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            value={criteria.email || ""}
            onChange={handleChange("email")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Sale Date From */}
        <div className="flex flex-col gap-2">
          <label>Sale Date From</label>
          <input
            type="date"
            value={criteria.saleDateFrom || ""}
            onChange={handleChange("saleDateFrom")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Sale Date To */}
        <div className="flex flex-col gap-2">
          <label>Sale Date To</label>
          <input
            type="date"
            value={criteria.saleDateTo || ""}
            onChange={handleChange("saleDateTo")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Effective Date From */}
        <div className="flex flex-col gap-2">
          <label>Effective Date From</label>
          <input
            type="date"
            value={criteria.effectiveDateFrom || ""}
            onChange={handleChange("effectiveDateFrom")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Effective Date To */}
        <div className="flex flex-col gap-2">
          <label>Effective Date To</label>
          <input
            type="date"
            value={criteria.effectiveDateTo || ""}
            onChange={handleChange("effectiveDateTo")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Application ID */}
        <div className="flex flex-col gap-2">
          <label>Application ID</label>
          <input
            value={criteria.applicationId || ""}
            onChange={handleChange("applicationId")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Agent */}
        <div className="flex flex-col gap-2">
          <label>Agent</label>
          <input
            value={criteria.agent || ""}
            onChange={handleChange("agent")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          />
        </div>
        {/* Status */}
        <div className="flex flex-col gap-2">
          <label>Status</label>
          <select
            value={criteria.status || "All"}
            onChange={(e) =>
              setCriteria((prev) => ({
                ...prev,
                status: e.target.value === "All" ? undefined : e.target.value,
              }))
            }
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
          >
            <option>All</option>
            <option>Active</option>
            <option>Sold</option>
            <option>Expired</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Product list */}
      <div>
      <p className="text-[#1B1B1B]  font-[inter] mb-2">
          {langauge === "En" ? "Product" : "PRODUIT"}
        </p>
        <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto rounded text-sm font-[inter] text-[#1B1B1B] space-y-2">
          <label className="block">
            <input
              type="checkbox"
              checked={(criteria.products || []).includes("All")}
              onChange={() => handleProductChange("All")}
              className="mr-2 text-[#1B1B1B]"
            />
            All
          </label>
          {allProducts.map((p) => (
            <label key={p} className="block">
              <input
                type="checkbox"
                checked={(criteria.products || []).includes(p)}
                onChange={() => handleProductChange(p)}
                className="mr-2"
              />{" "}
              {p}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-6 py-2 bg-[#2b00b7] text-white rounded disabled:opacity-50 cursor-pointer"
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
                  "Policy #",
                  "Type",
                  "First",
                  "Last",
                  "DOB",
                  "Issued",
                  "Product",
                  "Status",
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
                  <td className="px-4 py-2">{p.policyType}</td>
                  <td className="px-4 py-2">{p.firstName}</td>
                  <td className="px-4 py-2">{p.lastName}</td>
                  <td className="px-4 py-2">{p.dateOfBirth?.split("T")[0]}</td>
                  <td className="px-4 py-2">{p.dateIssued?.split("T")[0]}</td>
                  <td className="px-4 py-2">{p.product}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => navigate(`/policy-detail/${p.id}`)}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      View
                    </button>
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
