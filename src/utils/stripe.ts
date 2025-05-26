// src/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!key) {
  throw new Error('Missing VITE_STRIPE_PUBLISHABLE_KEY in env');
}

export const stripePromise = loadStripe(key);
