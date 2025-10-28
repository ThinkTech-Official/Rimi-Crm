import React from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectVerificationStatus } from '../../features/verificationSlice';
import { useNavigate } from 'react-router-dom';
import { getUserTypeFromToken } from '../../utils/getUserType';

export default function VerificationBanner() {
  const verificationStatus = useSelector(selectVerificationStatus);
  const [dismissed, setDismissed] = React.useState(false);
  const navigate = useNavigate();
  const userType = getUserTypeFromToken()?.userType;

  // Only show for AGENT and MGA users
  if (!userType || !['AGENT', 'MGA'].includes(userType)) {
    return null;
  }

  // Don't show if dismissed or user is verified
  if (dismissed || !verificationStatus) {
    return null;
  }

  // Check if user needs to show banner
  const showBanner = 
    verificationStatus.verificationStatus === 'NOT_UPLOADED' ||
    verificationStatus.verificationStatus === 'PENDING' ||
    verificationStatus.verificationStatus === 'REJECTED' ||
    verificationStatus.verificationStatus === 'EXPIRED' ||
    (verificationStatus.isImportedAgent && !verificationStatus.documentsUploadedAt);

  if (!showBanner) {
    return null;
  }

  const getWarningMessage = () => {
    if (verificationStatus.isImportedAgent && !verificationStatus.documentsUploadedAt) {
      return 'Important: Verification documents must be uploaded before March 1st, 2026 to continue using the platform.';
    }

    switch (verificationStatus.verificationStatus) {
      case 'NOT_UPLOADED':
        return 'Please upload your verification documents to access all features.';
      case 'PENDING':
        return 'Your verification documents are under review. You will be notified once verified.';
      case 'REJECTED':
        return 'Your verification was rejected. Please upload new documents for review.';
      case 'EXPIRED':
        const expiredDate = verificationStatus.verificationValidTill 
          ? new Date(verificationStatus.verificationValidTill).toLocaleDateString()
          : 'recently';
        return `Your verification expired on ${expiredDate}. Please upload new documents.`;
      default:
        return '';
    }
  };

  const showUploadButton = 
    verificationStatus.verificationStatus === 'NOT_UPLOADED' ||
    verificationStatus.verificationStatus === 'REJECTED' ||
    verificationStatus.verificationStatus === 'EXPIRED' ||
    (verificationStatus.isImportedAgent && !verificationStatus.documentsUploadedAt);

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 relative">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
            <p className="text-sm text-yellow-800 font-medium mr-4">
              {getWarningMessage()}
            </p>
            {showUploadButton && (
              <button
                onClick={() => navigate('/profile')}
                className="bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-yellow-700 transition-colors whitespace-nowrap"
              >
                Upload Documents
              </button>
            )}
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-md hover:bg-yellow-100 ml-2"
          >
            <XMarkIcon className="h-4 w-4 text-yellow-600" />
          </button>
        </div>
      </div>
    </div>
  );
}