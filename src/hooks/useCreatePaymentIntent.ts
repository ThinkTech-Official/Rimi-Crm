
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Shipping } from '../components/Products/SecureTravelRIMIVisitorstoCanadaTravel/step2/PaymentInformation';
//This is demo cahnge
const localAddress = 'http://localhost:3000'

export function useCreatePaymentIntent(quoteNumber: string, description: string, cardholderName: string ,shipping: Shipping ) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Calls your NestJS endpoint to make /payments/create-payment-intent
   * @param amountInCents amount *in cents*
   * @returns clientSecret on success
   */
  const createPaymentIntent = useCallback(
    async (amountInCents: number): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        console.log('from payment intetent hook cardholder name', cardholderName)
        console.log('from payment intetent hook address', shipping)
        const { data } = await axios.post(
          `${localAddress}/payments/create-payment-intent`,
          { amount: amountInCents, quoteNumber, description , cardholderName, shipping }
        );
        return data.clientSecret as string;
      } catch (err: any) {
        const msg = err?.response?.data?.error || err.message || 'Unknown error';
        setError(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [quoteNumber, description, cardholderName, shipping]
  );

  return { createPaymentIntent, loading, error };
}
