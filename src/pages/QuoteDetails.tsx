import React from "react";
import { useParams } from "react-router-dom";
import {
  useQuoteDetail,
  QuoteApplicant,
} from "../hooks/useQuoteDetail";
import { useLanguage } from "../context/LanguageContext";
import { formatDate } from "../utils/dateUtils";

const DetailItem: React.FC<{ label: string; value: string | number | null | undefined; className?: string }> = ({ label, value, className = "" }) => {
  const { t } = useLanguage();
  if (value === null || value === undefined || value === "" || value === "-") return null;
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="font-semibold text-base break-words">{t(label)}</div>
      <div className="text-sm text-[#6F6B7D] break-words">{typeof value === 'string' ? t(value) : value}</div>
    </div>
  );
};

export const HealthQuestionnaireSection: React.FC<{
  questionnaire?: { questions: Array<{ question: string; answer: string }> };
}> = ({ questionnaire }) => {
  const { t } = useLanguage();
  if (
    !questionnaire ||
    !questionnaire.questions ||
    questionnaire.questions.length === 0
  )
    return null;

  return (
    <div className="mt-6 bg-gray-50/50 p-5 border border-gray-100 max-h-[300px] overflow-y-auto custom-scrollbar-y">
      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
        {t("Medical Declaration")}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {questionnaire.questions.map((q, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0 border-dotted"
          >
            <span className="text-[13px] text-gray-600 leading-snug">
              <span className="font-semibold text-gray-400 mr-2">
                {idx + 1}.
              </span>
              {q.question}
            </span>
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter shrink-0 ${q.answer.toLowerCase() === "yes"
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : "bg-green-50 text-green-600 border border-green-100"
                }`}
            >
              {q.answer}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const QuoteDetailPage: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const { data: quote, loading, error } = useQuoteDetail(id || null);

  if (loading) return <p className="text-center py-10">{t("Loading...")}</p>;
  if (error)
    return <p className="text-red-600 text-center py-10">{t("Error")}: {error}</p>;
  if (!quote) return <p className="text-center py-10">{t("No quote found.")}</p>;

  // format helpers
  const fmtDate = (iso?: string) => formatDate(iso);

  const fmtDatePlusOneMonth = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    d.setMonth(d.getMonth() + 1);
    return formatDate(d);
  };

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="max-w-5xl mx-auto text-center mt-10 space-y-4">
        <div className="flex w-full justify-center gap-6">
          <img src="/rimi_en.png" alt="rimi_logo" className="w-[100px]" />
          <img
            src="/securetravel_en.png"
            alt="securetravel"
            className="w-[130px]"
          />
        </div>
        <h1 className=" text-2xl text-primary font-semibold mt-10">
          {t(quote?.product?.replace(/_/g, ' ') || "")}
        </h1>
        <h3 className=" text-xl text-text-primary font-semibold">
          {t("Quote Details")}
        </h3>
      </div>
      <div className="max-w-5xl p-6 space-y-8 ml-4 md:ml-10 lg:ml-28">
        {/* QUOTE INFORMATION */}
        <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
          <div className="text-primary capitalize font-semibold text-xl">
            {t("Quote Information")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm capitalize w-full">
            <DetailItem label="Quote Number" value={quote.quoteNumber || quote.id} />
            <DetailItem label="Quote Date" value={fmtDate(quote.dateIssued)} />
            <DetailItem label="Quote Expiry Date" value={fmtDatePlusOneMonth(quote.dateIssued)} />
            <DetailItem label="Quote Status" value={quote.status} />
            <DetailItem label="Policy Number" value={quote.policyNumber} />
            <DetailItem label="Agent Code" value={quote.agentCode} />
            <DetailItem
              label="Quoted Premium"
              value={quote.premium != null ? `${quote.premium.toFixed(2)} CAD` : null}
            />
            <DetailItem
              label="Paid Premium"
              value={quote.paidPremium != null ? `${quote.paidPremium.toFixed(2)} CAD` : null}
            />
          </div>
          <div className="text-xs italic text-gray-500 mt-2 text-center w-full">
            {t("Note: Rates are subject to change and will be calculated at the time of purchase.")}
          </div>
        </div>

        {/* MAIN APPLICANTS */}
        <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
          <div className="text-primary capitalize font-semibold text-xl">
            {t("Main Applicant")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
            <DetailItem label="First Name" value={quote.firstName} />
            <DetailItem label="Last Name" value={quote.lastName} />
            <DetailItem label="Date of Birth" value={fmtDate(quote.dateOfBirth)} />
            <DetailItem label="Gender" value={quote.gender} />
            <DetailItem label="Email" value={quote.email} />
            <DetailItem label="Phone Number" value={quote.phoneNumber} />
            <DetailItem label="Province" value={quote.province} />
            <DetailItem label="City" value={quote.city} />
            <DetailItem label="Street" value={quote.street} />
            <DetailItem label="Country" value={quote.countryCode || quote.country} />
            <DetailItem label="Postal Code" value={quote.postalCode} />
            <DetailItem label="Student ID" value={quote.studentId} />
            <DetailItem label="School Name" value={quote.schoolName} />
            <DetailItem label="Additional Email" value={quote.additionalEmail} />
            <DetailItem label="Legal Guardian" value={quote.legalGuardianName} />
            <DetailItem label="Beneficiary Name" value={quote.beneficiaryName} />
            <DetailItem label="Beneficiary Relation" value={quote.beneficiaryRelation || quote.relationshipToInsured} />
            <DetailItem
              label="Pre-existing Medical Coverage"
              value={quote.coverageForPreMedCon || quote.preExMedCov}
            />
          </div>

          {/* Main Applicant Questionnaire */}
          <HealthQuestionnaireSection questionnaire={quote.healthQuestionnaire} />
        </div>

        {/* ADDITIONAL APPLICANTS */}
        {quote.applicants.length > 0 &&
          quote.applicants.map((app: QuoteApplicant) => (
            <div
              key={app.index}
              className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4"
            >
              <div className="text-primary capitalize font-semibold text-xl">
                {t("Applicant")} {app.index + 2}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
                <DetailItem label="First Name" value={app.firstName} />
                <DetailItem label="Last Name" value={app.lastName} />
                <DetailItem label="Date of Birth" value={fmtDate(app.dateOfBirth)} />
                <DetailItem label="Relationship" value={app.relation} />
                <DetailItem label="Gender" value={app.gender} />
                <DetailItem label="Email" value={app.email} />
                <DetailItem label="Phone Number" value={app.phoneNumber} />
                <DetailItem label="Province" value={app.province} />
                <DetailItem label="City" value={app.city} />
                <DetailItem label="Street" value={app.street} />
                <DetailItem label="Country" value={app.country} />
                <DetailItem label="Postal Code" value={app.postalCode} />
                <DetailItem label="Additional Email" value={app.additionalEmail} />
                <DetailItem label="Legal Guardian" value={app.legalGuardianName} />
                <DetailItem label="Beneficiary Name" value={app.beneficiaryName} />
                <DetailItem label="Beneficiary Relation" value={app.relationshipToInsured} />
                <DetailItem
                  label="Pre-existing Medical Coverage"
                  value={app.PreExCoverage}
                />
              </div>

              {/* Additional Applicant Questionnaire */}
              <HealthQuestionnaireSection questionnaire={app.healthQuestionnaire} />
            </div>
          ))}

        {/* COVERAGE / TRIP DETAILS */}
        <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
          <div className="text-primary capitalize font-semibold text-xl">
            {quote.product?.includes("NON_MEDICAL") ? t("Trip Information") : t("Coverage Details")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
            <DetailItem label="Effective Date" value={fmtDate(quote.effectiveDate || quote.covEffDate)} />
            <DetailItem label="Expiry Date" value={fmtDate(quote.expiryDate || quote.covExpDate)} />
            <DetailItem label="Coverage Length" value={quote.covLen || quote.coverageLength} />
            <DetailItem label="Policy Type" value={quote.policyType} />
            <DetailItem label="Plan" value={quote.plan} />
            <DetailItem label="Country of Origin" value={quote.countryOfOrigin} />
            <DetailItem label="Destination Province" value={quote.destinationProvince || quote.destination || quote.destProv} />
            <DetailItem label="Destination Country" value={quote.destinationCountry} />
            <DetailItem label="Are Applicants Currently In Canada" value={quote.applicantInCanada || quote.inCanada} />
            <DetailItem
              label="Are Applicants Travelling To Canada On A Super Visa"
              value={quote.applicantOnSuperVisa || quote.superVisa}
            />
            <DetailItem label="Super Visa Years" value={quote.superVisaYears} />
            <DetailItem
              label="Are Applicants Traveling Through The US"
              value={quote.applicantTravelThroughUs || quote.travelingThroughUS}
            />
            <DetailItem label="US Travel Days" value={quote.usTravelDays} />
            <DetailItem label="Days Per Trip" value={quote.numberOfDaysPerTrip} />
            <DetailItem label="Coverage" value={quote.coverageOption || quote.coverage || quote.coverageLimit} />
            <DetailItem label="Deductible" value={quote.deductible} />
            <DetailItem label="Trip Cost" value={quote.tripCost != null ? `${quote.tripCost.toFixed(2)} CAD` : null} />
            <DetailItem label="Date Booked" value={fmtDate(quote.dateBooked)} />
            <DetailItem label="Trip Cancellation Deluxe" value={quote.tripCancellationDeluxe ? "Yes" : "No"} />
            <DetailItem label="Payment Option" value={quote.paymentOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;
