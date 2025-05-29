import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePolicyDetail, PolicyDetail, PolicyApplicant } from '../hooks/usePolicyDetail';

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-CA') : '-';

const calcAge = (dob?: string, ref?: string) => {
  if (!dob || !ref) return '-';
  const d1 = new Date(dob);
  const d2 = new Date(ref);
  let age = d2.getFullYear() - d1.getFullYear();
  if (d2 < new Date(d1.setFullYear(d1.getFullYear() + age))) age--;
  return age;
};

function getCoverageLength(effectiveDate: string, expiryDate: string): number | string {
  const start = new Date(effectiveDate);
  const end   = new Date(expiryDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    // throw new Error('Invalid date format. Please use valid ISO date strings.');
    return '-'
  }

  const msInDay = 24 * 60 * 60 * 1000;
  const diffMs  = end.getTime() - start.getTime();

  // We can round here because, if both times are at the same hour/min/sec, 
  // diffMs/msInDay will already be an integer.
  return Math.round(diffMs / msInDay);
}

const PolicyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: p, loading, error } = usePolicyDetail(id || null);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (error) return <p className="text-red-600 text-center py-10">{error}</p>;
  if (!p)     return <p className="text-center py-10">No policy found.</p>;

  console.log(p)

  const history = p.paymentHistory ?? [];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white">
      {/* Header & Buttons */}
      <div className="flex justify-end items-center">
        {/* <button onClick={() => navigate(-1)} className="px-4 py-2 bg-purple-700 text-white rounded">
          &larr; RETURN TO SEARCH RESULTS
        </button> */}
        <div className="space-x-2">
          <button onClick={() => window.location.reload()} className="px-3 py-1 border rounded">Reload</button>
          <button onClick={() => console.log('modify', p.id)} className="px-3 py-1 bg-blue-600 text-white rounded">
            Modify Policy
          </button>
        </div>
      </div>

      {/* Policy Information */}
      <section className="grid grid-cols-12 gap-x-4 border-b pb-4">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Policy Information</div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
          <div><div className="font-medium">Policy Number</div><div>{p.policyNumber}</div></div>
          <div><div className="font-medium">Sale Date</div><div>{fmtDate(p.dateIssued)}</div></div>
          <div><div className="font-medium">Status</div><div>{p.status}</div></div>
          <div><div className="font-medium mt-4">Language</div><div>{p.language || 'English'}</div></div>
          <div><div className="font-medium mt-4">Sales Channel</div><div>{p.salesChannel || '-'}</div></div>
          <div><div className="font-medium mt-4">Agent</div><div>{p.agentCode}</div></div>
        </div>
      </section>

      {/* Primary Insured */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Primary Insured Person</div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
          <div><div className="font-medium">Policy Number</div><div>{p.policyNumber}</div></div>
          <div><div className="font-medium">First Name</div><div>{p.firstName}</div></div>
          <div><div className="font-medium">Last Name</div><div>{p.lastName}</div></div>
          <div><div className="font-medium mt-4">Date of Birth</div><div>{fmtDate(p.dateOfBirth)}</div></div>
          <div><div className="font-medium mt-4">Age on Effective Date</div><div>{calcAge(p.dateOfBirth, p.effectiveDate)}</div></div>
          <div><div className="font-medium mt-4">Gender</div><div>{p.gender}</div></div>
          <div className="col-span-2 mt-4"><div className="font-medium">Include Coverage for Stable Pre-Existing Medical Conditions</div><div>{p.PreExCoverage || 'No'}</div></div>
          <div className="mt-4"><div className="font-medium">Premium</div><div>CAD {p.premium}</div></div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Contact Information</div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4">
          <div><div className="font-medium">Email Address</div><div>{p.email}</div></div>
          <div><div className="font-medium">Additional Email Address</div><div>{p.additionalEmail || '-'}</div></div>
          <div><div className="font-medium">Phone Number</div><div>{p.phoneNumber || '-'}</div></div>
          <div className="mt-4 col-span-2"><div className="font-medium">Address Line 1</div><div>{p.street}</div></div>
          <div className="mt-4"><div className="font-medium">Address Line 2</div><div>{p.street2 || '-'}</div></div>
          <div className="mt-4"><div className="font-medium">City</div><div>{p.city}</div></div>
          <div><div className="font-medium mt-4">Province</div><div>{p.province}</div></div>
          <div><div className="font-medium mt-4">Country</div><div>{p.countryCode}</div></div>
          <div><div className="font-medium mt-4">Postal Code</div><div>{p.postalCode}</div></div>
        </div>
      </section>

      {/* Other insured persons */}
      
      {p.applicants.length > 1 ? p.applicants.filter(a => a.index > 0).map((a: any) => (
        <section key={a.index} className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
          <div className="col-span-2 text-purple-600 uppercase font-semibold">Insured Person {a.index}</div>
          {/* <div className="col-span-10 grid grid-cols-3 gap-x-4">
            <div><div className="font-medium">First Name</div><div>{a.firstName}</div></div>
            <div><div className="font-medium">Last Name</div><div>{a.lastName}</div></div>
            <div><div className="font-medium">Date of Birth</div><div>{fmtDate(a.dateOfBirth)}</div></div>
          </div> */}
           <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
          <div><div className="font-medium">Policy Number</div><div>{a.policyNumber}</div></div>
          <div><div className="font-medium">First Name</div><div>{a.firstName}</div></div>
          <div><div className="font-medium">Last Name</div><div>{a.lastName}</div></div>
          <div><div className="font-medium mt-4">Date of Birth</div><div>{fmtDate(a.dateOfBirth)}</div></div>
          <div><div className="font-medium mt-4">Age on Effective Date</div><div>{calcAge(a.dateOfBirth, p.effectiveDate)}</div></div>
          <div><div className="font-medium mt-4">Gender</div><div>{a.gender}</div></div>
          <div><div className="font-medium mt-4">RELATIONSHIP TO PRIMARY APPLICANT</div><div>{a.relation}</div></div>
          <div className="col-span-2 mt-4"><div className="font-medium">Include Coverage for Stable Pre-Existing Medical Conditions</div><div>{p.PreExCoverage || 'No'}</div></div>
          {/* <div className="mt-4"><div className="font-medium">Premium</div><div>{a.premium?.toLocaleString('en-CA',{style:'currency',currency:'CAD'})}</div></div> */}
        </div>
        </section>
      ))
    :
    p.applicants.map((a: any) => (
      <section key={a.index} className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Insured Person {a.index + 2}</div>
        {/* <div className="col-span-10 grid grid-cols-3 gap-x-4">
          <div><div className="font-medium">First Name</div><div>{a.firstName}</div></div>
          <div><div className="font-medium">Last Name</div><div>{a.lastName}</div></div>
          <div><div className="font-medium">Date of Birth</div><div>{fmtDate(a.dateOfBirth)}</div></div>
        </div> */}
         <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
        <div><div className="font-medium">Policy Number</div><div>{a.policyNumber}</div></div>
        <div><div className="font-medium">First Name</div><div>{a.firstName}</div></div>
        <div><div className="font-medium">Last Name</div><div>{a.lastName}</div></div>
        <div><div className="font-medium mt-4">Date of Birth</div><div>{fmtDate(a.dateOfBirth)}</div></div>
        <div><div className="font-medium mt-4">Age on Effective Date</div><div>{calcAge(a.dateOfBirth, p.effectiveDate)}</div></div>
        <div><div className="font-medium mt-4">Gender</div><div>{a.gender}</div></div>
        <div><div className="font-medium mt-4">RELATIONSHIP TO PRIMARY APPLICANT</div><div>{a.relation}</div></div>
        <div className="col-span-2 mt-4"><div className="font-medium">Include Coverage for Stable Pre-Existing Medical Conditions</div><div>{p.PreExCoverage || 'No'}</div></div>
        <div className="mt-4"><div className="font-medium">Premium</div><div>{a.premium?.toLocaleString('en-CA',{style:'currency',currency:'CAD'})}</div></div>
      </div>
      </section>
    ))
    }

      {/* Coverage Details */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Coverage Details</div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4">
          <div><div className="font-medium">Effective Date</div><div>{fmtDate(p.effectiveDate)}</div></div>
          <div><div className="font-medium">Expiry Date</div><div>{fmtDate(p.expiryDate)}</div></div>
          <div><div className="font-medium">Coverage Length</div><div>{p.covLen ? p.covLen : getCoverageLength(fmtDate(p.effectiveDate), fmtDate(p.expiryDate))} Days</div></div>
          <div><div className="font-medium mt-4">Policy Type</div><div>{p.policyType}</div></div>
          <div><div className="font-medium mt-4">Country of Origin</div><div>{p.countryOfOrigin}</div></div>
          <div><div className="font-medium mt-4">Destination Province</div><div>{p.destination}</div></div>
          <div><div className="font-medium mt-4">Are Applicants Currently in Canada?</div><div>{p.applicantInCanada}</div></div>
          <div><div className="font-medium mt-4">Are Applicants Travelling on a Super Visa?</div><div>{p.applicantOnSuperVisa}</div></div>
          <div><div className="font-medium mt-4">Coverage</div><div>{p.coverage}</div></div>
          <div><div className="font-medium mt-4">Deductible</div><div>{p.deductible}</div></div>
        </div>
      </section>

      {/* Beneficiary Information */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">Beneficiary Information</div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4">
          <div><div className="font-medium">Name</div><div>{p.beneficiaryName}</div></div>
          <div><div className="font-medium">Relationship to Insured</div><div>{p.beneficiaryRelation}</div></div>
        </div>
      </section>

      {/* Premium / Payment Info */}
      {/* <section className="border-b py-4 text-sm space-y-2">
        <div className="uppercase text-purple-600 font-semibold">Premium / Payment Info</div>
        <div className="grid grid-cols-4 gap-x-4">
          <div><div className="font-medium">Premium</div><div>CAD ${p.premium}.00</div></div>
          <div><div className="font-medium">Payment Option</div><div>{p.paymentOption}</div></div>
          <div><div className="font-medium">Credit Card</div><div>{p.creditCardLast4 && `•••• ${p.creditCardLast4}`}</div></div>
        </div>
        
      </section> */}

      {/* Premium / Payment Info */}
{/* Premium / Payment Info */}
{history?.length > 0 && (
  <section className="border-b py-4 text-sm space-y-4">
    <div className="uppercase text-purple-600 font-semibold">
      Premium / Payment Info
    </div>

    {/* top‐line summary */}
    <div className="grid grid-cols-4 gap-x-4">
      {/* 1️ Latest Premium Paid */}
      <div>
        <div className="font-medium">Premium</div>
       
         <div>
    {history[0].amount.toLocaleString('en-CA', {
      style: 'currency',
      currency: history[0].currency,          
      currencyDisplay: 'code'                 
      
    })}
  </div>
      </div>

      {/* 2️ Payment Option */}
      <div>
        <div className="font-medium">Payment Option</div>
        <div>{p.paymentOption || '-'}</div>
      </div>

      {/* 3️ Credit Card Last 4 */}
      <div>
        <div className="font-medium">Credit Card</div>
        <div>
          {history[0].last4
            ? `•••• ${history[0].last4}`
            : '-'}
        </div>
      </div>

      {/* 4️ Date of that charge */}
      <div>
        <div className="font-medium">Date</div>
        <div>{fmtDate(history[0].date)}</div>
      </div>
    </div>

    {/* full history table */}
    <table className="w-full table-fixed border-collapse text-xs mt-4">
  <thead>
    <tr className="bg-gray-100">
      <th className="px-3 py-2 text-left">#</th>
      <th className="px-3 py-2 text-left">Method</th>
      <th className="px-3 py-2 text-left">Name</th>
      <th className="px-3 py-2 text-left">Brand</th>
      <th className="px-3 py-2 text-left">Last 4</th>
      <th className="px-3 py-2 text-right">Amount</th>
      <th className="px-3 py-2 text-right">Fee</th>
      <th className="px-3 py-2 text-left">Status</th>
      <th className="px-3 py-2 text-left">Date</th>
    </tr>
  </thead>
  <tbody className="divide-y">
    {history.map((h, i) => (
      <tr key={h.id}>
        <td className="px-3 py-2 text-left">{i + 1}</td>
        <td className="px-3 py-2 text-left">{h.method}</td>
        <td className="px-3 py-2 text-left">{h.cardholderName}</td>
        <td className="px-3 py-2 text-left">{h.brand}</td>
        <td className="px-3 py-2 text-left">{h.last4}</td>
        <td className="px-3 py-2 text-right">
          {h.amount.toLocaleString('en-CA', {
            style: 'currency',
            currency: h.currency,
            currencyDisplay: 'code'
          })}
        </td>
        <td className="px-3 py-2 text-right">
          {h.fee != null
            ? h.fee.toLocaleString('en-CA', {
                style: 'currency',
                currency: h.currency,
                currencyDisplay: 'code'
              })
            : 'N/A'}
        </td>
        <td className={`px-3 py-2 text-left ${h.status === 'succeeded' ? 'text-green-600' : ''}`}>
          {h.status}
        </td>
        <td className="px-3 py-2 text-left">{fmtDate(h.date)}</td>
      </tr>
    ))}
  </tbody>
</table>

  </section>
)}




      {/* Fulfillment */}
      <section className="border-b py-4 space-y-2 text-sm">
        <div className="uppercase text-purple-600 font-semibold">Fulfillment</div>
        <div className="grid grid-cols-3 gap-x-4">
          <div><label className="font-medium">To</label><input className="w-full p-2 border" defaultValue={p.email}/></div>
          <div><label className="font-medium">CC</label><input className="w-full p-2 border" placeholder="Enter up to 5 emails separated by ;"/></div>
          <div><label className="font-medium">Agent Email</label><input className="w-full p-2 border" defaultValue={p.agentCode + '@example.com'} /></div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded">Preview Confirmation</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Send Confirmation</button>
        </div>
      </section>

      {/* Renewal */}
      <section className="border-b py-4 text-sm">
        <div className="uppercase text-purple-600 font-semibold">Renewal</div>
        <div className="flex items-center space-x-4">
          <div><input type="checkbox" checked readOnly /> Auto Renewal Notice</div>
          <button className="px-3 py-1 border rounded">View Renewal Notice</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">Send Renewal Notice</button>
          <button className="px-3 py-1 bg-green-600 text-white rounded">Issue Related Policy</button>
        </div>
      </section>

      {/* History & Notes */}
      <section className="border-b py-4 text-sm space-y-2">
        <div className="uppercase text-purple-600 font-semibold">History</div>
        <div>
          <label className="font-medium">Notes</label>
          <textarea placeholder="Enter note here" className="w-full p-2 border" rows={3}/>
          <button className="mt-2 px-4 py-2 bg-purple-700 text-white rounded">Add Note</button>
        </div>
      </section>

      {/* Attachments */}
      <section className="py-4 text-sm space-y-2">
        <div className="uppercase text-purple-600 font-semibold">Attachments</div>
        <div className="flex items-end space-x-4">
          <div><label className="font-medium">File</label><input type="file" /></div>
          <div><label className="font-medium">Description</label><input className="p-2 border" /></div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Attachment</button>
        </div>
      </section>
    </div>
  );
};

export default PolicyDetails;