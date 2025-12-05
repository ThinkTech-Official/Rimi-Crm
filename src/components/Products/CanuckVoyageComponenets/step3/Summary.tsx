// import React from "react";
// import { useQuoteDetail } from "../../../../hooks/useQuoteDetail";

// interface SummaryProps {
//   quoteId: string | null;
// }

// const Summary: React.FC<SummaryProps> = ({ quoteId }) => {
//   const { data, loading, error } = useQuoteDetail(quoteId);

//   if (loading) {
//     return <p>Loading quote summary…</p>;
//   }
//   if (error) {
//     return <p className="text-red-600">Error fetching quote details: {error}</p>;
//   }
//   if (!data) {
//     return <p>No data to display.</p>;
//   }

//   const maybe = (value: string | number | undefined | null) =>
//     value === undefined || value === null || value === "" ? "N/A" : value;

//   return (
//     <>
//       <div className="mt-4">
//         <h2 className="text-xl font-bold">Your Policy is Being Processed</h2>
//         <h3 className="text-sm text-gray-600">Note: This is not the final policy</h3>
//       </div>
//       <div className="space-y-8 px-4 py-6">
//         {/* Quote Summary */}
//         <section>
//           <h2 className="text-xl font-semibold mb-2">Quote Summary</h2>
//           <table className="min-w-full border border-gray-200">
//             <tbody>
//               <tr>
//                 <th className="text-left px-4 py-2 border bg-gray-50">Quote Number</th>
//                 <td className="px-4 py-2 border">{maybe(data.quoteNumber)}</td>
//               </tr>
//               <tr>
//                 <th className="text-left px-4 py-2 border bg-gray-50">Product</th>
//                 <td className="px-4 py-2 border">{maybe(data.product)}</td>
//               </tr>
//               <tr>
//                 <th className="text-left px-4 py-2 border bg-gray-50">Status</th>
//                 <td className="px-4 py-2 border">{maybe(data.status)}</td>
//               </tr>
//               <tr>
//                 <th className="text-left px-4 py-2 border bg-gray-50">Premium</th>
//                 <td className="px-4 py-2 border">${maybe(data.premium)}</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>

//         {/* Contact Information */}
//         <section>
//           <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
//           <table className="min-w-full border border-gray-200">
//             <tbody>
//               <tr>
//                 <th className="text-left px-4 py-2 border bg-gray-50">Email</th>
//                 <td className="px-4 py-2 border">{maybe(data.email)}</td>
//               </tr>
//               <tr>
//                 <th className="text-left px-4 py-2 border bg-gray-50">Phone</th>
//                 <td className="px-4 py-2 border">{maybe((data as any).phoneNumber)}</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Summary;

// =================================================

import React from "react";
import { useQuoteDetail } from "../../../../hooks/useQuoteDetail";

interface SummaryProps {
  quoteId: string | null;
}

