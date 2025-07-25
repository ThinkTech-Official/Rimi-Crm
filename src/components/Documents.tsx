// src/components/Documents.tsx
import {
  PencilSquareIcon,
  TrashIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "../context/LangContext";
import { getUserTypeFromToken } from "../utils/getUserType";
import { useDocuments, DocumentItem } from "../hooks/useDocuments";
import { API_BASE } from "../utils/urls";

const demoDocuments: Omit<DocumentItem, "url" | "createdAt">[] = [
  { id: "1", filename: "RIMI Canuck Voyage Travel Medical - Claim Form (EN)" },
  { id: "2", filename: "RIMI Canuck Voyage Travel Medical - Claim Form (FR)" },
  {
    id: "3",
    filename:
      "Secure Study RIMI International Students to Canada - Policy Wording (EN)",
  },
  {
    id: "4",
    filename:
      "Secure Study RIMI International Students to Canada - Policy Wording (FR)",
  },
];

export default function Documents() {
  const { langauge } = useContext(LangContext);
  const [userType, setUserType] = useState<string | null>(null);

  const {
    documents: fetchedDocs,
    loading,
    error,
    uploadDocument,
    deleteDocument,
  } = useDocuments();

  useEffect(() => {
    const type = getUserTypeFromToken();
    if (type) setUserType(type.userType);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadDocument(file);
    } catch {
      // show UI notification if you like
    }
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      await deleteDocument(id);
    } catch {
      // show UI notification if you like
    }
  };

  return (
    <div className="w-full mx-auto mt-4 px-2 py-4 sm:py-6 sm:px-10 bg-[#F9F9F9]">
      <h2 className="text-lg font-bold text-left text-[#1B1B1B] my-2">
        {langauge === "En" ? "Documents" : "Documents"}
      </h2>

      {/* Demo Documents (static, non‑deletable) */}
      <div className="w-full space-y-6">
        {demoDocuments.map((item) => (
          <div key={item.id} className="flex justify-between items-center gap-3">
            {item.filename}
            {userType === "ADMIN" && (
              <div className="flex gap-2">
                <button className="py-2 flex">
                  <PencilSquareIcon className="h-6 w-6 text-primary cursor-pointer" />
                </button>
                <button className="py-2 flex opacity-50 cursor-not-allowed">
                  <TrashIcon className="h-6 w-6 text-primary cursor-pointer" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fetched Documents (deletable) */}
      <div className="max-w-4xl mt-6">
        {fetchedDocs.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2 border-slate-200"
          >
            <a href={`${API_BASE}${item.url}`} target="_blank">
              {item.filename}
            </a>
            {userType === "ADMIN" && (
              <div className="flex gap-2">
                <button className="px-2 py-2 flex">
                  <PencilSquareIcon className="h-6 w-6 text-primary" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-2 flex"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {userType === "ADMIN" && (
        <div className="mt-8 flex justify-center">
          <input
            type="file"
            id="document-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="document-upload"
            className="bg-primary text-white py-2 font-semibold flex gap-2 items-center w-[130px] justify-center cursor-pointer"
          >
            <FolderPlusIcon className="h-6 w-6" />
            {langauge === "En" ? "Add" : "Ajouter"}
          </label>
        </div>
      )}

      {loading && <p className="text-center mt-4">Loading…</p>}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
