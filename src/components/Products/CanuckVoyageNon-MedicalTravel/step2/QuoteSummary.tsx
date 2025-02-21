

export default function QuoteSummary() {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-center text-xl font-semibold border-b pb-2">YOUR QUOTE SUMMARY</h2>
      <table className="w-full mt-4 border border-gray-300">
        <tbody>
          {[
            ["Trip Cost", "$100.00 USD"],
            ["Date the Trip was Booked", "2025-02-14"],
            ["Departure Date", "2025-02-28"],
            ["Return Date", "2025-04-04"],
            ["Coverage Length", "36 Days"],
            ["Country of Origin", "Armenia"],
            ["Trip Cancellation - Deluxe Option", "Yes"],
            ["Destination Country", "Canada"],
            ["Number of Travellers", "1"],
          ].map(([label, value], index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2 font-semibold border-r border-gray-300">{label}</td>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
