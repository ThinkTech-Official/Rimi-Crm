// ==============================================================

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../hooks/useNotification";
import {
  usePolicyDetail,
  PolicyDetail,
  PolicyApplicant,
} from "../hooks/usePolicyDetail";
import { usePolicyNotes } from "../hooks/usePolicyNotes";
import { usePolicyAttachments } from "../hooks/usePolicyAttachments";
import { useFulfillment } from "../hooks/useFulfillment";
import { usePolicyFeeRefund } from "../hooks/usePolicyFeeRefund";
import {
  useModifyPolicy,
  ModifyPolicyData,
  RefundData,
} from "../hooks/useModifyPolicy";
import { API_BASE } from "../utils/urls";
import CancellationModal from "../components/CancellationModal";
import { usePolicyActivity } from "../hooks/usePolicyActivity";
import { PolicyActivityTimeline } from "../components/PolicyActivityTimeline";
import RefundModal from "../components/RefundModal";
import PremiumChangeModal from "../components/PremiumChangeModal";
import ValidationErrorModal from "../components/ValidationErrorModal";
import { usePaymentSchedule } from "../hooks/usePaymentSchedule";
import { PaymentScheduleTable } from "../components/policy/PaymentScheduleTable";
import { UpdateCardModal } from "../components/UpdateCardModal";
import { PolicySplitModal } from "../components/policy/PolicySplitModal";
import { useRenewalNotice } from "../hooks/renewals/useRenewalNotice";
import RenewalNoticeModal from "../components/renewals/RenewalNoticeModal";
import SuccessModal from "../components/renewals/SuccessModal";
import SendRenewalConfirmationModal from "../components/renewals/SendRenewalConfirmationModal";
import UpdatePaymentMethodConfirmationModal from "../components/policy/UpdatePaymentMethodConfirmationModal";
import { MdClose, MdUploadFile } from "react-icons/md";
import { HealthQuestionnaireSection } from "./QuoteDetails";

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-CA") : "-";

