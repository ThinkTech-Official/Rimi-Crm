import { CalendarIcon, DocumentIcon, ExclamationTriangleIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MgaOption } from "../../hooks/agent-verification/useMgaCodes";
import DatePicker from "../DatePicker";

interface VerificationModalProps {
  selectedAgent: any;
  adminAssignments: any;
  setAdminAssignments: any;
  agentCodeAvailability: any;
  handleCheckAgentCode: () => void;
  mgaSearch: string;
  setMgaSearch: (value: string) => void;
  mgas: MgaOption[]; // ✅ CHANGED from string[]
  mgasLoading: boolean;
  mgasError: string | null;
  validityDate: string;
  setValidityDate: (value: string) => void;
  verifying: boolean;
  handleVerifySubmit: () => void;
  onClose: () => void;
  openDocument: (url: string | null) => void;
}

export default function VerificationModal({
  selectedAgent,
  adminAssignments,
  setAdminAssignments,
  agentCodeAvailability,
  handleCheckAgentCode,
  mgaSearch,
  setMgaSearch,
  mgas,
  mgasLoading,
  mgasError,
  validityDate,
  setValidityDate,
  verifying,
  handleVerifySubmit,
  onClose,
  openDocument,
}: VerificationModalProps) {
  const needsAssignment = selectedAgent.agentCode?.startsWith('TEMP-') || !selectedAgent.commissionPercent;
  
  // Only need MGA assignment for "other" type, NOT for WFG
  const needsMgaAssignment = 
    selectedAgent.applicantType === 'under_mga' && 
    (selectedAgent.mgaType === 'other' || selectedAgent.mgaType === null);
    
  const isWfgAgent = selectedAgent.applicantType === 'wfg';

  return (
    <div className='fixed flex h-full w-full inset-0 items-center justify-center z-50 bg-black/30 backdrop-blur-sm'>
      <div className='bg-white p-3 sm:p-6 max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative mx-4'>
        
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
          <h2 className='text-lg sm:text-2xl font-bold text-text-primary'>Verify Agent</h2>
          <p className='text-sm text-text-secondary mt-1'>
            Review the agent details and set the verification validity period
          </p>
        </div>

        {/* Content - Scrollable */}
        <div className='flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar3'>
          
          {/* Agent Details Card */}
          <div className='shadow-sm border border-inputBorder p-3 sm:p-5'>
            <div className='flex items-start gap-4'>
              {/* <div className='bg-white rounded-full p-3 shadow-sm'>
                <UserCircleIcon className='h-8 w-8 text-[#2B00B7]' />
              </div> */}
              
              <div className='flex-1'>
                <div className="flex items-center gap-2 mb-3">
                  <span className='text-text-secondary min-w-[90px]'>Name:</span>
                    <span className='text-text-primary font-medium break-all'>
                      {selectedAgent.firstName} {selectedAgent.lastName}
                    </span>
                    {selectedAgent.applicantType === 'independent' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Independent
                        </span>
                    )}
                </div>
                
                <div className='space-y-2'>
                  <div className='flex items-start gap-2'>
                    <span className='text-text-secondary min-w-[90px]'>Email:</span>
                    <span className='text-text-primary font-medium break-all'>
                      {selectedAgent.email}
                    </span>
                  </div>
                  
                  <div className='flex items-start gap-2'>
                    <span className='text-text-secondary min-w-[90px]'>Agent Code:</span>
                    <div className="flex flex-col">
                        <span className='text-text-primary font-medium font-mono'>
                        {selectedAgent.agentCode}
                        </span>
                        {selectedAgent.agentCode?.startsWith('TEMP-') && (
                            <span className="text-xs text-yellow-600 font-medium">Temporary</span>
                        )}
                    </div>
                  </div>
                 <div className="flex items-start gap-2">
                   <p className="text-text-secondary min-w-[90px]">
                    Status:
              </p>
                 <span className="font-medium text-text-primary">{selectedAgent.status}</span>
                 </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-text-secondary min-w-[90px]'>User Type:</span>
                    <span className='text-text-primary font-medium'>
                      {selectedAgent.userType || "AGENT"}
                    </span>
                  </div>
                  
                  {selectedAgent.company && (
                    <div className='flex items-start gap-2'>
                        <span className='text-text-secondary min-w-[90px]'>Company:</span>
                        <span className='text-text-primary font-medium'>
                        {selectedAgent.company}
                        </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
             {/* Documents inside Details Card for cleaner look */}
             {(selectedAgent.docLink1 || selectedAgent.docLink2 || selectedAgent.docLink3) && (
                <div className="mt-4 pt-4">
                    <p className="text-base font-medium text-text-primary mb-2">Documents:</p>
                    <div className="flex flex-wrap gap-2">
                    {selectedAgent.docLink1 && (
                        <button
                        onClick={() => openDocument(selectedAgent.docLink1)}
                        className="flex items-center gap-1.5 text-xs font-medium bg-white border border-inputBorder hover:border-primary px-3 py-1.5 text-[#2B00B7] transition-colors duration-100 cursor-pointer"
                        >
                        <DocumentIcon className="h-4 w-4" />
                        Insurance License
                        </button>
                    )}
                    {selectedAgent.docLink2 && (
                        <button
                        onClick={() => openDocument(selectedAgent.docLink2)}
                        className="flex items-center gap-1.5 text-xs font-medium bg-white border border-inputBorder hover:border-primary px-3 py-1.5 text-[#2B00B7] transition-colors duration-100 cursor-pointer"
                        >
                        <DocumentIcon className="h-4 w-4" />
                        E&O Insurance
                        </button>
                    )}
                    {selectedAgent.docLink3 && (
                        <button
                        onClick={() => openDocument(selectedAgent.docLink3)}
                        className="flex items-center gap-1.5 text-xs font-medium bg-white border border-inputBorder hover:border-primary px-3 py-1.5 text-[#2B00B7] transition-colors duration-100 cursor-pointer"
                        >
                        <DocumentIcon className="h-4 w-4" />
                        Bank Details
                        </button>
                    )}
                    {selectedAgent.docLink4 && (
                        <button
                        onClick={() => openDocument(selectedAgent.docLink4)}
                        className="flex items-center gap-1.5 text-xs font-medium bg-white border border-inputBorder hover:border-primary px-3 py-1.5 text-[#2B00B7] transition-colors duration-100 cursor-pointer"
                        >
                        <DocumentIcon className="h-4 w-4" />
                        Agency Agreement
                        </button>
                    )}
                    </div>
                </div>
            )}
          </div>

           {selectedAgent.applicantType && (
                <div className="mt-2">
                  {selectedAgent.applicantType === 'independent' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Independent Agent
                    </span>
                  )}
                  {selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'wfg' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      WFG Agent
                    </span>
                  )}
                  {selectedAgent.applicantType === 'under_mga' && selectedAgent.mgaType === 'other' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Agent under MGA
                    </span>
                  )}
                </div>
              )}

          {/* WFG Warning */}
          {isWfgAgent && (
            <div className="bg-purple-50 border border-purple-200 p-3 sm:p-5">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-purple-900">
                    WFG Agent Verification
                  </p>
                  <p className="text-sm text-purple-700 mt-1">
                    <strong>WFG Code:</strong> <span className="font-mono bg-white px-2 py-0.5 rounded border border-purple-100">{selectedAgent.wfgCode}</span>
                  </p>
                  <p className="text-xs text-purple-600 mt-2">
                    Please verify this WFG code with WFG before approving this application.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Admin Assignment Section */}
          {needsAssignment && (
            <div className="bg-yellow-50/50 border border-yellow-100 p-3 sm:p-5">
              <div className="flex flex-col items-start gap-3 mb-4">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">
                    Admin Assignment Required
                  </p>
                  <p className="text-sm text-yellow-700">
                    This is a public registration. Please assign credentials before verification.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Agent Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adminAssignments.agentCode}
                      onChange={(e) => {
                        setAdminAssignments({
                          ...adminAssignments,
                          agentCode: e.target.value
                        });
                      }}
                      placeholder="Enter unique agent code"
                      className="w-full bg-white border border-inputBorder px-4 py-2 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary text-black/80 placeholder:text-black/50 text-[15px] sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={handleCheckAgentCode}
                      disabled={!adminAssignments.agentCode || agentCodeAvailability.status === 'checking' || agentCodeAvailability.lastChecked === adminAssignments.agentCode}
                      className={`px-3 transition ${
                        agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'available'
                          ? 'bg-green-700 text-white'
                          : agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === "taken"
                  ? "bg-red-200 hover:bg-red-300"
                  : "bg-primary hover:bg-indigo-700 text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      }`}
                    >
                      {agentCodeAvailability.status === 'checking' ? 'Checking...' : 
                       agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'available' ? 'Available' :
                       agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'taken' ? 'Taken' : 'Check'}
                    </button>
                  </div>
                  {agentCodeAvailability.lastChecked === adminAssignments.agentCode && agentCodeAvailability.status === 'taken' && (
                     <p className="text-red-500 text-sm mt-1">
                       Agent code already in use, please use another code
                     </p>
                  )}
                </div>

                {!isWfgAgent && (
                  <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Commission Percentage <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={adminAssignments.commissionPercent}
                      onChange={(e) => setAdminAssignments({
                        ...adminAssignments,
                        commissionPercent: e.target.value
                      })}
                      placeholder="e.g., 15.50"
                      className="w-full bg-white border border-inputBorder px-4 pr-8 py-2 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary text-black/80 placeholder:text-black/50 text-[15px] sm:text-base"
                    />
                    <span className="absolute right-3 top-2 text-text-secondary">%</span>
                  </div>
                </div>
                )}

                {/* MGA Assignment Search */}
                {needsMgaAssignment && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Assign to MGA <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={mgaSearch}
                      onChange={(e) => setMgaSearch(e.target.value)}
                      placeholder="Search MGA name or code..."
                      className="input-primary"
                    />
                    
                    {mgasLoading && <p className="text-xs text-text-secondary mt-1">Loading MGAs...</p>}
                    {mgasError && <p className="text-xs text-red-500 mt-1">{mgasError}</p>}
                    
                    {mgaSearch.length > 0 && (
                      mgas.length > 0 ? (
                        <div className="mt-2 max-h-32 overflow-y-auto border border-inputBorder bg-white">
                          {mgas.map((mga) => (
                            <label key={mga.id} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
                              <input
                                type="radio"
                                name="mgaSelection"
                                value={mga.id}  
                                checked={adminAssignments.mgaId === mga.id}  
                                onChange={(e) => setAdminAssignments({
                                  ...adminAssignments,
                                  mgaId: e.target.value
                                })}
                                className="mr-2 text-primary focus:ring-primary"
                              />
                              <span className="text-sm text-text-primary">
                                <span className="font-medium">{mga.agentCode}</span> - {mga.firstName} {mga.lastName} 
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : !mgasLoading && (
                        <p className="text-xs text-text-secondary mt-1">No MGAs found matching "{mgaSearch}"</p>
                      )
                    )}
                    
                    {adminAssignments.mgaId && (
                      <div className="mt-2 bg-green-50 border border-green-200 px-2 py-1 text-sm text-green-800">
                        <strong>Selected MGA:</strong>{' '}
                        {mgas.find(m => m.id === adminAssignments.mgaId)?.agentCode || adminAssignments.mgaId}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Validity Date Section */}
          {!isWfgAgent && (
            <div>
            <div className='flex items-center gap-2 mb-1'>
              <CalendarIcon className='h-5 w-5 text-[#2B00B7]' />
              <span className='text-sm font-semibold text-text-primary'>
                Verification Valid Until <span className="text-red-500">*</span>
              </span>
            </div>
            <p className='text-xs text-text-secondary mb-2'>
              Set the date until which this agent's verification will remain valid
            </p>
            <div className="ml-0.5">
              <DatePicker
              label=""
              value={validityDate}
              onChange={(date: Date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                setValidityDate(`${year}-${month}-${day}`);
              }}
              minDate={new Date()}
            />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  const baseDate = new Date();
                  baseDate.setFullYear(baseDate.getFullYear() + 1);
                  const year = baseDate.getFullYear();
                  const month = String(baseDate.getMonth() + 1).padStart(2, "0");
                  const day = String(baseDate.getDate()).padStart(2, "0");
                  setValidityDate(`${year}-${month}-${day}`);
                }}
                className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                + 1 Year
              </button>
              <button
                type="button"
                onClick={() => {
                  const baseDate = new Date();
                  baseDate.setFullYear(baseDate.getFullYear() + 5);
                  const year = baseDate.getFullYear();
                  const month = String(baseDate.getMonth() + 1).padStart(2, "0");
                  const day = String(baseDate.getDate()).padStart(2, "0");
                  setValidityDate(`${year}-${month}-${day}`);
                }}
                className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
              >
               + 5 Years
              </button>
            </div>
          </div>
          )}

          {/* Info Box */}
          <div className='bg-blue-50/50 border border-blue-200 p-3 sm:p-5 mb-2'>
            <p className='text-sm text-blue-800'>
              <span className='font-semibold'>Note:</span> Once verified, the agent will have access to all 
              features until the specified validity date. You can always update this later if needed.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className='flex gap-3 mt-6 pt-4'>
          <button
            onClick={onClose}
            className='w-full px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100'
            disabled={verifying}
          >
            Cancel
          </button>
          <button
            onClick={handleVerifySubmit}
            disabled={verifying || !validityDate}
            className='w-full btn-primary'
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
              'Verify & Activate'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}