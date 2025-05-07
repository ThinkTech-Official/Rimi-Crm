import React, { useState } from "react";
import { useImportSales, ImportSalesResult } from "../hooks/useImportSales";

const ImportSalesUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { upload, loading, error, data } = useImportSales();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) upload(file);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Import Sales Report</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={onFileChange}
            className="block w-full text-sm text-gray-700
                       file:mr-4 file:py-2 file:px-4
                       file:border file:border-gray-300
                       file:rounded file:text-sm file:font-semibold
                       file:bg-gray-50 file:text-gray-700
                       hover:file:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 
                     text-white font-semibold py-2 px-4 rounded
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading…" : "Upload CSV"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600">
          <p>Error: {error}</p>
        </div>
      )}

      {data && (
        <div className="mt-6 space-y-2">
          <p>
            ✅ <strong>{data.createdPolicies}</strong> new policies created
          </p>
          <p>
            ✏️ <strong>{data.updatedPolicies}</strong> existing policies updated
          </p>
          <p>
            💰 <strong>{data.createdPayments}</strong> payments recorded
          </p>
          <p>
            ⚠️ <strong>{data.skipped}</strong> groups skipped
          </p>

          {data.errors.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold">Errors</h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {data.errors.map((e, i) => (
                  <li key={i}>
                    <code>{e.policyNumber}</code>: {e.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImportSalesUpload;