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
//     <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
//       <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
//         {langauge === "En" ? "Search Quotes" : "Rechercher Quotes"}
//       </h2>
//       <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
//         {langauge === "En"
//           ? "Fill in as many of the following criteria as you can to generate a search."
//           : "Indiquez Le Plus De Critères Possible Parmi Les Suivants Pour Lancer Une Recherche."}
//       </p>

//       <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">
//             {langauge === "En" ? "Quote Number" : "Numéro de devis"}
//           </label>
//           <input
//           value={criteria.quoteNumber || ''}
//           onChange={handleChange('quoteNumber')}
//             className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//             placeholder="Enter Quote Number"
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">
//             {langauge === "En" ? "Quote Date" : "Date du devis"}
//           </label>
//           <input
//             className="p-2 border border-[#DBDADE] font-[inter]"
//             type="date"
//             value={criteria.quoteDate || ''}
//             onChange={handleChange('quoteDate')}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">
//             {langauge === "En" ? "First Name" : "Prénom"}
//           </label>
//           <input
//             className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//             placeholder="Enter First Name"
//             value={criteria.firstName || ''}
//             onChange={handleChange('firstName')}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">
//             {langauge === "En" ? "Last Name" : "Nom de famille"}
//           </label>
//           <input
//             className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//             placeholder="Enter Last Name"
//             value={criteria.lastName || ''}
//             onChange={handleChange('lastName')}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">
//             {langauge === "En" ? "Date of Birth" : "Date de naissance"}
//           </label>
//           <input
//             className="p-2 border border-[#DBDADE] font-[inter]"
//             type="date"
//             value={criteria.dateOfBirth || ''}
//             onChange={handleChange('dateOfBirth')}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">Email</label>
//           <input
//             className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//             placeholder="Email"
//             value={criteria.email || ''}
//             onChange={handleChange('email')}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">
//             {langauge === "En" ? "Effective Date" : `Date d'entrée en vigueur`}
//           </label>
//           <input
//             className="p-2 border border-[#DBDADE] font-[inter]"
//             type="date"
//             value={criteria.effectiveDate || ''}
//             onChange={handleChange('effectiveDate')}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="font-[inter]">
//             {langauge === "En" ? "Expiry Date" : `Date d'expiration`}
//           </label>
//           <input
//             className="p-2 border border-[#DBDADE] font-[inter]"
//             type="date"
//             value={criteria.expiryDate || ''}
//             onChange={handleChange('expiryDate')}
//           />
//         </div>
//         {userType === "ADMIN" && (
//           <div className="flex flex-col gap-2">
//             <label className="font-[inter]">
//               {langauge === "En" ? "Agent" : "Agent"}
//             </label>
//             <input
//               className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
//               placeholder="Agent"
//               value={criteria.agent || ''}
//               onChange={handleChange('agent')}
//             />
//           </div>
//         )}
//       </div>

//       <div className="mt-6">
//         <p className="text-[#1B1B1B]  font-[inter] mb-2">
//           {langauge === "En" ? "Product" : "PRODUIT"}
//         </p>
//         <div className="border border-[#DBDADE] p-2 bg-[#F9F9F9] overflow-y-auto rounded text-sm font-[inter] text-[#1B1B1B] space-y-2">
//           <label className="block">
//             <input
//               type="checkbox"
//               className="mr-2 text-[#1B1B1B]"
//               checked={criteria.products?.includes('All')}
//               onChange={() => handleProductChange('All')}
//             />
//             All
//           </label>
//           {products.map((p) => (
//             <label key={p.en} className="block text-[#1B1B1B]">
//               <input
//                 type="checkbox"
//                 className="mr-2 text-[#1B1B1B]"
//                 checked={criteria.products?.includes(p.en)}
//                 onChange={() => handleProductChange(p.en)}
//               />
//               {langauge === "En" ? p.en : p.fr}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="w-full flex justify-center items-center mt-2">
//         <button
//          onClick={onSearch}
//          disabled={!!emailError || loading}
//         className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]">
//           {langauge === "En" ? "Search Quotes" : "Rechercher Quotes"}
//         </button>
//       </div>

//            {/* Error or Results */}
//       {error && <p className="text-red-600 mt-2">{error}</p>}
//       {data && (
//         <div className="mt-4">
//           <p>Found {data.length} quotes.</p>
//           {/* ── Results Table ─────────────────────────────────────── */}
//                 {loading && <p>Loading…</p>}
//                 {error && <p className="text-red-500">{error}</p>}

//                 {!loading && !error && data.length > 0 && (
//                   <>
//                     <table className="min-w-full border">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           {[
//                             "Quote Number",
//                             "Status",
//                             "First Name",
//                             "Last Name",
//                             "Date of Birth",
//                             "Quote Date",
//                             "Product Name",
//                             "Actions",
//                           ].map((h) => (
//                             <th
//                               key={h}
//                               className="px-4 py-2 text-left text-sm font-medium text-gray-700"
//                             >
//                               {h}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.map((u: any) => (
//                           <tr key={u.id} className="border-t">
//                             <td className="px-4 py-2">{u.id}</td>
//                             <td className="px-4 py-2">{u.status}</td>
//                             <td className="px-4 py-2">{u.firstName}</td>
//                             <td className="px-4 py-2">{u.lastName}</td>
//                             <td className="px-4 py-2">{u.dateOfBirth}</td>
//                             <td className="px-4 py-2">{u.dateIssued}</td>
//                             <td className="px-4 py-2">{u.product}</td>
//                             <td className="px-4 py-2">
//                               <button
//                                 onClick={() => navigate(`/userdetail/${u.id}`)}
//                                 className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
//                               >
//                                 View
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>

//                     {/* ── Pagination Controls ────────────────────────────── */}
//                     {/* <div className="flex justify-center items-center space-x-2 mt-4">
//                       <button
//                         onClick={() => goToPage(page - 1)}
//                         disabled={!hasPrevPage}
//                         className="px-3 py-1 rounded border bg-white disabled:opacity-50"
//                       >
//                         Prev
//                       </button>

//                       {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                         <button
//                           key={p}
//                           onClick={() => goToPage(p)}
//                           className={`px-3 py-1 rounded border ${
//                             p === page
//                               ? "bg-indigo-600 text-white"
//                               : "bg-white text-indigo-600"
//                           }`}
//                         >
//                           {p}
//                         </button>
//                       ))}

//                       <button
//                         onClick={() => goToPage(page + 1)}
//                         disabled={!hasNextPage}
//                         className="px-3 py-1 rounded border bg-white disabled:opacity-50"
//                       >
//                         Next
//                       </button>
//                     </div> */}
//                   </>
//                 )}

//                 {!loading && !error && data.length === 0 && (
//                   <p className="text-center text-gray-500">No users found.</p>
//                 )}
//         </div>
//       )}

//     </div>
//   );
// };

// export default QuotesSearch;

// ================================================

// src/components/QuotesSearch.tsx
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { LangContext } from "../context/LangContext";
import { getUserTypeFromToken } from "../utils/getUserType";
import {
  useSearchQuotes,
  SearchCriteria,
  QuoteRecord,
  PaginatedQuotes,
} from "../hooks/useSearchQuotes";
import { useNavigate } from "react-router-dom";

const emailRegex = /^\S+@\S+\.\S+$/;

const QuotesSearch: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const navigate = useNavigate();

  const [userType, setUserType] = useState<string | null>(null);
  const [criteria, setCriteria] = useState<
    Omit<SearchCriteria, "page" | "limit">
  >({ products: ["All"] });
  const [emailError, setEmailError] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { search, loading, error, data } = useSearchQuotes(limit);

  const products = [
    {
      en: "RIMI Canuck Voyage Travel Medical",
      fr: "RIMI Canuck Voyage Travel Medical",
    },
    {
      en: "RIMI Canuck Voyage Non-Medical Travel",
      fr: "RIMI Assurance voyage non médicale Travel",
    },
    {
      en: "Secure Study RIMI International Students to Canada",
      fr: "Secure Study RIMI International Students to Canada",
    },
    {
      en: "Secure Travel RIMI Visitors to Canada Travel",
      fr: "Secure Travel RIMI Visitors to Canada Travel",
    },
  ];

  useEffect(() => {
    const type = getUserTypeFromToken();
    setUserType(type.userType);
  }, []);

  const handleChange =
    (key: keyof Omit<SearchCriteria, "page" | "limit">) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCriteria((prev) => ({ ...prev, [key]: value || undefined }));
      if (key === "email") {
        setEmailError(
          value && !emailRegex.test(value) ? "Invalid email format" : ""
        );
      }
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
    if (!emailError) {
      setPage(1);
      search(criteria, 1, limit);
    }
    console.log(data);
  };

  const goToPage = (p: number) => {
    if (!data) return;
    const tp = data.totalPages;
    const np = Math.max(1, Math.min(p, tp));
    setPage(np);
    search(criteria, np, limit);
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
        {langauge === "En" ? "Search Quotes" : "Rechercher Quotes"}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        {langauge === "En"
          ? "Fill in as many of the following criteria as you can to generate a search."
          : "Indiquez Le Plus De Critères Possible Parmi Les Suivants Pour Lancer Une Recherche."}
      </p>

      {/* Form Fields  */}
      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Quote Number" : "Numéro de devis"}
          </label>
          <input
            value={criteria.quoteNumber || ""}
            onChange={handleChange("quoteNumber")}
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Quote Number"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Quote Date" : "Date du devis"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
            value={criteria.quoteDate || ""}
            onChange={handleChange("quoteDate")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "First Name" : "Prénom"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter First Name"
            value={criteria.firstName || ""}
            onChange={handleChange("firstName")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Last Name" : "Nom de famille"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Last Name"
            value={criteria.lastName || ""}
            onChange={handleChange("lastName")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Date of Birth" : "Date de naissance"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
            value={criteria.dateOfBirth || ""}
            onChange={handleChange("dateOfBirth")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Email</label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Email"
            value={criteria.email || ""}
            onChange={handleChange("email")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Effective Date" : `Date d'entrée en vigueur`}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
            value={criteria.effectiveDate || ""}
            onChange={handleChange("effectiveDate")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">
            {langauge === "En" ? "Expiry Date" : `Date d'expiration`}
          </label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="date"
            value={criteria.expiryDate || ""}
            onChange={handleChange("expiryDate")}
          />
        </div>
        {userType === "ADMIN" && (
          <div className="flex flex-col gap-2">
            <label className="font-[inter]">
              {langauge === "En" ? "Agent" : "Agent"}
            </label>
            <input
              className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
              placeholder="Agent"
              value={criteria.agent || ""}
              onChange={handleChange("agent")}
            />
          </div>
        )}
      </div>
      {/* Product Selector  */}
      <div className="mt-6">
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
      </div>

      {/* Search Button  */}
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={onSearch}
          disabled={!!emailError || loading}
          className="px-6 py-2 bg-[#2b00b7] text-white rounded disabled:opacity-50"
        >
          {loading
            ? "Searching..."
            : langauge === "En"
            ? "Search Quotes"
            : "Rechercher Quotes"}
        </button>
      </div>

      {/* Search Error DIsplay  */}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Result Table  */}
      {data && (
        <>
          <p className="mt-4">Found {data.total} quotes.</p>

          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Quote Number",
                  
                  "First Name",
                  "Last Name",
                  "Status",
                  "Date of Birth",
                  "Quote Date",
                  "Product Name",
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
              {data.items.map((u: any) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">{u.quoteNumber}</td> 
                  
                  <td className="px-4 py-2">{u.firstName}</td>
                  <td className="px-4 py-2">{u.lastName}</td>
                  <td className="px-4 py-2">{u.status}</td>
                  <td className="px-4 py-2">
                    {u.dateOfBirth
                      ? new Date(u.dateOfBirth).toLocaleDateString(
                          langauge === "En" ? "en-CA" : "fr-CA",
                          { year: "numeric", month: "short", day: "numeric" }
                        )
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {u.dateIssued
                      ? new Date(u.dateIssued).toLocaleDateString(
                          langauge === "En" ? "en-CA" : "fr-CA",
                          { year: "numeric", month: "short", day: "numeric" }
                        )
                      : "-"}
                  </td>
                  <td className="px-4 py-2">{u.product}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => navigate(`/quote-detail/${u.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
              (p) => (
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
              )
            )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= data.totalPages}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuotesSearch;
