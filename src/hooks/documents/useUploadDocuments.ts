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

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (err: any) {
      console.error("Upload error:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message || err.message || "Upload failed";
      setError(errorMessage);
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
