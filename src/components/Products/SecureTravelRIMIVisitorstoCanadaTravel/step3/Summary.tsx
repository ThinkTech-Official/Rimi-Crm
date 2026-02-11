import React from "react";
import {
  useQuoteDetail,
  QuoteApplicant,
} from "../../../../hooks/useQuoteDetail";
import { useLanguage } from "../../../../context/LanguageContext";

interface SummaryProps {
  /** This should be the same `id` you passed to useQuoteDetail to fetch exactly one quote. */
  quoteId: string | null;
}

const Summary: React.FC<SummaryProps> = ({ quoteId }) => {
  const { t } = useLanguage();
  const { data, loading, error } = useQuoteDetail(quoteId);

  if (loading) {
    return <p>{t("Loading quote summary…")}</p>;
  }
  if (error) {
    return (
      <p className="text-red-600">
        {t("Error fetching quote details")}: {t(error)}
      </p>
    );
  }
  if (!data) {
    return <p>{t("No data to display.")}</p>;
  }

  const maybe = (value: string | number | undefined | null) =>
    value === undefined || value === null || value === "" ? "N/A" : value;

  const contactInfoRows: [string, React.ReactNode][] = [
    [t("First Name"), maybe(data.firstName)],
    [t("Last Name"), maybe(data.lastName)],
    [t("Primary Email"), maybe(data.email)],
    [t("Secondary Email"), maybe((data as any).additionalEmail)],
    [t("Primary Phone"), maybe((data as any).phoneNumber)],
  ];

  const quoteSummaryRows: [string, React.ReactNode][] = [
    [t("Quote Number"), maybe(data.quoteNumber)],
    [t("Product"), t(maybe(data.product) as string)],
    [t("Status"), t(maybe(data.status) as string)],
    [t("Effective Date"), maybe(data.effectiveDate)],
    [t("Expiry Date"), maybe(data.expiryDate)],
    [t("Coverage Length (Days)"), maybe(data.covLen)],
    [t("Policy Type"), t(maybe(data.policyType) as string)],
    [t("Destination Province"), t(maybe(data.destProv) as string)],
    [t("In Canada?"), t(maybe(data.applicantInCanada) as string)],
    [t("On Super Visa?"), t(maybe(data.applicantOnSuperVisa) as string)],
  ];

  const addressRows: [string, React.ReactNode][] = [
    [t("Street 1"), maybe(data.street)],
    [t("Street 2"), maybe((data as any).street2)],
    [t("City"), maybe(data.city)],
    [t("Province / State"), t(maybe(data.province) as string)],
    [t("Country Code"), t(maybe(data.countryCode) as string)],
    [t("Postal Code"), maybe((data as any).postalCode)],
  ];

  const beneficiaryRows: [string, React.ReactNode][] = [
    [t("Beneficiary Name"), maybe((data as any).beneficiaryName)],
    [t("Relationship to Insured"), t(maybe((data as any).beneficiaryRelation) as string)],
  ];

  const premiumRows: [string, React.ReactNode][] = [
    [t("Premium"), `$${maybe(data.premium)}`],
    [t("Paid Premium"), `$${maybe(data.paidPremium)}`],
    [t("Coverage Option"), maybe(data.coverageOption)],
  ];

  const renderTable = (rows: [string, React.ReactNode][]) => (
    <table className="w-full border border-[#DBDADE]">
      <tbody>
        {rows.map(([label, value], idx) => (
          <tr
            key={idx}
            className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white"
          >
            <td className="p-3 text-left font-semibold text-[#1B1B1B] w-1/2">
              {t(label)}
            </td>
            <td className="p-3 text-left text-[#6A6A6A] capitalize text-nowrap">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="w-full xl:min-w-4xl mt-4 p-6 bg-[#F9F9F9]">
      <div className="text-center text-text-primary mb-6">
        <h2 className="text-xl font-semibold">{t("Your Policy is under Process")}</h2>
        <h3 className="text-sm">
          <b>{t("Note")}:</b> {t("This is not the Policy")}
        </h3>
      </div>

      <div className="space-y-8 px-4 py-6 min-w-full">
        {/* CONTACT INFORMATION */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("Contact Information")}
          </h2>
          {renderTable(contactInfoRows)}
        </section>

        {/* QUOTE SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">{t("Quote Summary")}</h2>
          {renderTable(quoteSummaryRows)}
        </section>

        {/* APPLICANT SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("Applicant Summary")}
          </h2>
         <div className="overflow-auto custom-scrollbar2">
           {Array.isArray(data.applicants) && data.applicants.length > 0 ? (
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
                    t("Pre‐Med Coverage"),
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
                {data.applicants.map((app: QuoteApplicant, idx: number) => (
                  <tr
                    key={idx}
                    className="border border-[#DBDADE] even:bg-[#F5F5F5] odd:bg-white text-nowrap"
                  >
                    <td className="p-3 text-left text-[#6A6A6A]">
                      {Number(maybe(app.index)) +1}
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
                      {t(maybe((app as any).relationship || (app as any).relation) as string)}
                    </td>
                    <td className="p-3 text-left text-[#6A6A6A]">
                      {t(maybe((app as any).gender) as string)}
                    </td>
                    <td className="p-3 text-[#6A6A6A] text-center">
                      {t(maybe((app as any).PreExCoverage) as string)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{t("No Additional applicants found.")}</p>
          )}
         </div>
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
