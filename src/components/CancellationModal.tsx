// import React, { useState, useEffect } from 'react';
// import { usePolicyCancellation, RefundPreview } from '../hooks/admin-dashboard/usePolicyCancellation';

// interface PaymentRecord {
//   id: string;
//   method: string;
//   cardholderName: string;
//   brand: string;
//   last4: string;
//   amount: number;
//   fee: number | null;
//   currency: string;
//   status: string;
//   date: string;
// }

// interface CancellationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   policyId: string;
//   policyNumber: string;
//   paymentHistory: PaymentRecord[];
//   onSuccess: () => void;
// }

// export default function CancellationModal({
//   isOpen,
//   onClose,
//   policyId,
//   policyNumber,
//   paymentHistory,
//   onSuccess
// }: CancellationModalProps) {
//   const [step, setStep] = useState<'preview' | 'confirm'>('preview');
//   const [cancellationType, setCancellationType] = useState<'visitors' | 'visa-refusal' | 'super-visa' | 'early-return' | 'other'>('visitors');
//   const [cancellationFee, setCancellationFee] = useState(50);
//   const [otherTypeText, setOtherTypeText] = useState('');
//   const [notes, setNotes] = useState('');
//   const [processedBy, setProcessedBy] = useState('');

//   const {
//     preview,
//     loading,
//     error,
//     fetchRefundPreview,
//     cancelPolicy,
//   } = usePolicyCancellation(policyId);

//   // Calculate simple refund estimate for lump sum
//   const calculateSimpleRefund = () => {
//     const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
//     const refundable = totalPaid - cancellationFee;
//     return {
//       totalPaid,
//       refundable: Math.max(0, refundable)
//     };
//   };

//   const simpleRefund = calculateSimpleRefund();

//   useEffect(() => {
//     if (cancellationType === 'visa-refusal') {
//       setCancellationFee(0);
//     } else if (cancellationType === 'super-visa') {
//       setCancellationFee(150);
//     } else if (cancellationType === 'early-return' || cancellationType === 'visitors') {
//       setCancellationFee(50);
//     }
//   }, [cancellationType]);

//   useEffect(() => {
//     if (isOpen && step === 'preview') {
//       const feeToUse = cancellationType === 'visa-refusal' ? 0 : cancellationFee;
//       fetchRefundPreview(cancellationType, feeToUse);
//     }
//   }, [isOpen, cancellationType, cancellationFee]);

//   const handleCancel = async () => {
//     const result = await cancelPolicy({
//       cancellationType,
//       cancellationFee: cancellationType === 'visa-refusal' ? 0 : cancellationFee,
//       notes,
//       processedBy: processedBy || undefined,
//     });

//     if (result) {
//       alert(result.message);
//       onSuccess();
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold" style={{ color: '#2309a1' }}>
//             Cancel Policy {policyNumber}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
//           >
//             ×
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}

//           {step === 'preview' && (
//             <>
//               {/* Transaction Records Table */}
//               <div className="space-y-2">
//                 <h3 className="font-semibold text-sm" style={{ color: '#2309a1' }}>
//                   Transaction Record
//                 </h3>
//                 <div className="border rounded overflow-x-auto">
//                   <table className="w-full text-xs">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="px-3 py-2 text-left">#</th>
//                         <th className="px-3 py-2 text-left">Payment Method</th>
//                         <th className="px-3 py-2 text-left">Cardholder Name</th>
//                         <th className="px-3 py-2 text-left">Brand</th>
//                         <th className="px-3 py-2 text-left">Card Number Last 4</th>
//                         <th className="px-3 py-2 text-right">Charged Amount</th>
//                         <th className="px-3 py-2 text-right">Transaction Fee</th>
//                         <th className="px-3 py-2 text-left">Status</th>
//                         <th className="px-3 py-2 text-left">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y">
//                       {paymentHistory.map((payment, idx) => (
//                         <tr key={payment.id}>
//                           <td className="px-3 py-2">{idx + 1}</td>
//                           <td className="px-3 py-2">{payment.method}</td>
//                           <td className="px-3 py-2">{payment.cardholderName}</td>
//                           <td className="px-3 py-2 capitalize">{payment.brand}</td>
//                           <td className="px-3 py-2">{payment.last4}</td>
//                           <td className="px-3 py-2 text-right">
//                             {payment.amount.toLocaleString('en-CA', {
//                               style: 'currency',
//                               currency: payment.currency,
//                               currencyDisplay: 'code'
//                             })}
//                           </td>
//                           <td className="px-3 py-2 text-right">
//                             {payment.fee != null
//                               ? payment.fee.toLocaleString('en-CA', {
//                                   style: 'currency',
//                                   currency: payment.currency,
//                                   currencyDisplay: 'code'
//                                 })
//                               : 'N/A'}
//                           </td>
//                           <td className={`px-3 py-2 capitalize ${
//                             payment.status === 'succeeded' ? 'text-green-600' : ''
//                           }`}>
//                             {payment.status}
//                           </td>
//                           <td className="px-3 py-2">
//                             {new Date(payment.date).toLocaleDateString('en-CA')}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Cancellation Options */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="block font-medium mb-2">Cancellation Type</label>
//                   <select
//                     value={cancellationType}
//                     onChange={(e) => setCancellationType(e.target.value as any)}
//                     className="w-full p-2 border rounded"
//                   >
//                     <option value="visitors">Visitors Insurance</option>
//                     <option value="visa-refusal">Visa Refusal (No Fee)</option>
//                     <option value="super-visa">Super Visa ($150 Fee)</option>
//                     <option value="early-return">Early Return ($50 Fee)</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {cancellationType === 'other' && (
//                   <div>
//                     <label className="block font-medium mb-2">Specify Other Type</label>
//                     <input
//                       type="text"
//                       value={otherTypeText}
//                       onChange={(e) => setOtherTypeText(e.target.value)}
//                       className="w-full p-2 border rounded"
//                       placeholder="Enter cancellation type..."
//                     />
//                   </div>
//                 )}

//                 <div>
//                   <label className="block font-medium mb-2">
//                     Cancellation Fee (CAD)
//                     {cancellationType === 'visa-refusal' && (
//                       <span className="text-sm text-gray-500 ml-2">(No fee for visa refusal)</span>
//                     )}
//                     {cancellationType === 'super-visa' && (
//                       <span className="text-sm text-gray-500 ml-2">($150 fee for super visa)</span>
//                     )}
//                     {cancellationType === 'early-return' && (
//                       <span className="text-sm text-gray-500 ml-2">($50 fee for early return)</span>
//                     )}
//                   </label>
//                   <input
//                     type="number"
//                     value={cancellationFee}
//                     onChange={(e) => setCancellationFee(Number(e.target.value))}
//                     className="w-full p-2 border rounded"
//                     min="0"
//                     step="10"
//                     disabled={cancellationType === 'visa-refusal'}
//                     readOnly={cancellationType === 'visa-refusal'}
//                   />
//                 </div>

//                 {/* Quick Refund Calculation */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <div className="text-gray-600">Total Amount Paid</div>
//                       <div className="font-semibold text-lg">
//                         CAD ${simpleRefund.totalPaid.toFixed(2)}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600">Cancellation Fee</div>
//                       <div className="font-semibold text-lg text-red-600">
//                         - CAD ${cancellationFee.toFixed(2)}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="border-t border-blue-300 mt-3 pt-3">
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium">Estimated Refundable Amount</span>
//                       <span className="text-2xl font-bold text-green-600">
//                         CAD ${simpleRefund.refundable.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-600 mt-2">
//                       {paymentHistory.length > 1 
//                         ? '⚠️ This is an estimate. For monthly payments, the actual refund breakdown may differ. Click "PREVIEW REFUND" for detailed calculation.'
//                         : 'This is a quick estimate for lump sum payment. Click "PREVIEW REFUND" for official calculation.'}
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">Notes (Optional)</label>
//                   <textarea
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     rows={3}
//                     placeholder="Enter cancellation notes..."
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">Processed By (Optional)</label>
//                   <input
//                     type="text"
//                     value={processedBy}
//                     onChange={(e) => setProcessedBy(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Your name or ID"
//                   />
//                 </div>
//               </div>

//               {/* Preview Results */}
//               {loading ? (
//                 <div className="text-center py-8">
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#2309a1' }}></div>
//                   <p className="mt-2 text-gray-600">Calculating refund...</p>
//                 </div>
//               ) : preview ? (
//                 <div className="bg-gray-50 rounded-lg p-6 space-y-4">
//                   <h3 className="font-semibold text-lg" style={{ color: '#2309a1' }}>Refund Preview</h3>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <div className="text-gray-600">Payment Option</div>
//                       <div className="font-medium">{preview.paymentOption}</div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600">Total Paid</div>
//                       <div className="font-medium">CAD ${preview.totalPaid.toFixed(2)}</div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600">Cancellation Fee</div>
//                       <div className="font-medium">CAD ${preview.cancellationFee.toFixed(2)}</div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600">Admin Fee Refundable</div>
//                       <div className="font-medium">CAD ${preview.adminFeeRefundable.toFixed(2)}</div>
//                     </div>
//                   </div>

//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg font-semibold">Total Refundable</span>
//                       <span className="text-2xl font-bold text-green-600">
//                         CAD ${preview.totalRefundable.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Breakdown Table */}
//                   {preview.refundBreakdown.length > 0 && (
//                     <div className="mt-4">
//                       <h4 className="font-medium mb-2">Refund Breakdown</h4>
//                       <table className="w-full text-xs">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th className="px-2 py-1 text-left">Charge ID</th>
//                             <th className="px-2 py-1 text-right">Original</th>
//                             <th className="px-2 py-1 text-right">Refund</th>
//                             <th className="px-2 py-1 text-left">Date</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y">
//                           {preview.refundBreakdown.map((item: any, idx: any) => (
//                             <tr key={idx}>
//                               <td className="px-2 py-1 font-mono text-xs">
//                                 {item.chargeId.slice(-8)}
//                               </td>
//                               <td className="px-2 py-1 text-right">
//                                 ${item.amount.toFixed(2)}
//                               </td>
//                               <td className="px-2 py-1 text-right font-medium text-green-600">
//                                 ${item.willRefund.toFixed(2)}
//                               </td>
//                               <td className="px-2 py-1">
//                                 {new Date(item.date).toLocaleDateString('en-CA')}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               ) : null}

//               {/* Action Buttons */}
//               <div className="flex justify-end space-x-3 pt-4 border-t">
//                 <button
//                   onClick={onClose}
//                   className="px-4 py-2 border rounded hover:bg-gray-50"
//                 >
//                   NO, GO BACK
//                 </button>
//                 <button
//                   onClick={() => setStep('confirm')}
//                   disabled={!preview || loading}
//                   className="px-4 py-2 text-white rounded disabled:opacity-50"
//                   style={{ backgroundColor: '#2309a1' }}
//                 >
//                   PREVIEW REFUND
//                 </button>
//               </div>
//             </>
//           )}

//           {step === 'confirm' && (
//             <>
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <div className="flex items-start">
//                   <div className="text-yellow-600 text-xl mr-3">⚠️</div>
//                   <div>
//                     <h3 className="font-semibold text-yellow-800 mb-2">
//                       Confirm Policy Cancellation
//                     </h3>
//                     <p className="text-sm text-yellow-700">
//                       This action cannot be undone. The following will occur:
//                     </p>
//                     <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
//                       <li>Policy status will be set to CANCELLED</li>
//                       <li>Refunds will be processed to the original payment method</li>
//                       <li>Subscription will be cancelled (if applicable)</li>
//                       <li>Pending commissions will be reversed</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {preview && (
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">Total to be refunded:</span>
//                     <span className="text-2xl font-bold text-green-600">
//                       CAD ${preview.totalRefundable.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-end space-x-3 pt-4 border-t">
//                 <button
//                   onClick={() => setStep('preview')}
//                   className="px-4 py-2 border rounded hover:bg-gray-50"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   disabled={loading}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
//                 >
//                   {loading ? 'Processing...' : 'CONFIRM CANCELLATION'}
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// ==============================================




import React, { useState, useEffect } from 'react';
import { usePolicyCancellation, RefundPreview } from '../hooks/admin-dashboard/usePolicyCancellation';

