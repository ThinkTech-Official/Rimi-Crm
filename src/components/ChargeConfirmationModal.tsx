import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface ChargeConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    chargeAmount: number;
    originalPremium: number;
    newPremium: number;
    loading?: boolean;
}

const ChargeConfirmationModal: React.FC<ChargeConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    chargeAmount,
    originalPremium,
    newPremium,
    loading = false,
}) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-md mx-4 p-6 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {t("Additional Premium Required")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                        disabled={loading}
                    >
                        ✕
                    </button>
                </div>

                {/* Info */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                    <p className="text-sm text-amber-700">
                        {t("The policy modification results in a higher premium. An additional charge will be applied to the customer's saved payment method.")}
                    </p>
                </div>

                {/* Details */}
                <div className="border border-gray-200 p-4 mb-6 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t("Original Premium")}:</span>
                        <span className="font-medium">
                            {originalPremium.toFixed(2)} CAD
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t("New Premium")}:</span>
                        <span className="font-medium">
                            {newPremium.toFixed(2)} CAD
                        </span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                        <span className="text-gray-900 font-semibold">
                            {t("Additional Charge")}:
                        </span>
                        <span className="font-bold text-red-600 text-base">
                            {chargeAmount.toFixed(2)} CAD
                        </span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-6">
                    {t("This amount will be charged to the customer's card on file. This action cannot be undone.")}
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 bg-primary text-white font-semibold hover:bg-[#2309A1] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading
                            ? t("Processing...")
                            : t("Confirm & Charge")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChargeConfirmationModal;