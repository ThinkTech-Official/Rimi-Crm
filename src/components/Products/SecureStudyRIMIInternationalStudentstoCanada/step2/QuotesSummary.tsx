export default function QuoteSummary() {
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
          {[
            ["Effective Date", "2025-02-27"],
            ["Expiry Date", "2025-03-01"],
            ["Coverage Length", "3 Days"],
            ["Number of Travellers", "1"],
            ["Policy Type", "Standard"],
            ["Destination Province", "PE"],
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
