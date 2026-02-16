// import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
// import { LangContext } from '../context/LangContext';
// import { getUserTypeFromToken } from '../utils/getUserType';
// import { useSearchQuotes, SearchCriteria, QuoteRecord } from '../hooks/useSearchQuotes';
// import { useNavigate } from 'react-router-dom';

// const emailRegex = /^\S+@\S+\.\S+$/;

// const QuotesSearch: React.FC = () => {
//   const { langauge } = useContext(LangContext);

//   const navigate = useNavigate();

//   const [userType, setUserType] = useState<string | null>(null);
//   const [criteria, setCriteria] = useState<SearchCriteria>({ products: ['All'] });
//   const [emailError, setEmailError] = useState<string>('');
//   const { search, loading, error, data } = useSearchQuotes();

//   const products = [
//     {
//       en: "RIMI Canuck Voyage Travel Medical",
//       fr: "RIMI Canuck Voyage Travel Medical",
//     },
//     {
//       en: "RIMI Canuck Voyage Non-Medical Travel",
//       fr: "RIMI Assurance voyage non médicale Travel",
//     },
//     {
//       en: "Secure Study RIMI International Students to Canada",
//       fr: "Secure Study RIMI International Students to Canada",
//     },
//     {
//       en: "Secure Travel RIMI Visitors to Canada Travel",
//       fr: "Secure Travel RIMI Visitors to Canada Travel",
//     },
//   ];

//   useEffect(() => {
//     const type = getUserTypeFromToken();
//     setUserType(type.userType);
//   }, []);

//   const handleChange = (key: keyof SearchCriteria) => (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setCriteria(prev => ({ ...prev, [key]: value || undefined }));
//     if (key === 'email') {
//       if (value && !emailRegex.test(value)) {
//         setEmailError('Invalid email format');
//       } else {
//         setEmailError('');
//       }
//     }
//   };

//   const handleProductChange = (product: string) => {
//     setCriteria(prev => {
//       const current = prev.products || [];
//       if (product === 'All') {
//         return { ...prev, products: ['All'] };
//       }
//       const next = current.includes(product)
//         ? current.filter(p => p !== product)
//         : [...current.filter(p => p !== 'All'), product];
//       return { ...prev, products: next };
//     });
//   };

//   const onSearch = () => {
//     if (!emailError) {
//       search(criteria);
//     }
//   };

//   return (
// <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
//   <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 ">
//     {langauge === "En" ? "Search Quotes" : "Rechercher Quotes"}
//   </h2>
//   <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
//     {langauge === "En"
//       ? "Fill in as many of the following criteria as you can to generate a search."
//       : "Indiquez Le Plus De Critères Possible Parmi Les Suivants Pour Lancer Une Recherche."}
//   </p>

//   <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">
//         {langauge === "En" ? "Quote Number" : "Numéro de devis"}
//       </label>
//       <input
//       value={criteria.quoteNumber || ''}
//       onChange={handleChange('quoteNumber')}
//         className="input-primary font-[inter]"
//         placeholder="Enter Quote Number"
//       />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">
//         {langauge === "En" ? "Quote Date" : "Date du devis"}
//       </label>
//       <input
//         className="p-2 border border-[#DBDADE] font-[inter]"
//         type="date"
//         value={criteria.quoteDate || ''}
//         onChange={handleChange('quoteDate')}
//       />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">
//         {langauge === "En" ? "First Name" : "Prénom"}
//       </label>
//       <input
//         className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//         placeholder="Enter First Name"
//         value={criteria.firstName || ''}
//         onChange={handleChange('firstName')}
//       />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">
//         {langauge === "En" ? "Last Name" : "Nom de famille"}
//       </label>
//       <input
//         className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//         placeholder="Enter Last Name"
//         value={criteria.lastName || ''}
//         onChange={handleChange('lastName')}
//       />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">
//         {langauge === "En" ? "Date of Birth" : "Date de naissance"}
//       </label>
//       <input
//         className="p-2 border border-[#DBDADE] font-[inter]"
//         type="date"
//         value={criteria.dateOfBirth || ''}
//         onChange={handleChange('dateOfBirth')}
//       />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">Email</label>
//       <input
//         className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//         placeholder="Email"
//         value={criteria.email || ''}
//         onChange={handleChange('email')}
//       />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">
//         {langauge === "En" ? "Effective Date" : `Date d'entrée en vigueur`}
//       </label>
//       <input
//         className="p-2 border border-[#DBDADE] font-[inter]"
//         type="date"
//         value={criteria.effectiveDate || ''}
//         onChange={handleChange('effectiveDate')}
//       />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label className="font-[inter]">
//         {langauge === "En" ? "Expiry Date" : `Date d'expiration`}
//       </label>
//       <input
//         className="p-2 border border-[#DBDADE] font-[inter]"
//         type="date"
//         value={criteria.expiryDate || ''}
//         onChange={handleChange('expiryDate')}
//       />
//     </div>
//     {userType === "ADMIN" && (
//       <div className="flex flex-col gap-2">
//         <label className="font-[inter]">
//           {langauge === "En" ? "Agent" : "Agent"}
//         </label>
//         <input
//           className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//           placeholder="Agent"
//           value={criteria.agent || ''}
//           onChange={handleChange('agent')}
//         />
//       </div>
//     )}
//   </div>

