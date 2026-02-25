import { useState } from "react";
import { MdClose, MdEdit, MdDelete, MdCheck, MdBlock } from "react-icons/md";
import { useCategories } from "../../hooks/documents/useCategories";
import { useDocuments } from "../../hooks/documents/useDocuments";
import { NotificationProps } from "../Notification";

interface ManageCategoriesModalProps {
    onClose: () => void;
    triggerNotification: (props: Omit<NotificationProps, "onClose" | "animation"> & { duration?: number; animation?: any }) => void;
}

const ManageCategoriesModal = ({
    onClose,
    triggerNotification,
}: ManageCategoriesModalProps) => {
    const { categories, addCategory, updateCategory, deleteCategory, loading: categoryLoading } = useCategories();
    const { categorizedDocuments, loading: docsLoading } = useDocuments();

    const [newCategoryName, setNewCategoryName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");
    const [blockedCategory, setBlockedCategory] = useState<{ name: string; count: number } | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<{ id: string; name: string } | null>(null);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        try {
            await addCategory(newCategoryName.trim());
            triggerNotification({
                type: "success",
                message: "Category added successfully",
            });
            setNewCategoryName("");
        } catch (err: any) {
            triggerNotification({
                type: "error",
                message: err.message || "Failed to add category",
            });
        }
    };

    const handleUpdate = async (id: string) => {
        if (!editingName.trim()) return;
        try {
            await updateCategory(id, editingName.trim());
            triggerNotification({
                type: "success",
                message: "Category updated successfully",
            });
            setEditingId(null);
        } catch (err: any) {
            triggerNotification({
                type: "error",
                message: err.message || "Failed to update category",
            });
        }
    };

    const handleDeleteClick = (id: string, name: string) => {
        const documentsInCategory = categorizedDocuments[name] || [];

        if (documentsInCategory.length > 0) {
            setBlockedCategory({ name, count: documentsInCategory.length });
            return;
        }

        setDeletingCategory({ id, name });
    };

    const confirmDelete = async () => {
        if (!deletingCategory) return;

        try {
            await deleteCategory(deletingCategory.id);
            triggerNotification({
                type: "success",
                message: "Category deleted successfully",
            });
            setDeletingCategory(null);
        } catch (err: any) {
            triggerNotification({
                type: "error",
                message: err.message || "Failed to delete category",
            });
        }
    };

    const startEditing = (id: string, name: string) => {
        setEditingId(id);
        setEditingName(name);
    };

    const loading = categoryLoading || docsLoading;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 text-text-dark">
            <div className="bg-white p-4 sm:p-6 pt-4 max-w-md w-full max-h-[70vh] flex flex-col shadow-lg relative m-4">
                <MdClose
                    size={24}
                    onClick={onClose}
                    className="text-text-secondary absolute top-4 right-4 cursor-pointer"
                />

                <h2 className="text-xl font-bold mb-6">Manage Categories</h2>

                {/* Add Category Form */}
                <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New category name"
                        className="input-primary flex-1"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="btn-primary px-6"
                        disabled={loading || !newCategoryName.trim()}
                    >
                        Add
                    </button>
                </form>

                {/* Categories List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar3">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center gap-3 p-3 border border-gray-100 hover:bg-gray-50 rounded transition">
                            {editingId === cat.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        className="input-primary flex-1 py-1"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => handleUpdate(cat.id)}
                                        className="p-1 text-green-600 cursor-pointer"
                                    >
                                        <MdCheck size={20} />
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="p-1 text-red-500 cursor-pointer"
                                    >
                                        <MdClose size={20} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="flex-1 font-medium text-gray-700">{cat.name}</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => startEditing(cat.id, cat.name)}
                                            className="p-1.5 text-primary cursor-pointer"
                                            title="Edit"
                                        >
                                            <MdEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(cat.id, cat.name)}
                                            className="p-1.5 text-red-500 cursor-pointer"
                                            title="Delete"
                                        >
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {categories.length === 0 && !loading && (
                        <p className="text-center text-gray-400 py-4">No categories found.</p>
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="py-2 px-6 border border-inputBorder hover:border-gray-500 transition cursor-pointer"
                    >
                        Close
                    </button>
                </div>

                {/* Info Modal for Blocked Deletion */}
                {blockedCategory && (
                    <div className="fixed inset-0 flex justify-center items-center z-[60] bg-black/40">
                        <div className="bg-white p-6 max-w-sm w-full shadow-2xl border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-4">
                                <MdBlock size={28} />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Deletion Blocked</h3>
                            <p className="text-gray-600 mb-6 sm:text-sm">
                                The category <strong>&quot;{blockedCategory.name}&quot;</strong> cannot be deleted because it has <strong>{blockedCategory.count}</strong> file(s) associated with it. Please move or delete the files first.
                            </p>
                            <button
                                onClick={() => setBlockedCategory(null)}
                                className="btn-primary w-full py-2.5"
                            >
                                Understood
                            </button>
                        </div>
                    </div>
                )}
                {/* Custom Confirmation Modal for Deletion */}
                {deletingCategory && (
                    <div className="fixed inset-0 flex justify-center items-center z-[60] bg-black/40">
                        <div className="bg-white p-6 pt-10 max-w-sm w-full shadow-2xl border border-gray-100 flex flex-col items-center text-center relative">
                            <MdClose
                                size={24}
                                onClick={() => setDeletingCategory(null)}
                                className="text-text-secondary absolute top-4 right-4 cursor-pointer"
                            />
                            <div className="w-12 h-12 bg-red-50 text-red-600 flex items-center justify-center rounded-full mb-4">
                                <MdDelete size={28} />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-text-dark">Delete Category?</h3>
                            <p className="text-gray-600 mb-6 sm:text-sm">
                                Are you sure you want to delete the category <strong>&quot;{deletingCategory.name}&quot;</strong>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setDeletingCategory(null)}
                                    className="flex-1 py-2 px-4 border border-inputBorder hover:border-gray-500 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 transition cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCategoriesModal;
