// import React from "react";

// const QuoteSummary: React.FC = () => {
//   const quoteDetails = [
//     { label: "Policy Type", value: "Single Trip" },
//     { label: "Effective Date", value: "2025-02-20" },
//     { label: "Expiry Date", value: "2025-02-28" },
//     { label: "Coverage Length", value: "9 Days" },
//     { label: "Destination Country", value: "Canada" },
//     { label: "Deductible", value: "$250.00 CAD" },
//     { label: "Number of Travellers", value: "1" },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B]">
//         Your Quote Summary
//       </h3>
//       <p className="text-left font-medium text-[#6A6A6A] mb-8">
//         Please review the details below before proceeding.
//       </p>

//       <table className="w-full border border-[#DBDADE] font-[inter]">
//         <tbody>
//           {quoteDetails.map((item, index) => (
//             <tr
//               key={index}
//               className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
//             >
//               <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2">
//                 {item.label}
//               </td>
//               <td className="p-3 text-left text-[#6A6A6A]">{item.value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuoteSummary;



// =============================================



import React from "react";

interface QuoteStage1Response {
  quoteNumber: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  destinationCountry: string;
  deductible: number;
  quoteAmount: number;
}

interface QuoteSummaryProps {
  step1ResponseData: QuoteStage1Response | null;
}

export default function QuoteSummary({ step1ResponseData }: QuoteSummaryProps) {
  if (!step1ResponseData) {
    return null;
  }

  const {
    effectiveDate,
    expiryDate,
    coverageLength,
    numberOfTravellers,
    policyType,
    destinationCountry,
    deductible,
    quoteAmount,
  } = step1ResponseData;

  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString();
  const fmtMoney = (amt: number) =>
    amt.toLocaleString(undefined, { style: "currency", currency: "CAD" });

  const rows: [string, React.ReactNode][] = [
    ["Policy Type", policyType],
    ["Effective Date", fmtDate(effectiveDate)],
    ["Expiry Date", fmtDate(expiryDate)],
    ["Coverage Length", `${coverageLength} day${coverageLength !== 1 ? "s" : ""}`],
    ["Destination Country", destinationCountry],
    ["Deductible", fmtMoney(deductible)],
    ["Number of Travellers", numberOfTravellers],
    ["Quote Amount", fmtMoney(quoteAmount)],
  ];

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B]">
        Your Quote Summary
      </h2>
      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        Please review the details below before proceeding.
      </p>

      <table className="w-full border border-[#DBDADE] font-[inter]">
        <tbody>
          {rows.map(([label, value], idx) => (
            <tr
              key={idx}
              className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
            >
              <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2">
                {label}
              </td>
              <td className="p-3 text-left text-[#6A6A6A]">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}