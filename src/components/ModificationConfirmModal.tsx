import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MdClose } from "react-icons/md";

interface ModificationConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

const ModificationConfirmModal: React.FC<ModificationConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
}) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md mx-4 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {t("Confirm Policy Modification")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        disabled={loading}
                    >
                        <MdClose className="h-5 w-5"/>
                    </button>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <p className="text-sm text-blue-700">
                        {t("The policy dates have been changed. The premium remains unchanged — no refund or additional charge will be applied.")}
                    </p>
                </div>

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
                        {loading ? t("Saving...") : t("Confirm & Save")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModificationConfirmModal;