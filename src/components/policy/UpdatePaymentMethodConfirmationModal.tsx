import React, { useEffect } from "react";
import { MdClose, MdCreditCard } from "react-icons/md";

interface UpdatePaymentMethodConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const UpdatePaymentMethodConfirmationModal: React.FC<
  UpdatePaymentMethodConfirmationModalProps
> = ({ isOpen, onClose, onConfirm }) => {
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
            Update Payment Method
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-amber-600 mb-4 bg-amber-50 p-3">
             <MdCreditCard className="text-2xl shrink-0" />
             <p className="font-semibold text-sm">Action Required</p>
          </div>
          <p className="text-gray-700">
            Are you sure you want to update the payment method for this policy? 
            <br /><br />
            <span className="font-semibold">All future recurring payments will use the new card.</span>
          </p>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 flex justify-end gap-3 border-inputBorder">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-inputBorder hover:border-gray-400 transition-all cursor-pointer"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary"
          >
            Yes, Update Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePaymentMethodConfirmationModal;
