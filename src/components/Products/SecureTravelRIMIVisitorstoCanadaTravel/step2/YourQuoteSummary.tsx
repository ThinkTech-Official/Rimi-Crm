export default function YourQuoteSummary() {
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
          {[
            ["Effective Date", "2025-02-27"],
            ["Expiry Date", "2025-03-01"],
            ["Coverage Length", "3 Days"],
            ["Number of Travellers", "1"],
            ["Policy Type", "Standard"],
            ["Coverage Limit", "$25,000.00 CAD"],
            ["Deductible", "$100.00 CAD"],
            ["Destination Province", "MB"],
          ].map(([label, value], index) => (
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
