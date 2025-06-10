



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

interface Props {
  amount: number;
  onPaymentSuccess: () => void;
  onBuyNow: () => Promise<void>;
  quoteNumber: string;
  description: string;
  name: string;
  shipping: Shipping;
  paymentOption: "lump-sum" | "monthly-installments";
  monthlyAmount?: number ;
  remainingInstallments?: number ;
   stripeProductId?: string ;
   handleFormStepChange: (stepCommand: string) => void;
   formStep: number;
   handleBuyNow: any;
   submittingStage2: boolean;

}

//
const stripeCustomerId = 'cus_85525845666'
//

export default function PaymentInformation({
  handleFormStepChange,
  formStep,
  handleBuyNow,
  submittingStage2,
  onBuyNow,
  amount,
  onPaymentSuccess,
  quoteNumber,
  description,
  shipping,
  paymentOption,
  monthlyAmount ,remainingInstallments , stripeProductId
}: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState('');
  const [stripeError, setStripeError] = useState<string | null>(null);

  
  const { createPaymentIntent, loading: intentLoading, error: intentError } =
    useCreatePaymentIntent(stripeCustomerId,quoteNumber!, description, cardholderName ,shipping, paymentOption, monthlyAmount ,remainingInstallments , stripeProductId );

  

  const handleSubmit = async (e: FormEvent) => {




    

    // stripe Payment setup
    e.preventDefault();
    if (!stripe || !elements) return;

    setStripeError(null);

    



    try {

      // 0 Backend data save by calling buynow

    await onBuyNow()

    //

      // 1️ Create PaymentIntent on backend
      const clientSecret = await createPaymentIntent(
        Math.round(amount * 100)
      );

      // 2️ Grab the mounted CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setStripeError('Card input not ready');
        return;
      }

      // 3️ Confirm the payment
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
    <>
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-6"
    >
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
        disabled={!stripe || intentLoading}
        className={`
          w-full py-2 px-4 bg-indigo-600 text-white rounded
          ${intentLoading ? 'opacity-50 cursor-wait' : 'hover:bg-indigo-700'}
        `}
      >
        {intentLoading ? 'Processing…' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>


          {/* Bottom Button  */}
    <>
    
      </>
    </>
  );
}
