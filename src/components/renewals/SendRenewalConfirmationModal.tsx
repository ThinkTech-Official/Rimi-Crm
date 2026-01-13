import React, { useEffect } from "react";
import { MdClose, MdSend } from "react-icons/md";

interface SendRenewalConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  email: string;
  loading?: boolean;
}

const SendRenewalConfirmationModal: React.FC<
  SendRenewalConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, email, loading = false }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-xl max-w-md w-full mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-inputBorder px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-black">
            Confirm Renewal Notice
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
            disabled={loading}
          >
            <MdClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-2">
            Are you sure you want to send a renewal notice to:
          </p>
          <div className="input-primary">
            {email}
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            This action will trigger an automated email with the policy renewal
            details.
          </p>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 flex justify-end gap-3 border-inputBorder">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-inputBorder hover:border-gray-400 font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-white py-2 px-6 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <MdSend className="text-lg" />
                Confirm & Send
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendRenewalConfirmationModal;
