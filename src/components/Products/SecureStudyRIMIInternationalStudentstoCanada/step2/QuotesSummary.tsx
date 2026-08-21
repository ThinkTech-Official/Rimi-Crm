import { useLanguage } from "../../../../context/LanguageContext";
import { formatDate } from "../../../../utils/dateUtils";

// export default function QuoteSummary() {
//   return (
//     <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B]">
//         Your Quote Summary
//       </h3>
//       <p className="text-left font-medium text-text-secondary mb-8">
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
//               <td className="p-3 text-left text-text-secondary">{value}</td>
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
  const { t } = useLanguage();

  if (!step1ResponseData) {
    return (
      <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
        <p className="text-center text-gray-500">{t("Loading quote summary...")}</p>
      </div>
    );
  }

  const summaryData = [
    [t("Effective Date"), formatDate(step1ResponseData.effectiveDate)],
    [t("Expiry Date"), formatDate(step1ResponseData.expiryDate)],
    [t("Coverage Length"), `${step1ResponseData.coverageLength} ${t("Days")}`],
    [t("Number of Travellers"), String(step1ResponseData.numberOfTravellers)],
    [
      t("Policy Type"),
      t(step1ResponseData.policyType.charAt(0).toUpperCase() +
        step1ResponseData.policyType.slice(1)),
    ],
    [t("Destination Province"), t(step1ResponseData.destinationProvince)],
  ];

  return (
    <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B]">
        {t("Your Quote Summary")}
      </h3>
      <p className="text-left font-medium text-text-secondary mb-4 sm:mb-8 text-sm sm:text-base">
        {t("Please review the details below before proceeding.")}
      </p>

      <table className="w-full border border-[#DBDADE] font-[inter] text-sm sm:text-base">
        <tbody>
          {summaryData.map(([label, value], index) => (
            <tr
              key={index}
              className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
            >
              <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2">
                {label}
              </td>
              <td className="p-3 text-left text-text-secondary">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}