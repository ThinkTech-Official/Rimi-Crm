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

  const maybe = (value: string | number | undefined | null) =>
    value === undefined || value === null || value === "" ? "N/A" : value;

  return (
    <>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-[#2B00B7]">
          Your Policy is Under Process
        </h2>
        <h3 className="text-lg text-gray-600 mt-2">
          Note: This is not the final policy document
        </h3>
      </div>
      <div className="space-y-8 px-4 py-6">
        {/* CONTACT INFORMATION */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  First Name
                </th>
                <td className="px-4 py-2 border">{maybe(data.firstName)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Last Name
                </th>
                <td className="px-4 py-2 border">{maybe(data.lastName)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Primary Email
                </th>
                <td className="px-4 py-2 border">{maybe(data.email)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Additional Email
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).additionalEmail)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Phone Number
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).phoneNumber)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Legal Guardian
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).legalGuardianName)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* QUOTE SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Quote Summary</h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Quote Number
                </th>
                <td className="px-4 py-2 border">{maybe(data.quoteNumber)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Product
                </th>
                <td className="px-4 py-2 border">{maybe(data.product)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Status
                </th>
                <td className="px-4 py-2 border">{maybe(data.status)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Effective Date
                </th>
                <td className="px-4 py-2 border">
                  {maybe(data.effectiveDate)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Expiry Date
                </th>
                <td className="px-4 py-2 border">{maybe(data.expiryDate)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Coverage Length (Days)
                </th>
                <td className="px-4 py-2 border">{maybe(data.covLen)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Policy Type
                </th>
                <td className="px-4 py-2 border">{maybe(data.policyType)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Destination Province
                </th>
                <td className="px-4 py-2 border">{maybe(data.destProv)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Country of Origin
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).countryOfOrigin)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* APPLICANT SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Applicant Summary</h2>
          {Array.isArray(data.applicants) && data.applicants.length > 0 ? (
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border text-left">#</th>
                  <th className="px-4 py-2 border text-left">First Name</th>
                  <th className="px-4 py-2 border text-left">Last Name</th>
                  <th className="px-4 py-2 border text-left">Date of Birth</th>
                  <th className="px-4 py-2 border text-left">Relationship</th>
                  <th className="px-4 py-2 border text-left">Gender</th>
                </tr>
              </thead>
              <tbody>
                {data.applicants.map((app: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 border">{maybe(app.index)}</td>
                    <td className="px-4 py-2 border">{maybe(app.firstName)}</td>
                    <td className="px-4 py-2 border">{maybe(app.lastName)}</td>
                    <td className="px-4 py-2 border">
                      {maybe(app.dateOfBirth)}
                    </td>
                    <td className="px-4 py-2 border">
                      {maybe((app as any).relation)}
                    </td>
                    <td className="px-4 py-2 border">
                      {maybe((app as any).gender)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No additional applicants found.</p>
          )}
        </section>

        {/* ADDRESS */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Street 1
                </th>
                <td className="px-4 py-2 border">{maybe(data.street)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Street 2
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).street2)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">City</th>
                <td className="px-4 py-2 border">{maybe(data.city)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Province / State
                </th>
                <td className="px-4 py-2 border">{maybe(data.province)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Country Code
                </th>
                <td className="px-4 py-2 border">{maybe(data.countryCode)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Postal Code
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).postalCode)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* BENEFICIARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Beneficiary (In Case of Death)
          </h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Beneficiary Name
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).beneficiaryName)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Relationship to Insured
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).beneficiaryRelation)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* PREMIUM */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Premium Details</h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Premium
                </th>
                <td className="px-4 py-2 border">${maybe(data.premium)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Paid Premium
                </th>
                <td className="px-4 py-2 border">
                  ${maybe(data.paidPremium)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Summary;