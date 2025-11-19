// ==============================================================

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  usePolicyDetail,
  PolicyDetail,
  PolicyApplicant,
} from "../hooks/usePolicyDetail";
import { usePolicyNotes } from "../hooks/usePolicyNotes";
import { usePolicyAttachments } from "../hooks/usePolicyAttachments";
import { useFulfillment } from "../hooks/useFulfillment";
import { usePolicyFeeRefund } from "../hooks/usePolicyFeeRefund";
import { useModifyPolicy, ModifyPolicyData } from "../hooks/useModifyPolicy";
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
  const [refundData, setRefundData] = useState<any>(null);

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!p) return;
    setTo(p.email || "");
    setAgentEmail(`${p.agentCode}@example.com`);
  }, [id, p?.email, p?.agentCode]);

  useEffect(() => {
    if (p) console.log("Loaded policy:", p);
  }, [p]);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (error) return <p className="text-red-600 text-center py-10">{error}</p>;
  if (!p) return <p className="text-center py-10">No policy found.</p>;

  console.log(p);

  const history = p.paymentHistory ?? [];

  // BUTTON VISIBILITY

  const canModify = p.status === "SOLD" || p.status === "ACTIVE";
  const canCancel = p.status !== "CANCELLED";

  // helper to check if policy can update card
  const canUpdateCard =
    p.paymentOption === "monthly-installments" &&
    p.status !== "CANCELLED" &&
    p.stripeSubscriptionScheduleId;

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

  const performSave = async (refund?: any) => {
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
      alert(result.message);
      window.location.reload();
    } else if (modifyError) {
      alert(`Error: ${modifyError}`);
    }
  };

  const handleRefundConfirm = async (
    transactionFee: number,
    netRefund: number
  ) => {
    const refundPayload = {
      originalExpiryDate: refundData.originalExpiryDate,
      newExpiryDate: refundData.newExpiryDate,
      daysToRefund: refundData.daysToRefund,
      maxRefundable: refundData.maxRefundable,
      transactionFee: transactionFee,
      netRefundAmount: netRefund,
    };

    setShowRefundModal(false);
    await performSave(refundPayload);
  };

  const handleCancelPolicy = (id: any, policyNumber: any) => {
    console.log("policy id is", id);
    console.log("policy number is", policyNumber);
    setShowCancelModal(true);
  };

  const handleRefund = async (
    paymentHistoryId: string,
    amount: number,
    paymentType: string
  ) => {
    console.log("Refund for policy fee pressed", {
      paymentHistoryId,
      amount,
      paymentType,
      timestamp: new Date().toISOString(),
    });

    if (!id) {
      alert("Policy ID not found");
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
      alert(`Success: ${result.message}`);
      window.location.reload();
    } else if (refundError) {
      alert(`Error: ${refundError}`);
    }
  };

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
        <div className="font-medium">{label}</div>
        {isEditMode ? (
          type === "select" ? (
            <select
              value={value as string}
              onChange={(e) =>
                handleFieldChange(field as string, e.target.value)
              }
              className="w-full p-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={
                // Disable effectiveDate for ACTIVE policies
                (field === "effectiveDate" && p.status === "ACTIVE") ||
                // Disable dateOfBirth for ACTIVE policies
                (field === "dateOfBirth" && p.status === "ACTIVE")
              }
            />
          )
        ) : (
          <div>
            {type === "date" ? fmtDate(value as string) : (value as string)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white">
      {/* Header & Buttons */}
      <div className="flex justify-end items-center">
        <div className="space-x-2">
          {!isEditMode ? (
            <>
              {/* Update Card  */}
              {canUpdateCard && !isEditMode && (
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to update the payment method for this policy? All future recurring payments will use the new card."
                      )
                    ) {
                      setShowUpdateCardModal(true);
                    }
                  }}
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Update Card
                </button>
              )}

              {/* Reload  */}
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1 border rounded"
              >
                Reload
              </button>
              {canModify && (
                <button
                  onClick={handleModifyClick}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Modify Policy
                </button>
              )}
              {canCancel && (
                <button
                  onClick={() => handleCancelPolicy(id, p.policyNumber)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel Policy
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 border rounded"
                disabled={modifyLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
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
      <section className="grid grid-cols-12 gap-x-4 border-b pb-4">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">
          Policy Information
        </div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
          <div>
            <div className="font-medium">Policy Number</div>
            <div>{p.policyNumber}</div>
          </div>
          <div>
            <div className="font-medium">Sale Date</div>
            <div>{fmtDate(p.dateIssued)}</div>
          </div>
          <div>
            <div className="font-medium">Status</div>
            <div
              className={
                p.status === "CANCELLED" ? "text-red-600 font-semibold" : ""
              }
            >
              {p.status}
            </div>
          </div>
          {renderEditableField("Language", "language")}
          <div>
            <div className="font-medium mt-4">Sales Channel</div>
            <div>{p.salesChannel || "-"}</div>
          </div>
          <div>
            <div className="font-medium mt-4">Agent</div>
            <div>{p.agentCode}</div>
          </div>
        </div>
      </section>

      {/* Primary Insured */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">
          Primary Insured Person
        </div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
          <div>
            <div className="font-medium">Policy Number</div>
            <div>{p.policyNumber}</div>
          </div>
          {renderEditableField("First Name", "firstName")}
          {renderEditableField("Last Name", "lastName")}
          {renderEditableField("Date of Birth", "dateOfBirth", "date")}
          <div>
            <div className="font-medium mt-4">Age on Effective Date</div>
            <div>
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
            <div className="font-medium">
              Include Coverage for Stable Pre-Existing Medical Conditions
            </div>
            <div>{p.PreExCoverage || "No"}</div>
          </div>
          <div className="mt-4">
            <div className="font-medium">Premium</div>
            <div>CAD {p.premium}</div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">
          Contact Information
        </div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4">
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
      </section>

      {/* Other insured persons */}
      {editedApplicants.length > 0 &&
        editedApplicants.map((a: any, idx: number) => (
          <section
            key={a.id}
            className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm"
          >
            <div className="col-span-2 text-purple-600 uppercase font-semibold">
              Insured Person {idx + 2}
            </div>
            <div className="col-span-10 grid grid-cols-3 gap-x-4 text-sm">
              <div>
                <div className="font-medium">Policy Number</div>
                <div>{a.policyNumber}</div>
              </div>
              <div>
                <div className="font-medium">First Name</div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={a.firstName}
                    onChange={(e) =>
                      handleApplicantChange(idx, "firstName", e.target.value)
                    }
                    className="w-full p-1 border border-blue-300 rounded"
                  />
                ) : (
                  <div>{a.firstName}</div>
                )}
              </div>
              <div>
                <div className="font-medium">Last Name</div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={a.lastName}
                    onChange={(e) =>
                      handleApplicantChange(idx, "lastName", e.target.value)
                    }
                    className="w-full p-1 border border-blue-300 rounded"
                  />
                ) : (
                  <div>{a.lastName}</div>
                )}
              </div>
              <div>
                <div className="font-medium mt-4">Date of Birth</div>
                {isEditMode && p.status === "SOLD" ? (
                  <input
                    type="date"
                    value={fmtDate(a.dateOfBirth?.toString())}
                    onChange={(e) =>
                      handleApplicantChange(idx, "dateOfBirth", e.target.value)
                    }
                    className="w-full p-1 border border-blue-300 rounded"
                  />
                ) : (
                  <div>{fmtDate(a.dateOfBirth)}</div>
                )}
              </div>
              <div>
                <div className="font-medium mt-4">Age on Effective Date</div>
                <div>{calcAge(a.dateOfBirth, p.effectiveDate?.toString())}</div>
              </div>
              <div>
                <div className="font-medium mt-4">Gender</div>
                {isEditMode ? (
                  <select
                    value={a.gender || ""}
                    onChange={(e) =>
                      handleApplicantChange(idx, "gender", e.target.value)
                    }
                    className="w-full p-1 border border-blue-300 rounded"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div>{a.gender}</div>
                )}
              </div>
              <div>
                <div className="font-medium mt-4">
                  Relationship to Primary Applicant
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={a.relation || ""}
                    onChange={(e) =>
                      handleApplicantChange(idx, "relation", e.target.value)
                    }
                    className="w-full p-1 border border-blue-300 rounded"
                  />
                ) : (
                  <div>{a.relation}</div>
                )}
              </div>
              <div className="col-span-2 mt-4">
                <div className="font-medium">
                  Include Coverage for Stable Pre-Existing Medical Conditions
                </div>
                <div>{a.PreExCoverage || "No"}</div>
              </div>
              <div className="mt-4">
                <div className="font-medium">Premium</div>
                <div>
                  {a.premium?.toLocaleString("en-CA", {
                    style: "currency",
                    currency: "CAD",
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

      {/* Coverage Details */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">
          Coverage Details
        </div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4">
          {renderEditableField("Effective Date", "effectiveDate", "date")}
          {renderEditableField("Expiry Date", "expiryDate", "date")}
          <div>
            <div className="font-medium">Coverage Length</div>
            <div>
              {calculateDays(
                editedPolicy.effectiveDate ||
                  fmtDate(p.effectiveDate?.toString()),
                editedPolicy.expiryDate || fmtDate(p.expiryDate?.toString())
              )}{" "}
              Days
            </div>
          </div>
          <div>
            <div className="font-medium mt-4">Policy Type</div>
            <div>{p.policyType}</div>
          </div>
          <div>
            <div className="font-medium mt-4">Country of Origin</div>
            <div>{p.countryOfOrigin}</div>
          </div>
          {renderEditableField("Destination Province", "destination")}
          <div>
            <div className="font-medium mt-4">
              Are Applicants Currently in Canada?
            </div>
            <div>{p.applicantInCanada}</div>
          </div>
          <div>
            <div className="font-medium mt-4">
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
                className="w-full p-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ) : (
              <div>{p.applicantOnSuperVisa}</div>
            )}
          </div>
          <div>
            <div className="font-medium mt-4">Coverage</div>
            <div>{p.coverage}</div>
          </div>
          {renderEditableField("Deductible", "deductible")}
        </div>
      </section>

      {/* Beneficiary Information */}
      <section className="grid grid-cols-12 gap-x-4 border-b py-4 text-sm">
        <div className="col-span-2 text-purple-600 uppercase font-semibold">
          Beneficiary Information
        </div>
        <div className="col-span-10 grid grid-cols-3 gap-x-4">
          <div>
            <div className="font-medium">Name</div>
            <div>{p.beneficiaryName}</div>
          </div>
          <div>
            <div className="font-medium">Relationship to Insured</div>
            <div>{p.beneficiaryRelation}</div>
          </div>
        </div>
      </section>

      {/* Premium / Payment Info */}
      {/* {history?.length > 0 && (
        <section className="border-b py-4 text-sm space-y-4">
          <div className="uppercase text-purple-600 font-semibold">
            Premium / Payment Info
          </div>

          <div className="grid grid-cols-4 gap-x-4">
            <div>
              <div className="font-medium">Premium</div>
              <div>
                {p?.premium.toLocaleString("en-CA", {
                  style: "currency",
                  currency: history[0].currency,
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
              <div>{history[0].last4 ? `•••• ${history[0].last4}` : "-"}</div>
            </div>
            <div>
              <div className="font-medium">Date</div>
              <div>{fmtDate(history[0].date)}</div>
            </div>
          </div>

          <table className="w-full table-fixed border-collapse text-xs mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">Method</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Brand</th>
                <th className="px-3 py-2 text-left">Last 4</th>
                <th className="px-3 py-2 text-right">Amount</th>
                <th className="px-3 py-2 text-right">Fee</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Payment Type</th>
                <th className="px-3 py-2 text-center w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {history.map((h, i) => (
                <tr key={h.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-left">{i + 1}</td>
                  <td className="px-3 py-2 text-left">{h.method}</td>
                  <td className="px-3 py-2 text-left">{h.cardholderName}</td>
                  <td className="px-3 py-2 text-left">{h.brand}</td>
                  <td className="px-3 py-2 text-left">{h.last4}</td>
                  <td className="px-3 py-2 text-right">
                    {h.amount.toLocaleString("en-CA", {
                      style: "currency",
                      currency: h.currency,
                      currencyDisplay: "code",
                    })}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {h.fee != null
                      ? h.fee.toLocaleString("en-CA", {
                          style: "currency",
                          currency: h.currency,
                          currencyDisplay: "code",
                        })
                      : "N/A"}
                  </td>
                  <td
                    className={`px-3 py-2 text-left ${
                      h.status === "succeeded"
                        ? "text-green-600"
                        : h.status === "refunded"
                        ? "text-orange-600"
                        : ""
                    }`}
                  >
                    {h.status}
                  </td>
                  <td className="px-3 py-2 text-left">{fmtDate(h.date)}</td>
                  <td className="px-3 py-2 text-left">{h.paymentType || 'N/A'}</td>
                  <td className="px-3 py-2 text-center">
                    {h.paymentType === 'policy-issue-fee' && 
                     h.status === 'succeeded' && 
                     p.status === 'CANCELLED' && (
                      <button
                        onClick={() => handleRefund(h.id, h.amount, h.paymentType)}
                        disabled={refundLoading}
                        className={`inline-flex items-center justify-center w-8 h-8 ${
                          refundLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700'
                        } text-white rounded transition-colors duration-150`}
                        title={refundLoading ? "Processing..." : "Refund policy fee"}
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
              ))}
            </tbody>
          </table>
        </section>
      )} */}

      {/* Premium / Payment Info */}
      {(history?.length > 0 ||
        (paymentSchedule && paymentSchedule.length > 0)) && (
        <section className="border-b py-4 text-sm space-y-4">
          <div className="uppercase text-purple-600 font-semibold">
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
              <div>{history[0]?.last4 ? `•••• ${history[0].last4}` : "-"}</div>
            </div>
            <div>
              <div className="font-medium">Date</div>
              <div>{history[0]?.date ? fmtDate(history[0].date) : "-"}</div>
            </div>
          </div>

          {/* Payment Schedule Table */}
          <div className="mt-6">
            <h3 className="font-semibold text-sm mb-3">Payment Schedule</h3>
            <PaymentScheduleTable
              schedule={paymentSchedule || []}
              loading={scheduleLoading}
              error={scheduleError}
              onProcessRefund={
                p.status === "CANCELLED" ? handleRefund : undefined
              }
            />
          </div>
        </section>
      )}

      {/* Fulfillment */}
      <section className="border-b py-4 space-y-2 text-sm">
        <div className="uppercase text-purple-600 font-semibold">
          Fulfillment
        </div>
        {fulError && <p className="text-red-600">{fulError}</p>}

        <div className="grid grid-cols-3 gap-x-4">
          <div>
            <label className="font-medium">To</label>
            <input
              className="w-full p-2 border"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={isEditMode}
            />
          </div>
          <div>
            <label className="font-medium">CC</label>
            <input
              className="w-full p-2 border"
              placeholder="Up to 5 emails; separated by ;"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              disabled={isEditMode}
            />
          </div>
          <div>
            <label className="font-medium">Agent Email</label>
            <input
              className="w-full p-2 border"
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
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Preview Confirmation
            </button>
            <button
              onClick={() => sendMail(to, cc, agentEmail)}
              disabled={fulLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Send Confirmation
            </button>
          </div>
        )}

        {preview && (
          <div className="mt-4 p-4 border rounded bg-white shadow-lg max-h-96 overflow-y-auto">
            <h2 className="font-semibold mb-2">{preview.subject}</h2>
            <div dangerouslySetInnerHTML={{ __html: preview.html }} />
          </div>
        )}
      </section>

      {/* Renewal */}
      <section className="border-b py-4 text-sm">
        <div className="uppercase text-purple-600 font-semibold">Renewal</div>
        {!isEditMode && (
          <div className="flex items-center space-x-4">
            <div>
              <input type="checkbox" checked readOnly /> Auto Renewal Notice
            </div>
            <button className="px-3 py-1 border rounded">
              View Renewal Notice
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              Send Renewal Notice
            </button>
            <button className="px-3 py-1 bg-green-600 text-white rounded">
              Issue Related Policy
            </button>
          </div>
        )}
      </section>

      {/* History & Notes */}
      <section className="border-b py-4 text-sm space-y-4">
        <div className="uppercase text-purple-600 font-semibold">
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
              <li key={n.id} className="p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>{n.content}</div>
              </li>
            ))}
          </ul>
        )}

        {!isEditMode && (
          <div>
            <label className="font-medium block mb-1">Add a Note</label>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter note here"
              className="w-full p-2 border rounded"
              rows={3}
            />
            <button
              onClick={() => {
                if (!newNote.trim()) return;
                addNote(newNote);
                setNewNote("");
              }}
              disabled={!newNote.trim()}
              className="mt-2 px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
            >
              Add Note
            </button>
          </div>
        )}
      </section>

      {/* Activity History */}
      <section className="border-b py-4 text-sm space-y-4">
        <div className="uppercase text-purple-600 font-semibold">
          Activity History
        </div>

        <PolicyActivityTimeline
          activities={activities}
          loading={activityLoading}
          error={activityError}
        />
      </section>

      {/* Attachments */}
      <section className="py-4 text-sm space-y-4">
        <div className="uppercase text-purple-600 font-semibold">
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
          <div className="flex items-end space-x-4">
            <div>
              <label className="font-medium block">File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
            <div>
              <label className="font-medium block">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="p-2 border rounded"
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
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Add Attachment
            </button>
          </div>
        )}
      </section>

      {/* Modals */}
      <CancellationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        policyId={id!}
        policyNumber={p.policyNumber!}
        paymentHistory={p.paymentHistory || []}
        onSuccess={() => {
          window.location.reload();
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
          window.location.reload();
        }}
      />
    </div>
  );
};

export default PolicyDetailsPage;
