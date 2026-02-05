import React, { useState, useEffect } from 'react';
import { usePolicyCancellation, RefundPreview } from '../hooks/admin-dashboard/usePolicyCancellation';
import { MdClose } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';

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
  policyId: string;
  policyNumber: string;
  paymentHistory: PaymentRecord[];
  onClose: () => void;
  effectiveDate: string; 
  paymentOption: string; 
  onSuccess: (message: string) => void;
  isSuperVisa?: string | undefined;
}

export default function CancellationModal({
  isOpen,
  onClose,
  policyId,
  policyNumber,
  paymentHistory,
  effectiveDate, 
  paymentOption, 
  onSuccess,
  isSuperVisa
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

  
  const policyHasStarted = new Date() >= new Date(effectiveDate);
  const isMonthly = paymentOption === 'monthly-installments';
  const noRefundsWillBeIssued = isMonthly && policyHasStarted;

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
  }, [isOpen, cancellationType, cancellationFee, step]);

  const handleCancel = async () => {
    const result = await cancelPolicy({
      cancellationType,
      cancellationFee: cancellationType === 'visa-refusal' ? 0 : cancellationFee,
      notes,
      processedBy: processedBy || undefined,
    });

    if (result) {
      onSuccess(result.message);
      onClose();
    }
  };

  useEffect(() => {
    if (isSuperVisa === "yes") {
      setCancellationType("super-visa");
    }
  }, [isSuperVisa]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 h-full">
      <div className="bg-white shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar3">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-inputBorder px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-text-black flex items-center">
            Cancel Policy - <span className='text-primary'>
              {policyNumber}
            </span>
            {isSuperVisa === "yes" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800 ml-2">Super Visa</span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            <MdClose/>
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
              
              {noRefundsWillBeIssued ? (
                <div className="bg-blue-50 border border-blue-200 p-4">
                  <div className="flex items-start">
                    <FaInfo className='text-blue-600 text-xl mr-3 mt-1 bg-blue-200 rounded-full p-1'/>
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
                <div className="bg-yellow-50 border border-yellow-200 p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Refunds will be processed according to the breakdown below.
                  </p>
                </div>
              )}

              {/* Transaction Records Table */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-primary">
                  Transaction Record
                </h3>
                <div className="overflow-x-auto custom-scrollbar2">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-primary text-white text-sm text-nowrap capitalize">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">#</th>
                        <th className="px-3 py-2 text-left font-medium">Payment Method</th>
                        <th className="px-3 py-2 text-left font-medium">Cardholder Name</th>
                        <th className="px-3 py-2 text-left font-medium">Brand</th>
                        <th className="px-3 py-2 text-left font-medium">Card Number Last 4</th>
                        <th className="px-3 py-2 text-right font-medium">Charged Amount</th>
                        <th className="px-3 py-2 text-right font-medium">Transaction Fee</th>
                        <th className="px-3 py-2 text-left font-medium">Status</th>
                        <th className="px-3 py-2 text-left font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-nowrap" style={{ border: "1px solid #AAA9A9" }}>
                      {paymentHistory.map((payment, idx) => (
                        <tr key={payment.id} className="text-[#808080] text-sm">
                          <td className="px-3 py-2" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>{idx + 1}</td>
                          <td className="px-3 py-2" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>{payment.method}</td>
                          <td className="px-3 py-2" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>{payment.cardholderName}</td>
                          <td className="px-3 py-2 capitalize" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>{payment.brand}</td>
                          <td className="px-3 py-2" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>{payment.last4}</td>
                          <td className="px-3 py-2 text-right" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
                            {payment.amount.toLocaleString('en-CA', {
                              style: 'currency',
                              currency: payment.currency,
                              currencyDisplay: 'code'
                            })}
                          </td>
                          <td className="px-3 py-2 text-right" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
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
                          }`} style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
                            {payment.status}
                          </td>
                          <td className="px-3 py-2" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
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
                  <label className="block font-medium mb-2 text-text-secondary">Cancellation Type</label>
                  <select
                    value={cancellationType}
                    onChange={(e) => setCancellationType(e.target.value as any)}
                    className="input-primary"
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
                    <label className="block font-medium mb-2 text-text-secondary">Specify Other Type</label>
                    <input
                      type="text"
                      value={otherTypeText}
                      onChange={(e) => setOtherTypeText(e.target.value)}
                      className="input-primary"
                      placeholder="Enter cancellation type..."
                    />
                  </div>
                )}
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
                    className="input-primary"
                    min="0"
                    step="10"
                    disabled={cancellationType === 'visa-refusal'}
                    readOnly={cancellationType === 'visa-refusal'}
                  />
                </div>
              )}
                {/* Quick Refund Calculation */}
                {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                </div> */}

                <div>
                  <label className="block font-medium mb-2 text-text-secondary">Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-primary"
                    rows={3}
                    placeholder="Enter cancellation notes..."
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2 text-text-secondary">Processed By (Optional)</label>
                  <input
                    type="text"
                    value={processedBy}
                    onChange={(e) => setProcessedBy(e.target.value)}
                    className="input-primary"
                    placeholder="Your name or ID"
                  />
                </div>
              </div>

              {/* Preview Results */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-gray-600">Calculating refund...</p>
                </div>
              ) : preview ? (
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg" style={{ color: '#2309a1' }}>Refund Preview</h3>
                  
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

                  <div className="border-t border-inputBorder pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Refundable</span>
                      <span className="text-2xl font-bold text-green-600">
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
                      <h4 className="font-medium mb-2 text-primary">Refund Breakdown</h4>
                      <div className="overflow-x-auto custom-scrollbar2">
                        <table className="w-full text-sm">
                          <thead className="bg-primary text-white text-nowrap capitalize">
                            <tr>
                              <th className="px-3 py-2 text-left font-medium">Charge ID</th>
                              <th className="px-3 py-2 text-right font-medium">Original</th>
                              <th className="px-3 py-2 text-right font-medium">Refund</th>
                              <th className="px-3 py-2 text-left font-medium">Date</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white" style={{ border: "1px solid #AAA9A9" }}>
                            {preview.refundBreakdown.map((item: any, idx: any) => (
                              <tr key={idx} className="text-[#808080] text-sm">
                                <td className="px-3 py-2 font-mono text-xs" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
                                  {item.chargeId.slice(-14)}
                                </td>
                                <td className="px-3 py-2 text-right" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
                                  ${item.amount.toFixed(2)}
                                </td>
                                <td className="px-3 py-2 text-right font-medium text-green-600" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
                                  ${item.willRefund.toFixed(2)}
                                </td>
                                <td className="px-3 py-2" style={{ borderWidth: "0px 1px 1px 0px", borderStyle: "solid", borderColor: "#AAA9A9" }}>
                                  {new Date(item.date).toLocaleDateString('en-CA')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-inputBorder">
                <button
                  onClick={onClose}
                  className="py-2 px-4 border border-inputBorder hover:border-gray-400 cursor-pointer transition delay-100"
                >
                  NO, GO BACK
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  disabled={!preview || loading}
                  className="btn-primary"
                >
                  {noRefundsWillBeIssued ? 'PROCEED TO CANCEL' : 'PREVIEW REFUND'}
                </button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <>
              <div className="bg-yellow-50 border border-yellow-200 p-4">
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
                <div className="bg-greyBg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{noRefundsWillBeIssued ? 'Total refund:' : 'Total to be refunded:'}</span>
                    <span className="text-2xl font-bold text-green-600">
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

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setStep('preview')}
                  className="py-2 px-4 border border-inputBorder hover:border-gray-400 cursor-pointer transition delay-100"
                >
                  Back
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="bg-red-600 text-white py-2 sm:py-3 px-5 font-semibold hover:bg-red-700 transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70 flex gap-1 items-center text-nowrap w-fit"
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