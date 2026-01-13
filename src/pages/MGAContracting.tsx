import React from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdDescription, MdArrowBack } from "react-icons/md";

const MGAContracting: React.FC = () => {
  const navigate = useNavigate();

  const requirements = [
    "Valid Insurance License",
    "Errors and Omissions Insurance Confirmation",
    "Void Cheque/ Bank Details",
    "Signed RIMI AGA Agreement",
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg border border-gray-100 p-6 sm:p-10 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
        >
          <MdArrowBack size={18} />
          Back
        </button>

        <div className="flex flex-col items-center">
          <img
            src="/rimi_en.png"
            alt="RIMI Logo"
            className="h-12 w-auto mb-6"
          />

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-5">
            MGA Contracting Registration
          </h1>

          <div className="bg-blue-50 border-l-4 border-primary p-5 mb-6 w-full">
            <div className="flex items-start gap-3">
              <MdEmail className="text-primary text-xl mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-800 font-medium mb-0.5 text-sm">
                  For new MGA contracting registrations, please contact:
                </p>
                <a
                //   href="mailto:agentcontracting@rimiconsulting.com"
                  className="text-lg font-bold text-primary hover:underline"
                >
                  agentcontracting@rimiconsulting.com
                </a>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
              <MdDescription className="text-primary" />
              Required Information
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Please include the following documents in your email:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 font-medium shadow-sm text-sm"
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full border border-gray-200 text-primary font-bold text-xs shrink-0">
                    {index + 1}
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center border-t border-gray-100 pt-6 w-full">
            <p className="text-xs text-gray-500 leading-relaxed">
              Our contracting team will review your information and get back to
              you within 2-3 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MGAContracting;
