import React from 'react';
import { XMarkIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface VerifyAgentModalProps {
  selectedAgent: {
    firstName: string;
    lastName: string;
    email: string;
    agentCode: string;
    userType?: string;
  };
  validityDate: string;
  verifying: boolean;
  onValidityDateChange: (date: string) => void;
  onVerifySubmit: () => void;
  onClose: () => void;
}

const VerifyAgentModal: React.FC<VerifyAgentModalProps> = ({
  selectedAgent,
  validityDate,
  verifying,
  onValidityDateChange,
  onVerifySubmit,
  onClose,
}) => {
  return (
    <div className='fixed flex h-full w-full inset-0 items-center justify-center z-50 bg-black/30 backdrop-blur-sm'>
      <div className='bg-white p-6 max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative mx-4'>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-text-secondary transition-colors cursor-pointer'
          aria-label='Close modal'
        >
          <XMarkIcon className='h-6 w-6' />
        </button>

        {/* Header */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-text-primary'>Verify Agent</h2>
          <p className='text-sm text-text-secondary mt-1'>
            Review the agent details and set the verification validity period
          </p>
        </div>

        {/* Content - Scrollable */}
        <div className='flex-1 overflow-y-auto space-y-6'>
          
          {/* Agent Details Card */}
          <div className='bg-greyBg border border-inputBorder rounded-sm p-5'>
            <div className='flex items-start gap-4'>
              <div className='bg-white rounded-full p-3 shadow-sm'>
                <UserCircleIcon className='h-8 w-8 text-[#2B00B7]' />
              </div>
              
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-text-primary mb-3 capitalize'>
                  {selectedAgent.firstName} {selectedAgent.lastName}
                </h3>
                
                <div className='space-y-2'>
                  <div className='flex items-start gap-2'>
                    <span className='text-text-secondary min-w-[90px]'>Email:</span>
                    <span className='text-text-primary font-medium break-all'>
                      {selectedAgent.email}
                    </span>
                  </div>
                  
                  <div className='flex items-start gap-2'>
                    <span className='text-text-secondary min-w-[90px]'>Agent Code:</span>
                    <span className='text-text-primary font-medium font-mono'>
                      {selectedAgent.agentCode}
                    </span>
                  </div>
                  
                  <div className='flex items-start gap-2'>
                    <span className='text-text-secondary min-w-[90px]'>User Type:</span>
                    <span className='text-text-primary font-medium'>
                      {selectedAgent.userType || "AGENT"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Validity Date Section */}
          <div>
            <label className='flex items-center gap-2 text-sm font-semibold text-text-primary mb-2'>
              <CalendarIcon className='h-5 w-5 text-[#2B00B7]' />
              Verification Valid Until
            </label>
            <p className='text-xs text-text-secondary mb-3'>
              Set the date until which this agent's verification will remain valid
            </p>
            <div className='relative w-full px-1'>
              <input
                type='date'
                value={validityDate}
                onChange={(e) => onValidityDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className='w-full bg-white border border-inputBorder px-4 py-2 sm:py-3 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary text-black/80 placeholder:text-black/50'
              />
            </div>
          </div>

          {/* Info Box */}
          <div className='bg-blue-50/50 border border-blue-200 rounded-sm p-4'>
            <p className='text-sm text-blue-800'>
              <span className='font-semibold'>Note:</span> Once verified, the agent will have access to all 
              features until the specified validity date. You can always update this later if needed.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className='flex gap-3 mt-6 pt-4 border-t border-gray-200'>
          <button
            onClick={onClose}
            className='flex-1 px-4 py-2.5 border border-inputBorder cursor-pointer hover:border-gray-700 transition-colors delay-100'
            disabled={verifying}
          >
            Cancel
          </button>
          <button
            onClick={onVerifySubmit}
            disabled={verifying || !validityDate}
            className='flex-1 px-4 py-2.5 bg-[#2B00B7] text-white hover:bg-[#2309A1] font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
          >
            {verifying ? (
              <span className='flex items-center justify-center gap-2'>
                <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify Agent'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAgentModal;