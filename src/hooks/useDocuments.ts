// // src/hooks/useDocuments.ts
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// export interface DocumentItem {
//   id: number;
//   filename: string;
// }

// const localAddress = 'http://localhost:3000'

// export function useDocuments() {
//   const [documents, setDocuments] = useState<DocumentItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDocuments = useCallback(async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${localAddress}/documents`); 
//       // resp.data might be either DocumentItem[] or { documents: DocumentItem[] }
//       const data = resp.data;
//       const docs: DocumentItem[] = Array.isArray(data)
//         ? data
//         : Array.isArray((data as any).documents)
//           ? (data as any).documents
//           : [];
//       setDocuments(docs);
//       console.log(docs)
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load documents.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const uploadDocument = useCallback(async (file: File) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const resp = await axios.post(`${localAddress}/documents/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       const newDoc = resp.data as DocumentItem;
//       setDocuments((prev) => [...prev, newDoc]);
//       return newDoc;
//     } catch (err) {
//       console.error(err);
//       setError("Failed to upload document.");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDocuments();
//   }, [fetchDocuments]);

//   return { documents, loading, error, uploadDocument };
// }



import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface DocumentItem {
  id: string;
  filename: string;
  url?: string;
  createdAt?: string;
}

const localAddress = 'http://localhost:3000'

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await axios.get<DocumentItem[]>(`${localAddress}/documents`);
      setDocuments(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const resp = await axios.post<DocumentItem>(
        `${localAddress}/documents/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setDocuments((prev) => [...prev, resp.data]);
      return resp.data;
    } catch (err) {
      console.error(err);
      setError("Failed to upload document.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${localAddress}/documents/delete/${id}`);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete document.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument,
  };
}
