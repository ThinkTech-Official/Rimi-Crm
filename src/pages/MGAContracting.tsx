import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdDescription,
  MdOutlineMail,
  MdOutlineMailOutline,
} from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";

const MGAContracting: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const requirements = [
    { title: "Valid Insurance License" },
    { title: "Errors and Omissions Insurance Confirmation" },
    { title: "Void Cheque / Bank Details" },
    { title: "Signed RIMI AGA Agreement" },
  ];

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-white flex overflow-hidden">
      {/* ===== LEFT COLUMN - SIDEBAR ===== */}
      <div className="hidden lg:flex w-[40%] bg-[#E8EEFB] flex-col p-12 relative overflow-hidden">
        <div className="relative z-10 mt-12 font-[inter]">
          <h1 className="text-4xl font-bold text-[#1B1B1B] mb-2">
            Rimi Insurance
          </h1>
          <p className="text-[#4A4A4A] max-w-sm capitalize text-base">
           welcome to RIMI  travel insurance portal
          </p>
        </div>

        {/* Umbrella Image */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          <img
            src="/Umbrella.png"
            alt="Umbrella"
            className="w-[80%] h-auto object-contain transform translate-y-12"
          />
        </div>
      </div>

      {/* ===== RIGHT COLUMN - CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Nav Buttons */}
        <div className="p-6 flex justify-end gap-3">
          <button
            onClick={() => navigate("/apply")}
            className="px-6 py-2 border border-[#2B00B7] text-[#2B00B7] font-medium text-sm transition-colors cursor-pointer"
          >
            Apply as agent
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn-primary w-[150px] py-2 font-medium text-sm cursor-pointer"
          >
            Sign in
          </button>
        </div>

        <div className="w-full flex-1 flex flex-col items-center px-6 py-4 sm:py-10 sm:px-16">
          <div className="w-full max-w-2xl flex flex-col items-center lg:items-start">
            <img
              src="/rimi_en.png"
              alt="RIMI Logo"
              className="h-12 w-24 md:h-16 md:w-36 mb-4 md:mb-10"
            />

            <h1 className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-8 text-center lg:text-left">
              MGA Contracting Registration
            </h1>

            {/* Email Info Box */}
            <div className="bg-[#EFF6FF] p-4 mb-6 w-full flex flex-col gap-1">
              <p className="text-[#232323]">
                For new MGA contracting registrations, please contact:
              </p>
              <a
                href="mailto:agentcontracting@rimiconsulting.com"
                className="text-[#2B00B7] text-lg flex items-center gap-2 hover:underline"
              >
                <MdOutlineMailOutline size={20} />
                agentcontracting@rimiconsulting.com
              </a>
            </div>

            {/* Requirements Section */}
            <div className="w-full">
              <h2 className="text-lg font-bold text-[#1B1B1B] mb-2">
                Required Information
              </h2>
              <p className="text-text-secondary mb-6">
                Please include the following documents in your email:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md shadow-sm h-20"
                  >
                    <span className="flex items-center justify-center w-8 h-8 bg-white border border-[#E5E7EB] rounded-full text-[#1B1B1B] font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-text-primary">{req.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MGAContracting;
