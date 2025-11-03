import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { useCreatePaymentIntent } from '../../../../hooks/useCreatePaymentIntent';

export interface Shipping {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
}

interface PaymentInformationProps {
  quoteNumber: string;
  description: string;
  name: string;
  shipping: Shipping;
  amount: number;
  onPaymentSuccess: () => void;
  onBuyNow: () => Promise<void>;
  formStep: number;
  handleFormStepChange: (command: string) => void;
  handleBuyNow: () => Promise<void>;
  submittingStage2: boolean;
}

// TODO: Replace with actual customer ID from your system
const stripeCustomerId = 'cus_85525845666';

export default function PaymentInformation({
  quoteNumber,
  description,
  name,
  shipping,
  amount,
  onPaymentSuccess,
  onBuyNow,
  formStep,
  handleFormStepChange,
  handleBuyNow,
  submittingStage2,
}: PaymentInformationProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState('');
  const [stripeError, setStripeError] = useState<string | null>(null);

  // Product 2 is lump-sum only, so no monthly installments
  const paymentOption = "lump-sum";

  const { createPaymentIntent, loading: intentLoading, error: intentError } =
    useCreatePaymentIntent(
      stripeCustomerId,
      quoteNumber,
      description,
      cardholderName,
      shipping,
      paymentOption,
      undefined, // monthlyAmount - N/A for lump-sum
      undefined, // remainingInstallments - N/A for lump-sum
      undefined  // stripeProductId - N/A for lump-sum
    );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStripeError(null);

    try {
      // 0️⃣ Save backend data by calling buyNow
      await onBuyNow();

      // 1️⃣ Create PaymentIntent on backend
      const clientSecret = await createPaymentIntent(
        Math.round(amount * 100) // Convert to cents
      );

      // 2️⃣ Grab the mounted CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setStripeError('Card input not ready');
        return;
      }

      // 3️⃣ Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardholderName },
          },
        }
      );

      if (error) {
        setStripeError(error.message!);
      } else if (paymentIntent?.status === 'succeeded') {
        onPaymentSuccess();
      }
    } catch (err: any) {
      setStripeError(err.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-6 mt-6"
    >
      <h3 className="text-lg font-bold text-left text-[#1B1B1B]">
        Payment Information
      </h3>

      {/* 1. Display the amount */}
      <div>
        <label
          htmlFor="paymentAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          id="paymentAmount"
          type="text"
          readOnly
          value={`$${amount.toFixed(2)}`}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
        />
      </div>

      {/* 2. Cardholder name */}
      <div>
        <label
          htmlFor="cardholder-name"
          className="block text-sm font-medium text-gray-700"
        >
          Cardholder Name
        </label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      {/* 3. The Stripe CardElement */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <div className="mt-1 p-3 border rounded-md bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': { color: '#a0aec0' },
                },
                invalid: { color: '#e53e3e' },
              },
            }}
          />
        </div>
      </div>

      {/* 4. Show any errors */}
      {intentError && <p className="text-red-600 text-sm">{intentError}</p>}
      {stripeError && <p className="text-red-600 text-sm">{stripeError}</p>}

      {/* 5. Submit button */}
      <button
        type="submit"
        disabled={!stripe || intentLoading || submittingStage2}
        className={`
          w-full py-2 px-4 bg-[#2B00B7] text-white rounded
          ${intentLoading || submittingStage2 ? 'opacity-50 cursor-wait' : 'hover:bg-[#2309A1]'}
        `}
      >
        {intentLoading || submittingStage2
          ? 'Processing…'
          : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}