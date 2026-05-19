// export default function PaymentInformation() {
//   return (
//     <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9] font-[inter]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-1">
//         Payment Information
//       </h3>

//       <p className="text-left font-medium text-[#6A6A6A] mb-8">
//         Stripe Payment Integration
//       </p>
//       <div className="flex flex-col gap-4 text-sm text-[#00000080]">
//         <div className="p-4 border border-inputBorder bg-white">
//           <p className="text-text-secondary">Stripe Code</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// ================================================

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useCreatePaymentIntent } from "../../../../hooks/useCreatePaymentIntent";
import { useLanguage } from "../../../../context/LanguageContext";

interface Shipping {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
}

interface ContactInfo {
  email: string;
  additionalEmail?: string;
  phoneNumber?: string;
}

interface Props {
  amount: number;
  onPaymentSuccess: () => void;
  onBuyNow: () => Promise<boolean>;
  quoteNumber: string;
  description: string;
  shipping: Shipping;
  contactInfo: ContactInfo;
  submittingStage2: boolean;
  triggerNotification: (config: any) => void;
}

const stripeCustomerId = "cus_85525845666"; // Replace with actual customer ID

export default function PaymentInformation({
  amount,
  onPaymentSuccess,
  onBuyNow,
  quoteNumber,
  description,
  shipping,
  submittingStage2,
  triggerNotification,
}: Props) {
  const { t } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState("");
  const [stripeError, setStripeError] = useState<string | null>(null);

  const {
    createPaymentIntent,
    loading: intentLoading,
    error: intentError,
  } = useCreatePaymentIntent(
    // stripeCustomerId,
    quoteNumber!,
    description,
    cardholderName,
    shipping,
    "lump-sum", // Product 3 is lump-sum only
    undefined,
    undefined,
    undefined,
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStripeError(null);

    try {
      // 1. Save Stage 2 data & Validate
      const isStep2Valid = await onBuyNow();
      if (!isStep2Valid) {
        return;
      }

      // 2. Create PaymentIntent
      const clientSecret = await createPaymentIntent(Math.round(amount * 100));

      // 3. Get CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setStripeError(t("Card input not ready"));
        triggerNotification({
          message: t("Card input not ready"),
          type: "error",
        });
        return;
      }

      // 4. Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardholderName },
          },
        },
      );

      if (error) {
        setStripeError(error.message!);
        triggerNotification({ message: error.message!, type: "error" });
      } else if (paymentIntent?.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (err: any) {
      const errorMsg = err.message || t("Something went wrong");
      setStripeError(errorMsg);
      triggerNotification({ message: errorMsg, type: "error" });
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
      {/* Amount */}
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
          value={`$${amount.toFixed(2)} ${t("CAD")}`}
          className="input-primary"
        />
      </div>

      {/* Cardholder Name */}
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

      {/* Card Details */}
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

      {/* Errors */}
      {intentError && <p className="text-red-600 text-sm">{intentError}</p>}
      {stripeError && <p className="text-red-600 text-sm">{stripeError}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || intentLoading || submittingStage2}
        className={`
           w-full btn-primary
          ${
            intentLoading || submittingStage2
              ? "opacity-50 cursor-wait"
              : "hover:bg-indigo-700"
          }
        `}
      >
        {intentLoading || submittingStage2
          ? t("Processing…")
          : `${t("Pay")} $${amount.toFixed(2)} ${t("CAD")}`}
      </button>
    </form>
  );
}