const Summary: React.FC<SummaryProps> = ({ quoteId }) => {
  const { data, loading, error } = useQuoteDetail(quoteId);

  if (loading) {
    return <p className="text-center mt-8">Loading quote summary…</p>;
  }
  if (error) {
    return (
      <p className="text-red-600 text-center mt-8">
        Error fetching quote details: {error}
      </p>
    );
  }
  if (!data) {
    return <p className="text-center mt-8">No data to display.</p>;
  }

  const maybe = (value: any) =>
    value === undefined || value === null || value === "" ? "N/A" : value;

  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const pluralize = (value: any, singular: string, plural: string) => {
    const num = Number(value);
    if (isNaN(num) || num === 0) return plural;
    return num === 1 ? singular : plural;
  };

  // ---------------------------
  // REUSABLE TABLE RENDERER
  // ---------------------------
  const renderTable = (rows: [string, React.ReactNode][]) => (
    <table className="w-full border border-[#DBDADE]">
      <tbody>
        {rows.map(([label, value], idx) => (
          <tr
            key={idx}
            className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
          >
            <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2">
              {label}
            </td>
            <td className="p-3 text-left text-[#6A6A6A] capitalize">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // ---------------------------
  // TABLE DATA DEFINITIONS
  // ---------------------------
  const contactInfoRows: [string, React.ReactNode][] = [
    ["First Name", maybe(data.firstName)],
    ["Last Name", maybe(data.lastName)],
    ["Date of Birth", formatDate(data.dateOfBirth)],
    ["Gender", maybe(data.gender)],
    ["Primary Email", maybe(data.email)],
    ["Additional Email", maybe((data as any).additionalEmail)],
    ["Phone Number", maybe((data as any).phoneNumber)],
  ];

  // Build quote rows with conditional entries
  const quoteRows: [string, React.ReactNode][] = [
    ["Quote Number", maybe(data.quoteNumber)],
    ["Product", maybe(data.product)],
    [
      "Status",
      <span key="status" className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
        {maybe(data.status)}
      </span>,
    ],
    ["Policy Type", maybe(data.policyType)],
    ["Effective Date", formatDate(data.effectiveDate)],
    ["Expiry Date", formatDate(data.expiryDate)],
    [
      "Coverage Length",
      `${maybe(data.covLen)} ${pluralize(data.covLen, "day", "days")}`,
    ],
    ["Destination Country", maybe(data.destination)],
    [
      "Traveling Through US?",
      (data as any).applicantTravelThroughUs === "yes" ? (
        <span key="travel-us" className="text-green-600 font-semibold">Yes</span>
      ) : (
        <span key="no-travel-us" className="text-gray-600">No</span>
      ),
    ],
  ];

  // Add US Travel Days if applicable
  if ((data as any).applicantTravelThroughUs === "yes") {
    quoteRows.push([
      "US Travel Days",
      `${maybe((data as any).usTravelDays)} ${pluralize(
        (data as any).usTravelDays,
        "day",
        "days"
      )}`,
    ]);
  }

  // Add Days per Trip if Multi-Trip Annual
  if (data.policyType === "Multi-Trip Annual") {
    quoteRows.push([
      "Days per Trip",
      `${maybe((data as any).numberOfDaysPerTrip)} ${pluralize(
        (data as any).numberOfDaysPerTrip,
        "day",
        "days"
      )}`,
    ]);
  }

  // Add remaining rows
  quoteRows.push(
    ["Deductible", `${maybe(data.deductible)} CAD`],
    ["Province of Residence", maybe(data.province)]
  );

  const addressRows: [string, React.ReactNode][] = [
    ["Address Line 1", maybe(data.street)],
    ["Address Line 2", maybe((data as any).street2)],
    ["City", maybe(data.city)],
    ["Province / State", maybe(data.province)],
    ["Postal Code", maybe((data as any).postalCode)],
    ["Country", maybe(data.countryCode)],
  ];

  const premiumRows: [string, React.ReactNode][] = [
    [
      "Total Premium",
      <span className="text-xl font-bold text-green-600">
        ${maybe(data.premium)} CAD
      </span>,
    ],
    [
      "Paid Premium",
      <span className="font-semibold">${maybe(data.paidPremium)} CAD</span>,
    ],
    [
      "Payment Status",
      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
        Paid
      </span>,
    ],
  ];

  return (
    <div className="w-full mt-4 p-6 bg-[#F9F9F9]">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#2B00B7]">
          Your Policy is Under Process
        </h2>
        <h3 className="text-lg text-gray-600 mt-1">
          <b>Note:</b> This is not the final policy document
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          You will receive a confirmation email shortly
        </p>
      </div>

      <div className="space-y-10">
        {/* CONTACT INFORMATION */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#1B1B1B]">
            Contact Information
          </h2>
          {renderTable(contactInfoRows)}
        </section>

        {/* QUOTE SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#1B1B1B]">
            Quote Summary
          </h2>
          {renderTable(quoteRows)}
        </section>

        {/* ADDITIONAL TRAVELLERS */}
        {Array.isArray(data.applicants) && data.applicants.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#1B1B1B]">
              Additional Travellers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-[#DBDADE]">
                <thead className="bg-[#F5F5F5] border-b border-[#DBDADE]">
                  <tr>
                    {[
                      "#",
                      "First Name",
                      "Last Name",
                      "Date of Birth",
                      "Relationship",
                      "Gender",
                    ].map((header) => (
                      <th
                        key={header}
                        className="p-3 text-left font-semibold text-[#1B1B1B]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.applicants.map((app: any, idx: number) => (
                    <tr
                      key={idx}
                      className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
                    >
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {idx + 1}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe(app.firstName)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe(app.lastName)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {formatDate(app.dateOfBirth)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe((app as any).relation)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe((app as any).gender)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* RESIDENCE ADDRESS */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#1B1B1B]">
            Residence Address
          </h2>
          {renderTable(addressRows)}
        </section>

        {/* PREMIUM DETAILS */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#1B1B1B]">
            Premium Details
          </h2>
          {renderTable(premiumRows)}
        </section>

        {/* NEXT STEPS */}
        <section className="bg-blue-50 border border-blue-200 p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#2B00B7]">
            What Happens Next?
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Your payment has been processed successfully and your policy is
              being generated.
            </li>
            <li>
              You will receive a confirmation email at{" "}
              <strong>{data.email}</strong> within the next 24 hours.
            </li>
            <li>
              Your official policy document will be sent to your email address
              once finalized.
            </li>
            <li>
              Please save your quote number:{" "}
              <strong className="text-[#2B00B7]">{data.quoteNumber}</strong> for
              future reference.
            </li>
          </ol>
        </section>

        {/* SUPPORT CONTACT */}
        <section className="bg-gray-50 border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#2B00B7]">
            Need Help?
          </h2>
          <p className="text-gray-700 mb-3">
            If you have any questions about your policy, please contact our
            support team:
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> support@rimiinsurance.com
            </p>
            <p>
              <strong>Phone:</strong> 1-800-XXX-XXXX
            </p>
            <p>
              <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Summary;
