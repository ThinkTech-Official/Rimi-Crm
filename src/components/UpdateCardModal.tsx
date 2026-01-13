import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useUpdatePaymentMethod } from '../hooks/useUpdatePaymentMethod';
import { MdClose, MdCreditCard, MdErrorOutline, MdInfoOutline } from 'react-icons/md';

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
      {/* Policy Info Card */}
      <div className="flex items-start gap-2.5">
        <MdInfoOutline className="text-blue-500 text-lg shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-900">
            Policy #{policyNumber}
          </p>
        <p className="text-xs text-blue-600 mt-1">
          Updating the payment method will affect all future recurring payments for this policy.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest my-2 flex items-center gap-1.5">
          <MdCreditCard className="text-base text-primary" />
          New Card Details
        </label>
        <div>
          <PaymentElement />
        </div>
      </div>

      {(formError || error) && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
          <MdErrorOutline className="text-red-500 text-lg shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{formError || error}</p>
        </div>
      )}

      <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={onClose}
          disabled={processing || loading}
          className="py-2 px-4 border border-inputBorder hover:border-gray-400 cursor-pointer transition delay-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing || loading}
          className="bg-primary text-white py-2 px-6 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70 flex items-center justify-center min-w-[140px]"
        >
          {processing || loading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Updating...
            </>
          ) : (
            'Update Card'
          )}
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const options = {
    mode: 'setup' as const,
    currency: 'cad',
    paymentMethodCreation: 'manual' as const,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#16027C',
        colorBackground: '#ffffff',
        colorText: '#1F2937',
        colorDanger: '#EF4444',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        spacingUnit: '3px',
        borderRadius: '6px',
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-5 py-3.5 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-none">Update Card</h2>
            
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        <div className="p-5">
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
