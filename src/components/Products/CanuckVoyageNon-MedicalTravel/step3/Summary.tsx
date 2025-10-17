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

  const maybe = (value: string | number | undefined | null) =>
    value === undefined || value === null || value === "" ? "N/A" : value;

  const formatDate = (dateString: string | null | undefined) => {
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

  const pluralize = (
    value: string | number | undefined | null,
    singular: string,
    plural: string
  ) => {
    const num = Number(value);
    if (isNaN(num) || num === 0) return plural;
    return num === 1 ? singular : plural;
  };

  return (
    <>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-[#2B00B7]">
          Your Policy is Under Process
        </h2>
        <h3 className="text-lg text-gray-600 mt-2">
          Note: This is not the final policy document
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          You will receive a confirmation email shortly
        </p>
      </div>

      <div className="space-y-8 px-4 py-6">
        {/* ========== CONTACT INFORMATION ========== */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#2B00B7] border-b-2 border-[#2B00B7] pb-2">
            Contact Information
          </h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50 w-1/3">
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
                  Date of Birth
                </th>
                <td className="px-4 py-2 border">
                  {formatDate(data.dateOfBirth)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Gender
                </th>
                <td className="px-4 py-2 border">{maybe(data.gender)}</td>
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
            </tbody>
          </table>
        </section>

        {/* ========== QUOTE SUMMARY ========== */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#2B00B7] border-b-2 border-[#2B00B7] pb-2">
            Quote Summary
          </h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50 w-1/3">
                  Quote Number
                </th>
                <td className="px-4 py-2 border font-semibold text-[#2B00B7]">
                  {maybe(data.quoteNumber)}
                </td>
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
                <td className="px-4 py-2 border">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                    {maybe(data.status)}
                  </span>
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Policy Type
                </th>
                <td className="px-4 py-2 border">{maybe(data.policyType)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Trip Cost (per person)
                </th>
                <td className="px-4 py-2 border">
                  ${maybe((data as any).tripCost)} CAD
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Date Trip was Booked
                </th>
                <td className="px-4 py-2 border">
                  {formatDate((data as any).dateBooked)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Departure Date
                </th>
                <td className="px-4 py-2 border">
                  {formatDate(data.effectiveDate)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Return Date
                </th>
                <td className="px-4 py-2 border">
                  {formatDate(data.expiryDate)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Coverage Length
                </th>
                <td className="px-4 py-2 border">
                  {maybe(data.covLen)} {pluralize(data.covLen, "day", "days")}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Destination Country
                </th>
                <td className="px-4 py-2 border">
                  {maybe(data.destination)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Trip Cancellation - Deluxe
                </th>
                <td className="px-4 py-2 border">
                  {(data as any).tripCancellationDeluxe ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-gray-600">No</span>
                  )}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Country of Origin
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).countryOfOrigin)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Province/State of Residence
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).provinceStateResidence)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ========== ADDITIONAL TRAVELERS ========== */}
        {Array.isArray(data.applicants) && data.applicants.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#2B00B7] border-b-2 border-[#2B00B7] pb-2">
              Additional Travellers
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border text-left">#
                        </th>
                    <th className="px-4 py-2 border text-left">First Name</th>
                    <th className="px-4 py-2 border text-left">Last Name</th>
                    <th className="px-4 py-2 border text-left">Date of Birth</th>
                    <th className="px-4 py-2 border text-left">Relationship</th>
                    <th className="px-4 py-2 border text-left">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {data.applicants.map((app: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{idx + 1}</td>
                      <td className="px-4 py-2 border">
                        {maybe(app.firstName)}
                      </td>
                      <td className="px-4 py-2 border">
                        {maybe(app.lastName)}
                      </td>
                      <td className="px-4 py-2 border">
                        {formatDate(app.dateOfBirth)}
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
            </div>
          </section>
        )}

        {/* ========== ADDRESS ========== */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#2B00B7] border-b-2 border-[#2B00B7] pb-2">
            Residence Address
          </h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50 w-1/3">
                  Address Line 1
                </th>
                <td className="px-4 py-2 border">{maybe(data.street)}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Address Line 2
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
                  Postal Code
                </th>
                <td className="px-4 py-2 border">
                  {maybe((data as any).postalCode)}
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Country
                </th>
                <td className="px-4 py-2 border">{maybe(data.countryCode)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ========== PREMIUM DETAILS ========== */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#2B00B7] border-b-2 border-[#2B00B7] pb-2">
            Premium Details
          </h2>
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50 w-1/3">
                  Total Premium
                </th>
                <td className="px-4 py-2 border">
                  <span className="text-xl font-bold text-green-600">
                    ${maybe(data.premium)} CAD
                  </span>
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Paid Premium
                </th>
                <td className="px-4 py-2 border">
                  <span className="font-semibold">
                    ${maybe(data.paidPremium)} CAD
                  </span>
                </td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 border bg-gray-50">
                  Payment Status
                </th>
                <td className="px-4 py-2 border">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ========== NEXT STEPS ========== */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#2B00B7]">
            📋 What Happens Next?
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

        {/* ========== SUPPORT CONTACT ========== */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#2B00B7]">
            📞 Need Help?
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
    </>
  );
};

export default Summary;