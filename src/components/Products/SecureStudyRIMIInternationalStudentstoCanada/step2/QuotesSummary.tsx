// export default function QuoteSummary() {
//   return (
//     <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B]">
//         Your Quote Summary
//       </h3>
//       <p className="text-left font-medium text-[#6A6A6A] mb-8">
//         Please review the details below before proceeding.
//       </p>

//       <table className="w-full border border-[#DBDADE] font-[inter]">
//         <tbody>
//           {[
//             ["Effective Date", "2025-02-27"],
//             ["Expiry Date", "2025-03-01"],
//             ["Coverage Length", "3 Days"],
//             ["Number of Travellers", "1"],
//             ["Policy Type", "Standard"],
//             ["Destination Province", "PE"],
//           ].map(([label, value], index) => (
//             <tr
//               key={index}
//               className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
//             >
//               <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2">
//                 {label}
//               </td>
//               <td className="p-3 text-left text-[#6A6A6A]">{value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }











// ==================================================




interface QuoteStage1ResponseProduct2 {
  quoteId: string;
  quoteNumber: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  destinationProvince: string;
  quoteAmount: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  applicants: any[];
}

interface QuoteSummaryProps {
  step1ResponseData: QuoteStage1ResponseProduct2 | null;
}

export default function QuoteSummary({ step1ResponseData }: QuoteSummaryProps) {
  if (!step1ResponseData) {
    return (
      <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
        <p className="text-center text-gray-500">Loading quote summary...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const summaryData = [
    ["Effective Date", formatDate(step1ResponseData.effectiveDate)],
    ["Expiry Date", formatDate(step1ResponseData.expiryDate)],
    ["Coverage Length", `${step1ResponseData.coverageLength} Days`],
    ["Number of Travellers", String(step1ResponseData.numberOfTravellers)],
    [
      "Policy Type",
      step1ResponseData.policyType.charAt(0).toUpperCase() +
        step1ResponseData.policyType.slice(1),
    ],
    ["Destination Province", step1ResponseData.destinationProvince],
  ];

  return (
    <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B]">
        Your Quote Summary
      </h3>
      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        Please review the details below before proceeding.
      </p>

      <table className="w-full border border-[#DBDADE] font-[inter]">
        <tbody>
          {summaryData.map(([label, value], index) => (
            <tr
              key={index}
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