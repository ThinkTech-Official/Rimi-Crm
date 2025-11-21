import React from "react";
import { useQuoteDetailProduct2 } from "../../../../hooks/student-international/useQuoteDetailProduct2";

interface SummaryProps {
  quoteId: string | null;
}

const Summary: React.FC<SummaryProps> = ({ quoteId }) => {
  const { data, loading, error } = useQuoteDetailProduct2(quoteId);

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

  const contactInfoRows: [string, React.ReactNode][] = [
    ["First Name", maybe(data.firstName)],
    ["Last Name", maybe(data.lastName)],
    ["Primary Email", maybe(data.email)],
    ["Additional Email", maybe((data as any).additionalEmail)],
    ["Phone Number", maybe((data as any).phoneNumber)],
    ["Legal Guardian", maybe((data as any).legalGuardianName)],
  ];

  const quoteSummaryRows: [string, React.ReactNode][] = [
    ["Quote Number", maybe(data.quoteNumber)],
    ["Product", maybe(data.product)],
    ["Status", maybe(data.status)],
    ["Effective Date", maybe(data.effectiveDate)],
    ["Expiry Date", maybe(data.expiryDate)],
    ["Coverage Length (Days)", maybe(data.covLen)],
    ["Policy Type", maybe(data.policyType)],
    ["Destination Province", maybe(data.destProv)],
    ["Country of Origin", maybe((data as any).countryOfOrigin)],
  ];

  const addressRows: [string, React.ReactNode][] = [
    ["Street 1", maybe(data.street)],
    ["Street 2", maybe((data as any).street2)],
    ["City", maybe(data.city)],
    ["Province/State", maybe(data.province)],
    ["Country Code", maybe(data.countryCode)],
    ["Postal Code", maybe((data as any).postalCode)],
  ];

  const beneficiaryRows: [string, React.ReactNode][] = [
    ["Beneficiary Name", maybe((data as any).beneficiaryName)],
    ["Relationship to Insured", maybe((data as any).beneficiaryRelation)],
  ];

  const premiumRows: [string, React.ReactNode][] = [
    ["Premium", `$${maybe(data.premium)}`],
    ["Paid Premium", `$${maybe(data.paidPremium)}`],
  ];

  //reusable table
const renderTable = (rows: [string, React.ReactNode][]) => (
  <div className="w-full overflow-x-auto">
    <table className="min-w-max w-full border border-[#DBDADE]">
      <tbody>
        {rows.map(([label, value], idx) => (
          <tr
            key={idx}
            className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white text-sm sm:text-base"
          >
            <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2 whitespace-nowrap">
              {label}
            </td>
            <td className="p-3 text-left text-[#6A6A6A] capitalize whitespace-nowrap">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


  return (
    <div className="max-w-5xl xl:min-w-4xl mt-4 p-6 bg-[#F9F9F9]">
      <div className="text-center text-text-primary my-6">
        <h2 className="text-xl font-semibold">Your Policy is under Process</h2>
        <h3 className="text-sm">
          <b>Note:</b> This is not the Policy
        </h3>
      </div>

      <div className="space-y-8 px-4 py-6">
        {/* CONTACT INFORMATION */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          {renderTable(contactInfoRows)}
        </section>

        {/* QUOTE SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Quote Summary</h2>
          {renderTable(quoteSummaryRows)}
        </section>

        {/* APPLICANT SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Applicant Summary</h2>

          {Array.isArray(data.applicants) && data.applicants.length > 0 ? (
            <div className="overflow-scroll">
              <table className="w-full border border-[#DBDADE]">
                <thead className="bg-[#F5F5F5] border-b border-[#DBDADE]">
                  <tr>
                    {[
                      "Sr. No.",
                      "First Name",
                      "Last Name",
                      "Date of Birth",
                      "Relationship",
                      "Gender",
                    ].map((header, i) => (
                      <th
                        key={i}
                        className="p-3 text-left font-semibold text-[#1B1B1B] text-nowrap"
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
                      className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white textnow"
                    >
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {Number(maybe(app.index)) + 1}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe(app.firstName)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe(app.lastName)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe(app.dateOfBirth)}
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
          ) : (
            <p>No additional applicants found.</p>
          )}
        </section>

        {/* ADDRESS */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          {renderTable(addressRows)}
        </section>

        {/* BENEFICIARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Beneficiary (In Case of Death)
          </h2>
          {renderTable(beneficiaryRows)}
        </section>

        {/* PREMIUM */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Premium Details</h2>
          {renderTable(premiumRows)}
        </section>
      </div>
    </div>
  );
};

export default Summary;
