
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
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString();

  // Simple currency formatter
  const fmtMoney = (amt: number) =>
    amt.toLocaleString(undefined, { style: "currency", currency: "CAD" });

  const rows: [string, React.ReactNode][] = [
    ["Effective Date", fmtDate(effectiveDate)],
    ["Expiry Date", fmtDate(expiryDate)],
    ["Coverage Length", `${coverageLength} day${coverageLength !== 1 ? "s" : ""}`],
    ["Number of Travellers", numberOfTravellers],
    ["Policy Type", policyType],
    ["Coverage Limit", fmtMoney(Number(coverageLimit))],
    ["Deductible", fmtMoney(deductible)],
    ["Destination Province", destinationProvince],
    ["Quote Amount", fmtMoney(quoteAmount)],
  ];

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
      Your Quote Summary
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
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
