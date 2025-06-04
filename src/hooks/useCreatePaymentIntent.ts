
// import { useState, useCallback } from 'react';
// import axios from 'axios';
// import { Shipping } from '../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/PaymentInformation';

// const localAddress = 'http://localhost:3000'

// export function useCreatePaymentIntent(quoteNumber: string, description: string, cardholderName: string ,shipping: Shipping ) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /**
//    * Calls NestJS endpoint to make /payments/create-payment-intent
//    * @param amountInCents amount *in cents*
//    * @returns clientSecret on success
//    */
//   const createPaymentIntent = useCallback(
//     async (amountInCents: number): Promise<string> => {
//       setLoading(true);
//       setError(null);
//       try {
//         console.log('from payment intetent hook cardholder name', cardholderName)
//         console.log('from payment intetent hook address', shipping)
//         const { data } = await axios.post(
//           `${localAddress}/payments/create-payment-intent`,
//           { amount: amountInCents, quoteNumber, description , cardholderName, shipping }
//         );
//         return data.clientSecret as string;
//       } catch (err: any) {
//         const msg = err?.response?.data?.error || err.message || 'Unknown error';
//         setError(msg);
//         throw new Error(msg);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [quoteNumber, description, cardholderName, shipping]
//   );

//   return { createPaymentIntent, loading, error };
// }


// ============================

// src/hooks/useCreatePaymentIntent.ts

import { useState, useCallback } from 'react';
import axios from 'axios';
import { Shipping } from '../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/PaymentInformation';

const localAddress = 'http://localhost:3000';

export function useCreatePaymentIntent(
  stripeCustomerId: string,
  quoteNumber: string,
  description: string,
  cardholderName: string,
  shipping: Shipping,
  paymentOption: "lump-sum" | "monthly-installments",
  monthlyAmount?: number,
  remainingInstallments?: number,
  stripeProductId?: string
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Calls NestJS endpoint POST /payments/create-payment
   * @param amountInCents  amount in cents (e.g. 121500 for $1,215.00)
   * @returns clientSecret on success
   */
  const createPaymentIntent = useCallback(
    async (amountInCents: number): Promise<string> => {
      setLoading(true);
      setError(null);

      // Convert cents → CAD dollars (e.g. 121500 → 1215.00)
      const amountInDollars = amountInCents / 100;

      try {
        console.log('createPayment hook:', {
          amountInDollars,
          quoteNumber,
          description,
          cardholderName,
          shipping,
          paymentOption,
          monthlyAmount,
          remainingInstallments,
          stripeProductId
        });

        const { data } = await axios.post(
          `${localAddress}/payments/create-payment/${quoteNumber}`,
          {
            amount: amountInDollars,
            quoteNumber,
            description,
            cardholderName,
            shipping,
            paymentOption: paymentOption,
            monthlyAmount,
          remainingInstallments,
          stripeProductId
          }
        );

        return data.clientSecret as string;
      } catch (err: any) {
        const msg =
          err?.response?.data?.message || err.message || 'Unknown error';
        setError(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [stripeCustomerId, quoteNumber, description, cardholderName, shipping]
  );

  return { createPaymentIntent, loading, error };
}
