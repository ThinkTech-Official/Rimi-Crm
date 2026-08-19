
import React, { useState, FormEvent } from 'react';
import { useUserUpload } from '../hooks/useUserUpload';

const UserUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [upload, { loading, message, error, skipped, messages }] = useUserUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await upload(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Upload Users
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Excel/CSV File
            </label>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Importing...' : 'Import'}
          </button>
          {message && <p className="text-green-600 text-center mt-2">{message}</p>}
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}

          {skipped > 0 && (
            <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm text-center">
              {skipped} row{skipped === 1 ? "" : "s"} were not imported. See below.
            </p>
          )}

          {messages.length > 0 && (
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-72 overflow-y-auto">
              {messages.map((m, idx) => {
                // Rows whose user WAS created but whose MGA/agent link did not
                // resolve are warnings, not failures — worth a different colour
                // so a linking problem is not mistaken for a lost user.
                const isWarning = m.error.startsWith("User created");
                return (
                  <div
                    key={idx}
                    className="flex gap-2 items-start px-3 py-2 text-sm"
                  >
                    <span
                      className={`shrink-0 font-mono text-xs px-1.5 py-0.5 rounded ${
                        isWarning
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      Row {m.row}
                    </span>
                    <span
                      className={isWarning ? "text-amber-800" : "text-red-700"}
                    >
                      {m.error}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserUpload;