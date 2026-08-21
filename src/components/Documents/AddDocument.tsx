
import { useState } from "react";
import { MdClose, MdUploadFile, MdInsertDriveFile } from "react-icons/md";
import { useUploadDocuments } from "../../hooks/documents/useUploadDocuments";
import { useCategories } from "../../hooks/documents/useCategories";
import { NotificationProps } from "../Notification";
import { useLanguage } from "../../context/LanguageContext";

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
  category: string;
}

// Must stay in step with multerPlatformDocumentsConfig on the backend.
const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "text/plain",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const ACCEPT_ATTR =
  ".pdf,.jpg,.jpeg,.png,.txt,.csv,.doc,.docx,.xls,.xlsx,.ppt,.pptx";

const AddDocument = ({
  setShowAddDocument,
  onSuccess,
  triggerNotification,
}: {
  setShowAddDocument: (val: boolean) => void;
  onSuccess?: () => void;
  triggerNotification: (props: Omit<NotificationProps, "onClose" | "animation"> & { duration?: number; animation?: any }) => void;
}) => {
  const { t } = useLanguage();
  const [files, setFiles] = useState<FileItem[]>([]);

  const { uploadDocuments, loading: uploadLoading, error: uploadError } = useUploadDocuments();
  const { categories, loading: categoryLoading, error: categoryError } = useCategories();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const maxSize = 10 * 1024 * 1024; // 10MB
    const selectedFiles = Array.from(e.target.files);

    const rightType = selectedFiles.filter((file) =>
      ALLOWED_DOCUMENT_TYPES.includes(file.type),
    );
    if (rightType.length < selectedFiles.length) {
      triggerNotification({
        type: "error",
        message: t(
          "Invalid file type. Allowed: PDF, JPG, PNG, TXT, CSV, Word, Excel, PowerPoint",
        ),
      });
    }

    const validFiles = rightType.filter((file) => file.size <= maxSize);

    if (validFiles.length < rightType.length) {
      triggerNotification({
        type: "error",
        message: t("File size should not exceed 10MB"),
      });
    }

    // Let the same file be picked again after a rejection.
    e.target.value = "";

    if (validFiles.length === 0) return;

    const newFiles = validFiles.map((file) => ({
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
        message: t("document(s) uploaded successfully", { count: files.length.toString() }),
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
        message: t(err.response.data.message || "Upload failed"),
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

        <h2 className="text-xl font-bold mb-6">{t("Add Document")}</h2>

        <div className="flex-1 flex flex-col overflow-hidden">

          <label
            htmlFor="fileUpload"
            className="input-primary flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed"
          >
            <MdUploadFile size={20} />
            {t("Choose Files")}
            <input
              type="file"
              id="fileUpload"
              multiple
              accept={ACCEPT_ATTR}
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
                          {t(cat.name)}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-red-600 cursor-pointer flex-shrink-0"
                      aria-label={t("Delete file")}
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
              <p>{t("No files selected")}</p>
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
                {t("close")}
              </button>
              <button
                className="btn-primary min-w-36 text-nowrap"
                onClick={handleUploadDocuments}
                disabled={loading}
              >
                {loading ? t("Uploading...") : t("Upload")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
