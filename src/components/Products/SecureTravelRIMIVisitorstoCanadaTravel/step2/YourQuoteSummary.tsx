
import { useLanguage } from "../../../../context/LanguageContext";
import { formatDate } from "../../../../utils/dateUtils";

export interface QuoteStage1Response {
  quoteNumber: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  coverageLimit: string;
  deductible: number;
  destinationProvince: string;
  quoteAmount: number;
}

interface QuoteSummaryProps {
  step1ResponseData: QuoteStage1Response | null;
}


export default function YourQuoteSummary({ step1ResponseData }: QuoteSummaryProps) {
  const { t } = useLanguage();
  if (!step1ResponseData) {
    return null; // or loading state
  }

  const {
    effectiveDate,
    expiryDate,
    coverageLength,
    numberOfTravellers,
    policyType,
    coverageLimit,
    deductible,
    destinationProvince,
    quoteAmount,
  } = step1ResponseData;

  // Simple date formatter
  const fmtDate = (iso: string) => formatDate(iso);

  // Simple currency formatter
  const fmtMoney = (amt: number) =>
    amt.toLocaleString(undefined, { style: "currency", currency: "CAD" });

  const rows: [string, React.ReactNode][] = [
    [t("Effective Date"), fmtDate(effectiveDate)],
    [t("Expiry Date"), fmtDate(expiryDate)],
    [t("Coverage Length"), `${coverageLength} ${coverageLength !== 1 ? t("days") : t("day")}`],
    [t("Number of Travellers"), numberOfTravellers+1],
    [t("Policy Type"), t(policyType)],
    [t("Coverage Limit"), fmtMoney(Number(coverageLimit))],
    [t("Deductible"), fmtMoney(deductible)],
    [t("Destination Province"), t(destinationProvince)],
    [t("Quote Amount"), fmtMoney(quoteAmount)],
  ];

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B]">
        {t("Your Quote Summary")}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8">
        {t("Please review the details below before proceeding.")}
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
              <td className="p-3 text-left text-[#6A6A6A] capitalize">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
