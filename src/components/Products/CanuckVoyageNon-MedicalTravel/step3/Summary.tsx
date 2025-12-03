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
  // TABLE GROUPS
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

  const quoteRows: [string, React.ReactNode][] = [
    ["Quote Number", maybe(data.quoteNumber)],
    ["Product", maybe(data.product)],
    [
      "Status",
      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
        {maybe(data.status)}
      </span>,
    ],
    ["Policy Type", maybe(data.policyType)],
    ["Trip Cost (per person)", `$${maybe((data as any).tripCost)} CAD`],
    ["Date Trip was Booked", formatDate((data as any).dateBooked)],
    ["Departure Date", formatDate(data.effectiveDate)],
    ["Return Date", formatDate(data.expiryDate)],
    [
      "Coverage Length",
      `${maybe(data.covLen)} ${pluralize(data.covLen, "day", "days")}`,
    ],
    ["Destination Country", maybe(data.destination)],
    [
      "Trip Cancellation - Deluxe",
      (data as any).tripCancellationDeluxe ? (
        <span className="text-green-600 font-semibold">Yes</span>
      ) : (
        <span className="text-gray-600">No</span>
      ),
    ],
    ["Country of Origin", maybe((data as any).countryOfOrigin)],
    ["Province/State of Residence", maybe((data as any).provinceStateResidence)],
  ];

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
      <span className="font-semibold text-text-primary">
        ${maybe(data.premium)} CAD
      </span>,
    ],
    ["Paid Premium", `$${maybe(data.paidPremium)} CAD`],
    [
      "Payment Status",
      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
        Paid
      </span>,
    ],
  ];

  // ---------------------------
  // TABLE RENDERER
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
            <td className="p-3 text-left text-[#6A6A6A] capitalize text-nowrap">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // ---------------------------
  // FINAL JSX
  // ---------------------------
  return (
    <div className="w-full mt-4 p-6 bg-[#F9F9F9]">
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
        {/* CONTACT INFO */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Contact Information
          </h2>
          {renderTable(contactInfoRows)}
        </section>

        {/* QUOTE SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Quote Summary
          </h2>
          {renderTable(quoteRows)}
        </section>

        {/* ADDITIONAL TRAVELLERS */}
        {Array.isArray(data.applicants) && data.applicants.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Additional Travellers
            </h2>

            <div className="overflow-auto">
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
                    ].map((h) => (
                      <th
                        key={h}
                        className="p-3 text-left font-semibold text-[#1B1B1B]"
                      >
                        {h}
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
                        {maybe(app.relation)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe(app.gender)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ADDRESS */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Residence Address
          </h2>
          {renderTable(addressRows)}
        </section>

        {/* PREMIUM */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Premium Details
          </h2>
          {renderTable(premiumRows)}
        </section>
      </div>
    </div>
  );
};

export default Summary;
