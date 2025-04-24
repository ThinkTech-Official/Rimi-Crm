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
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
        Your Quote Summary
      </h3>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        Please review the details below before proceeding.
      </p>

      <table className="w-full border border-[#DBDADE] font-[inter]">
        <tbody>
          {quoteDetails.map((item, index) => (
            <tr
              key={index}
              className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
            >
              <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2">
                {item.label}
              </td>
              <td className="p-3 text-left text-[#6A6A6A]">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteSummary;
