import React, { useState } from 'react';
import { useUploadDocuments } from '../../hooks/agent-verification/useUploadDocuments';
import { DocumentArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useNotification from '../../hooks/useNotification';
import { useLanguage } from '../../context/LanguageContext';

interface DocumentUploadProps {
  onSuccess?: () => void;
}

export default function DocumentUpload({ onSuccess }: DocumentUploadProps) {
  const { t } = useLanguage();
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    document1: null,
    document2: null,
    document3: null,
  });
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const { uploadDocuments, loading, error } = useUploadDocuments();
  const { triggerNotification, NotificationComponent } = useNotification();

  const handleFileChange = (key: string, file: File | null) => {
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        triggerNotification({ type: "error", message: t('File size must be less than 5MB') });
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        triggerNotification({ type: "error", message: t('Only PDF, JPG, JPEG, and PNG files are allowed') });
        return;
      }

      setFiles(prev => ({ ...prev, [key]: file }));
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({ ...prev, [key]: reader.result as string }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews(prev => ({ ...prev, [key]: '' }));
      }
    } else {
      setFiles(prev => ({ ...prev, [key]: null }));
      setPreviews(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleRemoveFile = (key: string) => {
    setFiles(prev => ({ ...prev, [key]: null }));
    setPreviews(prev => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one document is uploaded
    if (!files.document1 && !files.document2 && !files.document3) {
      triggerNotification({ type: "error", message: t('Please upload at least one document') });
      return;
    }

    const formData = new FormData();
    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);

    const result = await uploadDocuments(formData);
    if (result && onSuccess) {
      onSuccess();
      // Reset form
      setFiles({ document1: null, document2: null, document3: null });
      setPreviews({});
    }
  };

  const renderFileInput = (key: string, label: string, required: boolean = false) => {
    const file = files[key];
    const preview = previews[key];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {!file ? (
          <div className="relative">
            <input
              type="file"
              id={key}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(key, e.target.files?.[0] || null)}
              className="hidden"
            />
            <label
              htmlFor={key}
              className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            >
              <div className="flex flex-col items-center space-y-2">
                <DocumentArrowUpIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {t("Click to upload or drag and drop")}
                </span>
                <span className="text-xs text-gray-500">
                  {t("PDF, JPG, JPEG, PNG (Max 5MB)")}
                </span>
              </div>
            </label>
          </div>
        ) : (
          <div className="relative border rounded-lg p-4 bg-gray-50">
            <button
              type="button"
              onClick={() => handleRemoveFile(key)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-gray-100"
            >
              <XMarkIcon className="h-4 w-4 text-gray-600" />
            </button>
            
            {preview ? (
              <img 
                src={preview} 
                alt={`Preview ${label}`} 
                className="w-full h-32 object-contain"
              />
            ) : (
              <div className="flex items-center space-x-3">
                <DocumentArrowUpIcon className="h-10 w-10 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      {NotificationComponent}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{t("Upload Verification Documents")}</h2>
        <p className="mt-1 text-sm text-gray-600">
          {t("Please upload the required documents for account verification. At least one document is required.")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFileInput('document1', t('Document 1'), true)}
        {renderFileInput('document2', t('Document 2 (Optional)'))}
        {renderFileInput('document3', t('Document 3 (Optional)'))}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setFiles({ document1: null, document2: null, document3: null });
              setPreviews({});
            }}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {t("Clear All")}
          </button>
          <button
            type="submit"
            disabled={loading || (!files.document1 && !files.document2 && !files.document3)}
            className="px-6 py-2 text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('Uploading...') : t('Upload Documents')}
          </button>
        </div>
      </form>
      {NotificationComponent}
    </div>
  );
}