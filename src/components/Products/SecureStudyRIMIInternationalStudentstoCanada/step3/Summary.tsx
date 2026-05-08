import React from "react";
import { useQuoteDetailProduct2 } from "../../../../hooks/student-international/useQuoteDetailProduct2";
import { useLanguage } from "../../../../context/LanguageContext";
import { formatDate } from "../../../../utils/dateUtils";

interface SummaryProps {
  quoteId: string | null;
}

const Summary: React.FC<SummaryProps> = ({ quoteId }) => {
  const { t } = useLanguage();
  const { data, loading, error } = useQuoteDetailProduct2(quoteId);

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

  const contactInfoRows: [string, React.ReactNode][] = [
    [t("First Name"), maybe(data.firstName)],
    [t("Last Name"), maybe(data.lastName)],
    [t("Primary Email"), maybe(data.email)],
    [t("Additional Email"), maybe((data as any).additionalEmail)],
    [t("Phone Number"), maybe((data as any).phoneNumber)],
    [t("Legal Guardian"), maybe((data as any).legalGuardianName)],
  ];

  const quoteSummaryRows: [string, React.ReactNode][] = [
    [t("Quote Number"), maybe(data.quoteNumber)],
    [t("Product"), maybe(data.product.split("_").join(" "))],
    [t("Status"), t(maybe(data.status))],
    [t("Effective Date"), formatDate(data.effectiveDate)],
    [t("Expiry Date"), formatDate(data.expiryDate)],
    [t("Coverage Length (Days)"), maybe(data.covLen)],
    [t("Policy Type"), t(maybe(data.policyType))],
    [t("Destination Province"), t(maybe(data.destProv))],
    [t("Country of Origin"), t(maybe((data as any).countryOfOrigin))],
  ];

  const addressRows: [string, React.ReactNode][] = [
    [t("Street 1"), maybe(data.street)],
    [t("Street 2"), maybe((data as any).street2)],
    [t("City"), maybe(data.city)],
    [t("Province/State"), maybe(data.province)],
    [t("Country Code"), maybe(data.countryCode)],
    [t("Postal Code"), maybe((data as any).postalCode)],
  ];

  const beneficiaryRows: [string, React.ReactNode][] = [
    [t("Beneficiary Name"), maybe((data as any).beneficiaryName)],
    [t("Relationship to Insured"), t(maybe((data as any).beneficiaryRelation))],
  ];

  const premiumRows: [string, React.ReactNode][] = [
    [t("Premium"), `$${maybe(data.premium)}`],
    [t("Paid Premium"), `$${maybe(data.paidPremium)}`],
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
        <h2 className="text-xl font-semibold">{t("Your Policy is under Process")}</h2>
        <h3 className="text-sm">
          <b>{t("Note:")}</b> {t("This is not the Policy")}
        </h3>
      </div>

      <div className="space-y-8 px-4 py-6">
        {/* CONTACT INFORMATION */}
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("Contact Information")}</h2>
          {renderTable(contactInfoRows)}
        </section>
        {/* QUOTE SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("Quote Summary")}</h2>
          {renderTable(quoteSummaryRows)}
        </section>

        {/* APPLICANT SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("Applicant Summary")}</h2>

          {Array.isArray(data.applicants) && data.applicants.length > 0 ? (
            <div className="overflow-scroll">
              <table className="w-full border border-[#DBDADE]">
                <thead className="bg-[#F5F5F5] border-b border-[#DBDADE]">
                  <tr>
                    {[
                      t("Sr. No."),
                      t("First Name"),
                      t("Last Name"),
                      t("Date of Birth"),
                      t("Relationship to Primary Applicant"),
                      t("Gender"),
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
                        {formatDate(app.dateOfBirth)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {maybe((app as any).relationship || (app as any).relation)}
                      </td>
                      <td className="p-3 text-left text-[#6A6A6A]">
                        {t(maybe((app as any).gender))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>{t("No additional applicants found.")}</p>
          )}
        </section>

        {/* ADDRESS */}
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("Address")}</h2>
          {renderTable(addressRows)}
        </section>

        {/* BENEFICIARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("Beneficiary (In Case of Death)")}
          </h2>
          {renderTable(beneficiaryRows)}
        </section>

        {/* PREMIUM */}
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("Premium Details")}</h2>
          {renderTable(premiumRows)}
        </section>
      </div>
    </div>
  );
};

export default Summary;
