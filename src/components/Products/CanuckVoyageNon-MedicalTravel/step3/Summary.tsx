import React from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { useQuoteDetail } from "../../../../hooks/useQuoteDetail";

interface SummaryProps {
  quoteId: string | null;
}

const Summary: React.FC<SummaryProps> = ({ quoteId }) => {
  const { t } = useLanguage();
  const { data, loading, error } = useQuoteDetail(quoteId);

  if (loading) {
    return <p className="text-center mt-8">{t("Loading quote summary…")}</p>;
  }
  if (error) {
    return (
      <p className="text-red-600 text-center mt-8">
        {t("Error fetching quote details:")} {error}
      </p>
    );
  }
  if (!data) {
    return <p className="text-center mt-8">{t("No data to display.")}</p>;
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
    if (isNaN(num) || num === 0) return t(plural);
    return num === 1 ? t(singular) : t(plural);
  };

  // ---------------------------
  // TABLE GROUPS
  // ---------------------------

  const contactInfoRows: [string, React.ReactNode][] = [
    [t("First Name"), maybe(data.firstName)],
    [t("Last Name"), maybe(data.lastName)],
    [t("Date of Birth"), formatDate(data.dateOfBirth)],
    [t("Gender"), maybe(data.gender)],
    [t("Primary Email"), maybe(data.email)],
    [t("Additional Email"), maybe((data as any).additionalEmail)],
    [t("Phone Number"), maybe((data as any).phoneNumber)],
  ];

  const quoteRows: [string, React.ReactNode][] = [
    [t("Quote Number"), maybe(data.quoteNumber)],
    [t("Product"), maybe(data.product?.split("_").join(" "))],
    [
      t("Status"),
      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
        {maybe(data.status)}
      </span>,
    ],
    [t("Policy Type"), maybe(data.policyType)],
    [t("Trip Cost (per person)"), `$${maybe((data as any).tripCost)} ${t("CAD")}`],
    [t("Date Trip was Booked"), formatDate((data as any).dateBooked)],
    [t("Departure Date"), formatDate(data.effectiveDate)],
    [t("Return Date"), formatDate(data.expiryDate)],
    [
      t("Coverage Length"),
      `${maybe(data.covLen)} ${pluralize(data.covLen, "day", "days")}`,
    ],
    [t("Destination Country"), maybe(data.destination)],
    [
      t("Trip Cancellation - Deluxe"),
      (data as any).tripCancellationDeluxe ? (
        <span className="text-green-600 font-semibold">{t("Yes")}</span>
      ) : (
        <span className="text-gray-600">{t("No")}</span>
      ),
    ],
    [t("Country of Origin"), maybe((data as any).countryOfOrigin)],
    [t("Province/State of Residence"), maybe((data as any).provinceStateResidence)],
  ];

  const addressRows: [string, React.ReactNode][] = [
    [t("Address Line 1"), maybe(data.street)],
    [t("Address Line 2"), maybe((data as any).street2)],
    [t("City"), maybe(data.city)],
    [t("Province / State"), maybe(data.province)],
    [t("Postal Code"), maybe((data as any).postalCode)],
    [t("Country"), maybe(data.countryCode)],
  ];

  const premiumRows: [string, React.ReactNode][] = [
    [
      t("Total Premium"),
      <span className="font-semibold text-text-primary">
        ${maybe(data.premium)} {t("CAD")}
      </span>,
    ],
    [t("Paid Premium"), `$${maybe(data.paidPremium)} ${t("CAD")}`],
    [
      t("Payment Status"),
      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
        {t("Paid")}
      </span>,
    ],
  ];

  // ---------------------------
  // TABLE RENDERER
  // ---------------------------
  const renderTable = (rows: [string, React.ReactNode][]) => (
   <div className="overflow-auto">
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
   </div>
  );

  // ---------------------------
  // FINAL JSX
  // ---------------------------
  return (
    <div className="w-full mt-4 p-6 bg-[#F9F9F9]">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#2B00B7]">
          {t("Your Policy is Under Process")}
        </h2>
        <h3 className="text-lg text-gray-600 mt-1">
          <b>{t("Note:")}</b> {t("This is not the final policy document")}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {t("You will receive a confirmation email shortly")}
        </p>
      </div>

      <div className="space-y-10">
        {/* CONTACT INFO */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("Contact Information")}
          </h2>
          {renderTable(contactInfoRows)}
        </section>

        {/* QUOTE SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("Quote Summary")}
          </h2>
          {renderTable(quoteRows)}
        </section>

        {/* ADDITIONAL TRAVELLERS */}
        {Array.isArray(data.applicants) && data.applicants.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">
              {t("Additional Travellers")}
            </h2>

            <div className="overflow-auto">
              <table className="w-full border border-[#DBDADE]">
                <thead className="bg-[#F5F5F5] border-b border-[#DBDADE]">
                  <tr>
                    {[
                      "#",
                      t("First Name"),
                      t("Last Name"),
                      t("Date of Birth"),
                      t("Relationship"),
                      t("Gender"),
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
                        {maybe(t(app.relationship || app.relation))}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe(t(app.gender))}
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
            {t("Residence Address")}
          </h2>
          {renderTable(addressRows)}
        </section>

        {/* PREMIUM */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("Premium Details")}
          </h2>
          {renderTable(premiumRows)}
        </section>
      </div>
    </div>
  );
};

export default Summary;
