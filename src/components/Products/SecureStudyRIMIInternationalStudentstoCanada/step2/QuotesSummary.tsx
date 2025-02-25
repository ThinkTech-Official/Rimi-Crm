

export default function QuoteSummary() {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200 mt-5">
        <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2">YOUR QUOTE SUMMARY</h2>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            {[
              ["Effective Date", "2025-02-27"],
              ["Expiry Date", "2025-03-01"],
              ["Coverage Length", "3 Days"],
              ["Number of Travellers", "1"],
              ["Policy Type", "Standard"],
              ["Destination Province", "PE"],
            ].map(([label, value], index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 font-semibold">{label}</td>
                <td className="border border-gray-300 px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
