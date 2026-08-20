import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

/**
 * Sends a saved quote to a recipient.
 *
 * All four product flows had their own "Email Quote" modal, and in every one of
 * them the Send button was a stub:
 *
 *     const handleSendEmail = async () => {
 *       console.log("Send to:", email);
 *     };
 *
 * The backend endpoint existed and worked the whole time — nothing ever called
 * it. Sharing one hook keeps the four modals from drifting apart again.
 */
export function useSendQuoteEmail() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const sendQuoteEmail = async (
    quoteNumber: string | null,
    recipientEmail: string,
  ): Promise<boolean> => {
    setError(null);
    setSent(false);

    if (!quoteNumber) {
      setError("This quote has no quote number yet. Save the quote first.");
      return false;
    }
    // Checked here as well as by the server so the common typo is caught without
    // a round trip.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      setError("Enter a valid email address.");
      return false;
    }

    try {
      setSending(true);
      await axiosInstance.post("/quotes/send-quote-email", {
        quoteNumber,
        recipientEmail,
      });
      setSent(true);
      return true;
    } catch (err: any) {
      const data = err?.response?.data;
      // The API returns `errors` for structured validation failures and
      // `message` otherwise; message can itself be an array from a ValidationPipe.
      const detail =
        (Array.isArray(data?.errors) && data.errors.join(", ")) ||
        (Array.isArray(data?.message) && data.message.join(", ")) ||
        data?.message;
      setError(detail || "Could not send the quote email. Please try again.");
      return false;
    } finally {
      setSending(false);
    }
  };

  return { sendQuoteEmail, sending, error, sent };
}
