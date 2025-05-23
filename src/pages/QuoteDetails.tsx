import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuoteDetail, QuoteDetail, QuoteApplicant } from '../hooks/useQuoteDetail';

export const QuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: quote, loading, error } = useQuoteDetail(id || null);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (error)   return <p className="text-red-600 text-center py-10">Error: {error}</p>;
  if (!quote)  return <p className="text-center py-10">No quote found.</p>;

  // format helpers
  const fmtDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
      : '-';

      const fmtDatePlusOneMonth = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString('en-CA', {
    year:  'numeric',
    month: '2-digit',
    day:   '2-digit'
  });
};

  return (
    <>
    <div className='max-w-5xl mx-auto text-center mt-10 space-y-4 '>
      <h1 className=' text-2xl text-purple-600'>{quote?.product?.toUpperCase()}</h1>
      <h3 className=' text-xl text-purple-600'>VIEW QUOTE</h3>
    </div>
    <div className="max-w-5xl mx-auto p-6 space-y-8">
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
      <div className="grid grid-cols-12 gap-x-4 border-b pb-4">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Quote Information</div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
          <div>
            <div className="font-medium">Quote Number</div>
            <div>{quote.quoteNumber || quote.id}</div>
          </div>
          <div>
            <div className="font-medium">Quote Date</div>
            <div>{fmtDate(quote.dateIssued)}</div>
          </div>
          <div>
            <div className="font-medium">Quote Expiry Date</div>
            <div>{fmtDatePlusOneMonth(quote.dateIssued)}</div>
          </div>

          <div>
            <div className="font-medium mt-4">Quote Status</div>
            <div>{quote.status || '-'}</div>
          </div>
          <div>
            <div className="font-medium mt-4">Agent Code</div>
            <div>{quote.agentCode}</div>
          </div>
          <div>
            <div className="font-medium mt-4">Quoted Premium</div>
            <div>{quote.premium != null ? `$${quote.premium.toFixed(2)} CAD` : '-'}</div>
          </div>

          <div className="col-span-3 text-xs italic text-gray-500 mt-2 text-center mt-2">
            Note: Rates are subject to change and will be calculated at the time of purchase.
          </div>
        </div>
      </div>


      {/* MAIN APPLICANTS */}
      <div className="grid grid-cols-12 gap-x-4 border-b py-4">
          <div className="col-span-2 text-purple-600 uppercase font-semibold">
            Applicant 1
          </div>
          <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
            <div>
              <div className="font-medium">First Name</div>
              <div>{quote.firstName}</div>
            </div>
            <div>
              <div className="font-medium">Last Name</div>
              <div>{quote.lastName}</div>
            </div>
            <div>
              <div className="font-medium">Date of Birth</div>
              <div>{fmtDate(quote.dateOfBirth)}</div>
            </div>

            <div className="col-span-2 mt-4">
              <div className="font-medium">Email</div>
              <div>{quote.email || '-'}</div>
            </div>
            <div className="mt-4">
              <div className="font-medium">Province of Residence</div>
              <div>{quote.province || '-'}</div>
            </div>
          </div>
        </div>

      {/* ADDITIONAL APPLICANTS */}
      {quote.applicants.length > 0 &&
      quote.applicants.map((app: QuoteApplicant) => (
        <div key={app.index} className="grid grid-cols-12 gap-x-4 border-b py-4">
          <div className="col-span-2 text-purple-600 uppercase font-semibold">
            Applicant {app.index + 2}
          </div>
          <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
            <div>
              <div className="font-medium">First Name</div>
              <div>{app.firstName}</div>
            </div>
            <div>
              <div className="font-medium">Last Name</div>
              <div>{app.lastName}</div>
            </div>
            <div>
              <div className="font-medium">Date of Birth</div>
              <div>{fmtDate(app.dateOfBirth)}</div>
            </div>

            <div className="col-span-2 mt-4">
              <div className="font-medium">Email</div>
              <div>{app.email || '-'}</div>
            </div>
            <div className="mt-4">
              <div className="font-medium">Province of Residence</div>
              <div>{app.province || '-'}</div>
            </div>
          </div>
        </div>
      ))
    }

      {/* COVERAGE DETAILS */}
      <div className="grid grid-cols-12 gap-x-4 border-b py-4">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Coverage Details</div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
          <div>
            <div className="font-medium">Effective Date</div>
            <div>{fmtDate(quote.effectiveDate)}</div>
          </div>
          <div>
            <div className="font-medium">Expiry Date</div>
            <div>{fmtDate(quote.expiryDate)}</div>
          </div>
          <div>
            <div className="font-medium">Coverage Length</div>
            <div>{quote.covLen || '-'}</div>
          </div>

          <div>
            <div className="font-medium mt-4">Policy Type</div>
            <div>{quote.policyType || '-'}</div>
          </div>

          <div>
            <div className="font-medium mt-4">COUNTRY OF ORIGIN</div>
            <div>{quote.countryOfOrigin || '-'}</div>
          </div>

          <div>
            <div className="font-medium mt-4">Destination Province</div>
            <div>{quote.destination || '-'}</div>
          </div>
          <div>
            <div className="font-medium mt-4">Are Applicants Currently In Canada</div>
            <div>{quote.applicantInCanada || 'No'}</div>
          </div>
          
          <div>
            <div className="font-medium mt-4">Are Applicants Travelling To Canada On A Super Visa</div>
            <div>{quote.applicantOnSuperVisa || '-'}</div>
          </div>

          {/* <div>
            <div className="font-medium mt-4">Number of Travel Days in the US</div>
            <div>{quote.coverage || '-'}</div>
          </div> */}

          <div>
            <div className="font-medium mt-4">Coverage</div>
            <div>{quote.coverageOption || '-'}</div>
          </div>

          <div>
            <div className="font-medium mt-4">Deductible</div>
            <div>{quote.deductible || '-'}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuoteDetailPage;