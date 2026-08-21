import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

interface FileUpload {
  file: File;
  category: string;
}

export const useUploadDocuments = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadDocuments = async (files: FileUpload[]) => {
    setLoading(true);
    setError(null);

    try {
      const uploadPromises = files.map(async ({ file, category }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        const response = await axiosInstance.post(
          `/documents/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        return response.data;
      });

      // allSettled, not all: one bad file shouldn't hide the fact that the
      // others uploaded, and the caller needs to know which ones failed.
      const settled = await Promise.allSettled(uploadPromises);

      const failures = settled
        .map((result, i) => ({ result, name: files[i].file.name }))
        .filter(({ result }) => result.status === "rejected");

      if (failures.length > 0) {
        const detail = failures
          .map(({ result, name }) => {
            const reason = (result as PromiseRejectedResult).reason;
            const msg =
              reason?.response?.data?.message ||
              reason?.message ||
              "Upload failed";
            return `${name}: ${msg}`;
          })
          .join("; ");
        setError(detail);
        throw new Error(detail);
      }

      return settled.map(
        (result) => (result as PromiseFulfilledResult<any>).value,
      );
    } catch (err: any) {
      console.error("Upload error:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Upload failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadDocuments,
    loading,
    error,
  };
};
