import { MdClose } from "react-icons/md";

interface DeleteDocumentModalProps {
    document: {
        id: string;
        filename: string;
    };
    onClose: () => void;
    onConfirm: () => Promise<void>;
    loading: boolean;
}

const DeleteDocumentModal = ({
    document,
    onClose,
    onConfirm,
    loading,
}: DeleteDocumentModalProps) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
            <div className="bg-white p-6 pt-10 max-w-md w-full shadow-lg relative">
                <MdClose
                    size={24}
                    onClick={onClose}
                    className="text-text-secondary absolute top-4 right-4 cursor-pointer"
                />

                <h2 className="text-xl font-bold mb-4">Delete Document</h2>
                <p className="text-gray-600 mb-8">
                    Are you sure you want to delete <span className="font-semibold text-gray-800">"{document.filename}"</span>? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 border border-inputBorder hover:border-gray-700 cursor-pointer transition delay-100 w-32"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 transition delay-100 w-32 disabled:opacity-50 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDocumentModal;
