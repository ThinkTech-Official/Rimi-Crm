// import { useState } from 'react';
// import { API_BASE } from '../../utils/urls';


// export interface RefundPreview {
//   policyNumber: string;
//   paymentOption: string;
//   totalPaid: number;
//   cancellationFee: number;
//   adminFeeRefundable: number;
//   totalRefundable: number;
//   refundBreakdown: Array<{
//     chargeId: string;
//     amount: number;
//     date: string;
//     willRefund: number;
//   }>;
// }

// export interface CancelPolicyRequest {
//   cancellationType: 'visitors' | 'visa-refusal' | 'other' | 'super-visa' | 'early-return'
//   cancellationFee: number;
//   notes?: string;
//   processedBy?: string;
// }

// export interface RefundAdminFeeRequest {
//   notes?: string;
//   processedBy?: string;
// }

// export interface CancelPolicyResponse {
//   success: boolean;
//   policyNumber: string;
//   totalRefunded: number;
//   cancellationFee: number;
//   refundedCharges: number;
//   subscriptionCancelled: boolean;
//   refundRecordId: string;
//   message: string;
// }

// export interface RefundAdminFeeResponse {
//   success: boolean;
//   policyNumber: string;
//   adminFeeRefunded: number;
//   stripeRefundId: string;
//   refundRecordId: string;
//   message: string;
// }

// export function usePolicyCancellation(policyId: string | null) {
//   const [preview, setPreview] = useState<RefundPreview | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /**
//    * Fetch refund preview calculation
//    */
//   const fetchRefundPreview = async (
//     cancellationType: string = 'visitors',
//     cancellationFee: number = 50
//   ): Promise<RefundPreview | null> => {
//     if (!policyId) {
//       setError('Policy ID is required');
//       return null;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `${API_BASE}/policies/${policyId}/refund-preview`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ cancellationType, cancellationFee }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to fetch refund preview');
//       }

//       const data: RefundPreview = await response.json();
//       setPreview(data);
//       return data;
//     } catch (err: any) {
//       const errorMsg = err.message || 'Error fetching refund preview';
//       setError(errorMsg);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Cancel policy with refunds
//    */
//   const cancelPolicy = async (
//     request: CancelPolicyRequest
//   ): Promise<CancelPolicyResponse | null> => {
//     if (!policyId) {
//       setError('Policy ID is required');
//       return null;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${API_BASE}/policies/${policyId}/cancel`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(request),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to cancel policy');
//       }

//       const data: CancelPolicyResponse = await response.json();
//       return data;
//     } catch (err: any) {
//       const errorMsg = err.message || 'Error cancelling policy';
//       setError(errorMsg);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Refund admin fee (admin only)
//    */
//   const refundAdminFee = async (
//     request: RefundAdminFeeRequest
//   ): Promise<RefundAdminFeeResponse | null> => {
//     if (!policyId) {
//       setError('Policy ID is required');
//       return null;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `${API_BASE}/policies/${policyId}/refund-admin-fee`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(request),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to refund admin fee');
//       }

//       const data: RefundAdminFeeResponse = await response.json();
//       return data;
//     } catch (err: any) {
//       const errorMsg = err.message || 'Error refunding admin fee';
//       setError(errorMsg);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     preview,
//     loading,
//     error,
//     fetchRefundPreview,
//     cancelPolicy,
//     refundAdminFee,
//   };
// }


// =================================

import { useRef, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';

// --- Interfaces for Request/Response/Data ---

export interface RefundPreview {
  policyNumber: string;
  paymentOption: string;
  totalPaid: number;
  /** Portion of totalPaid eligible for refund before the fee. Absent when equal. */
  refundableBase?: number;
  cancellationFee: number;
  adminFeeRefundable: number;
  totalRefundable: number;
  refundBreakdown: Array<{
    chargeId: string;
    amount: number;
    date: string;
    willRefund: number;
    paymentType?: string;
  }>;
}

export interface CancelPolicyRequest {
  cancellationType: 'visitors' | 'visa-refusal' | 'other' | 'super-visa' | 'early-return';
  cancellationFee: number;
  notes?: string;
  processedBy?: string;
}

export interface RefundAdminFeeRequest {
  notes?: string;
  processedBy?: string;
}

export interface RefundPolicyFeeRequest {
  paymentHistoryId: string;
  notes?: string;
  processedBy?: string;
}

export interface CancelPolicyResponse {
  success: boolean;
  policyNumber: string;
  totalRefunded: number;
  cancellationFee: number;
  refundedCharges: number;
  subscriptionCancelled: boolean;
  refundRecordId: string;
  message: string;
}

export interface RefundAdminFeeResponse {
  success: boolean;
  policyNumber: string;
  adminFeeRefunded: number;
  stripeRefundId: string;
  refundRecordId: string;
  message: string;
}

export interface RefundPolicyFeeResponse {
  success: boolean;
  policyNumber: string;
  paymentHistoryId: string;
  amountRefunded: number;
  stripeRefundId: string;
  refundRecordId: string;
  message: string;
}

// --- Custom Hook ---

export function usePolicyCancellation(policyId: string | null) {
  const [preview, setPreview] = useState<RefundPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sequence number for refund-preview requests.
   *
   * Changing the cancellation type can put more than one preview request in
   * flight, and they are not guaranteed to come back in the order they were
   * sent. Without this, a slower earlier response overwrote a newer one and the
   * modal displayed a fee that did not match the selected type — a 150 super-visa
   * fee shown against an early-return cancellation, for instance.
   *
   * Only the most recently issued request is allowed to write state.
   */
  const previewSeq = useRef(0);

  /**
   * Fetch refund preview calculation (GET /policies/:id/refund-preview)
   */
  const fetchRefundPreview = async (
    cancellationType: string = 'visitors',
    cancellationFee: number = 50
  ): Promise<RefundPreview | null> => {
    if (!policyId) {
      setError('Policy ID is required');
      return null;
    }

    const seq = ++previewSeq.current;
    setLoading(true);
    setError(null);

    try {
      // Use query parameters for GET request, matching controller parameters
      const params = new URLSearchParams({
        cancellationType,
        cancellationFee: cancellationFee.toString(),
      });

      const response = await axiosInstance.get(
        `/policies/${policyId}/refund-preview`,
        { params }
      );
      const data: RefundPreview = response.data;
      // A newer request was issued while this one was in flight — discard this
      // result rather than letting a stale fee overwrite the current one.
      if (seq !== previewSeq.current) return null;
      setPreview(data);
      return data;
    } catch (err: any) {
      if (seq !== previewSeq.current) return null;
      const errorMsg = err.message || 'Error fetching refund preview';
      setError(errorMsg);
      return null;
    } finally {
      // Only the latest request controls the spinner, otherwise an early
      // response would clear it while the current one is still running.
      if (seq === previewSeq.current) setLoading(false);
    }
  };

  /**
   * Cancel policy with refunds (POST /policies/:id/cancel)
   */
  const cancelPolicy = async (
    request: CancelPolicyRequest
  ): Promise<CancelPolicyResponse | null> => {
    if (!policyId) {
      setError('Policy ID is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/policies/${policyId}/cancel`, request);
      const data: CancelPolicyResponse = response.data;
      return data;
    } catch (err: any) {
      const errorMsg = err.message || 'Error cancelling policy';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refund admin fee (admin discretion) (POST /policies/:id/refund-admin-fee)
   */
  const refundAdminFee = async (
    request: RefundAdminFeeRequest
  ): Promise<RefundAdminFeeResponse | null> => {
    if (!policyId) {
      setError('Policy ID is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/policies/${policyId}/refund-admin-fee`, request);
      const data: RefundAdminFeeResponse = response.data;
      return data;
    } catch (err: any) {
      const errorMsg = err.message || 'Error refunding admin fee';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refund a specific policy fee payment (POST /policies/:id/refund-policy-fee)
   */
  const refundPolicyFee = async (
    request: RefundPolicyFeeRequest
  ): Promise<RefundPolicyFeeResponse | null> => {
    if (!policyId) {
      setError('Policy ID is required');
      return null;
    }
    
    // The controller uses multiple @Body() parameters, which are sent as a single JSON body in the request.
    const { paymentHistoryId, notes, processedBy } = request;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        `/policies/${policyId}/refund-policy-fee`,
        {
          paymentHistoryId,
          notes,
          processedBy,
        }
      );

      const data: RefundPolicyFeeResponse = response.data;       return data;
    } catch (err: any) {
      const errorMsg = err.message || 'Error refunding policy fee';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    preview,
    loading,
    error,
    fetchRefundPreview,
    cancelPolicy,
    refundAdminFee,
    refundPolicyFee, // Include the new function in the return object
  };
}