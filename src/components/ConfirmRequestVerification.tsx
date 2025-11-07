import { useDispatch } from "react-redux";
import { useRequestVerification } from "../hooks/agent-verification/useRequestVerification";
import { setVerificationStatus } from "../features/verificationSlice";
import { useGetVerificationStatus } from "../hooks/agent-verification/useGetVerificationStatus";
import useNotification from "../hooks/useNotification";

const ConfirmRequestVerification = ({
  setShowRequestVerification,
}: {
  setShowRequestVerification: (val: boolean) => void;
}) => {
  const { requestVerification, loading: requestingVerification } =
    useRequestVerification();
  const { fetchStatus } = useGetVerificationStatus();
  const dispatch = useDispatch();
  const {NotificationComponent, triggerNotification} = useNotification();
  const handleClose = () => setShowRequestVerification(false);
  const handleConfirm = async () => {
    try {
      const result = await requestVerification();
      triggerNotification({ type: "success", message: result.message || "Verification request submitted successfully!" });

      // Refresh verification status
      const status = await fetchStatus();
      if (status) {
        dispatch(setVerificationStatus(status));
      }

      // Refresh profile to update status
      window.location.reload();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
      <div className="bg-white shadow-xl max-w-lg w-full mx-4">
        <div className="border-b border-inputBorder px-6 py-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Confirm Request
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <p className="text-left text-text-secondary mb-8">
            Are you sure you want to submit your documents for verification?
            Make sure all documents are correct?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="py-2 px-4 border border-inputBorder hover:border-gray-700 cursor-pointer transition delay-100"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className={`btn-primary ${requestingVerification ? "Submitting" : ""}`} onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>
      {NotificationComponent}
    </div>
  );
};

export default ConfirmRequestVerification;
