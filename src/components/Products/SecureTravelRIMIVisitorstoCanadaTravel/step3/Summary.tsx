// src/components/Summary.tsx
import React from "react";
import { useQuoteDetail, QuoteDetail, QuoteApplicant } from "../../../../hooks/useQuoteDetail";

interface SummaryProps {
  /** This should be the same `id` you passed to useQuoteDetail to fetch exactly one quote. */
  quoteId: string | null;
}

const Summary: React.FC<SummaryProps> = ({ quoteId }) => {
  const { data, loading, error } = useQuoteDetail(quoteId);

  if (loading) {
    return <p>Loading quote summary…</p>;
  }
  if (error) {
    return <p className="text-red-600">Error fetching quote details: {error}</p>;
  }
  if (!data) {
    return <p>No data to display.</p>;
  }

  // Helper to render “N/A” if a field is missing
  const maybe = (value: string | number | undefined | null) =>
    value === undefined || value === null || value === "" ? "N/A" : value;

  return (
    <>
    <div className=" mt-4">
        <h2>Your Policy is under Process</h2>
        <h3>Note: This is not the Policy</h3>
    </div>
    <div className="space-y-8 px-4 py-6">

        {/*   3) CONTACT INFORMATION   */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <table className="min-w-full border border-gray-200">
          <tbody>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">First Name</th>
              <td className="px-4 py-2 border">{maybe(data.firstName)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Last Name</th>
              <td className="px-4 py-2 border">{maybe(data.lastName)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Primary Email</th>
              <td className="px-4 py-2 border">{maybe(data.email)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Additional Email</th>
              <td className="px-4 py-2 border">{maybe((data as any).additionalEmail)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Phone Number</th>
              <td className="px-4 py-2 border">{maybe((data as any).phoneNumber)}</td>
            </tr>
          </tbody>
        </table>
      </section>
        
      {/*   1) QUOTE SUMMARY   */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Quote Summary</h2>
        <table className="min-w-full border border-gray-200">
          <tbody>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Quote Number</th>
              <td className="px-4 py-2 border">{maybe(data.quoteNumber)}</td>
            </tr>
            {/* <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Policy Number</th>
              <td className="px-4 py-2 border">{maybe(data.policyNumber)}</td>
            </tr> */}
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Product</th>
              <td className="px-4 py-2 border">{maybe(data.product)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Status</th>
              <td className="px-4 py-2 border">{maybe(data.status)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Effective Date</th>
              <td className="px-4 py-2 border">{maybe(data.effectiveDate)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Expiry Date</th>
              <td className="px-4 py-2 border">{maybe(data.expiryDate)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Coverage Length (Days)</th>
              <td className="px-4 py-2 border">{maybe(data.covLen)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Policy Type</th>
              <td className="px-4 py-2 border">{maybe(data.policyType)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Destination Province</th>
              <td className="px-4 py-2 border">{maybe(data.destProv)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">In Canada?</th>
              <td className="px-4 py-2 border">{maybe(data.applicantInCanada)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">On Super Visa?</th>
              <td className="px-4 py-2 border">{maybe(data.applicantOnSuperVisa)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/*   2) APPLICANT SUMMARY   */}
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
                <th className="px-4 py-2 border text-left">Relation</th>
                <th className="px-4 py-2 border text-left">Gender</th>
                <th className="px-4 py-2 border text-left">Pre‐Med Coverage</th>
              </tr>
            </thead>
            <tbody>
              {data.applicants.map((app: QuoteApplicant, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border">{maybe(app.index)}</td>
                  <td className="px-4 py-2 border">{maybe(app.firstName)}</td>
                  <td className="px-4 py-2 border">{maybe(app.lastName)}</td>
                  <td className="px-4 py-2 border">{maybe(app.dateOfBirth)}</td>
                  <td className="px-4 py-2 border">{maybe((app as any).relation)}</td>
                  <td className="px-4 py-2 border">{maybe((app as any).gender)}</td>
                  <td className="px-4 py-2 border">{maybe((app as any).PreExCoverage)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Additional applicants found.</p>
        )}
      </section>

      

      {/*   4) ADDRESS   */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        <table className="min-w-full border border-gray-200">
          <tbody>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Street 1</th>
              <td className="px-4 py-2 border">{maybe(data.street)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Street 2</th>
              <td className="px-4 py-2 border">{maybe((data as any).street2)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">City</th>
              <td className="px-4 py-2 border">{maybe(data.city)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Province / State</th>
              <td className="px-4 py-2 border">{maybe(data.province)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Country Code</th>
              <td className="px-4 py-2 border">{maybe(data.countryCode)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Postal Code</th>
              <td className="px-4 py-2 border">{maybe((data as any).postalCode)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/*   5) BENEFICIARY   */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Beneficiary (In Case of Death)</h2>
        <table className="min-w-full border border-gray-200">
          <tbody>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Beneficiary Name</th>
              <td className="px-4 py-2 border">{maybe((data as any).beneficiaryName)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Relationship to Insured</th>
              <td className="px-4 py-2 border">{maybe((data as any).beneficiaryRelation)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/*   6) PREMIUM   */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Premium Details</h2>
        <table className="min-w-full border border-gray-200">
          <tbody>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Premium</th>
              <td className="px-4 py-2 border">${maybe(data.premium)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Paid Premium</th>
              <td className="px-4 py-2 border">${maybe(data.paidPremium)}</td>
            </tr>
            <tr>
              <th className="text-left px-4 py-2 border bg-gray-50">Coverage Option</th>
              <td className="px-4 py-2 border">{maybe(data.coverageOption)}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    </>
  );
};

export default Summary;
