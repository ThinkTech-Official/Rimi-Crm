// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useGetVerificationStatus } from '../../hooks/agent-verification/useGetVerificationStatus';
// import { setVerificationStatus, selectVerificationStatus } from '../../features/verificationSlice';
// import VerificationStatus from './VerificationStatus';
// import { ShieldCheckIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';

// interface VerificationTabProps {
//   onUploadClick: () => void;
//   userType: string;
// }

// export default function VerificationTab({ onUploadClick, userType }: VerificationTabProps) {
//   const dispatch = useDispatch();
//   const verificationStatus = useSelector(selectVerificationStatus);
//   const { data, fetchStatus } = useGetVerificationStatus();

//   useEffect(() => {
//     // Fetch verification status on mount and update Redux
//     fetchStatus().then((result) => {
//       if (result) {
//         dispatch(setVerificationStatus(result));
//       }
//     });
//   }, [fetchStatus, dispatch]);

//   // Refresh status after document upload (you can call this from parent)
//   const refreshStatus = async () => {
//     const result = await fetchStatus();
//     if (result) {
//       dispatch(setVerificationStatus(result));
//     }
//   };

//   const needsUpload = 
//     !verificationStatus || 
//     verificationStatus.verificationStatus === 'NOT_UPLOADED' ||
//     verificationStatus.verificationStatus === 'REJECTED' ||
//     verificationStatus.verificationStatus === 'EXPIRED';

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <ShieldCheckIcon className="h-6 w-6 text-[#3a17c5]" />
//           <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
//         </div>
//         {needsUpload && (
//           <button
//             onClick={onUploadClick}
//             className="flex items-center space-x-2 bg-[#3a17c5] text-white px-4 py-2 rounded hover:bg-[#2B00B7] transition-colors"
//           >
//             <DocumentArrowUpIcon className="h-5 w-5" />
//             <span>Upload Documents</span>
//           </button>
//         )}
//       </div>

//       {/* Status Display */}
//       <VerificationStatus />

//       {/* Information Box */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <h4 className="text-sm font-medium text-blue-900 mb-2">Verification Information</h4>
//         <ul className="text-sm text-blue-700 space-y-1">
//           <li>• Upload up to 3 documents for verification</li>
//           <li>• Supported formats: PDF, JPG, JPEG, PNG (max 5MB each)</li>
//           <li>• Verification is required to access product features</li>
//           <li>• Admin will review and approve your documents</li>
//           {verificationStatus?.isImportedAgent && (
//             <li className="font-medium text-orange-700">
//               • As an imported agent, documents must be uploaded before March 1, 2026
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Upload Instructions */}
//       {needsUpload && (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//           <h4 className="text-sm font-medium text-gray-900 mb-2">How to Upload Documents</h4>
//           <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
//             <li>Click the "Modify User" button above</li>
//             <li>Scroll to the document upload section</li>
//             <li>Select your verification documents (doc1, doc2, doc3)</li>
//             <li>Click "Save Changes" to submit for review</li>
//             <li>Wait for admin approval</li>
//           </ol>
//         </div>
//       )}
//     </div>
//   );
// }


