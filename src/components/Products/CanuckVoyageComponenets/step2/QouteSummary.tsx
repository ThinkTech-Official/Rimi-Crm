import React from "react";

const QuoteSummary: React.FC = () => {
  const quoteDetails = [
    { label: "Policy Type", value: "Single Trip" },
    { label: "Effective Date", value: "2025-02-20" },
    { label: "Expiry Date", value: "2025-02-28" },
    { label: "Coverage Length", value: "9 Days" },
    { label: "Destination Country", value: "Canada" },
    { label: "Deductible", value: "$250.00 CAD" },
    { label: "Number of Travellers", value: "1" },
  ];

  return (
    <div className="">
      <h3 className="text-lg font-semibold text-center text-gray-700 underline mb-4">
        YOUR QUOTE SUMMARY
      </h3>
      <table className="w-full border border-gray-300">
        <tbody>
          {quoteDetails.map((item, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="p-3 font-medium text-gray-700 bg-gray-100 border-r border-gray-300">
                {item.label}
              </td>
              <td className="p-3 text-gray-900">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteSummary;