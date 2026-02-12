import { useEffect, useState } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useGetVerificationStatus } from '../../hooks/agent-verification/useGetVerificationStatus';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface VerificationWarningBannerProps {
  userType: string | null;
}

export default function VerificationWarningBanner({ userType }: VerificationWarningBannerProps) {
  const { t } = useLanguage();
  const { data: verificationStatus, fetchStatus } = useGetVerificationStatus();
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === 'AGENT') {
      fetchStatus();
    }
  }, [userType, fetchStatus]);

  useEffect(() => {
    if (verificationStatus && !dismissed) {
      // Show banner for unverified agents or imported agents without documents
      if (verificationStatus.verificationStatus === 'NOT_UPLOADED' || 
          verificationStatus.verificationStatus === 'PENDING' ||
          verificationStatus.verificationStatus === 'REJECTED' ||
          verificationStatus.verificationStatus === 'EXPIRED' ||
          (verificationStatus.isImportedAgent && !verificationStatus.documentsUploadedAt)) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    }
  }, [verificationStatus, dismissed]);

  const handleUploadClick = () => {
    navigate('/profile?tab=verification');
  };

  const getWarningMessage = () => {
    if (!verificationStatus) return '';

    if (verificationStatus.isImportedAgent && !verificationStatus.documentsUploadedAt) {
      return t('Important: Verification documents must be uploaded before March 1st, 2026 to continue using the platform.');
    }

    switch (verificationStatus.verificationStatus) {
      case 'NOT_UPLOADED':
        return t('Please upload your verification documents to access all features.');
      case 'PENDING':
        return t('Your verification documents are under review. You will be notified once verified.');
      case 'REJECTED':
        return t('Your verification was rejected. Please upload new documents for review.');
      case 'EXPIRED':
        const expiredDate = verificationStatus.verificationValidTill 
          ? new Date(verificationStatus.verificationValidTill).toLocaleDateString()
          : t('recently');
        return `${t("Your verification expired on")} ${expiredDate}. ${t("Please upload new documents.")}`;
      default:
        return '';
    }
  };

  if (!showBanner || userType !== 'AGENT') {
    return null;
  }

  return (
    <div className="relative bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 pr-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800 font-medium">
                {getWarningMessage()}
              </p>
              {(verificationStatus?.verificationStatus === 'NOT_UPLOADED' || 
                verificationStatus?.verificationStatus === 'REJECTED' ||
                verificationStatus?.verificationStatus === 'EXPIRED' ||
                (verificationStatus?.isImportedAgent && !verificationStatus?.documentsUploadedAt)) && (
                <button
                  onClick={handleUploadClick}
                  className="ml-4 bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-yellow-700 transition-colors"
                >
                  {t("Upload Documents")}
                </button>
              )}
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-yellow-100"
            >
              <XMarkIcon className="h-4 w-4 text-yellow-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}