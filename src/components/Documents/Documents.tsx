// // // src/components/Documents.tsx
// // import {
// //   PencilSquareIcon,
// //   TrashIcon,
// //   FolderPlusIcon,
// // } from "@heroicons/react/24/outline";
// // import { useContext, useEffect, useState } from "react";
// // import { LangContext } from "../context/LangContext";
// // import { getUserTypeFromToken } from "../utils/getUserType";
// // import { useDocuments, DocumentItem } from "../hooks/useDocuments";
// // import { API_BASE } from "../utils/urls";

// // const demoDocuments: Omit<DocumentItem, "url" | "createdAt">[] = [
// //   { id: "1", filename: "RIMI Canuck Voyage Travel Medical - Claim Form (EN)" },
// //   { id: "2", filename: "RIMI Canuck Voyage Travel Medical - Claim Form (FR)" },
// //   {
// //     id: "3",
// //     filename:
// //       "Secure Study RIMI International Students to Canada - Policy Wording (EN)",
// //   },
// //   {
// //     id: "4",
// //     filename:
// //       "Secure Study RIMI International Students to Canada - Policy Wording (FR)",
// //   },
// // ];

// // export default function Documents() {
// //   const { langauge } = useContext(LangContext);
// //   const [userType, setUserType] = useState<string | null>(null);

// //   const {
// //     documents: fetchedDocs,
// //     loading,
// //     error,
// //     uploadDocument,
// //     deleteDocument,
// //   } = useDocuments();

// //   useEffect(() => {
// //     const type = getUserTypeFromToken();
// //     if (type) setUserType(type.userType);
// //   }, []);

// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     try {
// //       await uploadDocument(file);
// //     } catch {
// //       // show UI notification if you like
// //     }
// //     e.target.value = "";
// //   };

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this document?")) return;
// //     try {
// //       await deleteDocument(id);
// //     } catch {
// //       // show UI notification if you like
// //     }
// //   };

// //   return (
// //     <div className="w-full mx-auto mt-4 px-2 py-4 sm:py-6 sm:px-10 bg-[#F9F9F9]">
// //       <h2 className="text-lg font-bold text-left text-[#1B1B1B] my-2">
// //         {langauge === "En" ? "Documents" : "Documents"}
// //       </h2>

