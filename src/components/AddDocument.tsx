import { useState } from "react";
import { MdClose, MdUploadFile, MdInsertDriveFile } from "react-icons/md";
import { useUploadDocuments } from "../hooks/useUploadDocuments";
import useNotification from "../hooks/useNotification";
import { useLanguage } from "../context/LanguageContext";



type TriggerNotification = ReturnType<typeof useNotification>["triggerNotification"];

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
  category: string;
}

type TabType = "document" | "category";

const AddDocument = ({
  setShowAddDocument,
  onSuccess,
  triggerNotification,
  categories = [],
}: {
  setShowAddDocument: (val: boolean) => void;
  onSuccess?: () => void;
   triggerNotification?: TriggerNotification;
  categories?: { id: string; name: string }[];
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("document");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const { t } = useLanguage();
  const { uploadDocuments, loading, error } = useUploadDocuments();

 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      category: categories[0]?.name ?? "",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleCategoryChange = (id: string, category: string) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, category } : file))
    );
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      // Add category logic here
      console.log("Adding category:", categoryName);
      setCategoryName("");
    }
  };

  const handleCancelCategory = () => {
    setCategoryName("");
    handleClose();
  };

  const handleClose = () => {
    setShowAddDocument(false);
  };

  const handleUploadDocuments = async () => {
    try {
      const filesToUpload = files.map(item => ({
        file: item.file,
        category: item.category
      }));
      
      await uploadDocuments(filesToUpload);
      onSuccess?.();
      setFiles([]);
      handleClose();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
      <div className="bg-white p-6 pt-10 max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-lg relative">
        <MdClose
          size={24}
          onClick={handleClose}
          className="text-text-secondary absolute top-4 right-4 cursor-pointer"
        />

        {/* Tabs */}
        <div className="flex mb-6 mx-auto">
          <button
            onClick={() => setActiveTab("document")}
            className={`py-2 px-4 font-medium transition-color border cursor-pointer ${
              activeTab === "document"
                ? "text-white bg-primary border-primary"
                : "text-text-secondary border-inputBorder"
            }`}
          >
            {t("Add Document")}
          </button>
          <button
            onClick={() => setActiveTab("category")}
            className={`py-2 px-4 font-medium transition-color border cursor-pointer ${
              activeTab === "category"
                ? "text-white bg-primary border-primary"
                : "text-text-secondary border-inputBorder"
            }`}
          >
            Add Category
          </button>
        </div>

        {/* Document Tab Content */}
        {activeTab === "document" && (
          <>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <label
              htmlFor="fileUpload"
              className="input-primary flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed"
            >
              <MdUploadFile size={20} />
              Choose Files
              <input
                type="file"
                id="fileUpload"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>

            {files.length > 0 && (
              <div className="flex-1 overflow-y-auto custom-scrollbar3 space-y-3 mt-5">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 py-2">
                    <MdInsertDriveFile
                      size={24}
                      className="text-text-secondary flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>

                    <select
                      value={file.category}
                      onChange={(e) =>
                        handleCategoryChange(file.id, e.target.value)
                      }
                      className="px-3 py-2 border border-inputBorder"
                      disabled={loading}
                    >
                      {categories.map((cat) => (
  <option key={cat.id} value={cat.name}>
    {cat.name}
  </option>
))}
                    </select>

                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-red-600 cursor-pointer"
                      aria-label="Delete file"
                      disabled={loading}
                    >
                      <MdClose size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {files.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <MdUploadFile size={48} className="mx-auto mb-3 opacity-50" />
                <p>No files selected</p>
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-6 pt-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setFiles([]);
                    handleClose();
                  }}
                  className="py-2 px-4 border border-inputBorder hover:border-gray-700 cursor-pointer transition delay-100 w-36"
                  disabled={loading}
                >
                  {t("close")}
                </button>
                <button 
                  className="btn-primary w-36" 
                  onClick={handleUploadDocuments}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : `Upload ${files.length} ${files.length === 1 ? "File" : "Files"}`}
                </button>
              </div>
            )}
          </>
        )}

        {/* Category Tab Content */}
        {activeTab === "category" && (
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="input-primary w-full"
              />
            </div>

            <div className="mt-auto pt-4 flex justify-end gap-3">
              <button
                onClick={handleCancelCategory}
                className="py-2 px-4 border border-inputBorder hover:border-gray-700 cursor-pointer transition delay-100 w-36"
              >
                Cancel
              </button>
              <button onClick={handleAddCategory} className="btn-primary w-36">
                Add Category
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDocument;