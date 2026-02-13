import { MdClose } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';

interface ValidationErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

const ValidationErrorModal: React.FC<ValidationErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'error',
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const iconColors = {
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  const bgColors = {
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50',
  };

  const borderColors = {
    error: 'border-red-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200',
  };

  const icons = {
    error: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    warning: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 h-screen">
      <div className="bg-white shadow-xl max-w-md w-full mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-inputBorder px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-black">
            {t(title)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <div className={`flex-shrink-0 mt-1 ${iconColors[type]}`}>
              {icons[type]}
            </div>

            {/* Message */}
            <div className="flex-1">
              <div className={`${bgColors[type]} ${borderColors[type]} border p-3`}>
                <p className="text-sm text-gray-700">
                  {t(message)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-end gap-3 border-t border-inputBorder">
          <button
            onClick={onClose}
            className="btn-primary px-8"
          >
            {t("OK")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationErrorModal;
