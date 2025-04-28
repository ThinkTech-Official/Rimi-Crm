import React, { ChangeEvent, useState } from 'react';
import { useImportQuotes } from '../hooks/useImportQuotes';

const QuoteUploader: React.FC = () => {
  const { importQuotes, loading, error, data } = useImportQuotes();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    importQuotes(selectedFile);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Quotes CSV</h2>

      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />

      <button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {error && (
        <div className="mt-4 text-red-600 text-center">
          Error: {error}
        </div>
      )}

      {data && (
        <div className="mt-4 text-green-600">
          <p className="font-medium mb-2">{data.message}</p>
          {data.errors.length > 0 && (
            <ul className="list-disc list-inside text-sm">
              {data.errors.map((err, idx) => (
                <li key={idx}>Row {err.row}: {err.error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteUploader;
