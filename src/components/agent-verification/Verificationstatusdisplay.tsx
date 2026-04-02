import { useEffect } from 'react';
import { useGetVerificationStatus } from '../../hooks/agent-verification/useGetVerificationStatus';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationCircleIcon, 
  XCircleIcon,
  DocumentIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../../context/LanguageContext';
import { formatDate } from '../../utils/dateUtils';

export default function VerificationStatusDisplay() {
  const { t } = useLanguage();
  const { data: status, loading, fetchStatus } = useGetVerificationStatus();

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  const getStatusDisplay = () => {
    switch (status.verificationStatus) {
      case 'VERIFIED':
        return {
          icon: CheckCircleIcon,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: t('Verified'),
          message: t('Your account is verified and active.')
        };
      case 'PENDING':
        return {
          icon: ClockIcon,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: t('Verification Pending'),
          message: t('Your documents are under review. You will be notified once verified.')
        };
      case 'REJECTED':
        return {
          icon: XCircleIcon,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: t('Verification Rejected'),
          message: t('Your verification was rejected. Please upload new documents.')
        };
      case 'EXPIRED':
        return {
          icon: ExclamationCircleIcon,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          title: t('Verification Expired'),
          message: t('Your verification has expired. Please upload new documents.')
        };
      case 'NOT_UPLOADED':
        return {
          icon: DocumentIcon,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          title: t('Documents Not Uploaded'),
          message: status.isImportedAgent 
            ? t('Please upload verification documents before March 1st, 2026.')
            : t('Please upload your verification documents to activate your account.')
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();
  if (!statusDisplay) return null;

  const StatusIcon = statusDisplay.icon;

  return (
    <div className={`${statusDisplay.bgColor} ${statusDisplay.borderColor} border rounded-lg p-6`}>
      <div className="flex items-start space-x-4">
        <div className={`${statusDisplay.color} mt-1`}>
          <StatusIcon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${statusDisplay.color}`}>
            {statusDisplay.title}
          </h3>
          <p className="mt-1 text-gray-700">{statusDisplay.message}</p>
          
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            {status.documentsUploadedAt && (
              <div className="flex items-center space-x-2">
                <DocumentIcon className="h-4 w-4" />
                <span>
                  {t("Documents uploaded on")}: {formatDate(status.documentsUploadedAt)}
                </span>
              </div>
            )}
            
            {status.verifiedAt && (
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-4 w-4" />
                <span>
                  {t("Verified on")}: {formatDate(status.verifiedAt)}
                </span>
              </div>
            )}
            
            {status.verificationValidTill && (
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {t("Valid until")}: {formatDate(status.verificationValidTill)}
                </span>
              </div>
            )}

            {status.isImportedAgent && (
              <div className="mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {t("Imported Agent")}
                </span>
                {!status.documentsUploadedAt && (
                  <p className="mt-2 text-xs text-orange-600 font-medium">
                    ⚠️ {t("Document upload deadline")}: March 1, 2026
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Document Links */}
          {(status.docLink1 || status.docLink2 || status.docLink3) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">{t("Uploaded Documents")}:</p>
              <div className="flex space-x-2">
                {status.docLink1 && (
                  <a
                    href={status.docLink1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm"
                  >
                    <DocumentIcon className="h-4 w-4" />
                    <span>{t("Document 1")}</span>
                  </a>
                )}
                {status.docLink2 && (
                  <a
                    href={status.docLink2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm"
                  >
                    <DocumentIcon className="h-4 w-4" />
                    <span>{t("Document 2")}</span>
                  </a>
                )}
                {status.docLink3 && (
                  <a
                    href={status.docLink3}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm"
                  >
                    <DocumentIcon className="h-4 w-4" />
                    <span>{t("Document 3")}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}