// //       {/* Demo Documents (static, non‑deletable) */}
// //       <div className="w-full space-y-6">
// //         {demoDocuments.map((item) => (
// //           <div key={item.id} className="flex justify-between items-center gap-3">
// //             {item.filename}
// //             {userType === "ADMIN" && (
// //               <div className="flex gap-2">
// //                 <button className="py-2 flex">
// //                   <PencilSquareIcon className="h-6 w-6 text-primary cursor-pointer" />
// //                 </button>
// //                 <button className="py-2 flex opacity-50 cursor-not-allowed">
// //                   <TrashIcon className="h-6 w-6 text-primary cursor-pointer" />
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Fetched Documents (deletable) */}
// //       <div className="max-w-4xl mt-6">
// //         {fetchedDocs.map((item) => (
// //           <div
// //             key={item.id}
// //             className="flex justify-between items-center border-b py-2 border-slate-200"
// //           >
// //             <a href={`${API_BASE}${item.url}`} target="_blank">
// //               {item.filename}
// //             </a>
// //             {userType === "ADMIN" && (
// //               <div className="flex gap-2">
// //                 <button className="px-2 py-2 flex">
// //                   <PencilSquareIcon className="h-6 w-6 text-primary" />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(item.id)}
// //                   className="px-2 py-2 flex"
// //                 >
// //                   <TrashIcon className="h-6 w-6" />
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {userType === "ADMIN" && (
// //         <div className="mt-8 flex justify-center">
// //           <input
// //             type="file"
// //             id="document-upload"
// //             className="hidden"
// //             onChange={handleFileChange}
// //           />
// //           <label
// //             htmlFor="document-upload"
// //             className="bg-primary text-white py-2 font-semibold flex gap-2 items-center w-[130px] justify-center cursor-pointer"
// //           >
// //             <FolderPlusIcon className="h-6 w-6" />
// //             {langauge === "En" ? "Add" : "Ajouter"}
// //           </label>
// //         </div>
// //       )}

// //       {loading && <p className="text-center mt-4">Loading…</p>}
// //       {error && <p className="text-red-500 text-center mt-2">{error}</p>}
// //     </div>
// //   );
// // }


// // =================================================


// import {
//   PencilSquareIcon,
//   TrashIcon,
//   FolderPlusIcon,
// } from "@heroicons/react/24/outline";
// import { useContext, useEffect, useState } from "react";
// import { LangContext } from "../../context/LangContext";
// import { getUserTypeFromToken } from "../../utils/getUserType";
// import { useDocuments, DocumentItem } from "../../hooks/documents/useDocuments";
// import { API_BASE } from "../../utils/urls";
// import AddDocument from "./AddDocument";
// import { FaExternalLinkAlt } from "react-icons/fa";

// interface CategorizedDocument {
//   id: string;
//   filename: string;
//   category: string;
// }

// const demoDocuments: CategorizedDocument[] = [
//   // Travel Medical Claims
//   { id: "1", filename: "RIMI Canuck Voyage Travel Medical - Claim Form (EN)", category: "Travel Medical Claims" },
//   { id: "2", filename: "RIMI Canuck Voyage Travel Medical - Claim Form (FR)", category: "Travel Medical Claims" },
//   { id: "3", filename: "Emergency Medical Assistance Guidelines", category: "Travel Medical Claims" },

//   // Policy Documents
//   {
//     id: "4",
//     filename: "Secure Study RIMI International Students to Canada - Policy Wording (EN)",
//     category: "Policy Documents"
//   },
//   {
//     id: "5",
//     filename: "Secure Study RIMI International Students to Canada - Policy Wording (FR)",
//     category: "Policy Documents"
//   },
//   { id: "6", filename: "Terms and Conditions - Travel Insurance", category: "Policy Documents" },
//   { id: "7", filename: "Coverage Details and Exclusions", category: "Policy Documents" },

//   // Application Forms
//   { id: "8", filename: "New Student Application Form", category: "Application Forms" },
//   { id: "9", filename: "Policy Renewal Application", category: "Application Forms" },
//   { id: "10", filename: "Beneficiary Designation Form", category: "Application Forms" },
// ];

// export default function Documents() {
//   const { langauge } = useContext(LangContext);
//   const [userType, setUserType] = useState<string | null>(null);
//   const [showAddDocument, setShowAddDocument] = useState<boolean>(false);

//   const {
//     documents: fetchedDocs,
//     loading,
//     error,
//     uploadDocument,
//     deleteDocument,
//   } = useDocuments();

//   useEffect(() => {
//     const type = getUserTypeFromToken();
//     if (type) setUserType(type.userType);
//   }, []);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     try {
//       await uploadDocument(file);
//     } catch {
//       // show UI notification if you like
//     }
//     e.target.value = "";
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this document?")) return;
//     try {
//       await deleteDocument(id);
//     } catch {
//       // show UI notification if you like
//     }
//   };

//   // Group documents by category
//   const categorizedDocs = demoDocuments.reduce((acc, doc) => {
//     if (!acc[doc.category]) {
//       acc[doc.category] = [];
//     }
//     acc[doc.category].push(doc);
//     return acc;
//   }, {} as Record<string, CategorizedDocument[]>);

//   return (
//     <div className="w-full mx-auto mt-4 px-2 py-4 sm:py-6 sm:px-10 bg-[#F9F9F9]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-left text-[#1B1B1B]">
//           {langauge === "En" ? "Documents" : "Documents"}
//         </h2>

//         {userType === "ADMIN" && (
//           <button
//             onClick={() => setShowAddDocument(true)}
//             className="btn-primary flex items-center gap-2"
//           >
//             <FolderPlusIcon className="h-5 w-5" />
//             Add Document
//           </button>
//         )}
//       </div>

//       {/* Demo Documents grouped by category */}
//       <div className="w-full space-y-8">
//         {Object.entries(categorizedDocs).map(([category, docs]) => (
//           <div key={category} className="bg-white p-4 shadow-sm">
//             <h3 className="text-md font-semibold text-primary mb-4 border-b pb-2">
//               {category}
//             </h3>
//             <div className="space-y-3">
//               {docs.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center gap-3 hover:bg-gray-50 p-2 rounded transition">
//                   <span className="text-gray-700">{item.filename}</span>
//                   {userType === "ADMIN" && (
//                     <div className="flex gap-2">
//                       <button className="py-2 flex">
//                         <PencilSquareIcon className="h-5 w-5 text-primary cursor-pointer hover:text-primary-dark" />
//                       </button>
//                       <button className="py-2 flex">
//                         <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-600" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Fetched Documents (deletable) */}
//       {fetchedDocs.length > 0 && (
//         <div className="bg-white p-4 shadow-sm mt-8">
//           <h3 className="text-md font-semibold text-primary mb-4 border-b pb-2">
//             Uploaded Documents
//           </h3>
//           <div className="space-y-3">
//             {fetchedDocs.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center hover:bg-gray-50 p-2 rounded transition"
//               >
//                 <a 
//                   href={`${API_BASE}${item.url}`} 
//                   target="_blank"
//                   className="text-primary hover:underline"
//                 >
//                   {item.filename}
//                 </a>
//                 {userType === "ADMIN" && (
//                   <div className="flex gap-2 items-center">
//                     <a 
//                   href={`${API_BASE}${item.url}`} 
//                   target="_blank"
//                   className="text-primary hover:underline"
//                 >
//                   <FaExternalLinkAlt className="h-4 w-4 text-primary hover:text-primary-dark" />
//                 </a>
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="py-2 flex"
//                     >
//                       <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-700 cursor-pointer" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showAddDocument && <AddDocument setShowAddDocument={setShowAddDocument} />}
//     </div>
//   );
// }


// ====================================================


import {
  PencilSquareIcon,
  TrashIcon,
  FolderPlusIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "../../context/LangContext";
import { getUserTypeFromToken } from "../../utils/getUserType";
import { useDocuments } from "../../hooks/documents/useDocuments";
import AddDocument from "./AddDocument";
import { FaExternalLinkAlt } from "react-icons/fa";
import EditDocumentModal from "./EditDocumentModal";
import { useCategories } from "../../hooks/documents/useCategories";
import useNotification from "../../hooks/useNotification";
import DeleteDocumentModal from "./DeleteDocumentModal";
import ManageCategoriesModal from "./ManageCategoriesModal";

export default function Documents() {
  const { langauge } = useContext(LangContext);
  const [userType, setUserType] = useState<string | null>(null);
  const [showAddDocument, setShowAddDocument] = useState<boolean>(false);
  const [editingDocument, setEditingDocument] = useState<{
    id: string;
    filename: string;
    category: string;
  } | null>(null);
  const [deletingDocument, setDeletingDocument] = useState<{
    id: string;
    filename: string;
  } | null>(null);
  const [showManageCategories, setShowManageCategories] = useState<boolean>(false);

  const { triggerNotification, NotificationComponent } = useNotification();
  const { categories } = useCategories();

  const {
    categorizedDocuments,
    loading,
    error,
    deleteDocument,
    refetch,
  } = useDocuments();

  useEffect(() => {
    const type = getUserTypeFromToken();
    if (type) setUserType(type.userType);
  }, []);

  const handleDeleteClick = (doc: { id: string; filename: string }) => {
    setDeletingDocument(doc);
  };

  const handleConfirmDelete = async () => {
    if (!deletingDocument) return;

    try {
      await deleteDocument(deletingDocument.id);
      triggerNotification({
        type: "success",
        message: "Document deleted successfully",
      });
      setDeletingDocument(null);
    } catch (err) {
      console.error("Delete failed:", err);
      triggerNotification({
        type: "error",
        message: "Failed to delete document",
      });
    }
  };

  const handleEdit = (doc: { id: string; filename: string; category: string }) => {
    setEditingDocument(doc);
  };

  const handleCloseEdit = () => {
    setEditingDocument(null);
    refetch();
  };

  if (loading && Object.keys(categorizedDocuments).length === 0) {
    return (
      <div className="w-full mx-auto mt-4 px-2 py-4 sm:py-6 sm:px-10 bg-[#F9F9F9]">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto mt-4 px-2 py-4 sm:py-6 sm:px-10 bg-[#F9F9F9]">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading documents: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-4 px-2 py-4 sm:py-6 sm:px-10 bg-[#F9F9F9]">
      <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start mb-6">
        <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-3 sm:mb-0">
          {langauge === "En" ? "Documents" : "Documents"}
        </h2>

        {userType === "ADMIN" && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowManageCategories(true)}
              className="py-2 px-4 border border-inputBorder hover:border-gray-500 transition flex items-center gap-2 cursor-pointer"
            >
              <Cog6ToothIcon className="h-5 w-5" />
              Manage Categories
            </button>
            <button
              onClick={() => setShowAddDocument(true)}
              className="btn-primary flex items-center gap-2"
            >
              <FolderPlusIcon className="h-5 w-5" />
              Add Document
            </button>
          </div>
        )}
      </div>

      {/* Documents grouped by category */}
      {Object.keys(categorizedDocuments).length === 0 ? (
        <div className="bg-white p-8 shadow-sm text-center">
          <p className="text-gray-500">No documents found. Upload some documents to get started.</p>
        </div>
      ) : (
        <div className="w-full space-y-8">
          {Object.entries(categorizedDocuments).map(([category, docs]) => (
            <div key={category} className="bg-white p-4 shadow-sm">
              <h3 className="text-md font-semibold text-primary mb-4 border-b pb-2">
                {category}
              </h3>
              <div className="space-y-3">
                {docs.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-3 hover:bg-gray-50 p-2 rounded transition"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary hover:underline max-w-[70%] break-words"
                    >
                      {item.filename}
                    </a>

                    <div className="flex gap-2 items-center">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        <FaExternalLinkAlt className="h-4 w-4 text-primary hover:text-primary-dark" />
                      </a>

                      {userType === "ADMIN" && (
                        <>
                          <button
                            onClick={() => handleEdit({
                              id: item.id,
                              filename: item.filename,
                              category: item.category,
                            })}
                            className="py-2 flex"
                          >
                            <PencilSquareIcon className="h-5 w-5 text-primary cursor-pointer hover:text-primary-dark" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick({
                              id: item.id,
                              filename: item.filename,
                            })}
                            className="py-2 flex"
                          >
                            <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddDocument && (
        <AddDocument
          setShowAddDocument={setShowAddDocument}
          onSuccess={refetch}
          triggerNotification={triggerNotification}
        />
      )}

      {editingDocument && (
        <EditDocumentModal
          document={editingDocument}
          onClose={handleCloseEdit}
          categories={categories}
          triggerNotification={triggerNotification}
        />
      )}

      {deletingDocument && (
        <DeleteDocumentModal
          document={deletingDocument}
          onClose={() => setDeletingDocument(null)}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      )}

      {showManageCategories && (
        <ManageCategoriesModal
          onClose={() => setShowManageCategories(false)}
          triggerNotification={triggerNotification}
        />
      )}

      {NotificationComponent}
    </div>
  );
}