// import React, { useState } from "react";

// interface MonthlyCatchUpModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (signedAmount: number) => void;
//   catchUpAmount: number; // signed: negative = charge, positive = refund
//   oldMonthly: number;
//   newMonthly: number;
//   paidRegularCount: number;
//   loading?: boolean;
// }

// const MonthlyCatchUpModal: React.FC<MonthlyCatchUpModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   catchUpAmount,
//   oldMonthly,
//   newMonthly,
//   paidRegularCount,
//   loading,
// }) => {
//   const [typedAmount, setTypedAmount] = useState("");

//   if (!isOpen) return null;

//   const absAmount = Math.abs(catchUpAmount);
//   const isCharge = catchUpAmount < 0;
//   const delta = Math.abs(newMonthly - oldMonthly);
//   const bookendDelta = 2 * delta;
//   const installmentDelta = paidRegularCount * delta;
//   const expectedInput = absAmount.toFixed(2);
//   const isConfirmEnabled = typedAmount.trim() === expectedInput && !loading;

//   const handleClose = () => {
//     setTypedAmount("");
//     onClose();
//   };

//   const handleConfirm = () => {
//     if (!isConfirmEnabled) return;
//     setTypedAmount("");
//     onConfirm(catchUpAmount);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
//         <h2 className="text-lg font-semibold mb-4">
//           Monthly Rate Change — Catch-Up {isCharge ? "Charge" : "Refund"}
//         </h2>

//         <div className="space-y-3 mb-6">
//           <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Old monthly rate</span>
//               <span className="font-medium">CAD {oldMonthly.toFixed(2)}/month</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">New monthly rate</span>
//               <span className="font-medium">CAD {newMonthly.toFixed(2)}/month</span>
//             </div>
//             <hr />
//             <div className="flex justify-between">
//               <span className="text-gray-600">
//                 Bookend adjustment (2 × CAD {delta.toFixed(2)})
//               </span>
//               <span className="font-medium">CAD {bookendDelta.toFixed(2)}</span>
//             </div>
//             {paidRegularCount > 0 && (
//               <div className="flex justify-between">
//                 <span className="text-gray-600">
//                   {paidRegularCount} paid installment(s) × CAD {delta.toFixed(2)}
//                 </span>
//                 <span className="font-medium">CAD {installmentDelta.toFixed(2)}</span>
//               </div>
//             )}
//             <hr />
//             <div className="flex justify-between font-semibold">
//               <span>Total catch-up {isCharge ? "charge" : "refund"}</span>
//               <span className={isCharge ? "text-red-600" : "text-green-600"}>
//                 CAD {absAmount.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           <p className="text-sm text-gray-700">
//             {isCharge
//               ? "This amount will be charged to the saved card on file."
//               : "This amount will be refunded to the original payment method."}
//           </p>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Type <strong>CAD {expectedInput}</strong> to confirm
//             </label>
//             <input
//               type="text"
//               value={typedAmount}
//               onChange={(e) => setTypedAmount(e.target.value)}
//               placeholder={expectedInput}
//               className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={handleClose}
//             disabled={loading}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             disabled={!isConfirmEnabled}
//             className={`px-4 py-2 rounded text-white text-sm font-medium ${
//               isConfirmEnabled
//                 ? isCharge
//                   ? "bg-red-600 hover:bg-red-700"
//                   : "bg-green-600 hover:bg-green-700"
//                 : "bg-gray-300 cursor-not-allowed"
//             }`}
//           >
//             {loading ? "Processing..." : `Confirm ${isCharge ? "Charge" : "Refund"}`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MonthlyCatchUpModal;

// ======================================



import React, { useState } from "react";

interface MonthlyCatchUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (signedAmount: number) => void;
  catchUpAmount: number;
  oldMonthly: number;
  newMonthly: number;
  paidRegularCount: number;
  loading?: boolean;
}

const MonthlyCatchUpModal: React.FC<MonthlyCatchUpModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  catchUpAmount,
  oldMonthly,
  newMonthly,
  paidRegularCount,
  loading,
}) => {
  const [typedAmount, setTypedAmount] = useState("");

  if (!isOpen) return null;

  const absAmount = Math.abs(catchUpAmount);
  const isCharge = catchUpAmount < 0;
  const delta = Math.abs(newMonthly - oldMonthly);
  const bookendDelta = 2 * delta;
  const installmentDelta = paidRegularCount * delta;
  const expectedInput = absAmount.toFixed(2);
  const isConfirmEnabled = typedAmount.trim() === expectedInput && !loading;

  const handleClose = () => {
    setTypedAmount("");
    onClose();
  };

  const handleConfirm = () => {
    if (!isConfirmEnabled) return;
    setTypedAmount("");
    onConfirm(catchUpAmount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-primary uppercase font-semibold text-base tracking-wide">
            Monthly Rate Change —{" "}
            {isCharge ? "Catch-Up Charge" : "Catch-Up Refund"}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Rate comparison table */}
          <div className="border border-gray-200 divide-y divide-gray-200 text-sm">
            <div className="flex justify-between px-4 py-2">
              <span className="text-gray-600">Old monthly rate</span>
              <span className="font-medium">
                {oldMonthly.toFixed(2)} cad / month
              </span>
            </div>
            <div className="flex justify-between px-4 py-2">
              <span className="text-gray-600">New monthly rate</span>
              <span className="font-medium">
                {newMonthly.toFixed(2)} cad / month
              </span>
            </div>
            <div className="flex justify-between px-4 py-2 bg-gray-50">
              <span className="text-gray-600">
                Bookend adjustment (2 × {delta.toFixed(2)} cad)
              </span>
              <span className="font-medium">{bookendDelta.toFixed(2)} cad</span>
            </div>
            {paidRegularCount > 0 && (
              <div className="flex justify-between px-4 py-2 bg-gray-50">
                <span className="text-gray-600">
                  {paidRegularCount} paid installment
                  {paidRegularCount > 1 ? "s" : ""} × {delta.toFixed(2)} cad
                </span>
                <span className="font-medium">
                  {installmentDelta.toFixed(2)} cad
                </span>
              </div>
            )}
            <div className="flex justify-between px-4 py-3">
              <span className="font-semibold">
                Total {isCharge ? "catch-up charge" : "catch-up refund"}
              </span>
              <span
                className={`font-semibold ${isCharge ? "text-red-600" : "text-green-600"}`}
              >
                {absAmount.toFixed(2)} cad
              </span>
            </div>
          </div>

          {/* Explanation */}
          <p className="text-sm text-gray-600">
            {isCharge
              ? "This amount will be charged to the saved card on file."
              : "This amount will be refunded to the original payment method."}
          </p>

          {/* Confirm input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type <strong>{expectedInput}</strong> to confirm
            </label>
            <input
              type="text"
              value={typedAmount}
              onChange={(e) => setTypedAmount(e.target.value)}
              placeholder={expectedInput}
              className="input-primary w-full"
              disabled={loading}
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
            className="bg-primary text-white py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-sm"
          >
            {loading
              ? "Processing..."
              : `Confirm ${isCharge ? "Charge" : "Refund"}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCatchUpModal;