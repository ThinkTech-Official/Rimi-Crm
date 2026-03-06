import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useQuoteDetail,
  QuoteDetail,
  QuoteApplicant,
} from "../hooks/useQuoteDetail";

export const UserQuoteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: quote, loading, error } = useQuoteDetail(id || null);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (error)
    return <p className="text-red-600 text-center py-10">Error: {error}</p>;
  if (!quote) return <p className="text-center py-10">No quote found.</p>;

  // format helpers
  const fmtDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      : "-";

  const fmtDatePlusOneMonth = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
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
          {quote?.product?.toUpperCase()}
        </h1>
        <h3 className=" text-xl text-text-primary font-semibold">
          Quote Details
        </h3>
      </div>
      <div className="max-w-5xl p-6 space-y-8 ml-4 md:ml-10 lg:ml-28">
        {/* Top Buttons */}
        <div className="flex justify-between">
          {/* <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
        >
          &larr; RETURN TO SEARCH RESULTS
        </button> */}
          {/* <button
          onClick={() => console.log('Cancel policy', quote.id)}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Cancel Policy
        </button> */}
        </div>

        {/* QUOTE INFORMATION */}
        <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
          <div className="text-primary capitalize font-semibold text-xl">
            Quote Information
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm capitalize w-full">
            <div>
              <div className="font-semibold text-base">Quote Number</div>
              <div className="text-sm text-[#6F6B7D]">
                {quote.quoteNumber || quote.id}
              </div>
            </div>
            <div>
              <div className="font-semibold text-base">Quote Date</div>
              <div className="text-sm text-[#6F6B7D]">
                {fmtDate(quote.dateIssued)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-base">Quote Expiry Date</div>
              <div className="text-sm text-[#6F6B7D]">
                {fmtDatePlusOneMonth(quote.dateIssued)}
              </div>
            </div>

            <div>
              <div className="font-semibold text-base">Quote Status</div>
              <div className="text-sm text-[#6F6B7D]">
                {quote.status || "-"}
              </div>
            </div>
            <div>
              <div className="font-semibold text-base">Agent Code</div>
              <div className="text-sm text-[#6F6B7D]">{quote.agentCode}</div>
            </div>
            <div>
              <div className="font-semibold text-base">Quoted Premium</div>
              <div className="text-sm text-[#6F6B7D]">
                {quote.premium != null
                  ? `${quote.premium.toFixed(2)} CAD`
                  : "-"}
              </div>
            </div>
          </div>
          <div className="text-xs italic text-gray-500 mt-2 text-center w-full">
            Note: Rates are subject to change and will be calculated at the time
            of purchase.
          </div>
        </div>

        {/* MAIN APPLICANTS */}
        <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
          <div className="text-primary capitalize font-semibold text-xl">
            Main Applicant
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
            <div>
              <div className="font-semibold text-base">First Name</div>
              <div className="text-sm text-[#6F6B7D]">{quote.firstName}</div>
            </div>
            <div>
              <div className="font-semibold text-base">Last Name</div>
              <div className="text-sm text-[#6F6B7D]">{quote.lastName}</div>
            </div>
            <div>
              <div className="font-semibold text-base">Date of Birth</div>
              <div className="text-sm text-[#6F6B7D]">{fmtDate(quote.dateOfBirth)}</div>
            </div>

            <div>
              <div className="font-semibold text-base">Email</div>
              <div className="text-sm text-[#6F6B7D]">{quote.email || "-"}</div>
            </div>
            <div>
              <div className="font-semibold text-base">
                Province of Residence
              </div>
              <div className="text-sm text-[#6F6B7D]">{quote.province || "-"}</div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL APPLICANTS */}
        {quote.applicants.length > 0 &&
          quote.applicants.map((app: QuoteApplicant) => (
            <div
              key={app.index}
              className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4"
            >
              <div className="text-primary capitalize font-semibold text-xl">
                Applicant {app.index + 2}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
                <div>
                  <div className="font-semibold text-base">First Name</div>
                  <div className="text-sm text-[#6F6B7D]">{app.firstName}</div>
                </div>
                <div>
                  <div className="font-semibold text-base">Last Name</div>
                  <div className="text-sm text-[#6F6B7D]">{app.lastName}</div>
                </div>
                <div>
                  <div className="font-semibold text-base">Date of Birth</div>
                  <div className="text-sm text-[#6F6B7D]">{fmtDate(app.dateOfBirth)}</div>
                </div>

                <div className="col-span-2 mt-4">
                  <div className="font-semibold text-base">Email</div>
                  <div className="text-sm text-[#6F6B7D]">{app.email || "-"}</div>
                </div>
                <div className="mt-4">
                  <div className="font-semibold text-base">
                    Province of Residence
                  </div>
                  <div className="text-sm text-[#6F6B7D]">{app.province || "-"}</div>
                </div>
              </div>
            </div>
          ))}

        {/* COVERAGE DETAILS */}
        <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
          <div className="text-primary capitalize font-semibold text-xl">
            Coverage Details
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
            <div>
              <div className="font-semibold text-base">Effective Date</div>
              <div className="text-sm text-[#6F6B7D]">{fmtDate(quote.effectiveDate)}</div>
            </div>
            <div>
              <div className="font-semibold text-base">Expiry Date</div>
              <div className="text-sm text-[#6F6B7D]">{fmtDate(quote.expiryDate)}</div>
            </div>
            <div>
              <div className="font-semibold text-base">Coverage Length</div>
              <div className="text-sm text-[#6F6B7D]">{quote.covLen || "-"}</div>
            </div>

            <div>
              <div className="font-semibold mt-4">Policy Type</div>
              <div className="text-sm text-[#6F6B7D]">{quote.policyType || "-"}</div>
            </div>

            <div>
              <div className="font-semibold mt-4">Country of Origin</div>
              <div className="text-sm text-[#6F6B7D]">{quote.countryOfOrigin || "-"}</div>
            </div>

            <div>
              <div className="font-semibold mt-4">Destination Province</div>
              <div className="text-sm text-[#6F6B7D]">{quote.destination || "-"}</div>
            </div>

            <div>
              <div className="font-semibold mt-4">
                Are Applicants Currently In Canada
              </div>
              <div className="text-sm text-[#6F6B7D]">{quote.applicantInCanada || "No"}</div>
            </div>

            <div>
              <div className="font-semibold mt-4">
                Are Applicants Travelling To Canada On A Super Visa
              </div>
              <div className="text-sm text-[#6F6B7D]">{quote.applicantOnSuperVisa || "-"}</div>
            </div>

            <div>
              <div className="font-semibold mt-4">Coverage</div>
              <div className="text-sm text-[#6F6B7D]">{quote.coverageOption || "-"}</div>
            </div>

            <div>
              <div className="font-semibold mt-4">Deductible</div>
              <div className="text-sm text-[#6F6B7D]">{quote.deductible || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserQuoteDetails;
