import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useUpdatePaymentMethod } from '../hooks/useUpdatePaymentMethod';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

interface UpdateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyId: string;
  policyNumber: string;
  onSuccess: () => void;
}

// Inner component that uses Stripe hooks
const UpdateCardForm: React.FC<{
  policyId: string;
  policyNumber: string;
  onSuccess: () => void;
  onClose: () => void;
}> = ({ policyId, policyNumber, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { updatePaymentMethod, loading, error } = useUpdatePaymentMethod();
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   setProcessing(true);
  //   setFormError(null);

  //   try {
  //     // Step 1: Create payment method from card details
  //     const { error: submitError, paymentMethod } = await stripe.createPaymentMethod({
  //       elements,
  //     });

  //     if (submitError) {
  //       setFormError(submitError.message || 'Failed to process card');
  //       setProcessing(false);
  //       return;
  //     }

  //     if (!paymentMethod) {
  //       setFormError('No payment method created');
  //       setProcessing(false);
  //       return;
  //     }

  //     // Step 2: Send payment method ID to backend
  //     const result = await updatePaymentMethod(policyId, paymentMethod.id);

  //     if (result && result.success) {
  //       alert(result.message);
  //       onSuccess();
  //       onClose();
  //     } else {
  //       setFormError(error || 'Failed to update payment method');
  //     }
  //   } catch (err: any) {
  //     setFormError(err.message || 'An error occurred');
  //   } finally {
  //     setProcessing(false);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  setProcessing(true);
  setFormError(null);

  try {
    // ✅ Step 1: Submit and validate the elements form FIRST
    const { error: submitError } = await elements.submit();
    
    if (submitError) {
      setFormError(submitError.message || 'Failed to validate card details');
      setProcessing(false);
      return;
    }

    // Step 2: Create payment method from card details
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      elements,
    });

    if (pmError) {
      setFormError(pmError.message || 'Failed to process card');
      setProcessing(false);
      return;
    }

    if (!paymentMethod) {
      setFormError('No payment method created');
      setProcessing(false);
      return;
    }

    // Step 3: Send payment method ID to backend
    const result = await updatePaymentMethod(policyId, paymentMethod.id);

    if (result && result.success) {
      alert(result.message);
      onSuccess();
      onClose();
    } else {
      setFormError(error || 'Failed to update payment method');
    }
  } catch (err: any) {
    setFormError(err.message || 'An error occurred');
  } finally {
    setProcessing(false);
  }
};



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Policy #{policyNumber}</strong>
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Updating the payment method will affect all future recurring payments for this policy.
        </p>
      </div>

      <div className="mb-4">
        <PaymentElement />
      </div>

      {formError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-600">{formError}</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          disabled={processing || loading}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing || loading ? 'Updating...' : 'Update Payment Method'}
        </button>
      </div>
    </form>
  );
};

// Main modal component
export const UpdateCardModal: React.FC<UpdateCardModalProps> = ({
  isOpen,
  onClose,
  policyId,
  policyNumber,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const options = {
    mode: 'setup' as const,
    currency: 'cad',
    paymentMethodCreation: 'manual' as const,
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Update Payment Method</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Elements stripe={stripePromise} options={options}>
            <UpdateCardForm
              policyId={policyId}
              policyNumber={policyNumber}
              onSuccess={onSuccess}
              onClose={onClose}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};