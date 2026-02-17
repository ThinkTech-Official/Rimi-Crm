import { useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';



export const useEmailQuote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendQuoteEmail = async (quoteNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      console.log('Sending quote email for:', quoteNumber);

      const response = await axiosInstance.post(
        `/quotes/send-quote-email`,
        { quoteNumber }
      );

      console.log('Quote email sent:', response.data);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      console.error('Failed to send quote email:', err);
      const errorMessage = err.response?.data?.message || 'Failed to send email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { sendQuoteEmail, loading, error, success };
};