import { useState } from "react";
import { MdClose } from "react-icons/md";
import { API_BASE } from "../../utils/urls";

interface EditDocumentModalProps {
  document: {
    id: string;
    filename: string;
    category: string;
  };
  onClose: () => void;
}

const EditDocumentModal = ({ document, onClose }: EditDocumentModalProps) => {
  const [filename, setFilename] = useState(document.filename);
  const [category, setCategory] = useState(document.category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Travel Medical Claims",
    "Policy Documents",
    "Application Forms",
    "General",
    "Invoice",
    "Contract",
    "Report",
    "Presentation",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/documents/${document.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ filename, category }),
      });

      if (!response.ok) {
        throw new Error("Failed to update document");
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
      <div className="bg-white p-6 pt-10 max-w-md w-full shadow-lg relative">
        <MdClose
          size={24}
          onClick={onClose}
          className="text-text-secondary absolute top-4 right-4 cursor-pointer"
        />

        <h2 className="text-xl font-bold mb-6">Edit Document</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="input-primary w-full"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-primary w-full"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

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
              type="submit"
              className="btn-primary w-32"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDocumentModal;