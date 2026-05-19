import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useCreatePaymentIntent } from "../../../../hooks/useCreatePaymentIntent";
import { useLanguage } from "../../../../context/LanguageContext";

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
  onBuyNow: () => Promise<boolean>;
  submittingStage2: boolean;
}

// TODO: Replace with actual customer ID from your system
const stripeCustomerId = "cus_85525845666";

export default function PaymentInformation({
  quoteNumber,
  description,
  shipping,
  amount,
  onPaymentSuccess,
  onBuyNow,
  submittingStage2,
}: PaymentInformationProps) {
  const { t } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState("");
  const [stripeError, setStripeError] = useState<string | null>(null);

  // Product 2 is lump-sum only, so no monthly installments
  const paymentOption = "lump-sum";

  const {
    createPaymentIntent,
    loading: intentLoading,
    error: intentError,
  } = useCreatePaymentIntent(
    // stripeCustomerId,
    quoteNumber,
    description,
    cardholderName,
    shipping,
    paymentOption,
    undefined, // monthlyAmount - N/A for lump-sum
    undefined, // remainingInstallments - N/A for lump-sum
    undefined, // stripeProductId - N/A for lump-sum
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStripeError(null);

    try {
      // 0️⃣ Save backend data by calling buyNow
      const success = await onBuyNow();
      if (!success) return;

      // 1️⃣ Create PaymentIntent on backend
      const clientSecret = await createPaymentIntent(
        Math.round(amount * 100), // Convert to cents
      );

      // 2️⃣ Grab the mounted CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setStripeError(t("Card input not ready"));
        return;
      }

      // 3️⃣ Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName,
            },
          },
        },
      );

      if (error) {
        setStripeError(error.message!);
      } else if (paymentIntent?.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (err: any) {
      setStripeError(err.message || t("Something went wrong"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-greyBg p-3 sm:p-6 space-y-6 mt-6"
    >
      <h3 className="text-lg font-bold text-left text-[#1B1B1B]">
        {t("Payment Information")}
      </h3>

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
          onChange={(e) => setCardholderName(e.target.value.slice(0, 40).trimStart())}
          onBlur={(e) => setCardholderName(e.target.value.slice(0, 40).trim())}
          maxLength={40}
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
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#e53e3e" },
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
          btn-primary w-full
          ${intentLoading || submittingStage2 ? "opacity-50 cursor-wait" : "hover:bg-indigo-700"}
        `}
      >
        {intentLoading || submittingStage2
          ? t("Processing…")
          : `${t("Pay")} $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}