interface PaymentRecord {
  id: string;
  method: string;
  cardholderName: string;
  brand: string;
  last4: string;
  amount: number;
  fee: number | null;
  currency: string;
  status: string;
  date: string;
}

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyId: string;
  policyNumber: string;
  paymentHistory: PaymentRecord[];
  effectiveDate: string; // ✅ NEW: Add this prop
  paymentOption: string; // ✅ NEW: Add this prop
  onSuccess: () => void;
}

export default function CancellationModal({
  isOpen,
  onClose,
  policyId,
  policyNumber,
  paymentHistory,
  effectiveDate, // ✅ NEW
  paymentOption, // ✅ NEW
  onSuccess
}: CancellationModalProps) {
  const [step, setStep] = useState<'preview' | 'confirm'>('preview');
  const [cancellationType, setCancellationType] = useState<'visitors' | 'visa-refusal' | 'super-visa' | 'early-return' | 'other'>('visitors');
  const [cancellationFee, setCancellationFee] = useState(50);
  const [otherTypeText, setOtherTypeText] = useState('');
  const [notes, setNotes] = useState('');
  const [processedBy, setProcessedBy] = useState('');

  const {
    preview,
    loading,
    error,
    fetchRefundPreview,
    cancelPolicy,
  } = usePolicyCancellation(policyId);

  // ✅ NEW: Check if policy has started
  const policyHasStarted = new Date() >= new Date(effectiveDate);
  const isMonthly = paymentOption === 'monthly-installments';
  const noRefundsWillBeIssued = isMonthly && policyHasStarted;

  // Calculate simple refund estimate
  // const calculateSimpleRefund = () => {
  //   if (noRefundsWillBeIssued) {
  //     return { totalPaid: 0, refundable: 0 };
  //   }
    
  //   const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  //   const refundable = totalPaid - cancellationFee;
  //   return {
  //     totalPaid,
  //     refundable: Math.max(0, refundable)
  //   };
  // };

  const calculateSimpleRefund = () => {
  // If policy has started and is monthly, no refunds
  if (noRefundsWillBeIssued) {
    return { 
      totalPaid: paymentHistory.reduce((sum, p) => sum + p.amount, 0), 
      refundable: 0 
    };
  }
  
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  const refundable = totalPaid - cancellationFee;
  return {
    totalPaid,
    refundable: Math.max(0, refundable)
  };
};

  const simpleRefund = calculateSimpleRefund();

  useEffect(() => {
    if (cancellationType === 'visa-refusal') {
      setCancellationFee(0);
    } else if (cancellationType === 'super-visa') {
      setCancellationFee(150);
    } else if (cancellationType === 'early-return' || cancellationType === 'visitors') {
      setCancellationFee(50);
    }
  }, [cancellationType]);

  useEffect(() => {
    if (isOpen && step === 'preview') {
      const feeToUse = cancellationType === 'visa-refusal' ? 0 : cancellationFee;
      fetchRefundPreview(cancellationType, feeToUse);
    }
  }, [isOpen, cancellationType, cancellationFee]);

  const handleCancel = async () => {
    const result = await cancelPolicy({
      cancellationType,
      cancellationFee: cancellationType === 'visa-refusal' ? 0 : cancellationFee,
      notes,
      processedBy: processedBy || undefined,
    });

    if (result) {
      alert(result.message);
      onSuccess();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold" style={{ color: '#2309a1' }}>
            Cancel Policy {policyNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {step === 'preview' && (
            <>
              {/* ✅ NEW: Policy Status Alert */}
              {noRefundsWillBeIssued ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="text-blue-600 text-xl mr-3">ℹ️</div>
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">
                        Policy Already Started - No Refunds
                      </h3>
                      <p className="text-sm text-blue-700 mb-2">
                        This policy has already started (Effective: {new Date(effectiveDate).toLocaleDateString('en-CA')}). 
                        Cancelling will:
                      </p>
                      <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                        <li>Stop all future monthly charges immediately</li>
                        <li>Keep your coverage through the last paid period</li>
                        <li><strong>No refunds will be issued</strong> (premium already earned)</li>
                        <li>Cancel the Stripe subscription</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Refunds will be processed according to the breakdown below.
                  </p>
                </div>
              )}

              {/* Transaction Records Table */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm" style={{ color: '#2309a1' }}>
                  Transaction Record
                </h3>
                <div className="border rounded overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">#</th>
                        <th className="px-3 py-2 text-left">Payment Method</th>
                        <th className="px-3 py-2 text-left">Cardholder Name</th>
                        <th className="px-3 py-2 text-left">Brand</th>
                        <th className="px-3 py-2 text-left">Card Number Last 4</th>
                        <th className="px-3 py-2 text-right">Charged Amount</th>
                        <th className="px-3 py-2 text-right">Transaction Fee</th>
                        <th className="px-3 py-2 text-left">Status</th>
                        <th className="px-3 py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {paymentHistory.map((payment, idx) => (
                        <tr key={payment.id}>
                          <td className="px-3 py-2">{idx + 1}</td>
                          <td className="px-3 py-2">{payment.method}</td>
                          <td className="px-3 py-2">{payment.cardholderName}</td>
                          <td className="px-3 py-2 capitalize">{payment.brand}</td>
                          <td className="px-3 py-2">{payment.last4}</td>
                          <td className="px-3 py-2 text-right">
                            {payment.amount.toLocaleString('en-CA', {
                              style: 'currency',
                              currency: payment.currency,
                              currencyDisplay: 'code'
                            })}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {payment.fee != null
                              ? payment.fee.toLocaleString('en-CA', {
                                  style: 'currency',
                                  currency: payment.currency,
                                  currencyDisplay: 'code'
                                })
                              : 'N/A'}
                          </td>
                          <td className={`px-3 py-2 capitalize ${
                            payment.status === 'succeeded' ? 'text-green-600' : ''
                          }`}>
                            {payment.status}
                          </td>
                          <td className="px-3 py-2">
                            {new Date(payment.date).toLocaleDateString('en-CA')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cancellation Options */}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Cancellation Type</label>
                  <select
                    value={cancellationType}
                    onChange={(e) => setCancellationType(e.target.value as any)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="visitors">Visitors Insurance</option>
                    <option value="visa-refusal">Visa Refusal (No Fee)</option>
                    <option value="super-visa">Super Visa ($150 Fee)</option>
                    <option value="early-return">Early Return ($50 Fee)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {cancellationType === 'other' && (
                  <div>
                    <label className="block font-medium mb-2">Specify Other Type</label>
                    <input
                      type="text"
                      value={otherTypeText}
                      onChange={(e) => setOtherTypeText(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter cancellation type..."
                    />
                  </div>
                )}

                {/* ✅ UPDATED: Conditionally show cancellation fee */}
                {!noRefundsWillBeIssued && (
                  <div>
                    <label className="block font-medium mb-2">
                      Cancellation Fee (CAD)
                      {cancellationType === 'visa-refusal' && (
                        <span className="text-sm text-gray-500 ml-2">(No fee for visa refusal)</span>
                      )}
                      {cancellationType === 'super-visa' && (
                        <span className="text-sm text-gray-500 ml-2">($150 fee for super visa)</span>
                      )}
                      {cancellationType === 'early-return' && (
                        <span className="text-sm text-gray-500 ml-2">($50 fee for early return)</span>
                      )}
                    </label>
                    <input
                      type="number"
                      value={cancellationFee}
                      onChange={(e) => setCancellationFee(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                      min="0"
                      step="10"
                      disabled={cancellationType === 'visa-refusal'}
                      readOnly={cancellationType === 'visa-refusal'}
                    />
                  </div>
                )}

                {/* ✅ UPDATED: Quick Refund Calculation */}
                {/* {!noRefundsWillBeIssued && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Total Amount Paid</div>
                        <div className="font-semibold text-lg">
                          CAD ${simpleRefund.totalPaid.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Cancellation Fee</div>
                        <div className="font-semibold text-lg text-red-600">
                          - CAD ${cancellationFee.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-blue-300 mt-3 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Estimated Refundable Amount</span>
                        <span className="text-2xl font-bold text-green-600">
                          CAD ${simpleRefund.refundable.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {paymentHistory.length > 1 
                          ? '⚠️ This is an estimate. For monthly payments, the actual refund breakdown may differ. Click "PREVIEW REFUND" for detailed calculation.'
                          : 'This is a quick estimate for lump sum payment. Click "PREVIEW REFUND" for official calculation.'}
                      </p>
                    </div>
                  </div>
                )} */}

                <div>
                  <label className="block font-medium mb-2">Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder="Enter cancellation notes..."
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Processed By (Optional)</label>
                  <input
                    type="text"
                    value={processedBy}
                    onChange={(e) => setProcessedBy(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Your name or ID"
                  />
                </div>
              </div>

              {/* Preview Results */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#2309a1' }}></div>
                  <p className="mt-2 text-gray-600">Calculating refund...</p>
                </div>
              ) : preview ? (
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg" style={{ color: '#2309a1' }}>
                    {noRefundsWillBeIssued ? 'Cancellation Summary' : 'Refund Preview'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Payment Option</div>
                      <div className="font-medium">{preview.paymentOption}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Total Paid</div>
                      <div className="font-medium">CAD ${preview.totalPaid.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Cancellation Fee</div>
                      <div className="font-medium">CAD ${preview.cancellationFee.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Admin Fee Refundable</div>
                      <div className="font-medium">CAD ${preview.adminFeeRefundable.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {noRefundsWillBeIssued ? 'Total Refund' : 'Total Refundable'}
                      </span>
                      <span className={`text-2xl font-bold ${noRefundsWillBeIssued ? 'text-gray-600' : 'text-green-600'}`}>
                        CAD ${preview.totalRefundable.toFixed(2)}
                      </span>
                    </div>
                    {noRefundsWillBeIssued && (
                      <p className="text-sm text-gray-600 mt-2">
                        No refunds will be issued. Subscription will be cancelled.
                      </p>
                    )}
                  </div>

                  {/* Breakdown Table */}
                  {preview.refundBreakdown.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">
                        {noRefundsWillBeIssued ? 'Payment History' : 'Refund Breakdown'}
                      </h4>
                      <table className="w-full text-xs">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-2 py-1 text-left">Charge ID</th>
                            <th className="px-2 py-1 text-right">Original</th>
                            <th className="px-2 py-1 text-right">Refund</th>
                            <th className="px-2 py-1 text-left">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {preview.refundBreakdown.map((item: any, idx: any) => (
                            <tr key={idx}>
                              <td className="px-2 py-1 font-mono text-xs">
                                {item.chargeId.slice(-8)}
                              </td>
                              <td className="px-2 py-1 text-right">
                                ${item.amount.toFixed(2)}
                              </td>
                              <td className={`px-2 py-1 text-right font-medium ${
                                item.willRefund > 0 ? 'text-green-600' : 'text-gray-500'
                              }`}>
                                ${item.willRefund.toFixed(2)}
                              </td>
                              <td className="px-2 py-1">
                                {new Date(item.date).toLocaleDateString('en-CA')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  NO, GO BACK
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  disabled={!preview || loading}
                  className="px-4 py-2 text-white rounded disabled:opacity-50"
                  style={{ backgroundColor: '#2309a1' }}
                >
                  {noRefundsWillBeIssued ? 'PROCEED TO CANCEL' : 'PREVIEW REFUND'}
                </button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="text-yellow-600 text-xl mr-3">⚠️</div>
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      Confirm Policy Cancellation
                    </h3>
                    <p className="text-sm text-yellow-700">
                      This action cannot be undone. The following will occur:
                    </p>
                    <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                      <li>Policy status will be set to CANCELLED</li>
                      {!noRefundsWillBeIssued && <li>Refunds will be processed to the original payment method</li>}
                      <li>Subscription will be cancelled (if applicable)</li>
                      <li>Pending commissions will be reversed</li>
                      {noRefundsWillBeIssued && (
                        <li className="font-semibold">No refunds will be issued (policy already started)</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {preview && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {noRefundsWillBeIssued ? 'Total refund:' : 'Total to be refunded:'}
                    </span>
                    <span className={`text-2xl font-bold ${noRefundsWillBeIssued ? 'text-gray-600' : 'text-green-600'}`}>
                      CAD ${preview.totalRefundable.toFixed(2)}
                    </span>
                  </div>
                  {noRefundsWillBeIssued && (
                    <p className="text-sm text-gray-600 mt-2">
                      Future charges will be stopped. Coverage continues through last paid period.
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setStep('preview')}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'CONFIRM CANCELLATION'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}