//   <div className="mt-6">
//     <p className="text-[#1B1B1B]  font-[inter] mb-2">
//       {langauge === "En" ? "Product" : "PRODUIT"}
//     </p>
//     <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto rounded text-sm font-[inter] text-[#1B1B1B] space-y-2">
//       <label className="block">
//         <input
//           type="checkbox"
//           className="mr-2 text-[#1B1B1B]"
//           checked={criteria.products?.includes('All')}
//           onChange={() => handleProductChange('All')}
//         />
//         All
//       </label>
//       {products.map((p) => (
//         <label key={p.en} className="block text-[#1B1B1B]">
//           <input
//             type="checkbox"
//             className="mr-2 text-[#1B1B1B]"
//             checked={criteria.products?.includes(p.en)}
//             onChange={() => handleProductChange(p.en)}
//           />
//           {langauge === "En" ? p.en : p.fr}
//         </label>
//       ))}
//     </div>
//   </div>

//   <div className="w-full flex justify-center items-center mt-2">
//     <button
//      onClick={onSearch}
//      disabled={!!emailError || loading}
//     className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]">
//       {langauge === "En" ? "Search Quotes" : "Rechercher Quotes"}
//     </button>
//   </div>

//        {/* Error or Results */}
//   {error && <p className="text-red-600 mt-2">{error}</p>}
//   {data && (
//     <div className="mt-4">
//       <p>Found {data.length} quotes.</p>
//       {/* ── Results Table ─────────────────────────────────────── */}
//             {loading && <p>Loading…</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && !error && data.length > 0 && (
//               <>
//                 <table className="min-w-full border">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       {[
//                         "Quote Number",
//                         "Status",
//                         "First Name",
//                         "Last Name",
//                         "Date of Birth",
//                         "Quote Date",
//                         "Product Name",
//                         "Actions",
//                       ].map((h) => (
//                         <th
//                           key={h}
//                           className="px-4 py-2 text-left text-sm font-medium text-gray-700"
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((u: any) => (
//                       <tr key={u.id} className="border-t">
//                         <td className="px-4 py-2">{u.id}</td>
//                         <td className="px-4 py-2">{u.status}</td>
//                         <td className="px-4 py-2">{u.firstName}</td>
//                         <td className="px-4 py-2">{u.lastName}</td>
//                         <td className="px-4 py-2">{u.dateOfBirth}</td>
//                         <td className="px-4 py-2">{u.dateIssued}</td>
//                         <td className="px-4 py-2">{u.product}</td>
//                         <td className="px-4 py-2">
//                           <button
//                             onClick={() => navigate(`/userdetail/${u.id}`)}
//                             className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {/* ── Pagination Controls ────────────────────────────── */}
//                 {/* <div className="flex justify-center items-center space-x-2 mt-4">
//                   <button
//                     onClick={() => goToPage(page - 1)}
//                     disabled={!hasPrevPage}
//                     className="px-3 py-1 rounded border bg-white disabled:opacity-50"
//                   >
//                     Prev
//                   </button>

//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                     <button
//                       key={p}
//                       onClick={() => goToPage(p)}
//                       className={`px-3 py-1 rounded border ${
//                         p === page
//                           ? "bg-indigo-600 text-white"
//                           : "bg-white text-indigo-600"
//                       }`}
//                     >
//                       {p}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => goToPage(page + 1)}
//                     disabled={!hasNextPage}
//                     className="px-3 py-1 rounded border bg-white disabled:opacity-50"
//                   >
//                     Next
//                   </button>
//                 </div> */}
//               </>
//             )}

//             {!loading && !error && data.length === 0 && (
//               <p className="text-center text-gray-500">No users found.</p>
//             )}
//     </div>
//   )}

// </div>
//   );
// };

// export default QuotesSearch;

// ================================================

// src/components/QuotesSearch.tsx
import React, { useEffect, useState } from "react";
// import { LangContext } from "../context/LangContext";
import { useLanguage } from "../context/LanguageContext";
import { getUserTypeFromToken } from "../utils/getUserType";
import { useSearchQuotes, SearchCriteria } from "../hooks/useSearchQuotes";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RenderPageNumbers } from "./RenderPageNumbers";

const QuotesSearch: React.FC = () => {
  // const { langauge } = useContext(LangContext);
  const { t } = useLanguage();

  const [userType, setUserType] = useState<string | null>(null);
  const [searchData, setSearchData] = useState<SearchCriteria>({
    products: ["All"],
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["All"]);
  const [emailError, setEmailError] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { search, loading, error, data } = useSearchQuotes(limit);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchCriteria>({
    defaultValues: {
      products: ["All"],
    },
  });
  const totalPages = data?.totalPages || 0;
  const products = [
    {
      en: t("RIMI Canuck Voyage Travel Medical"),
      fr: t("RIMI Canuck Voyage Travel Medical"),
      value: "RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL",
    },
    {
      en: t("RIMI Canuck Voyage Non-Medical Travel"),
      fr: t("RIMI Assurance voyage non médicale Travel"),
      value: "RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL",
    },
    {
      en: t("Secure Study RIMI International Students to Canada"),
      fr: t("Secure Study RIMI International Students to Canada"),
      value: "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA",
    },
    {
      en: t("Secure Travel RIMI Visitors to Canada Travel"),
      fr: t("Secure Travel RIMI Visitors to Canada Travel"),
      value: "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL",
    },
  ];

  useEffect(() => {
    const type = getUserTypeFromToken();
    if (type) {
      setUserType(type.userType);
    }
  }, []);

  // const handleChange =
  //   (key: keyof Omit<SearchCriteria, "page" | "limit">) =>
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     setCriteria((prev) => ({ ...prev, [key]: value || undefined }));
  //     if (key === "email") {
  //       setEmailError(
  //         value && !emailRegex.test(value) ? "Invalid email format" : ""
  //       );
  //     }
  //   };

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

  const onSearch = (formData: SearchCriteria) => {
    if (errors.email) return;

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => {
        if (v === undefined || v === null) return false;
        if (typeof v === "string" && v.trim() === "") return false;
        if (Array.isArray(v) && v.length === 0) return false;
        return true;
      })
    ) as SearchCriteria;

    const finalData: SearchCriteria = {
      ...filteredData,
      products: selectedProducts,
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
      <h2 className="text-lg 2xl:text-xl font-bold text-left text-[#1B1B1B] mb-2">
        {t("Search Quotes")}
      </h2>
      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        {t("Fill in as many of the following criteria as you can to generate a search.")}
      </p>

      {/* Form Fields  */}
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
          <div className="flex flex-col gap-1">
            <label className="text-sm 2xl:text-base">
              {t("Quote Number")}
            </label>
            <input
              {...register("quoteNumber", {
                setValueAs: (value) => value?.trim() || "",
              })}
              type="text"
              className="input-primary"
              placeholder="Enter Quote Number"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">
              {t("Quote Date")}
            </label>
            <input
              {...register("quoteDate", {
                setValueAs: (value) => value?.trim() || "",
              })}
              className="input-primary"
              type="date"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">
              {t("First Name")}
            </label>
            <input
              {...register("firstName", {
                setValueAs: (value) => value?.trim() || "",
              })}
              className="input-primary"
              placeholder="Enter First Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">
              {t("Last Name")}
            </label>
            <input
              {...register("lastName", {
                setValueAs: (value) => value?.trim() || "",
              })}
              className="input-primary"
              placeholder="Enter Last Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">
              {t("Date of Birth")}
            </label>
            <input
              className="input-primary"
              type="date"
              {...register("dateOfBirth")}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">{t("Email")}</label>
            <input
              {...register("email", {
                setValueAs: (value) => value?.trim()?.toLowerCase() || "",
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className="input-primary"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">
              {t("Effective Date")}
            </label>
            <input
              className="input-primary"
              type="date"
              {...register("effectiveDate")}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm 2xl:text-base">
              {t("Expiry Date")}
            </label>
            <input
              {...register("expiryDate")}
              className="input-primary"
              type="date"
            />
          </div>
          {userType === "ADMIN" && (
            <div className="flex flex-col">
              <label className="text-sm 2xl:text-base">
                {t("Agent Code")}
              </label>
              <input
                {...register("agent", {
                  setValueAs: (value) => value?.trim() || "",
                })}
                className="input-primary"
                placeholder="Agent Code"
              />
            </div>
          )}
        </div>
      </form>
      {/* Product Selector  */}
      <div className="mt-6">
        <p className="text-[#1B1B1B]   mb-2">
          {t("Product")}
        </p>
        <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto text-sm  text-[#1B1B1B] space-y-2">
          <label className="block">
            <input
              type="checkbox"
              className="mr-2 text-[#1B1B1B] accent-primary cursor-pointer"
              checked={selectedProducts?.includes("All")}
              onChange={() => handleProductChange("All")}
            />
            All
          </label>
          {products.map((p) => (
            <label key={p.value} className="block text-[#1B1B1B]">
              <input
                type="checkbox"
                className="mr-2 text-[#1B1B1B] accent-primary cursor-pointer"
                checked={selectedProducts?.includes(p.value)}
                onChange={() => handleProductChange(p.value)}
              />
              {t(p.en)}
            </label>
          ))}
        </div>
      </div>

      {/* Search Button  */}
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={handleSubmit(onSearch)}
          disabled={loading}
          className="btn-primary"
        >
          {loading
            ? t("Searching...")
            : t("Search Quotes")}
        </button>
      </div>

      {/* Search Error DIsplay  */}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Result Table  */}
      {data && (
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <div className="mt-4">
            {!loading && (
              <p className="mb-1 text-text-primary">
                {t("Found")} {data.total} {t("quotes.")}
              </p>
            )}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary text-white text-base 2xl:text-xl capitalize">
              <tr>
                {[
                  t("Quote Number"),
                  t("Name"),
                  t("Status"),
                  // "Date of Birth",
                  t("Quote Date"),
                  t("Product Name"),
                  t("Actions"),
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
                  <td className="p-2 text-primary text-center h-40" colSpan={8}>
                    {t("Loading...")}
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="p-2 text-red-500" colSpan={8}>
                    {error}
                  </td>
                </tr>
              ) : data?.items.length === 0 ? (
                <tr>
                  <td
                    className="p-2 text-text-secondary text-center"
                    colSpan={9}
                  >
                    {t("No quotes found")}
                  </td>
                </tr>
              ) : (
                data.items.map((u: any) => (
                  <tr
                    key={u.id}
                    className="text-[#808080] text-sm 2xl:text-base"
                  >
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.quoteNumber}
                    </td>

                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9] max-w-[250px] break-words"
                    >
                      {u.firstName + " " + u.lastName}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {t(u.status)}
                    </td>
                    {/* <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.dateOfBirth
                        ? new Date(u.dateOfBirth).toLocaleDateString(
                            langauge === "En" ? "en-CA" : "fr-CA",
                            { year: "numeric", month: "short", day: "numeric" }
                          )
                        : "-"}
                    </td> */}
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      {u.dateIssued
                        ? new Date(u.dateIssued).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" }
                          )
                        : "-"}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap capitalize border-r border-b border-[#AAA9A9]"
                    >
                      {u.product.split("_").join(" ").toLowerCase()}
                    </td>
                    <td
                      className="px-2 sm:px-3 py-2 whitespace-nowrap border-r border-b border-[#AAA9A9]"
                    >
                      <Link
                        // onClick={() => navigate(``)}
                        target="_blank"
                        to={`/quote-detail/${u.id}`}
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
      {/* Pagination Controls */}
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

export default QuotesSearch;