// =======================================================


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetVerificationStatus } from '../../hooks/agent-verification/useGetVerificationStatus';
import { useRequestVerification } from '../../hooks/agent-verification/useRequestVerification';
import { setVerificationStatus, selectVerificationStatus } from '../../features/verificationSlice';
import { 
  ShieldCheckIcon, 
  DocumentArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { API_BASE } from '../../utils/urls';

interface VerificationTabProps {
  onUploadClick: () => void;
  userType: string;
}

export default function VerificationTab({ onUploadClick, userType }: VerificationTabProps) {
  const dispatch = useDispatch();
  const verificationStatus = useSelector(selectVerificationStatus);
  const { data, fetchStatus } = useGetVerificationStatus();
  const { requestVerification, loading: requesting } = useRequestVerification();

  useEffect(() => {
    // Fetch verification status on mount and update Redux
    fetchStatus().then((result) => {
      if (result) {
        dispatch(setVerificationStatus(result));
      }
    });
  }, [fetchStatus, dispatch]);

  // Refresh status after document upload or request
  const refreshStatus = async () => {
    const result = await fetchStatus();
    if (result) {
      dispatch(setVerificationStatus(result));
    }
  };

  const handleRequestVerification = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to submit your documents for verification? Make sure all documents are correct.'
    );
    
    if (!confirmed) return;

    try {
      await requestVerification();
      alert('Verification request submitted successfully! Admin will review your documents.');
      // Refresh status to show PENDING state
      await refreshStatus();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const status = verificationStatus?.verificationStatus;
  const hasDocuments = verificationStatus?.docLink1 || verificationStatus?.docLink2 || verificationStatus?.docLink3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShieldCheckIcon className="h-6 w-6 text-[#3a17c5]" />
          <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Status-based Content */}
      {renderStatusContent()}

      {/* Documents List (if any documents exist) */}
      {hasDocuments && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <DocumentIcon className="h-5 w-5" />
            Uploaded Documents
          </h4>
          <div className="space-y-2">
            {verificationStatus?.docLink1 && (
              <DocumentLink link={verificationStatus.docLink1} label="Document 1" />
            )}
            {verificationStatus?.docLink2 && (
              <DocumentLink link={verificationStatus.docLink2} label="Document 2" />
            )}
            {verificationStatus?.docLink3 && (
              <DocumentLink link={verificationStatus.docLink3} label="Document 3" />
            )}
          </div>
        </div>
      )}

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Verification Information</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Upload up to 3 documents for verification</li>
          <li>• Supported formats: PDF, JPG, JPEG, PNG (max 5MB each)</li>
          <li>• Review your documents before requesting verification</li>
          <li>• Admin will review and approve your documents</li>
          {verificationStatus?.isImportedAgent && (
            <li className="font-medium text-orange-700">
              • As an imported agent, documents must be uploaded before March 1, 2026
            </li>
          )}
        </ul>
      </div>
    </div>
  );

  // Render different content based on status
  function renderStatusContent() {
    // NO DOCUMENTS uploaded yet
    if (!hasDocuments) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <DocumentArrowUpIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-900">No Documents Uploaded</h4>
              <p className="mt-2 text-sm text-gray-600">
                Please upload your verification documents to get started. You'll be able to review them before submitting for verification.
              </p>
              <button
                onClick={onUploadClick}
                className="mt-4 px-4 py-2 bg-[#3a17c5] text-white rounded hover:bg-[#2d1299] transition-colors"
              >
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      );
    }

    // DRAFT - Documents uploaded but not yet requested
    if (status === 'DRAFT' || !status) {
      return (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-yellow-900">Documents Ready for Verification</h4>
              <p className="mt-2 text-sm text-yellow-700">
                Your documents have been saved. Please review them carefully. When you're satisfied, click "Request Verification" to submit them for admin review.
              </p>
              {verificationStatus?.documentsUploadedAt && (
                <p className="mt-1 text-xs text-yellow-600">
                  Last uploaded: {new Date(verificationStatus.documentsUploadedAt).toLocaleString()}
                </p>
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={onUploadClick}
                  className="px-4 py-2 bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50 transition-colors delay-100 cursor-pointer"
                >
                  Edit Documents
                </button>
                <button
                  onClick={handleRequestVerification}
                  disabled={requesting}
                  className="px-4 py-2 bg-[#3a17c5] text-white hover:bg-[#2d1299] disabled:opacity-50 disabled:cursor-not-allowed transition-colors delay-100 cursor-pointer"
                >
                  {requesting ? 'Submitting...' : 'Request Verification'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // PENDING - Verification requested, waiting for admin
    if (status === 'PENDING') {
      return (
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-blue-900">Verification Pending</h4>
              <p className="mt-2 text-sm text-blue-700">
                Your documents have been submitted and are awaiting admin review. You'll be notified once the verification is complete.
              </p>
              {verificationStatus?.documentsUploadedAt && (
                <div className="mt-3 text-xs text-blue-600 space-y-1">
                  <p><strong>Uploaded:</strong> {new Date(verificationStatus.documentsUploadedAt).toLocaleString()}</p>
                  {/* Show requested time if available */}
                  {/* <p><strong>Requested:</strong> {new Date(verificationStatus.verificationRequestedAt).toLocaleString()}</p> */}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // VERIFIED - Successfully verified
    if (status === 'VERIFIED') {
      return (
        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-green-900">Verified ✓</h4>
              <p className="mt-2 text-sm text-green-700">
                Your account has been verified by the admin. You now have full access to all features.
              </p>
              <div className="mt-3 text-sm text-green-600 space-y-1">
                {verificationStatus?.verifiedAt && (
                  <p><strong>Verified on:</strong> {new Date(verificationStatus.verifiedAt).toLocaleDateString()}</p>
                )}
                {verificationStatus?.verificationValidTill && (
                  <p><strong>Valid until:</strong> {new Date(verificationStatus.verificationValidTill).toLocaleDateString()}</p>
                )}
                {verificationStatus?.verifiedBy && (
                  <p className="text-xs text-green-500">Verified by: {verificationStatus.verifiedBy}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // REJECTED - Verification rejected
    if (status === 'REJECTED') {
      return (
        <div className="bg-red-50 border border-red-300 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-red-900">Verification Rejected</h4>
              <p className="mt-2 text-sm text-red-700">
                Your verification request was not approved. Please upload correct documents and try again.
              </p>
              <button
                onClick={onUploadClick}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Upload New Documents
              </button>
            </div>
          </div>
        </div>
      );
    }

    // EXPIRED - Verification expired
    if (status === 'EXPIRED') {
      return (
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-orange-900">Verification Expired</h4>
              <p className="mt-2 text-sm text-orange-700">
                Your verification has expired. Please upload new documents to renew your verification.
              </p>
              {verificationStatus?.verificationValidTill && (
                <p className="mt-1 text-xs text-orange-600">
                  Expired on: {new Date(verificationStatus.verificationValidTill).toLocaleDateString()}
                </p>
              )}
              <button
                onClick={onUploadClick}
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Upload New Documents
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-sm text-gray-600">Loading verification status...</p>
      </div>
    );
  }
}

// Status Badge Component
function StatusBadge({ status }: { status?: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    DRAFT: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Draft' },
    PENDING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pending Review' },
    VERIFIED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Verified' },
    REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
    EXPIRED: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Expired' },
  };

  const badge = status ? config[status] : { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Not Uploaded' };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
      {badge.label}
    </span>
  );
}

// Document Link Component
function DocumentLink({ link, label }: { link: string; label: string }) {
  const filename = link.split('/').pop();
  return (
    <a
      href={`${API_BASE}${link}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-600 hover:underline text-sm p-2 hover:bg-blue-50 rounded transition-colors"
    >
      <DocumentIcon className="h-4 w-4 flex-shrink-0" />
      <span className="truncate">{label}: {filename}</span>
    </a>
  );
}