const calcAge = (dob?: string, ref?: string) => {
  if (!dob || !ref) return "-";
  const d1 = new Date(dob);
  const d2 = new Date(ref);
  let age = d2.getFullYear() - d1.getFullYear();
  if (d2 < new Date(d1.setFullYear(d1.getFullYear() + age))) age--;
  return age;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

function getCoverageLength(
  effectiveDate: string,
  expiryDate: string
): number | string {
  const start = new Date(effectiveDate);
  const end = new Date(expiryDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "-";
  }

  const msInDay = 24 * 60 * 60 * 1000;
  const diffMs = end.getTime() - start.getTime();

  return Math.round(diffMs / msInDay);
}

const PolicyDetailsPage: React.FC = () => {
  const { triggerNotification, NotificationComponent } = useNotification();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: p, loading, error } = usePolicyDetail(id || null);

  const {
    notes,
    loading: notesLoading,
    error: notesError,
    addNote,
  } = usePolicyNotes(id!);
  const [newNote, setNewNote] = React.useState("");

  const [showSplitModal, setShowSplitModal] = useState(false);

  const {
    items: attachments,
    loading: attLoading,
    error: attError,
    add: addAttachment,
  } = usePolicyAttachments(id!);
  const [file, setFile] = React.useState<File | null>(null);
  const [desc, setDesc] = React.useState("");

  const {
    preview,
    loading: fulLoading,
    error: fulError,
    fetchPreview,
    sendMail,
  } = useFulfillment(id!);

  const [to, setTo] = useState(p?.email || "");
  const [cc, setCc] = useState("");
  const [agentEmail, setAgentEmail] = useState(p?.agentCode + "@example.com");

  const [showCancelModal, setShowCancelModal] = useState(false);

  // Card update
  const [showUpdateCardModal, setShowUpdateCardModal] = useState(false);

  const {
    loading: refundLoading,
    error: refundError,
    refundPolicyFee,
  } = usePolicyFeeRefund();

  const {
    activities,
    loading: activityLoading,
    error: activityError,
  } = usePolicyActivity(id!);

  const {
    data: paymentSchedule,
    loading: scheduleLoading,
    error: scheduleError,
  } = usePaymentSchedule(id || null);

  // MODIFY POLICY STATE

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPolicy, setEditedPolicy] = useState<Partial<PolicyDetail>>({});
  const [editedApplicants, setEditedApplicants] = useState<PolicyApplicant[]>(
    []
  );

  const {
    loading: modifyLoading,
    error: modifyError,
    modifyPolicy,
    calculateRefund,
  } = useModifyPolicy();

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundData, setRefundData] = useState<Partial<RefundData> | null>(
    null
  );

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState({
    title: "",
    message: "",
  });

  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSendConfirmationModal, setShowSendConfirmationModal] =
    useState(false);
  const [showUpdateCardConfirmModal, setShowUpdateCardConfirmModal] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Add the renewal notice hook
  const {
    sendRenewalNotice,
    loading: renewalLoading,
    error: renewalError,
  } = useRenewalNotice();

  useEffect(() => {
    if (!p) return;
    setTo(p.email || "");
    setAgentEmail(`${p.agentCode}@example.com`);
  }, [id, p?.email, p?.agentCode]);

  useEffect(() => {
    if (p?.applicants) {
      setEditedApplicants([...p.applicants]);
    }
  }, [p]);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (error) return <p className="text-red-600 text-center py-10">{error}</p>;
  if (!p) return <p className="text-center py-10">No policy found.</p>;

  const history = p.paymentHistory ?? [];

  // BUTTON VISIBILITY

  const canModify = p.status === "SOLD" || p.status === "ACTIVE";
  const canCancel = p.status !== "CANCELLED";

  // helper to check if policy can update card
  const canUpdateCard =
    p.paymentOption === "monthly-installments" &&
    p.status !== "CANCELLED" &&
    p.stripeSubscriptionScheduleId;

  // REnewal Handlers

  const handleViewRenewalNotice = () => {
    setShowRenewalModal(true);
  };

  const handleSendRenewalNotice = async () => {
    setShowSendConfirmationModal(true);
  };

  const confirmSendRenewalNotice = async () => {
    if (!id) return;

    const result = await sendRenewalNotice(id);

    if (result && result.success) {
      setSuccessMessage(result.message);
      setShowSendConfirmationModal(false);
      setShowSuccessModal(true);
    } else if (renewalError) {
      triggerNotification({ message: `Error: ${renewalError}`, type: "error" });
      setShowSendConfirmationModal(false);
    }
  };

  //

  // MODIFY POLICY HANDLERS

  const handleModifyClick = () => {
    setIsEditMode(true);
    setEditedPolicy({ ...p });
    setEditedApplicants([...p.applicants]);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedPolicy({});
    setEditedApplicants([]);
  };

  const handleFieldChange = (field: string, value: any) => {
    setEditedPolicy((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplicantChange = (index: number, field: string, value: any) => {
    setEditedApplicants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const calculateDays = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  const validateModification = (): {
    valid: boolean;
    error?: { title: string; message: string };
  } => {
    const effectiveDate =
      editedPolicy.effectiveDate || p.effectiveDate!.toString();
    const expiryDate = editedPolicy.expiryDate || p.expiryDate!.toString();
    const today = new Date().toISOString().split("T")[0];

    //  Effective date validation
    if (p.status === "SOLD" && editedPolicy.effectiveDate) {
      if (editedPolicy.effectiveDate < today) {
        return {
          valid: false,
          error: {
            title: "Invalid Effective Date",
            message: "Effective date cannot be in the past.",
          },
        };
      }
    }

    if (
      p.status === "ACTIVE" &&
      editedPolicy.effectiveDate &&
      editedPolicy.effectiveDate !== p.effectiveDate!.toString()
    ) {
      return {
        valid: false,
        error: {
          title: "Cannot Modify Effective Date",
          message: "Cannot change effective date for active policies.",
        },
      };
    }

    //  Expiry date validation
    if (expiryDate <= effectiveDate) {
      return {
        valid: false,
        error: {
          title: "Invalid Expiry Date",
          message: "Expiry date must be after effective date.",
        },
      };
    }

    if (p.status === "ACTIVE" && editedPolicy.expiryDate) {
      if (editedPolicy.expiryDate > p.expiryDate!.toString()) {
        return {
          valid: false,
          error: {
            title: "Cannot Extend Coverage",
            message:
              "Cannot extend coverage for active policies. Only early return is allowed.",
          },
        };
      }
    }

    // Rule V3: Super Visa check
    const newCoverageLength = calculateDays(effectiveDate, expiryDate);
    const superVisaStatus =
      editedPolicy.applicantOnSuperVisa || p.applicantOnSuperVisa;

    if (
      (superVisaStatus === "YES" || superVisaStatus === "yes") &&
      newCoverageLength < 365
    ) {
      return {
        valid: false,
        error: {
          title: "Super Visa Validation Error",
          message: `This policy is marked as Super Visa but coverage is only ${newCoverageLength} days (less than 365). Please change "Are Applicants Travelling on a Super Visa?" to "No" in Coverage Details section before saving.`,
        },
      };
    }

    return { valid: true };
  };

  const handleSaveChanges = async () => {
    // Validate
    const validation = validateModification();
    if (!validation.valid && validation.error) {
      setValidationMessage(validation.error);
      setShowValidationModal(true);
      return;
    }

    const effectiveDate =
      editedPolicy.effectiveDate || fmtDate(p.effectiveDate?.toString());
    const expiryDate =
      editedPolicy.expiryDate || fmtDate(p.expiryDate?.toString());
    const originalExpiryDate = fmtDate(p.expiryDate?.toString());

    // Check if dates changed
    const datesChanged = expiryDate !== originalExpiryDate;

    if (datesChanged) {
      // Check for early return (refund scenario)
      if (expiryDate < originalExpiryDate) {
        // Calculate refund
        const refundCalc = await calculateRefund(
          id!,
          originalExpiryDate,
          expiryDate,
          p.premium || 0,
          parseInt(p.covLen || "365")
        );

        if (refundCalc) {
          setRefundData({
            originalExpiryDate,
            newExpiryDate: expiryDate,
            ...refundCalc,
          });
          setShowRefundModal(true);
          return;
        }
      }

      // TODO
      // Check for premium increase (age bracket change)
      // This requires calling the premium calculation API
      // For now, proceed with save
    }

    // Save without refund
    await performSave();
  };

  const performSave = async (refund?: RefundData) => {
    const modifyData: ModifyPolicyData = {
      language: editedPolicy.language || p.language || "",
      firstName: editedPolicy.firstName || p.firstName || "",
      lastName: editedPolicy.lastName || p.lastName || "",
      dateOfBirth:
        p.status === "SOLD"
          ? editedPolicy.dateOfBirth || fmtDate(p.dateOfBirth?.toString())
          : undefined,
      gender: editedPolicy.gender || p.gender,
      email: editedPolicy.email || p.email!,
      additionalEmail:
        (editedPolicy.additionalEmail ?? p.additionalEmail ?? "").trim() ||
        undefined,
      phoneNumber: editedPolicy.phoneNumber || p.phoneNumber,
      street: editedPolicy.street || p.street!,
      street2: editedPolicy.street2 || p.street2,
      city: editedPolicy.city || p.city!,
      province: editedPolicy.province || p.province!,
      countryCode: editedPolicy.countryCode || p.countryCode!,
      postalCode: editedPolicy.postalCode || p.postalCode!,
      effectiveDate:
        p.status === "SOLD"
          ? editedPolicy.effectiveDate || fmtDate(p.effectiveDate?.toString())
          : undefined,
      expiryDate: editedPolicy.expiryDate || fmtDate(p.expiryDate?.toString()),
      destination: editedPolicy.destination || p.destination!,
      deductible: editedPolicy.deductible || p.deductible!,
      applicantOnSuperVisa:
        editedPolicy.applicantOnSuperVisa || p.applicantOnSuperVisa,
      applicants: editedApplicants.map((a) => ({
        id: a.id,
        firstName: a.firstName,
        lastName: a.lastName,
        dateOfBirth:
          p.status === "SOLD" ? fmtDate(a.dateOfBirth?.toString()) : undefined,
        gender: a.gender,
        email: a.email,
        province: a.province,
        relation: a.relation,
        PreExCoverage: a.PreExCoverage,
      })),
      refund: refund,
      lastKnownUpdatedAt: new Date().toISOString(),
    };

    const result = await modifyPolicy(id!, modifyData);

    if (result && result.success) {
      triggerNotification({ message: result.message, type: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (modifyError) {
      triggerNotification({ message: `Error: ${modifyError}`, type: "error" });
    }
  };

  const handleRefundConfirm = async (
    transactionFee: number,
    netRefund: number
  ) => {
    if (!refundData) return;

    const refundPayload: RefundData = {
      originalExpiryDate: refundData.originalExpiryDate!,
      newExpiryDate: refundData.newExpiryDate!,
      daysToRefund: refundData.daysToRefund!,
      maxRefundable: refundData.maxRefundable!,
      transactionFee: transactionFee,
      netRefundAmount: netRefund,
    };

    setShowRefundModal(false);
    await performSave(refundPayload);
  };

  const handleCancelPolicy = () => {
    setShowCancelModal(true);
  };

  const handleRefund = async (paymentHistoryId: string, amount: number) => {
    if (!id) {
      triggerNotification({ message: "Policy ID not found", type: "warning" });
      return;
    }

    const confirmMessage = `Are you sure you want to refund the policy fee of ${amount}?\n\nThis action cannot be undone.`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    const result = await refundPolicyFee(
      id,
      paymentHistoryId,
      `Manual refund of policy fee`,
      "admin"
    );

    if (result) {
      triggerNotification({
        message: `Success: ${result.message}`,
        type: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (refundError) {
      triggerNotification({ message: `Error: ${refundError}`, type: "error" });
    }
  };

  // RENEWALLLL

  const handleIssueRelatedPolicy = () => {
    const productRoutes: Record<string, string> = {
      SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL:
        "secure-travel-visitors-to-canada",
      SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA:
        "secure-study-international-students-to-canada",
      RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL: "canuck-voyage-travel-medical",
      RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL: "canuck-voyage-non-medical-travel",
    };

    const slug = p.product ? productRoutes[p.product] : undefined;

    if (!slug) {
      triggerNotification({
        message: "Renewal not available for this policy",
        type: "warning",
      });
      return;
    }

    navigate(`/renewals/${slug}?policyId=${id}`);
  };

  //

  // RENDER HELPERS

  const renderEditableField = (
    label: string,
    field: keyof PolicyDetail,
    type: "text" | "email" | "date" | "select" = "text",
    options?: string[]
  ) => {
    const value = editedPolicy[field] ?? p[field] ?? "";

    return (
      <div>
        <div className="font-semibold text-base">{label}</div>
        {isEditMode ? (
          type === "select" ? (
            <select
              value={value as string}
              onChange={(e) =>
                handleFieldChange(field as string, e.target.value)
              }
              className="input-primary"
            >
              {options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={
                type === "date" ? fmtDate(value as string) : (value as string)
              }
              onChange={(e) =>
                handleFieldChange(field as string, e.target.value)
              }
              className="input-primary"
              disabled={
                // Disable effectiveDate for ACTIVE policies
                (field === "effectiveDate" && p.status === "ACTIVE") ||
                // Disable dateOfBirth for ACTIVE policies
                (field === "dateOfBirth" && p.status === "ACTIVE")
              }
            />
          )
        ) : (
          <div className="text-sm text-[#6F6B7D]">
            {type === "date" ? fmtDate(value as string) : (value as string)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white">
      <div className="flex w-full justify-center gap-6">
          <img src="/rimi_en.png" alt="rimi_logo" className="w-[100px]" />
          <img
            src="/securetravel_en.png"
            alt="securetravel"
            className="w-[130px]"
          />
        </div>
      
      {/* Policy Name */}
      <div className="flex w-full justify-center">
        <h1 className="text-2xl font-semibold text-primary">
          {p.product?.replace(/_/g, ' ') || 'Policy Details'}
        </h1>
      </div>

      {/* Header & Buttons */}
      <div className="flex justify-end items-center">
        <div className="space-x-2">
          {!isEditMode ? (
            <>
              {/* Reload  */}
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100"
              >
                Reload
              </button>

              {canCancel && (
                <button
                  onClick={() => handleCancelPolicy()}
                  className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100"
                >
                  Cancel Policy
                </button>
              )}
              {/* Split Policy Button */}
              {p.product === "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL" &&
                p.status &&
                ["ACTIVE", "SOLD"].includes(p.status) &&
                1 + (p.applicants?.length || 0) >= 2 &&
                !isEditMode && (
                  <button
                    onClick={() => setShowSplitModal(true)}
                    className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
                  >
                    Split Policy
                  </button>
                )}
              {/* Update Card  */}
              {canUpdateCard && !isEditMode && (
                <button
                  onClick={() => setShowUpdateCardConfirmModal(true)}
                  className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
                >
                  Update Card
                </button>
              )}
              {canModify && (
                <button
                  onClick={handleModifyClick}
                  className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
                >
                  Modify Policy
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100"
                disabled={modifyLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
                disabled={modifyLoading}
              >
                {modifyLoading ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Edit Mode Banner */}
      {isEditMode && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Edit Mode:</strong> You are now editing this policy.
                Make your changes and click "Save Changes" when done.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Policy Information */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Policy Information
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm capitalize w-full">
          <div>
            <div className="font-semibold text-base">Policy Number</div>
            <div className="text-sm text-[#6F6B7D]">{p.policyNumber}</div>
          </div>
          <div>
            <div className="font-semibold text-base">Sale Date</div>
            <div className="text-sm text-[#6F6B7D]">
              {fmtDate(p.dateIssued)}
            </div>
          </div>
          <div>
            <div className="font-semibold text-base">Status</div>
            <div
              className={
                p.status === "CANCELLED"
                  ? "text-red-600 font-semibold"
                  : "text-sm text-[#6F6B7D]"
              }
            >
              {p.status}
            </div>
          </div>
          {renderEditableField("Language", "language")}
          <div>
            <div className="font-semibold mt-4">Sales Channel</div>
            <div className="text-sm text-[#6F6B7D]">
              {p.salesChannel || "-"}
            </div>
          </div>
          <div>
            <div className="font-semibold mt-4">Agent</div>
            <div className="text-sm text-[#6F6B7D]">{p.agentCode}</div>
          </div>
        </div>
      </div>

      {/* Primary Insured */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Primary Insured Person
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
          <div>
            <div className="font-semibold text-base">Policy Number</div>
            <div className="text-sm text-[#6F6B7D]">{p.primaryIndividualNumber}</div>
          </div>
          {renderEditableField("First Name", "firstName")}
          {renderEditableField("Last Name", "lastName")}
          {renderEditableField("Date of Birth", "dateOfBirth", "date")}
          <div>
            <div className="font-semibold mt-4">Age on Effective Date</div>
            <div className="text-sm text-[#6F6B7D]">
              {calcAge(
                editedPolicy.dateOfBirth || p.dateOfBirth?.toString(),
                editedPolicy.effectiveDate || p.effectiveDate?.toString()
              )}
            </div>
          </div>
          {renderEditableField("Gender", "gender", "select", [
            "Male",
            "Female",
            "Other",
          ])}
          <div className="col-span-2 mt-4">
            <div className="font-semibold text-base">
              Include Coverage for Stable Pre-Existing Medical Conditions
            </div>
            <div className="text-sm text-[#6F6B7D]">
              {p.PreExCoverage || "No"}
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold text-base">Premium</div>
            <div className="text-sm text-[#6F6B7D]">CAD {p.premium}</div>
          </div>
        </div>
      </div>
      {p.healthQuestionnaire && (
        <HealthQuestionnaireSection questionnaire={p.healthQuestionnaire} />
      )}

      {/* Contact Information */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Contact Information
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
          {renderEditableField("Email Address", "email", "email")}
          {renderEditableField(
            "Additional Email Address",
            "additionalEmail",
            "email"
          )}
          {renderEditableField("Phone Number", "phoneNumber")}
          <div className="mt-4 col-span-2">
            {renderEditableField("Address Line 1", "street")}
          </div>
          <div className="mt-4">
            {renderEditableField("Address Line 2", "street2")}
          </div>
          {renderEditableField("City", "city")}
          {renderEditableField("Province", "province")}
          {renderEditableField("Country", "countryCode")}
          {renderEditableField("Postal Code", "postalCode")}
        </div>
      </div>

      {/* Other insured persons */}
      {editedApplicants.length > 0 &&
        editedApplicants.map((a: PolicyApplicant, idx: number) => (
          <div
            key={a.id}
            className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4"
          >
            <div className="text-primary uppercase font-semibold text-xl">
              Insured Person {idx + 2}
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
              <div>
                <div className="font-semibold text-base">Policy Number</div>
                <div className="text-sm text-[#6F6B7D]">{a.policyNumber}</div>
              </div>
              <div>
                <div className="font-semibold text-base">First Name</div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={a.firstName}
                    onChange={(e) =>
                      handleApplicantChange(idx, "firstName", e.target.value)
                    }
                    className="input-primary"
                  />
                ) : (
                  <div className="text-sm text-[#6F6B7D]">{a.firstName}</div>
                )}
              </div>
              <div>
                <div className="font-semibold text-base">Last Name</div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={a.lastName}
                    onChange={(e) =>
                      handleApplicantChange(idx, "lastName", e.target.value)
                    }
                    className="input-primary"
                  />
                ) : (
                  <div className="text-sm text-[#6F6B7D]">{a.lastName}</div>
                )}
              </div>
              <div>
                <div className="font-semibold mt-4">Date of Birth</div>
                {isEditMode && p.status === "SOLD" ? (
                  <input
                    type="date"
                    value={fmtDate(a.dateOfBirth?.toString())}
                    onChange={(e) =>
                      handleApplicantChange(idx, "dateOfBirth", e.target.value)
                    }
                    className="input-primary"
                  />
                ) : (
                  <div className="text-sm text-[#6F6B7D]">
                    {fmtDate(a.dateOfBirth)}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold mt-4">Age on Effective Date</div>
                <div className="text-sm text-[#6F6B7D]">
                  {calcAge(a.dateOfBirth, p.effectiveDate?.toString())}
                </div>
              </div>
              <div>
                <div className="font-semibold mt-4">Gender</div>
                {isEditMode ? (
                  <select
                    value={a.gender || ""}
                    onChange={(e) =>
                      handleApplicantChange(idx, "gender", e.target.value)
                    }
                    className="input-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className="text-sm text-[#6F6B7D]">{a.gender}</div>
                )}
              </div>
              <div>
                <div className="font-semibold mt-4">
                  Relationship to Primary Applicant
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={a.relation || ""}
                    onChange={(e) =>
                      handleApplicantChange(idx, "relation", e.target.value)
                    }
                    className="input-primary"
                  />
                ) : (
                  <div className="text-sm text-[#6F6B7D]">{a.relation}</div>
                )}
              </div>
              <div className="col-span-2 mt-4">
                <div className="font-semibold text-base">
                  Include Coverage for Stable Pre-Existing Medical Conditions
                </div>
                <div className="text-sm text-[#6F6B7D]">
                  {a.PreExCoverage || "No"}
                </div>
              </div>
              <div className="mt-4">
                <div className="font-semibold text-base">Premium</div>
                <div className="text-sm text-[#6F6B7D]">
                  {Number(a.premium || 0).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "CAD",
                  })}
                </div>
              </div>
            </div>
            {a.healthQuestionnaire && (
              <HealthQuestionnaireSection questionnaire={a.healthQuestionnaire} />
            )}
          </div>
        ))}

      {/* Coverage Details */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Coverage Details
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
          {renderEditableField("Effective Date", "effectiveDate", "date")}
          {renderEditableField("Expiry Date", "expiryDate", "date")}
          <div>
            <div className="font-semibold text-base">Coverage Length</div>
            <div className="text-sm text-[#6F6B7D]">
              {calculateDays(
                editedPolicy.effectiveDate ||
                  fmtDate(p.effectiveDate?.toString()),
                editedPolicy.expiryDate || fmtDate(p.expiryDate?.toString())
              )}{" "}
              Days
            </div>
          </div>
          <div>
            <div className="font-semibold mt-4">Policy Type</div>
            <div className="text-sm text-[#6F6B7D]">{p.policyType}</div>
          </div>
          <div>
            <div className="font-semibold mt-4">Country of Origin</div>
            <div className="text-sm text-[#6F6B7D]">{p.countryOfOrigin}</div>
          </div>
          {renderEditableField("Destination Province", "destination")}
          <div>
            <div className="font-semibold mt-4">
              Are Applicants Currently in Canada?
            </div>
            <div className="text-sm text-[#6F6B7D]">{p.applicantInCanada}</div>
          </div>
          <div>
            <div className="font-semibold mt-4">
              Are Applicants Travelling on a Super Visa?
            </div>
            {isEditMode ? (
              <select
                value={
                  editedPolicy.applicantOnSuperVisa ||
                  p.applicantOnSuperVisa ||
                  ""
                }
                onChange={(e) =>
                  handleFieldChange("applicantOnSuperVisa", e.target.value)
                }
                className="input-primary"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ) : (
              <div className="text-sm text-[#6F6B7D]">
                {p.applicantOnSuperVisa}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold mt-4">Coverage</div>
            <div className="text-sm text-[#6F6B7D]">{p.coverage}</div>
          </div>
          {renderEditableField("Deductible", "deductible")}
        </div>
      </div>

      {/* Beneficiary Information */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Beneficiary Information
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm w-full capitalize">
          <div>
            <div className="font-semibold text-base">Name</div>
            <div className="text-sm text-[#6F6B7D]">{p.beneficiaryName}</div>
          </div>
          <div>
            <div className="font-semibold text-base">
              Relationship to Insured
            </div>
            <div className="text-sm text-[#6F6B7D]">
              {p.beneficiaryRelation}
            </div>
          </div>
        </div>
      </div>

      {/* Premium / Payment Info */}
      {(history?.length > 0 ||
        (paymentSchedule && paymentSchedule.length > 0)) && (
        <section className="border-b border-inputBorder py-4 space-y-4">
          <div className="uppercase text-primary font-semibold text-lg">
            Premium / Payment Info
          </div>

    <div className="grid grid-cols-4 gap-x-4">
      <div>
        <div className="font-medium">Premium</div>
        <div>
          {p?.premium.toLocaleString("en-CA", {
            style: "currency",
            currency: history[0]?.currency || "CAD",
            currencyDisplay: "code",
          })}
        </div>
      </div>
      <div>
        <div className="font-medium">Payment Option</div>
        <div>{p.paymentOption || "-"}</div>
      </div>
      <div>
        <div className="font-medium">Credit Card</div>
        {/* <div>{history[0]?.last4 ? `•••• ${history[0].last4}` : "-"}</div> */}


<div>
          {(() => {
            // Priority: Policy.currentCard -> Most Recent Payment -> First Payment
            const brand = p.currentCardBrand || 
                         history[history.length - 1]?.brand || 
                         history[0]?.brand;
            const last4 = p.currentCardLast4 || 
                         history[history.length - 1]?.last4 || 
                         history[0]?.last4;
            const name = p.currentCardholderName || 
                        history[history.length - 1]?.cardholderName || 
                        history[0]?.cardholderName;
            
            if (!last4) return "-";
            
            return (
              <div className="flex flex-col">
                <span className="font-medium">
                  {brand?.toUpperCase()} •••• {last4}
                </span>
                {name && (
                  <span className="text-xs text-gray-600">{name}</span>
                )}
                {p.currentCardUpdatedAt && (
                  <span className="text-xs text-gray-500">
                    Updated: {fmtDate(p.currentCardUpdatedAt.toString())}
                  </span>
                )}
              </div>
            );
          })()}
        </div>


      </div>
      <div>
        <div className="font-medium">Date</div>
        <div>{history[0]?.date ? fmtDate(history[0].date) : "-"}</div>
      </div>
    </div>

          {/* ✅ ADD THIS: Parent Policy Link for Split Policies */}
          {p.parentPolicyId && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    Split Policy - Payments Covered by Parent Policy
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/policy-detail/${p.parentPolicyId}`)
                    }
                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                  >
                    View Original Policy Payment →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Schedule Table */}
          {p.paymentOption === "monthly-installments" &&
            paymentSchedule &&
            paymentSchedule.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-sm mb-3">Payment Schedule</h3>
                <PaymentScheduleTable
                  schedule={paymentSchedule || []}
                  loading={scheduleLoading}
                  error={scheduleError}
                  onProcessRefund={
                    p.status === "CANCELLED" ? handleRefund : undefined
                  }
                  cardHolderName = {p.currentCardholderName}
                  cardLast4 = {p.currentCardLast4}
                  cardBrand = {p.currentCardBrand}
                />
              </div>
            )}

          {/* Payment History Table */}
          {history.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-sm mb-3">Payment History</h3>
              <div className="overflow-x-auto custom-scrollbar-x">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary text-white text-sm 2xl:text-base capitalize">
                    <tr>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        #
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        Method
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        Name
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        Brand
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        Last 4
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-right font-medium text-nowrap">
                        Amount
                      </th>
                      {/* <th className="px-2 sm:px-3 py-1 sm:py-3 text-right font-medium text-nowrap">
                        Fee
                      </th> */}
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        Status
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        Date
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        Payment Type
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-center font-medium text-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white text-[#808080] text-sm 2xl:text-base"
                    style={{ border: "1px solid #AAA9A9" }}
                  >
                    {history.map((h, i) => {
                      const isReference = [
                        "split-policy-covered",
                        "split-initial-covered",
                        "split-monthly-covered",
                        "policy-fee-reference",
                      ].includes(h.paymentType || "");

                      const cellStyle = {
                        borderWidth: "0px 1px 1px 0px",
                        borderStyle: "solid" as const,
                        borderColor: "#AAA9A9",
                      };

                      return (
                        <tr
                          key={h.id}
                          className={`hover:bg-white ${
                            isReference ? "bg-blue-50" : ""
                          }`}
                        >
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap"
                            style={cellStyle}
                          >
                            {i + 1}
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap"
                            style={cellStyle}
                          >
                            {h.method}
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap"
                            style={cellStyle}
                          >
                            {h.cardholderName}
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap capitalize"
                            style={cellStyle}
                          >
                            {h.brand}
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap"
                            style={cellStyle}
                          >
                            {h.last4}
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right font-medium"
                            style={cellStyle}
                          >
                            {h.amount.toLocaleString("en-CA", {
                              style: "currency",
                              currency: h.currency,
                              currencyDisplay: "code",
                            })}
                          </td>
                          {/* <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right"
                            style={cellStyle}
                          >
                            {h.fee != null
                              ? h.fee.toLocaleString("en-CA", {
                                  style: "currency",
                                  currency: h.currency,
                                  currencyDisplay: "code",
                                })
                              : "N/A"}
                          </td> */}
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap"
                            style={cellStyle}
                          >
                            <span
                              className={`${
                                h.status === "succeeded"
                                  ? "text-green-600"
                                  : h.status === "refunded"
                                  ? "text-orange-600"
                                  : ""
                              }`}
                            >
                              {h.status}
                            </span>
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap"
                            style={cellStyle}
                          >
                            {fmtDate(h.date)}
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap"
                            style={cellStyle}
                          >
                            <div className="flex items-center gap-1">
                              {/* ✅ Show indicator for reference payments */}
                              {isReference && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  ℹ️ Reference
                                </span>
                              )}
                              <span
                                className={
                                  isReference ? "text-xs text-gray-600" : ""
                                }
                              >
                                {h.paymentType || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td
                            className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-center"
                            style={cellStyle}
                          >
                            {h.paymentType === "policy-issue-fee" &&
                              h.status === "succeeded" &&
                              p.status === "CANCELLED" && (
                                <button
                                  onClick={() =>
                                    handleRefund(h.id, h.amount)
                                  }
                                  disabled={refundLoading}
                                  className={`inline-flex items-center justify-center w-7 h-7 ${
                                    refundLoading
                                      ? "bg-gray-400 cursor-not-allowed"
                                      : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                                  } rounded border border-red-200 transition-all duration-150`}
                                  title={
                                    refundLoading
                                      ? "Processing..."
                                      : "Refund policy fee"
                                  }
                                >
                                  {refundLoading ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  ) : (
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                      />
                                    </svg>
                                  )}
                                </button>
                              )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Fulfillment */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Fulfillment
        </div>
        {fulError && <p className="text-red-600">{fulError}</p>}

        <div className="grid grid-cols-3 gap-x-4">
          <div>
            <label className="font-semibold text-base">To</label>
            <input
              className="input-primary"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={isEditMode}
            />
          </div>
          <div>
            <label className="font-semibold text-base">CC</label>
            <input
              className="input-primary"
              placeholder="Up to 5 emails; separated by ;"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              disabled={isEditMode}
            />
          </div>
          <div>
            <label className="font-semibold text-base">Agent Email</label>
            <input
              className="input-primary"
              value={p.agentEmail ? p.agentEmail : agentEmail}
              onChange={(e) => setAgentEmail(e.target.value)}
              disabled={isEditMode}
            />
          </div>
        </div>

        {!isEditMode && (
          <div className="flex space-x-2 mt-2">
            <button
              onClick={fetchPreview}
              disabled={fulLoading}
              className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100"
            >
              Preview Confirmation
            </button>
            <button
              onClick={() => sendMail(to, cc, agentEmail)}
              disabled={fulLoading}
              className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
            >
              Send Confirmation
            </button>
          </div>
        )}

        {preview && (
          <div className="mt-4 p-4 border border-inputBorder bg-white max-h-96 overflow-y-auto">
            <h2 className="font-semibold mb-2 text-lg">{preview.subject}</h2>
            <div
              className="text-text-secondary"
              dangerouslySetInnerHTML={{ __html: preview.html }}
            />
          </div>
        )}
      </div>

      {/* Renewal */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Renewal
        </div>
        {!isEditMode && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <input
                type="checkbox"
                className="w-4 h-4 checked:accent-primary"
                checked
                readOnly
              />{" "}
              <span>Auto Renewal Notice</span>
            </div>
            <button
              onClick={handleViewRenewalNotice}
              className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100"
            >
              View Renewal Notice
            </button>
            <button
              onClick={handleSendRenewalNotice}
              className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
            >
              Send Renewal Notice
            </button>
            <button
              onClick={handleIssueRelatedPolicy}
              className="px-3 py-2 bg-green-600 text-white cursor-pointer hover:bg-green-700 transition-all duration-200"
            >
              Issue New Policy
            </button>
          </div>
        )}
      </div>

      {/* History & Notes */}
      <div className="flex flex-col gap-4 justify-between w-full pb-4">
        <div className="flex items-center gap-2 text-primary uppercase font-semibold text-xl">
          Notes History
        </div>

        {notesLoading ? (
          <p>Loading notes…</p>
        ) : notesError ? (
          <p className="text-red-600">{notesError}</p>
        ) : (
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {notes.length === 0 && (
              <li className="text-gray-500">No notes yet.</li>
            )}
            {notes.map((n) => (
              <li key={n.id} className="px-2 py-4 bg-[#F9FAFB]">
                  <div>{n.content}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isEditMode && (
          <div>
            <label className="font-semibold text-base block mb-1">
              Add a Note
            </label>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter note here"
              className="input-primary"
              rows={3}
            />
            <button
              onClick={() => {
                if (!newNote.trim()) return;
                addNote(newNote);
                setNewNote("");
              }}
              disabled={!newNote.trim()}
              className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70 mt-2"
            >
              Add Note
            </button>
          </div>
        )}
      </div>

      {/* Activity History */}
      <div className="flex flex-col gap-4 justify-between w-full pb-4">
        <div className="flex items-center gap-2 text-primary uppercase font-semibold text-xl">
          Activity History
        </div>

        <PolicyActivityTimeline
          activities={activities}
          loading={activityLoading}
          error={activityError}
        />
      </div>

      {/* Attachments */}
      <div className="flex flex-col gap-4 justify-between w-full pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          Attachments
        </div>

        {attLoading ? (
          <p>Loading attachments…</p>
        ) : attError ? (
          <p className="text-red-600">{attError}</p>
        ) : (
          <ul className="space-y-2">
            {attachments.length === 0 && (
              <li className="text-gray-500">No attachments yet.</li>
            )}
            {attachments.map((att) => (
              <li key={att.id} className="flex items-center space-x-4">
                <a
                  href={`${API_BASE}${att.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {att.originalName}
                </a>
                {att.description && (
                  <span className="italic text-gray-600">
                    — {att.description}
                  </span>
                )}
                <span className="ml-auto text-xs text-gray-400">
                  {new Date(att.createdAt).toLocaleDateString("en-CA")}
                </span>
              </li>
            ))}
          </ul>
        )}

        {!isEditMode && (
          <div className="space-x-4">
            <div className="flex flex-col">
              <label
                htmlFor="fileUpload"
                className="input-primary flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed max-w-[200px]"
              >
                <MdUploadFile size={20} />
                Choose Files
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  disabled={loading}
                />
              </label>
              {file && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0 mt-2">
                    <div className="flex items-center gap-2">
                      <p
                        className="font-medium text-gray-800 truncate"
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <button
                        onClick={() => setFile(null)}
                        className="text-red-600 cursor-pointer"
                        aria-label="Delete file"
                        disabled={loading}
                      >
                        <MdClose size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      ({formatFileSize(file.size)})
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="font-medium block mt-2">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="input-primary max-w-md min-h-20"
              />
            </div>
            <button
              onClick={() => {
                if (!file) return;
                addAttachment(file, desc);
                setFile(null);
                setDesc("");
              }}
              disabled={!file}
              className="bg-primary text-white py-2 sm:py-3 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70 mt-4"
            >
              Add Attachment
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <CancellationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        policyId={id!}
        policyNumber={p.policyNumber!}
        paymentHistory={p.paymentHistory || []}
        effectiveDate={p.effectiveDate?.toString() || ""}
        paymentOption={p.paymentOption || ""}
        onSuccess={(message) => {
          triggerNotification({
            message,
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }}
      />

      <RefundModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        onConfirm={handleRefundConfirm}
        originalExpiryDate={refundData?.originalExpiryDate || ""}
        newExpiryDate={refundData?.newExpiryDate || ""}
        daysToRefund={refundData?.daysToRefund || 0}
        maxRefundable={refundData?.maxRefundable || 0}
        loading={modifyLoading}
      />

      <PremiumChangeModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onProceed={() => {
          setShowPremiumModal(false);
          performSave();
        }}
        originalPremium={premiumData?.originalPremium || 0}
        newPremium={premiumData?.newPremium || 0}
        premiumDifference={premiumData?.premiumDifference || 0}
        reason={premiumData?.reason}
        isAgeBracketChange={premiumData?.isAgeBracketChange}
      />

      <ValidationErrorModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        title={validationMessage.title}
        message={validationMessage.message}
        type="warning"
      />

      <UpdateCardModal
        isOpen={showUpdateCardModal}
        onClose={() => setShowUpdateCardModal(false)}
        policyId={id!}
        policyNumber={p.policyNumber!}
        onSuccess={() => {
          triggerNotification({
            message: "Payment method updated successfully",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }}
      />

      {/* Policy Split Modal */}
      {showSplitModal && (
        <PolicySplitModal
          isOpen={showSplitModal}
          onClose={() => setShowSplitModal(false)}
          policyId={id!}
          policyNumber={p.policyNumber!}
          primaryApplicant={{
            id: "primary",
            firstName: p.firstName || "",
            lastName: p.lastName || "",
            dateOfBirth: p.dateOfBirth?.toString() || "",
            effectiveDate: p.effectiveDate?.toString() || "",
            expiryDate: p.expiryDate?.toString() || "",
            preMedCoverage: p.PreExCoverage,
          }}
          additionalApplicants={
            p.applicants?.map((a) => ({
              id: a.id,
              firstName: a.firstName,
              lastName: a.lastName,
              dateOfBirth: a.dateOfBirth?.toString() || "",
              effectiveDate: p.effectiveDate?.toString() || "", // Assuming same as policy
              expiryDate: p.expiryDate?.toString() || "", // This might need adjustment if applicants have different dates
              relation: a.relation,
              preMedCoverage: a.PreExCoverage,
            })) || []
          }
          totalPremium={p.premium || 0}
          paymentOption={p.paymentOption as "lump-sum" | "monthly"}
          onSuccess={() => {
            // Refresh policy data after successful split
            window.location.reload();
          }}
        />
      )}

      {/* Renewal Notice Modal */}

      <RenewalNoticeModal
        isOpen={showRenewalModal}
        onClose={() => setShowRenewalModal(false)}
        policy={{
          ...p,
          applicants: p.applicants?.map((a) => ({
            ...a,
            premium: a.premium ? Number(a.premium) : undefined,
          })),
        }}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
      {NotificationComponent}
      {/* Send Renewal Notice Confirmation Modal */}
      <SendRenewalConfirmationModal
        isOpen={showSendConfirmationModal}
        onClose={() => setShowSendConfirmationModal(false)}
        onConfirm={confirmSendRenewalNotice}
        email={p.email || ""}
        loading={renewalLoading}
      />
      <UpdatePaymentMethodConfirmationModal
        isOpen={showUpdateCardConfirmModal}
        onClose={() => setShowUpdateCardConfirmModal(false)}
        onConfirm={() => {
          setShowUpdateCardConfirmModal(false);
          setShowUpdateCardModal(true);
        }}
      />
    </div>
  );
};

export default PolicyDetailsPage;
