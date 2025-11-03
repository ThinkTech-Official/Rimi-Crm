// import { useEffect, useState } from "react";
// import { useProfile } from "../hooks/useProfile";
// import { ProfileForm } from "../utils/types";
// import { DocumentIcon } from "@heroicons/react/24/outline";
// import { API_BASE } from "../utils/urls";

// // Permission definitions
// const adminPermission = {
//   modifyPolicies: true,
//   viewPolicies: false,
//   readOnly: false,
//   manageUsers: true,
//   bulkEnrollment: true,
// };
// const agentPermission = {
//   modifyPolicies: true,
//   viewPolicies: false,
//   readOnly: false,
//   manageUsers: true,
//   bulkEnrollment: true,
// };
// const mgaPermission = {
//   modifyPolicies: true,
//   viewPolicies: false,
//   readOnly: false,
//   manageUsers: true,
//   bulkEnrollment: true,
// };
// const readOnlyPermission = {
//   modifyPolicies: true,
//   viewPolicies: false,
//   readOnly: false,
//   manageUsers: true,
//   bulkEnrollment: true,
// };
// const PERMISSIONS_MAP: Record<string, typeof adminPermission> = {
//   ADMIN: adminPermission,
//   AGENT: agentPermission,
//   MGA: mgaPermission,
//   READONLY: readOnlyPermission,
// };

// export default function Profile() {
//   const { profile, loading, error, updateProfile } = useProfile();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<ProfileForm>({
//     id: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     agentCode: "",
//     company: "",
//     userType: "",
//     status: "",
//     docLink1: "",
//     docLink2: "",
//     docLink3: "",
//     validUpto: "",
//     createdAt: "",
//     updatedAt: "",
//     mgaId: null,
//     agentCodes: [],
//   });
//   // Local state for files to upload
//   const [files, setFiles] = useState<{ [key: string]: File | null }>({
//     doc1: null,
//     doc2: null,
//     doc3: null,
//   });
//   const [passwords, setPasswords] = useState({
//     password: "",
//     confirmPassword: "",
//   });

//   useEffect(() => {
//     if (!profile) return;
//     console.log(
//       "inside profile component checking updated data structure",
//       profile
//     );
//     setFormData(profile);
//     setPasswords({ password: "", confirmPassword: "" });
//     setFiles({ doc1: null, doc2: null, doc3: null });
//   }, [profile]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files: fileList } = e.target;
//     setFiles((prev) => ({
//       ...prev,
//       [name]: fileList && fileList[0] ? fileList[0] : null,
//     }));
//   };

//   const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswords((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const payload = new FormData();
//       // append files if selected
//       Object.entries(files).forEach(([key, file]) => {
//         if (file) payload.append("documents", file);
//       });
//       // append password fields
//       if (passwords.password) payload.append("password", passwords.password);
//       if (passwords.confirmPassword)
//         payload.append("confirmPassword", passwords.confirmPassword);

//       const updated = await updateProfile(payload);
//       // reset local edit state
//       setIsEditing(false);
//     } catch (err: any) {
//       alert(`Error updating profile: ${err.message}`);
//     }
//   };

//   if (loading) return <p>Loading profile…</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};
//   const docs = [formData.docLink1, formData.docLink2, formData.docLink3].filter(
//     Boolean
//   );

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
//       <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
//         {isEditing ? "MODIFY USER" : "VIEW USER"}
//       </h2>

//       <div className="flex justify-end space-x-2 mb-4">
//         {isEditing ? (
//           <>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-500 text-white rounded"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//             >
//               Discard Changes
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//           >
//             Modify User
//           </button>
//         )}
//       </div>

//       <div className="border border-gray-300 rounded-lg p-4 mb-4">
//         <h3 className="text-[#3a17c5] font-semibold mb-2">USER INFORMATION</h3>
//         <div className="grid grid-cols-2 gap-4 text-gray-700">
//           <input
//             name="agentCode"
//             value={formData.agentCode}
//             disabled={!isEditing}
//             className="border p-2 w-full bg-gray-100"
//           />
//           <input
//             value={formData.firstName}
//             disabled
//             className="border p-2 w-full bg-gray-100"
//           />
//           <input
//             value={formData.lastName}
//             disabled
//             className="border p-2 w-full bg-gray-100"
//           />
//           <input
//             value={formData.email}
//             disabled
//             type="email"
//             className="border p-2 w-full bg-gray-100"
//           />
//           <input
//             value={formData.company}
//             disabled
//             className="border p-2 w-full bg-gray-100"
//           />
//           <select
//             value={formData.userType}
//             disabled
//             className="border p-2 w-full bg-gray-100"
//           >
//             <option>ADMIN</option>
//             <option>AGENT</option>
//             <option>MGA</option>
//             <option>READONLY</option>
//           </select>
//           <div className="flex items-center space-x-2">
//             <span>Status:</span>
//             <span className="px-2 py-1 bg-gray-200 rounded">
//               {formData.status}
//             </span>
//           </div>
//           <div className="flex flex-col">
//             <label>Created At</label>
//             <input
//               value={new Date(formData.createdAt).toLocaleString()}
//               disabled
//               className="border p-2 bg-gray-100"
//             />
//           </div>

//           {formData.validUpto && (
//             <div className="flex flex-col">
//               <label>Valid Upto</label>
//               <input
//                 type="date"
//                 value={formData.validUpto.slice(0, 10)}
//                 disabled
//                 className="border p-2 bg-gray-100"
//               />
//             </div>
//           )}

//           {isEditing && (
//             <>
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="New Password"
//                 value={passwords.password}
//                 onChange={handlePassChange}
//                 className="border p-2 w-full"
//               />
//               <input
//                 name="confirmPassword"
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={passwords.confirmPassword}
//                 onChange={handlePassChange}
//                 className="border p-2 w-full"
//               />
//               <input
//                 name="doc1"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="border p-2 w-full"
//               />
//               <input
//                 name="doc2"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="border p-2 w-full"
//               />
//               <input
//                 name="doc3"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="border p-2 w-full"
//               />
//             </>
//           )}
//         </div>
//       </div>

//       <div className="border border-gray-300 rounded-lg p-4 mb-4">
//         <h3 className="text-[#3a17c5] font-semibold mb-2">USER PERMISSIONS</h3>
//         {Object.entries(currentUserPermissions).map(([key, allowed]) => (
//           <label key={key} className="block text-gray-700">
//             <input
//               type="checkbox"
//               checked={allowed}
//               disabled
//               className="mr-2"
//             />
//             {key}
//           </label>
//         ))}
//       </div>

//       {formData.agentCodes?.length! > 0 && (
//         <div className="border border-gray-300 rounded-lg p-4 mb-4">
//           <h3 className="text-[#3a17c5] font-semibold mb-2">
//             ASSIGNED AGENT CODES
//           </h3>
//           <ul className="list-disc list-inside text-gray-700">
//             {formData.agentCodes!.map((code) => (
//               <li key={code}>{code}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="border border-gray-300 rounded-lg p-4 mb-4">
//         <h3 className="text-[#3a17c5] font-semibold mb-2">DOCUMENTS</h3>
//         {docs.length > 0 ? (
//           <ul className="space-y-2">
//             {docs.map((link, idx) => {
//               const filename = link.split("/").pop();
//               return (
//                 <li key={idx}>
//                   <a
//                     href={`${API_BASE}${link}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 text-blue-600 hover:underline"
//                   >
//                     <DocumentIcon className="h-5 w-5" />
//                     {filename}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No documents attached</p>
//         )}
//       </div>
//     </div>
//   );
// }




// =============================================


import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { ProfileForm } from "../utils/types";
import { DocumentIcon, UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { API_BASE } from "../utils/urls";
import { MdCancel } from "react-icons/md";
import { getUserTypeFromToken } from "../utils/getUserType";
import VerificationTab from "../components/agent-verification/VerificationTab";
import { useDispatch } from "react-redux";
import { useGetVerificationStatus } from "../hooks/agent-verification/useGetVerificationStatus";
import { setVerificationStatus, updateDocumentUploadStatus } from "../features/verificationSlice";
import { useRequestVerification } from "../hooks/agent-verification/useRequestVerification";
import { useUploadDocuments } from "../hooks/agent-verification/useUploadDocuments";

// Permission definitions
const adminPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const agentPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const mgaPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const readOnlyPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const PERMISSIONS_MAP: Record<string, typeof adminPermission> = {
  ADMIN: adminPermission,
  AGENT: agentPermission,
  MGA: mgaPermission,
  READONLY: readOnlyPermission,
};

export default function Profile() {
  const { profile, loading, error, updateProfile } = useProfile();
  const { uploadDocuments } = useUploadDocuments();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'verification'>('profile');
  const dispatch = useDispatch();
  const { fetchStatus } = useGetVerificationStatus();
  
  const userInfo = getUserTypeFromToken();
  const userType = userInfo?.userType;
  const showVerificationTab = userType && ['AGENT', 'MGA'].includes(userType);
  
  const [formData, setFormData] = useState<ProfileForm>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    agentCode: "",
    company: "",
    userType: "",
    status: "",
    docLink1: "",
    docLink2: "",
    docLink3: "",
    validUpto: "",
    createdAt: "",
    updatedAt: "",
    mgaId: null,
    agentCodes: [],
  });
  
  // Local state for files to upload
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    doc1: null,
    doc2: null,
    doc3: null,
  });
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  // verification new route
  const { requestVerification, loading: requestingVerification } = useRequestVerification();
  const [showRequestButton, setShowRequestButton] = useState(false);

  // Update useEffect to check if documents are uploaded
  useEffect(() => {
    if (!profile) return;
    
    console.log('Profile loaded:', profile);
    setFormData(profile);
    setPasswords({ password: "", confirmPassword: "" });
    setFiles({ doc1: null, doc2: null, doc3: null });
    
    // Check if user can request verification
    // FIXED: Using !! to ensure boolean type
    const hasDocuments = !!(profile.docLink1 || profile.docLink2 || profile.docLink3);
    const isAgentOrMGA = profile.userType === 'AGENT' || profile.userType === 'MGA';
    const isDraftStatus = profile.verificationStatus === 'DRAFT' || !profile.verificationStatus;
    
    const canRequestVerification = isAgentOrMGA && hasDocuments && isDraftStatus;
    
    setShowRequestButton(!!canRequestVerification); // FIXED: Double negation ensures boolean
  }, [profile]);

  useEffect(() => {
    if (!profile) return;
    console.log(
      "inside profile component checking updated data structure",
      profile
    );
    setFormData(profile);
    setPasswords({ password: "", confirmPassword: "" });
    setFiles({ doc1: null, doc2: null, doc3: null });
  }, [profile]);

  // handler for request verification button
  const handleRequestVerification = async () => {
    if (!window.confirm('Are you sure you want to submit your documents for verification? Make sure all documents are correct.')) {
      return;
    }

    try {
      const result = await requestVerification();
      alert(result.message || 'Verification request submitted successfully!');
      
      // Refresh verification status
      const status = await fetchStatus();
      if (status) {
        dispatch(setVerificationStatus(status));
      }
      
      // Refresh profile to update status
      window.location.reload();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: fileList && fileList[0] ? fileList[0] : null,
    }));
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      let hasDocuments = false;
      
      // Check if any documents are being uploaded
      Object.values(files).forEach(file => {
        if (file) hasDocuments = true;
      });
      
      // CASE 1: Documents are being uploaded by AGENT or MGA
      if (hasDocuments && showVerificationTab) {
        const docPayload = new FormData();
        
        // Append document files
        Object.entries(files).forEach(([key, file]) => {
          if (file) {
            docPayload.append("documents", file);
          }
        });
        
        // Add validity dates if they exist
        if (formData.validUpto) {
          docPayload.append("validUpto", formData.validUpto);
        }
        if (formData.validUpto2) {
          docPayload.append("validUpto2", formData.validUpto2);
        }
        
        // Use the dedicated upload-documents endpoint
        // This properly sets documentsUploadedAt and verificationStatus to 'DRAFT'
        const result = await uploadDocuments(docPayload);
        
        if (result) {
          // Fetch updated verification status
          const status = await fetchStatus();
          if (status) {
            dispatch(setVerificationStatus(status));
          }
        }
      }
      
      // CASE 2: Only password is being updated (no documents)
      if (passwords.password && !hasDocuments) {
        const pwdPayload = new FormData();
        pwdPayload.append("password", passwords.password);
        pwdPayload.append("confirmPassword", passwords.confirmPassword);
        
        await updateProfile(pwdPayload);
      }
      
      // CASE 3: Both documents AND password (need to call both)
      if (hasDocuments && passwords.password) {
        const pwdPayload = new FormData();
        pwdPayload.append("password", passwords.password);
        pwdPayload.append("confirmPassword", passwords.confirmPassword);
        
        await updateProfile(pwdPayload);
      }
      
      // Reset local edit state
      setIsEditing(false);
      setFiles({ doc1: null, doc2: null, doc3: null });
      setPasswords({ password: "", confirmPassword: "" });
      
      // Refresh the profile data
      window.location.reload();
      
    } catch (err: any) {
      alert(`Error updating profile: ${err.message}`);
      console.error("Profile update error:", err);
    }
  };

  const handleUploadClick = () => {
    setActiveTab('profile');
    setIsEditing(true);
    // Scroll to document upload section
    setTimeout(() => {
      const element = document.getElementById('document-upload-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFileSize = (file: File) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB.toFixed(2);
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: null,
    }));
  };

  if (loading) return <p>Loading profile…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};
  const docs = [formData.docLink1, formData.docLink2, formData.docLink3].filter(
    Boolean
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-6 sm:p-6 bg-greyBg">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {isEditing ? "MODIFY USER" : "USER PROFILE"}
      </h2>

      {/* Request Verification Button */}
      {showRequestButton && !isEditing && (
        <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">
                Documents Ready for Verification
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                Your documents have been uploaded. Click the button below to submit them for admin verification.
              </p>
              <div className="mt-3">
                <button
                  onClick={handleRequestVerification}
                  disabled={requestingVerification}
                  className="px-4 py-2 bg-[#3a17c5] text-white rounded hover:bg-[#2d1299] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {requestingVerification ? 'Submitting...' : 'Request Verification'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      {formData?.verificationStatus === 'PENDING' && (
        <div className="border border-blue-300 bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-800">
              Verification Pending - Waiting for admin review
            </span>
          </div>
        </div>
      )}

      {formData?.verificationStatus === 'VERIFIED' && (
        <div className="border border-green-300 bg-green-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <span className="text-sm font-medium text-green-800">
                Verified ✓
              </span>
              {formData.verificationValidTill && (
                <span className="text-xs text-green-600 ml-2">
                  Valid until {new Date(formData.verificationValidTill).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tabs - Show only for AGENT and MGA users */}
      {showVerificationTab && (
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-[#3a17c5] text-[#3a17c5]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
              <UserIcon className="h-5 w-5" />
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`${
                activeTab === 'verification'
                  ? 'border-[#3a17c5] text-[#3a17c5]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
              <ShieldCheckIcon className="h-5 w-5" />
              Verification Status
            </button>
          </nav>
        </div>
      )}

      {/* Profile Tab Content */}
      {activeTab === 'profile' && (
        <>
          <div className="flex justify-end space-x-2 mb-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Discard Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Modify User
              </button>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="text-[#3a17c5] font-semibold mb-2">USER INFORMATION</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <input
                name="agentCode"
                value={formData.agentCode}
                disabled={!isEditing}
                className="border p-2 w-full bg-gray-100"
              />
              <input
                value={formData.firstName}
                disabled
                className="border p-2 w-full bg-gray-100"
              />
              <input
                value={formData.lastName}
                disabled
                className="border p-2 w-full bg-gray-100"
              />
              <input
                value={formData.email}
                disabled
                type="email"
                className="border p-2 w-full bg-gray-100"
              />
              <input
                value={formData.company}
                disabled
                className="border p-2 w-full bg-gray-100"
              />
              <select
                value={formData.userType}
                disabled
                className="border p-2 w-full bg-gray-100"
              >
                <option>ADMIN</option>
                <option>AGENT</option>
                <option>MGA</option>
                <option>READONLY</option>
              </select>
              <div className="flex items-center space-x-2">
                <span>Status:</span>
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {formData.status}
                </span>
              </div>
              <div className="flex flex-col">
                <label>Created At</label>
                <input
                  value={new Date(formData.createdAt).toLocaleString()}
                  disabled
                  className="border p-2 bg-gray-100"
                />
              </div>

              {formData.validUpto && (
                <div className="flex flex-col">
                  <label>Valid Upto</label>
                  <input
                    type="date"
                    value={formData.validUpto.slice(0, 10)}
                    disabled
                    className="border p-2 bg-gray-100"
                  />
                </div>
              )}

              {isEditing && (
                <>
                  <input
                    name="password"
                    type="password"
                    placeholder="New Password"
                    value={passwords.password}
                    onChange={handlePassChange}
                    className="border p-2 w-full"
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={passwords.confirmPassword}
                    onChange={handlePassChange}
                    className="border p-2 w-full"
                  />
                </>
              )}
            </div>

            {/* Document Upload Section - For verification */}
            {isEditing && showVerificationTab && (
              <div id="document-upload-section" className="mt-4 pt-4 border-t">
                <h4 className="text-[#3a17c5] font-semibold mb-2">VERIFICATION DOCUMENTS</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document 1 {!docs[0] && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      name="doc1"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document 2 (Optional)
                    </label>
                    <input
                      name="doc2"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document 3 (Optional)
                    </label>
                    <input
                      name="doc3"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="border p-2 w-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: PDF, JPG, JPEG, PNG (max 5MB each)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border border-inputBorder bg-white p-4 mb-4">
            <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
              User Permissions
            </h3>
            {Object.entries(currentUserPermissions).map(([key, allowed]) => (
              <label key={key} className="block text-gray-700 capitalize">
                <input
                  type="checkbox"
                  checked={allowed}
                  disabled
                  className="mr-2"
                />
                {key}
              </label>
            ))}
          </div>

          {formData.agentCodes?.length! > 0 && (
            <div className="border border-inputBorder bg-white p-4 mb-4">
              <h3 className="text-[#3a17c5] font-semibold mb-2">
                ASSIGNED AGENT CODES
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {formData.agentCodes!.map((code) => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="border border-inputBorder bg-white p-4 mb-4">
            <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
              Documents
            </h3>
            {docs.length > 0 ? (
              <ul className="space-y-2">
                {docs.map((link, idx) => {
                  if (!link) return null; 
                  const filename = link.split("/").pop();
                  return (
                    <li key={idx}>
                      <a
                        href={`${API_BASE}${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-secondary hover:underline"
                      >
                        <DocumentIcon className="h-5 w-5 text-text-primary" />
                        {filename}
                      </a>
                    </li>
                  );
                })}
                {isEditing && (
                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="doc1" className="text-sm">
                          Document 1
                        </label>
                        <label className="input-primary cursor-pointer">
                          Choose File
                          <input
                            name="doc1"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {files.doc1 && (
                          <div className="flex gap-2">
                            <p className="text-sm">
                              {files.doc1.name} - {handleFileSize(files.doc1)} MB
                            </p>
                            <MdCancel
                              size={18}
                              className="text-text-primary cursor-pointer"
                              onClick={() => handleRemoveFile("doc1")}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm">Document 1 Valid Upto</label>
                        <input
                          name="doc1"
                          type="date"
                          onChange={handleFileChange}
                          className="input-primary"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="doc2" className="text-sm">
                          Document 2
                        </label>
                        <label className="input-primary cursor-pointer">
                          Choose File
                          <input
                            name="doc2"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {files.doc2 && (
                          <div className="flex gap-2">
                            <p className="text-sm">
                              {files.doc2.name} - {handleFileSize(files.doc2)} MB
                            </p>
                            <MdCancel
                              size={18}
                              className="text-text-primary cursor-pointer"
                              onClick={() => handleRemoveFile("doc2")}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm">Document 2 Valid Upto</label>
                        <input
                          name="doc2"
                          type="date"
                          onChange={handleFileChange}
                          className="input-primary"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="doc1" className="text-sm">
                          Document 3
                        </label>
                        <label className="input-primary cursor-pointer">
                          Choose File
                          <input
                            name="doc3"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {files.doc3 && (
                          <div className="flex gap-2">
                            <p className="text-sm">
                              {files.doc3.name} - {handleFileSize(files.doc3)} MB
                            </p>
                            <MdCancel
                              size={18}
                              className="text-text-primary cursor-pointer"
                              onClick={() => handleRemoveFile("doc3")}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm">Document 3 Valid Upto</label>
                        <input
                          name="doc3"
                          type="date"
                          onChange={handleFileChange}
                          className="input-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            ) : (
              <p className="text-gray-500">No documents attached</p>
            )}
          </div>
        </>
      )}

      {/* Verification Tab Content */}
      {activeTab === 'verification' && showVerificationTab && (
        <VerificationTab 
          onUploadClick={handleUploadClick} 
          userType={formData.userType}
        />
      )}
    </div>
  );
}