import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export type ImportMessage = { row: number; error: string };

export type UploadResult = {
  loading: boolean;
  message: string;
  error: string;
  /** Rows the importer declined to write. */
  skipped: number;
  /**
   * Per-row messages from the importer. Two kinds arrive here: rows that were
   * rejected outright, and rows whose user WAS created but whose MGA/agent link
   * could not be resolved. Both are worth showing — the second kind used to be
   * discarded entirely, so a half-linked import looked identical to a clean one.
   */
  messages: ImportMessage[];
};

export function useUserUpload(): [
  (file: File | null) => Promise<void>,
  UploadResult,
] {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [skipped, setSkipped] = useState<number>(0);
  const [messages, setMessages] = useState<ImportMessage[]>([]);

  const upload = async (file: File | null) => {
    setMessage("");
    setError("");
    setSkipped(0);
    setMessages([]);

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/users/import`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message || "Import successful");
      // The backend has always returned these; the hook used to drop them, so
      // an import that rejected every row still reported success.
      setSkipped(response.data.skipped ?? 0);
      setMessages(response.data.errors ?? []);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Import failed");
    } finally {
      setLoading(false);
    }
  };

  return [upload, { loading, message, error, skipped, messages }];
}

// ================================
