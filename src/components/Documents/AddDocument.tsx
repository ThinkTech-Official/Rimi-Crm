
import { useState } from "react";
import { MdClose, MdUploadFile, MdInsertDriveFile } from "react-icons/md";
import { useUploadDocuments } from "../../hooks/documents/useUploadDocuments";
import { useCategories } from "../../hooks/documents/useCategories";
import { NotificationProps } from "../Notification";

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
  category: string;
}

const AddDocument = ({
  setShowAddDocument,
  onSuccess,
  triggerNotification,
}: {
  setShowAddDocument: (val: boolean) => void;
  onSuccess?: () => void;
  triggerNotification: (props: Omit<NotificationProps, "onClose" | "animation"> & { duration?: number; animation?: any }) => void;
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const { uploadDocuments, loading: uploadLoading, error: uploadError } = useUploadDocuments();
  const { categories, loading: categoryLoading, error: categoryError } = useCategories();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      category: categories.length > 0 ? categories[0].name : "General",
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

      triggerNotification({
        type: "success",
        message: `${files.length} document(s) uploaded successfully`,
      });

      setFiles([]);
      if (onSuccess) {
        onSuccess();
      }
      handleClose();
    } catch (err: any) {
      console.error("Upload failed:", err);
      triggerNotification({
        type: "error",
        message: err.message || "Upload failed",
      });
    }
  };

  const loading = uploadLoading || categoryLoading;
  const error = uploadError || categoryError;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
      <div className="bg-white p-6 pt-4 max-w-xl w-full max-h-[70vh] overflow-hidden flex flex-col shadow-lg relative m-4">
        <MdClose
          size={24}
          onClick={handleClose}
          className="text-text-secondary absolute top-4 right-4 cursor-pointer"
        />

        <h2 className="text-xl font-bold mb-6">Add Document</h2>

        <div className="flex-1 flex flex-col overflow-hidden">
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
                <div key={file.id} className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MdInsertDriveFile
                      size={24}
                      className="text-text-secondary flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={file.category}
                      onChange={(e) =>
                        handleCategoryChange(file.id, e.target.value)
                      }
                      className="input-primary flex-1 sm:w-52"
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
                      className="p-2 text-red-600 cursor-pointer flex-shrink-0"
                      aria-label="Delete file"
                      disabled={loading}
                    >
                      <MdClose size={20} />
                    </button>
                  </div>
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
                className="py-2 px-4 border border-inputBorder hover:border-gray-500 cursor-pointer transition delay-100 w-36"
                disabled={loading}
              >
                Close
              </button>
              <button
                className="btn-primary w-36"
                onClick={handleUploadDocuments}
                disabled={loading}
              >
                {loading ? "Uploading..." : `Upload ${files.length} File${files.length === 1 ? "" : "s"}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDocument;