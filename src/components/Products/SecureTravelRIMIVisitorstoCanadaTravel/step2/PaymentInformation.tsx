



import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { useCreatePaymentIntent } from '../../../../hooks/useCreatePaymentIntent';
import { useLanguage } from "../../../../context/LanguageContext";

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
  onBuyNow: () => Promise<boolean>;
  quoteNumber: string;
  description: string;
  name: string;
  shipping: Shipping;
  paymentOption: "lump-sum" | "monthly-installments";
  monthlyAmount?: number;
  remainingInstallments?: number;
  stripeProductId?: string;
}

//
// const stripeCustomerId = 'cus_85525845666'
const stripeCustomerId = 'cus_85525845666';

// Get this ID after clicking "Add first customer" in your test clock
// const testClockCustomerId = 'cus_TvkhIwxZVX4So7';
//

export default function PaymentInformation({
  onBuyNow,
  amount,
  onPaymentSuccess,
  quoteNumber,
  description,
  shipping,
  paymentOption,
  monthlyAmount,
  remainingInstallments,
  stripeProductId,
}: Props) {
  const { t } = useLanguage();
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

    const success = await onBuyNow();
    if (!success) return;

    //

      // 1️ Create PaymentIntent on backend
      const clientSecret = await createPaymentIntent(
        Math.round(amount * 100)
      );

      // 2️ Grab the mounted CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setStripeError(t('Card input not ready'));
        return;
      }

      // 3️ Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName,
            },
          },
        }
      );

      if (error) {
        setStripeError(error.message!);
      } else if (paymentIntent?.status === 'succeeded') {
        onPaymentSuccess();
      }
    } catch (err: any) {
      setStripeError(err.message || t("Something went wrong"));
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="bg-greyBg p-6 space-y-6 mt-6"
    >
      {/* 1. Display the amount */}
      <div>
        <label
          htmlFor="paymentAmount"
          className="block text-sm font-medium text-text-secondary"
        >
          {t("Amount")}
        </label>
        <input
          id="paymentAmount"
          type="text"
          readOnly
          value={`$${amount.toFixed(2)}`}
          className="input-primary"
        />
      </div>

      {/* 2. Cardholder name */}
      <div>
        <label
          htmlFor="cardholder-name"
          className="block text-sm font-medium text-text-secondary"
        >
          {t("Cardholder Name")}
        </label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
          className="input-primary"
        />
      </div>

      {/* 3. The Stripe CardElement */}
       <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("Card Details")}
        </label>
        <div className="input-primary">
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
      {intentError && <p className="text-red-600 text-sm">{t(intentError)}</p>}
      {stripeError && <p className="text-red-600 text-sm">{t(stripeError)}</p>}

      {/* 5. Submit button */}
      <button
        type="submit"
        disabled={!stripe || intentLoading}
        className={`
          btn-primary w-full
          ${intentLoading ? 'opacity-50 cursor-wait' : 'hover:bg-indigo-700'}
        `}
       >
        {intentLoading ? t('Processing…') : `${t("Pay")} $${amount.toFixed(2)}`}
      </button>
    </form>


          {/* Bottom Button  */}
    <>
    
      </>
    </>
  );
}
