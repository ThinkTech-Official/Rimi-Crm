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
import { useLanguage } from "../context/LanguageContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
import Spinner from "../components/Spinner";
import DatePicker from "../components/DatePicker";
import {
  fmtDate,
  fmtDateDisplay,
  calcAge,
  fmtCurrency,
  PRODUCT_FIELDS_CONFIG,
  DEFAULT_FIELDS_CONFIG,
} from "./PolicyDetailsConfig";
import { RelationToPrimaryApplicant } from "../utils/sharedConstants";
import ChargeConfirmationModal from "../components/ChargeConfirmationModal";
import ModificationConfirmModal from "../components/ModificationConfirmModal";
import MonthlyCatchUpModal from "../components/MonthlyCatchUpModal";

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

interface PolicyFieldProps {
  label: string;
  field: keyof PolicyDetail | (keyof PolicyDetail)[];
  type?: "text" | "email" | "date" | "select" | "number";
  options?: string[] | { value: string; label: string }[];
  policy: PolicyDetail;
  editedPolicy: Partial<PolicyDetail>;
  isEditMode: boolean;
  onFieldChange: (field: string, value: any) => void;
  transform?: (value: any, t: (key: string) => string) => React.ReactNode;
  product?: string;
  fieldErrors?: Record<string, string>;
  error?: string;
  id?: string;
}

const EDITABLE_FIELDS = [
  "language",
  "firstName",
  "lastName",
  "gender",
  "email",
  "additionalEmail",
  "phoneNumber",
  "street",
  "street2",
  "city",
  "province",
  "postalCode",
  "effectiveDate",
  "countryCode",
  "countryOfOrigin",
  "expiryDate",
  "destination",
  "destinationProvince",
  "destProv",
  // "applicantTravelThroughUs",
  // "usTravelDays",
  "applicantOnSuperVisa",
  "superVisa",
  "deductible",
  "coverage",
  "applicantInCanada",
  "relation",
  "beneficiaryName",
  "beneficiaryRelation",
  "tripCost",
  "legalGuardianName",
  "superVisaYears",
  // "applicantTravelThroughUs",
  // "travelingThroughUS",
];

const PRODUCT_RULES: Record<
  string,
  {
    maxAge: number;
    minAgeDays: number;
    minPhone: number;
    maxPhone: number;
    requiredFields?: string[];
  }
> = {
  SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL: {
    maxAge: 86,
    minAgeDays: 15,
    minPhone: 10,
    maxPhone: 15,
    requiredFields: ["destination"],
  },
  SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA: {
    maxAge: 65,
    minAgeDays: 15,
    minPhone: 10,
    maxPhone: 15,
    // requiredFields: ["destination"],
    requiredFields: ["destProv"],
  },
  RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL: {
    maxAge: 80,
    minAgeDays: 15,
    minPhone: 10,
    maxPhone: 10,
    requiredFields: ["province"],
  },
  RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL: {
    maxAge: 86,
    minAgeDays: 15,
    minPhone: 10,
    maxPhone: 10,
    requiredFields: ["provinceStateResidence"],
  },
};

const PolicyField: React.FC<PolicyFieldProps> = ({
  label,
  field,
  type = "text",
  options,
  policy,
  editedPolicy,
  isEditMode,
  onFieldChange,
  transform,
  product,
  fieldErrors,
  error: manualError,
  id,
}) => {
  const { t, language: currentLang } = useLanguage();

  const getActiveKeyAndValue = () => {
    const fields = Array.isArray(field) ? field : [field];

    // Find the first field that actually exists in the policy data
    // We want to keep updating the SAME key throughout the edit session
    let firstExistingKey = fields[0];
    for (const f of fields) {
      if ((policy as any)[f] !== undefined && (policy as any)[f] !== null) {
        firstExistingKey = f;
        break;
      }
    }

    const value =
      editedPolicy[firstExistingKey] ?? (policy as any)[firstExistingKey];
    return { value, key: firstExistingKey as string };
  };

  let { value: rawValue, key: activeKey } = getActiveKeyAndValue();
  const error =
    manualError || (fieldErrors ? fieldErrors[activeKey] : undefined);

  // Handle Default Values
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    const fieldArray = Array.isArray(field)
      ? (field as string[])
      : [field as string];
    if (fieldArray.includes("salesChannel")) {
      rawValue = "Online";
    } else if (fieldArray.includes("language")) {
      rawValue = currentLang;
    }
  }

  let isFieldEditable = EDITABLE_FIELDS.includes(activeKey);

  // Special case: usTravelDays is only editable if travelingThroughUS is "yes"
  if (activeKey === "usTravelDays") {
    const usTravelVal =
      editedPolicy.applicantTravelThroughUs ??
      (policy as any).applicantTravelThroughUs;
    if (usTravelVal !== "yes") {
      isFieldEditable = false;
    }
  }

  // Special case: Destination is NOT editable for non-medical travel
  if (
    activeKey === "destination" &&
    product === "RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL"
  ) {
    isFieldEditable = false;
  }
  // if(
  //   activeKey === "expiryDate" &&
  //   product === "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA" || activeKey === "expiryDate" &&
  //   product === "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL"
  // ) {
  //   isFieldEditable = false;
  // }

  if (isEditMode && isFieldEditable) {
    if (type === "select") {
      return (
        <div className="min-w-0">
          <div className="font-semibold text-base mb-1">{t(label)}</div>
          <div className="relative">
            <select
              id={id || activeKey}
              value={String(rawValue ?? "")}
              onChange={(e) => onFieldChange(activeKey, e.target.value)}
              className="input-primary appearance-none pr-10 cursor-pointer"
            >
              {!options?.some((opt) =>
                typeof opt === "string" ? opt === "" : opt.value === "",
              ) && <option value="">{t("Please select...")}</option>}
              {options?.map((opt) => {
                const isString = typeof opt === "string";
                const optValue = isString ? opt : opt.value;
                const optLabel = isString ? opt : opt.label;
                return (
                  <option key={optValue} value={optValue}>
                    {t(optLabel)}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{t(error)}</p>}
        </div>
      );
    }
    if (type === "date") {
      return (
        <div className="min-w-0">
          <DatePicker
            id={id || activeKey}
            label={t(label)}
            value={rawValue ? (rawValue as string).split("T")[0] : ""}
            onChange={(val) => onFieldChange(activeKey, val)}
            error={error ? t(error) : undefined}
            isDisabled={
              // (activeKey === "effectiveDate" && policy.status === "ACTIVE") ||
              // (activeKey === "expiryDate" && policy.status === "ACTIVE") ||
              activeKey === "dateOfBirth" && policy.status === "ACTIVE"
            }
            // minDate={
            //   activeKey === "effectiveDate"
            //     ? (() => {
            //         const tomorrow = new Date();
            //         tomorrow.setDate(tomorrow.getDate() + 1);
            //         return tomorrow;
            //       })()
            //     : undefined
            // }

            // ----- new test code -----

            minDate={
              activeKey === "effectiveDate"
                ? (() => {
                    if (policy.status === "ACTIVE" && policy.effectiveDate) {
                      // ACTIVE: forward-only slide — minimum is day after current effective date
                      const currentEff = new Date(
                        policy.effectiveDate.toString(),
                      );
                      currentEff.setDate(currentEff.getDate() + 1);
                      return currentEff;
                    }
                    // SOLD: minimum is tomorrow
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    return tomorrow;
                  })()
                : undefined
            }

            // ------------
          />
        </div>
      );
    }
    return (
      <div className="min-w-0">
        <div className="font-semibold text-base">{t(label)}</div>
        <input
          id={id || activeKey}
          type={type}
          value={(rawValue ?? "") as string}
          onChange={(e) => onFieldChange(activeKey, e.target.value)}
          className={`input-primary ${error ? "border-red-500" : ""}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{t(error)}</p>}
      </div>
    );
  }

  let displayValue: React.ReactNode;

  if (transform) {
    displayValue = transform(rawValue, t);
  } else {
    // Handle booleans and string booleans
    const v = String(rawValue ?? "").toLowerCase();
    if (rawValue === true || v === "true" || v === "yes" || v === "y") {
      displayValue = t("Yes");
    } else if (rawValue === false || v === "false" || v === "no" || v === "n") {
      displayValue = t("No");
    } else if (typeof rawValue === "string") {
      displayValue = t(rawValue);
    } else {
      displayValue = rawValue;
    }
  }

  if (
    displayValue === null ||
    displayValue === undefined ||
    displayValue === "" ||
    displayValue === "-"
  ) {
    displayValue = "-";
  }

  const isCurrency = (value: string) => {
    const valuesToCheck = ["Coverage", "Deductible", "Amount"];
    return valuesToCheck.includes(t(value));
  };

  return (
    <div className="min-w-0">
      <div className="font-semibold text-base break-words">{t(label)}</div>
      <div className="text-sm text-[#6F6B7D] break-words">
        {isCurrency(t(label))
          ? fmtCurrency(Number(displayValue))
          : displayValue}
      </div>
    </div>
  );
};

const PolicyDetailsPage: React.FC = () => {
  const { t } = useLanguage();
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

  const [showModificationConfirmModal, setShowModificationConfirmModal] =
    useState(false);

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
  } = useFulfillment(id!, triggerNotification);

  const [to, setTo] = useState(p?.email || "");
  const [cc, setCc] = useState("");
  const [agentEmail, setAgentEmail] = useState(p?.agentCode + "@example.com");

  const [showCancelModal, setShowCancelModal] = useState(false);

  // Card update
  const [showUpdateCardModal, setShowUpdateCardModal] = useState(false);

  const {
    loading: _refundLoading,
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
    [],
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [applicantErrors, setApplicantErrors] = useState<
    Record<string, string>[]
  >([]);

  const {
    loading: modifyLoading,
    error: modifyError,
    modifyPolicy,
    calculateRefund,
    calculateModificationPreview,
  } = useModifyPolicy();

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundData, setRefundData] = useState<Partial<RefundData> | null>(
    null,
  );

  const [showChargeModal, setShowChargeModal] = useState(false);
  const [chargeData, setChargeData] = useState<{
    chargeAmount: number;
    originalPremium: number;
    newPremium: number;
    premiumDifference: number;
  } | null>(null);

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumData] = useState<any>(null);

  const [showMonthlyCatchUpModal, setShowMonthlyCatchUpModal] = useState(false);
  const [monthlyCatchUpModalData, setMonthlyCatchUpModalData] = useState<{
    catchUpAmount: number;
    oldMonthly: number;
    newMonthly: number;
    paidRegularCount: number;
    premiumDifference: number;
  } | null>(null);

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

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center gap-2 mt-10">
        <Spinner className="h-8 w-8" />
        <p className="text-center">{t("Loading...")}</p>
      </div>
    );
  if (error)
    return <p className="text-red-600 text-center py-10">{t(error)}</p>;
  if (!p) return <p className="text-center py-10">{t("No policy found.")}</p>;

  const history = p.paymentHistory ?? [];

  // BUTTON VISIBILITY

  const canModify = p.status === "SOLD" || p.status === "ACTIVE";
  const canCancel = p.status !== "CANCELLED" && p.status !== "PAUSED";

  // helper to check if policy can update card
  const canUpdateCard =
    p.paymentOption === "monthly-installments" &&
    p.status !== "CANCELLED" &&
    p.stripeSubscriptionScheduleId &&
    p.status !== "PAUSED";

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
    const svStatus = p.applicantOnSuperVisa || p.superVisa;
    const initialPolicy: Partial<PolicyDetail> = { ...p };
    if ((svStatus === "yes" || svStatus === "YES") && !p.superVisaYears) {
      initialPolicy.superVisaYears = "1";
    }
    setEditedPolicy(initialPolicy);
    setEditedApplicants([...p.applicants]);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedPolicy({});
    setEditedApplicants([]);
  };

  const fieldsConfig =
    p.product &&
    PRODUCT_FIELDS_CONFIG[p.product as keyof typeof PRODUCT_FIELDS_CONFIG]
      ? PRODUCT_FIELDS_CONFIG[p.product as keyof typeof PRODUCT_FIELDS_CONFIG]
      : DEFAULT_FIELDS_CONFIG;

  const handleFieldChange = (field: string, value: any) => {
    const updates: Record<string, any> = { [field]: value };

    if (field === "applicantOnSuperVisa" || field === "superVisa") {
      if (value === "yes") {
        const currentData = { ...p, ...editedPolicy };
        const effectiveDate = currentData.effectiveDate?.toString();
        const years = editedPolicy.superVisaYears || p.superVisaYears || "1";
        if (effectiveDate) {
          const effDate = new Date(effectiveDate);
          const expDate = new Date(effDate);
          expDate.setDate(effDate.getDate() + (Number(years) || 1) * 365 - 1);
          updates.expiryDate = expDate.toISOString().split("T")[0];
        }
      } else {
        updates.superVisaYears = "";
      }
    }

    if (field === "superVisaYears") {
      const currentData = { ...p, ...editedPolicy };
      const superVisaStatus =
        editedPolicy.applicantOnSuperVisa ||
        editedPolicy.superVisa ||
        p.applicantOnSuperVisa ||
        p.superVisa;

      if (superVisaStatus === "yes" || superVisaStatus === "YES") {
        const effectiveDate = currentData.effectiveDate?.toString();
        if (effectiveDate && value) {
          const effDate = new Date(effectiveDate);
          const expDate = new Date(effDate);
          expDate.setDate(effDate.getDate() + (Number(value) || 1) * 365 - 1);
          updates.expiryDate = expDate.toISOString().split("T")[0];
        }
      }
    }

    if (
      (field === "travelingThroughUS" ||
        field === "applicantTravelThroughUs") &&
      value === "no"
    ) {
      updates.usTravelDays = ""; // Clear or set to 0.
    }

    setEditedPolicy((prev) => ({ ...prev, ...updates }));
    // Clear error for this field
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleApplicantChange = (index: number, field: string, value: any) => {
    setEditedApplicants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    // Clear error
    if (applicantErrors[index] && applicantErrors[index][field]) {
      setApplicantErrors((prev) => {
        const updated = [...prev];
        const newAppErrors = { ...updated[index] };
        delete newAppErrors[field];
        updated[index] = newAppErrors;
        return updated;
      });
    }
  };

  const calculateDays = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  };

  const validateModification = (): {
    valid: boolean;
    fieldErrors: Record<string, string>;
    applicantErrors: Record<string, string>[];
  } => {
    const data = { ...p, ...editedPolicy };
    const effectiveDate = data.effectiveDate?.toString() || "";
    const expiryDate = data.expiryDate?.toString() || "";
    const today = new Date().toISOString().split("T")[0];

    const errors: Record<string, string> = {};
    const appErrorsList: Record<string, string>[] = [];

    const product = p.product || "";
    const rules = PRODUCT_RULES[product as keyof typeof PRODUCT_RULES] || {
      maxAge: 86,
      minAgeDays: 15,
      minPhone: 10,
      maxPhone: 10,
    };

    // 1. Basic Info Validations
    const basicFields = [
      { key: "firstName", label: "First Name", max: 100 },
      { key: "lastName", label: "Last Name", max: 100 },
      { key: "gender", label: "Gender" },
      { key: "email", label: "Email Address", max: 100 },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "street", label: "Address Line 1", max: 100 },
      { key: "street2", label: "Address Line 2", max: 100, optional: true },
      { key: "city", label: "City" },
      { key: "province", label: "Province" },
      { key: "countryCode", label: "Country" },
      { key: "postalCode", label: "Postal Code" },
      {
        key: "provinceStateResidence",
        label: "Province/State of Residence",
        optional: true,
      },
      {
        key: "beneficiaryName",
        label: "Beneficiary Name",
        max: 100,
        optional: true,
      },
      {
        key: "beneficiaryRelation",
        label: "Beneficiary Relation",
        optional: true,
      },
      { key: "destination", label: "Destination province", optional: true },
      {
        key: "destinationProvince",
        label: "Destination province",
        optional: true,
      },
      { key: "destProv", label: "Destination province", optional: true },
    ];

    // Add product-specific required fields
    if (rules.requiredFields) {
      for (const rf of rules.requiredFields) {
        const field = basicFields.find((bf) => bf.key === rf);
        if (field) field.optional = false;
      }
    }

    for (const f of basicFields) {
      if (
        f.optional &&
        ((data as any)[f.key] === undefined || (data as any)[f.key] === null)
      )
        continue;
      const val = (data as any)[f.key];
      const maxLen = f.max || 60;

      if (!val || (typeof val === "string" && val.trim() === "")) {
        errors[f.key] = `${t(f.label)} ${t("is required.")}`;
      } else if (typeof val === "string" && val.length > maxLen) {
        errors[f.key] =
          `${t(f.label)} ${t("cannot exceed")} ${maxLen} ${t("characters.")}`;
      }
    }

    // 2. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email) && !errors.email) {
      errors.email = t("Please enter a valid email address.");
    }

    // 3. Phone Number Validation (Regex according to normal product form)
    if (data.phoneNumber && !errors.phoneNumber) {
      const cleanPhone = data.phoneNumber?.replace(/[^0-9]/g, "");
      if (!/^[0-9]*$/.test(data.phoneNumber)) {
        errors.phoneNumber = t("Phone number must contain digits only");
      } else if (cleanPhone.length < rules.minPhone) {
        errors.phoneNumber = `${t("Phone number must be at least")} ${rules.minPhone} ${t("digits")}`;
      } else if (cleanPhone.length > rules.maxPhone) {
        errors.phoneNumber = `${t("Phone number must be at most")} ${rules.maxPhone} ${t("digits")}`;
      }
    }

    // 4. Effective Date validation
    if (p.status === "SOLD" && editedPolicy.effectiveDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const selDate = new Date(editedPolicy.effectiveDate);
      selDate.setHours(0, 0, 0, 0);

      if (selDate.getTime() < tomorrow.getTime()) {
        errors.effectiveDate = t("Effective date must be tomorrow or later.");
      }
    }

    // if (
    //   p.status === "ACTIVE" &&
    //   editedPolicy.effectiveDate &&
    //   editedPolicy.effectiveDate !== p.effectiveDate!.toString()
    // ) {
    //   errors.effectiveDate = t(
    //     "Cannot change effective date for active policies.",
    //   );
    // }
    // if (
    //   p.status === "ACTIVE" &&
    //   editedPolicy.effectiveDate &&
    //   editedPolicy.effectiveDate !== fmtDate(p.effectiveDate?.toString())
    // ) {
    //   errors.effectiveDate = t(
    //     "Effective date cannot be changed for active policies.",
    //   );
    // }

    // ACTIVE effective date: slide validation handled together with expiry below

    // ACTIVE: slide-only — same coverage length, forward direction only
    if (
      p.status === "ACTIVE" &&
      (editedPolicy.effectiveDate || editedPolicy.expiryDate)
    ) {
      const origEff = fmtDate(p.effectiveDate?.toString()) || "";
      const origExp = fmtDate(p.expiryDate?.toString()) || "";
      const newEff = editedPolicy.effectiveDate || origEff;
      const newExp = editedPolicy.expiryDate || origExp;

      const origLen = calculateDays(origEff, origExp);
      const newLen = calculateDays(newEff, newExp);

      if (newLen > origLen) {
        errors.expiryDate = t(
          "Coverage length cannot be increased for active policies.",
        );
      } else if (newLen < origLen) {
        errors.expiryDate = t(
          "Coverage length cannot be reduced for active policies. To process an early return, please use the Cancel Policy action instead.",
        );
      } else if (new Date(newEff) < new Date(origEff)) {
        errors.effectiveDate = t(
          "Dates can only be moved forward for active policies, not backward.",
        );
      }
    }

    // Age validation on primary (if DOB or Effective Date changed)
    if (data.dateOfBirth && effectiveDate) {
      const dobDate = new Date(data.dateOfBirth.toString());
      const effDate = new Date(effectiveDate);
      const today0 = new Date();
      today0.setHours(0, 0, 0, 0);

      if (dobDate > today0) {
        errors.dateOfBirth = t("Date of birth cannot be in the future");
      } else if (
        p.status === "SOLD" ||
        editedPolicy.dateOfBirth ||
        editedPolicy.effectiveDate
      ) {
        const ageDiffMs = effDate.getTime() - dobDate.getTime();
        const ageDate = new Date(ageDiffMs);
        const years = Math.abs(ageDate.getUTCFullYear() - 1970);
        const days = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24));

        if (days < rules.minAgeDays || years >= rules.maxAge) {
          errors.dateOfBirth = `${t("Age must be at least")} ${rules.minAgeDays} ${t("days and less than")} ${rules.maxAge} ${t("years according to the effective date.")}`;
        }
      }
    }

    // Legal Guardian check for Secure Study if under 18
    if (
      product === "SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA" &&
      data.dateOfBirth &&
      effectiveDate
    ) {
      const dobDate = new Date(data.dateOfBirth.toString());
      const effDate = new Date(effectiveDate);
      const ageDiffMs = effDate.getTime() - dobDate.getTime();
      const ageDate = new Date(ageDiffMs);
      const years = Math.abs(ageDate.getUTCFullYear() - 1970);

      if (years < 18 && !data.legalGuardianName?.trim()) {
        errors.legalGuardianName = t(
          "Legal guardian name is required for applicants under 18.",
        );
      }
    }

    // 5. Expiry Date validation
    if (!expiryDate || !effectiveDate || expiryDate <= effectiveDate) {
      errors.expiryDate = t("Expiry date must be after effective date.");
    }

    // if (p.status === "ACTIVE" && editedPolicy.expiryDate) {
    //   if (editedPolicy.expiryDate > p.expiryDate!.toString()) {
    //     errors.expiryDate = t(
    //       "Cannot extend coverage for active policies. Only early return is allowed.",
    //     );
    //   }
    // }

    // if (
    //   p.status === "ACTIVE" &&
    //   editedPolicy.expiryDate &&
    //   editedPolicy.expiryDate !== fmtDate(p.expiryDate?.toString())
    // ) {
    //   errors.expiryDate = t(
    //     "Expiry date cannot be changed for active policies.",
    //   );
    // }

    // Old ACTIVE expiry block removed  slide-only validation now handled
    // by the new ACTIVE block above which checks covLen and direction correctly.

    const resolvedEffective =
      editedPolicy.effectiveDate || fmtDate(p.effectiveDate?.toString()) || "";
    const resolvedExpiry =
      editedPolicy.expiryDate || fmtDate(p.expiryDate?.toString()) || "";

    if (resolvedEffective && resolvedExpiry) {
      if (new Date(resolvedExpiry) <= new Date(resolvedEffective)) {
        errors.expiryDate = t("Expiry date must be after effective date.");
      }
    }

    // if (
    //   p.product === "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL" &&
    //   p.paymentOption === "monthly-installments" &&
    //   resolvedEffective &&
    //   resolvedExpiry
    // ) {
    //   const newCovLen = calculateDays(resolvedEffective, resolvedExpiry);
    //   if (newCovLen < 365) {
    //     errors.expiryDate = t(
    //       "Coverage length cannot be reduced below 365 days for monthly installment policies.",
    //     );
    //   }
    // }

    // RVC Monthly 365-day frontend check removed SOLD has full freedom on length.
    // Super Visa check above handles the legitimate 365-day constraint.

    // 6. Super Visa check
    const newCoverageLength = calculateDays(effectiveDate, expiryDate);
    const superVisaStatus =
      editedPolicy.applicantOnSuperVisa || p.applicantOnSuperVisa;

    if (superVisaStatus === "YES" || superVisaStatus === "yes") {
      if (newCoverageLength < 365) {
        errors.expiryDate = `${t("This policy is marked as Super Visa but coverage is only")} ${newCoverageLength} ${t('days (less than 365). Please change "Are Applicants Travelling on a Super Visa?" to "No" in Coverage Details section before saving.')}`;
      }

      const years = editedPolicy.superVisaYears ?? p.superVisaYears;
      if (!years || years === "") {
        errors.superVisaYears = t("Super Visa Duration is required.");
      }
    }

    // 7. Applicant Validations
    let hasAppErrors = false;
    for (let i = 0; i < editedApplicants.length; i++) {
      const app = editedApplicants[i];
      const singleAppErrors: Record<string, string> = {};

      if (!app.firstName?.trim()) {
        singleAppErrors.firstName = t("First Name is required.");
      } else if (app.firstName.length > 100) {
        singleAppErrors.firstName = `${t("First Name cannot exceed")} 100 ${t("characters.")}`;
      }

      if (!app.lastName?.trim()) {
        singleAppErrors.lastName = t("Last Name is required.");
      } else if (app.lastName.length > 100) {
        singleAppErrors.lastName = `${t("Last Name cannot exceed")} 100 ${t("characters.")}`;
      }

      if (!app.dateOfBirth) {
        singleAppErrors.dateOfBirth = t("Date of Birth is required.");
      } else if (effectiveDate) {
        const dobDate = new Date(app.dateOfBirth.toString());
        const effDate = new Date(effectiveDate);
        const ageDiffMs = effDate.getTime() - dobDate.getTime();
        const ageDate = new Date(ageDiffMs);
        const years = Math.abs(ageDate.getUTCFullYear() - 1970);
        const days = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24));

        if (days < rules.minAgeDays || years >= rules.maxAge) {
          singleAppErrors.dateOfBirth = `${t("Age must be at least")} ${rules.minAgeDays} ${t("days and less than")} ${rules.maxAge} ${t("years according to the effective date.")}`;
        }
      }

      if (!app.gender) {
        singleAppErrors.gender = t("Gender is required.");
      }

      if (!app.relation) {
        singleAppErrors.relation = t(
          "Relationship to Primary Applicant is required.",
        );
      }

      appErrorsList.push(singleAppErrors);
      if (Object.keys(singleAppErrors).length > 0) hasAppErrors = true;
    }

    if (Object.keys(errors).length > 0 || hasAppErrors) {
      console.log("Validation Errors:", {
        fieldErrors: errors,
        applicantErrors: appErrorsList,
      });
    }

    return {
      valid: Object.keys(errors).length === 0 && !hasAppErrors,
      fieldErrors: errors,
      applicantErrors: appErrorsList,
    };
  };

  const handleSaveChanges = async () => {
    // Validate
    const validation = validateModification();
    setFieldErrors(validation.fieldErrors);
    setApplicantErrors(validation.applicantErrors);

    if (!validation.valid) {
      // Scroll to error
      setTimeout(() => {
        const firstErrKey = Object.keys(validation.fieldErrors)[0];
        if (firstErrKey) {
          const el = document.getElementById(firstErrKey);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus({ preventScroll: true });
          }
        } else {
          for (let i = 0; i < validation.applicantErrors.length; i++) {
            const firstAppField = Object.keys(validation.applicantErrors[i])[0];
            if (firstAppField) {
              const el = document.getElementById(
                `applicant-${i}-${firstAppField}`,
              );
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.focus({ preventScroll: true });
                break;
              }
            }
          }
        }
      }, 100);

      triggerNotification({
        message: t("Please fill all fields correctly before saving."),
        type: "warning",
      });
      return;
    }

    ////////////////////================

    // const resolvedEffective =
    //   editedPolicy.effectiveDate || fmtDate(p.effectiveDate?.toString()) || "";
    // const resolvedExpiry =
    //   editedPolicy.expiryDate || fmtDate(p.expiryDate?.toString()) || "";

    // // Check if dates changed
    // const datesChanged =
    //   resolvedEffective !== fmtDate(p.effectiveDate?.toString()) ||
    //   resolvedExpiry !== fmtDate(p.expiryDate?.toString());

    // ----- New test code ----------

    const resolvedEffective =
      fmtDate(
        editedPolicy.effectiveDate?.toString() || p.effectiveDate?.toString(),
      ) || "";
    const resolvedExpiry =
      fmtDate(
        editedPolicy.expiryDate?.toString() || p.expiryDate?.toString(),
      ) || "";

    // Check if dates changed — both sides now consistently YYYY-MM-DD
    const datesChanged =
      resolvedEffective !== fmtDate(p.effectiveDate?.toString()) ||
      resolvedExpiry !== fmtDate(p.expiryDate?.toString());

    //---------------

    // ===================

    // Product 3: applicantTravelThroughUs change affects premium
    if (
      p.product === "RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL" &&
      p.status === "SOLD" &&
      !datesChanged
    ) {
      const travelThroughUsChanged =
        (editedPolicy.applicantTravelThroughUs !== undefined &&
          editedPolicy.applicantTravelThroughUs !==
            p.applicantTravelThroughUs) ||
        (editedPolicy.travelingThroughUS !== undefined &&
          editedPolicy.travelingThroughUS !== p.applicantTravelThroughUs);

      if (travelThroughUsChanged) {
        const preview = await calculateModificationPreview(
          id!,
          resolvedEffective,
          resolvedExpiry,
          {
            applicantTravelThroughUs:
              editedPolicy.applicantTravelThroughUs ??
              editedPolicy.travelingThroughUS ??
              p.applicantTravelThroughUs,
          },
        );

        if (!preview) {
          triggerNotification({
            message: t(
              "Failed to calculate premium preview. Please try again.",
            ),
            type: "error",
          });
          return;
        }

        if (preview.difference > 0) {
          setRefundData({
            originalExpiryDate: resolvedExpiry,
            newExpiryDate: resolvedExpiry,
            daysToRefund: 0,
            maxRefundable: preview.difference,
          });
          setShowRefundModal(true);
          return;
        }

        if (preview.difference < 0) {
          setChargeData({
            chargeAmount: Math.abs(preview.difference),
            originalPremium: preview.originalPremium,
            newPremium: preview.newPremium,
            premiumDifference: preview.difference,
          });
          setShowChargeModal(true);
          return;
        }

        // No premium change — still need to save
        setShowModificationConfirmModal(true);
        return;
      }
    }

    // ====================

    // Product 4: non-date field changes that affect premium
    if (
      p.product === "RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL" &&
      p.status === "SOLD" &&
      !datesChanged
    ) {
      const tripCostChanged =
        editedPolicy.tripCost !== undefined &&
        editedPolicy.tripCost !== p.tripCost;
      const deluxeChanged =
        editedPolicy.tripCancellationDeluxe !== undefined &&
        editedPolicy.tripCancellationDeluxe !== p.tripCancellationDeluxe;

      if (tripCostChanged || deluxeChanged) {
        const resolvedEffective = fmtDate(p.effectiveDate?.toString()) || "";
        const resolvedExpiry = fmtDate(p.expiryDate?.toString()) || "";

        const preview = await calculateModificationPreview(
          id!,
          resolvedEffective,
          resolvedExpiry,
          {
            tripCost: editedPolicy.tripCost ?? p.tripCost,
            tripCancellationDeluxe:
              editedPolicy.tripCancellationDeluxe ?? p.tripCancellationDeluxe,
          },
        );

        if (!preview) {
          triggerNotification({
            message: t(
              "Failed to calculate premium preview. Please try again.",
            ),
            type: "error",
          });
          return;
        }

        if (preview.difference > 0) {
          setRefundData({
            originalExpiryDate: resolvedExpiry,
            newExpiryDate: resolvedExpiry,
            daysToRefund: 0,
            maxRefundable: preview.difference,
          });
          setShowRefundModal(true);
          return;
        }

        if (preview.difference < 0) {
          setChargeData({
            chargeAmount: Math.abs(preview.difference),
            originalPremium: preview.originalPremium,
            newPremium: preview.newPremium,
            premiumDifference: preview.difference,
          });
          setShowChargeModal(true);
          return;
        }

        // No premium change — still need to save the field changes
        setShowModificationConfirmModal(true);
        return;
      }
    }

    // No date changes, no premium-affecting field changes — save directly
    // await performSave();

    // if (datesChanged && p.status === "SOLD") {
    //   // Block monthly date changes immediately with clear message
    //   if (p.paymentOption === "monthly-installments") {
    //     triggerNotification({
    //       message: t(
    //         "Date changes for monthly installment policies require additional processing. Please contact support.",
    //       ),
    //       type: "warning",
    //     });
    //     return;
    //   }

    //   // Get premium preview from backend
    //   const preview = await calculateModificationPreview(
    //     id!,
    //     resolvedEffective,
    //     resolvedExpiry,
    //   );

    //   if (!preview) {
    //     triggerNotification({
    //       message: t("Failed to calculate premium preview. Please try again."),
    //       type: "error",
    //     });
    //     return;
    //   }

    //   if (
    //     preview.difference > 0 &&
    //     p.paymentOption !== "monthly-installments"
    //   ) {
    //     // Premium decreased — show refund modal
    //     setRefundData({
    //       originalExpiryDate: fmtDate(p.expiryDate?.toString()),
    //       newExpiryDate: resolvedExpiry,
    //       daysToRefund: preview.originalCovLen - preview.newCovLen,
    //       maxRefundable: preview.difference,
    //     });
    //     setShowRefundModal(true);
    //     return;
    //   }

    //   if (
    //     preview.difference < 0 &&
    //     p.paymentOption !== "monthly-installments"
    //   ) {
    //     // Premium increased — show charge confirmation modal
    //     setChargeData({
    //       chargeAmount: Math.abs(preview.difference),
    //       originalPremium: preview.originalPremium,
    //       newPremium: preview.newPremium,
    //       premiumDifference: preview.difference,
    //     });
    //     setShowChargeModal(true);
    //     return;
    //   }

    //   // No premium change — just save with premiumDifference = 0
    //   // await performSave(undefined, 0);
    //   setShowModificationConfirmModal(true);
    //   return;
    // }

    // new code ---------------------

    if (datesChanged && (p.status === "SOLD" || p.status === "ACTIVE")) {
      const isMonthly = p.paymentOption === "monthly-installments";

      const preview = await calculateModificationPreview(
        id!,
        resolvedEffective,
        resolvedExpiry,
      );

      if (!preview) {
        triggerNotification({
          message: t("Failed to calculate premium preview. Please try again."),
          type: "error",
        });
        return;
      }

      if (isMonthly) {
        // Monthly (SOLD and ACTIVE): show catch-up modal
        const catchUp = preview.catchUpAmount ?? 0;
        if (catchUp === 0) {
          // No catch-up needed — skip modal, save directly with 0
          await performSave(undefined, preview.difference, 0);
          return;
        }
        setMonthlyCatchUpModalData({
          catchUpAmount: catchUp,
          oldMonthly: preview.oldMonthly ?? 0,
          newMonthly: preview.newMonthly ?? 0,
          paidRegularCount: preview.paidRegularCount ?? 0,
          premiumDifference: preview.difference,
        });
        setShowMonthlyCatchUpModal(true);
        return;
      }

      // Lump sum (SOLD and ACTIVE): existing refund/charge modals
      if (preview.difference > 0) {
        setRefundData({
          originalExpiryDate: fmtDate(p.expiryDate?.toString()),
          newExpiryDate: resolvedExpiry,
          daysToRefund: preview.originalCovLen - preview.newCovLen,
          maxRefundable: preview.difference,
        });
        setShowRefundModal(true);
        return;
      }

      if (preview.difference < 0) {
        setChargeData({
          chargeAmount: Math.abs(preview.difference),
          originalPremium: preview.originalPremium,
          newPremium: preview.newPremium,
          premiumDifference: preview.difference,
        });
        setShowChargeModal(true);
        return;
      }

      // No premium change — confirm and save
      setShowModificationConfirmModal(true);
      return;
    }

    // ---------------------

    // No date changes — save directly
    await performSave();

    //

    //
  };

  // const handleModificationConfirm = async () => {
  //   setShowModificationConfirmModal(false);
  //   await performSave(undefined, 0);
  // };

  const handleModificationConfirm = async () => {
    setShowModificationConfirmModal(false);
    await performSave(undefined, 0);
  };

  const handleMonthlyCatchUpConfirm = async (signedAmount: number) => {
    if (!monthlyCatchUpModalData) return;
    setShowMonthlyCatchUpModal(false);
    await performSave(
      undefined,
      monthlyCatchUpModalData.premiumDifference,
      signedAmount,
    );
  };

  const performSave = async (
    refund?: RefundData,
    premiumDiff?: number,
    monthlyCatchUp?: number,
  ) => {
    const modifyData: ModifyPolicyData = {
      // Basic Info (Required)
      language: editedPolicy.language || p.language || "",
      firstName: editedPolicy.firstName || p.firstName || "",
      lastName: editedPolicy.lastName || p.lastName || "",
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
      countryOfOrigin: editedPolicy.countryOfOrigin ?? p.countryOfOrigin,
      postalCode: editedPolicy.postalCode || p.postalCode!,
      // expiryDate: editedPolicy.expiryDate || fmtDate(p.expiryDate?.toString()),
      expiryDate: fmtDate(editedPolicy.expiryDate?.toString() || p.expiryDate?.toString()) || "",
      destination: String(
        editedPolicy.destination ??
          editedPolicy.destinationProvince ??
          editedPolicy.destProv ??
          p.destination ??
          p.destinationProvince ??
          p.destProv ??
          "",
      ),
      deductible: String(editedPolicy.deductible || p.deductible || ""),

      // Conditional Main Info
      dateOfBirth:
        p.status === "SOLD"
          ? editedPolicy.dateOfBirth || fmtDate(p.dateOfBirth?.toString())
          : undefined,
      // effectiveDate:
      //   p.status === "SOLD" || p.status === "ACTIVE"
      //     ? editedPolicy.effectiveDate || fmtDate(p.effectiveDate?.toString())
      //     : undefined,

      effectiveDate:
        p.status === "SOLD" || p.status === "ACTIVE"
          ? fmtDate(editedPolicy.effectiveDate?.toString() || p.effectiveDate?.toString())
          : undefined,

      // Dynamic Product-Specific Fields
      tripCost: editedPolicy.tripCost ?? p.tripCost,
      dateBooked: editedPolicy.dateBooked || p.dateBooked,
      tripCancellationDeluxe:
        editedPolicy.tripCancellationDeluxe ?? p.tripCancellationDeluxe,
      applicantOnSuperVisa:
        editedPolicy.applicantOnSuperVisa || p.applicantOnSuperVisa,
      travelingThroughUS:
        editedPolicy.travelingThroughUS || p.travelingThroughUS,
      // applicantTravelThroughUs:
      //   editedPolicy.applicantTravelThroughUs || p.applicantTravelThroughUs,
      applicantTravelThroughUs:
        editedPolicy.applicantTravelThroughUs ?? p.applicantTravelThroughUs,

      usTravelDays: editedPolicy.usTravelDays ?? p.usTravelDays,
      numberOfDaysPerTrip:
        editedPolicy.numberOfDaysPerTrip ?? p.numberOfDaysPerTrip,
      plan: editedPolicy.plan || p.plan,
      beneficiaryName: editedPolicy.beneficiaryName ?? p.beneficiaryName,
      beneficiaryRelation:
        editedPolicy.beneficiaryRelation ?? p.beneficiaryRelation,
      relationshipToInsured:
        editedPolicy.relationshipToInsured ?? p.relationshipToInsured,

      legalGuardianName: editedPolicy.legalGuardianName ?? p.legalGuardianName,
      superVisaYears: editedPolicy.superVisaYears ?? p.superVisaYears,
      provinceStateResidence:
        editedPolicy.provinceStateResidence ?? p.provinceStateResidence,

      coverage: editedPolicy.coverage ?? p.coverage,
      applicantInCanada: editedPolicy.applicantInCanada ?? p.applicantInCanada,

      // Nested/Calculated
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
      premiumDifference: premiumDiff,
      monthlyCatchUpAmount: monthlyCatchUp,
      lastKnownUpdatedAt: new Date().toISOString(),
    };

    const result = await modifyPolicy(id!, modifyData);

    // if (result && result.success) {
    //   triggerNotification({ message: result.message, type: "success" });
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // } else {
    //   // triggerNotification({ message: `Error: ${modifyError}`, type: "error" });

    //   const errorMsg =
    //     modifyError || "Failed to modify policy. Please try again.";
    //   triggerNotification({ message: errorMsg, type: "error" });
    // }

    if (result && result.success) {
      triggerNotification({ message: result.message, type: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (result && !result.success) {
      triggerNotification({ message: result.message, type: "error" });
    } else {
      triggerNotification({
        message: "Failed to modify policy. Please try again.",
        type: "error",
      });
    }
  };

  const handleRefundConfirm = async (
    transactionFee: number,
    netRefund: number,
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
    await performSave(refundPayload, refundData.maxRefundable);
  };

  const handleChargeConfirm = async () => {
    if (!chargeData) return;
    setShowChargeModal(false);
    await performSave(undefined, chargeData.premiumDifference);
  };

  const handleCancelPolicy = () => {
    setShowCancelModal(true);
  };

  const handleRefund = async (paymentHistoryId: string, amount: number) => {
    if (!id) {
      triggerNotification({
        message: t("Policy ID not found"),
        type: "warning",
      });
      return;
    }

    const confirmMessage = `${t("Are you sure you want to refund the policy fee of")} ${amount}?\n\n${t("This action cannot be undone.")}`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    const result = await refundPolicyFee(
      id,
      paymentHistoryId,
      `Manual refund of policy fee`,
      "admin",
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
        message: t("Renewal not available for this policy"),
        type: "warning",
      });
      return;
    }

    navigate(`/renewals/${slug}?policyId=${id}`);
  };

  //

  // RENDER HELPERS

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
          {t(p.product?.replace(/_/g, " ") || "Policy Details")}
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
                {t("Reload")}
              </button>

              {canCancel && (
                <button
                  onClick={() => handleCancelPolicy()}
                  className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100"
                >
                  {t("Cancel Policy")}
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
                    {t("Split Policy")}
                  </button>
                )}
              {/* Update Card  */}
              {canUpdateCard && !isEditMode && (
                <button
                  onClick={() => setShowUpdateCardConfirmModal(true)}
                  className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
                >
                  {t("Update Card")}
                </button>
              )}
              {canModify && (
                <button
                  onClick={handleModifyClick}
                  className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
                >
                  {t("Modify Policy")}
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
                {t("Cancel")}
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
                disabled={modifyLoading}
              >
                {modifyLoading ? t("Saving...") : t("Save Changes")}
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
                <strong>{t("Edit Mode")}:</strong>{" "}
                {t(
                  'You are now editing this policy. Make your changes and click "Save Changes" when done.',
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Policy Information */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          {t("Policy Information")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm capitalize w-full">
          {fieldsConfig.policyInfo?.map((f) => (
            <PolicyField
              key={f.label}
              {...f}
              policy={p}
              editedPolicy={editedPolicy}
              isEditMode={isEditMode}
              onFieldChange={handleFieldChange}
              product={p.product}
              fieldErrors={fieldErrors}
            />
          ))}
        </div>
      </div>

      {/* Primary Insured */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          {t("Primary Insured Person")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
          {fieldsConfig.primaryInsured
            ?.filter((f) => f.label !== "Premium")
            .map((f) => (
              <PolicyField
                key={f.label}
                {...f}
                policy={p}
                editedPolicy={editedPolicy}
                isEditMode={isEditMode}
                onFieldChange={handleFieldChange}
                product={p.product}
                fieldErrors={fieldErrors}
              />
            ))}
          {!isEditMode && (
            <div className="min-w-0">
              <div className="font-semibold">{t("Age on Effective Date")}</div>
              <div className="text-sm text-[#6F6B7D] break-words">
                {calcAge(
                  editedPolicy.dateOfBirth || p.dateOfBirth?.toString(),
                  editedPolicy.effectiveDate || p.effectiveDate?.toString(),
                )}
              </div>
            </div>
          )}
          {fieldsConfig.primaryInsured
            ?.filter((f) => f.label === "Premium")
            .map((f) => (
              <PolicyField
                key={f.label}
                {...f}
                policy={p}
                editedPolicy={editedPolicy}
                isEditMode={isEditMode}
                onFieldChange={handleFieldChange}
                product={p.product}
                fieldErrors={fieldErrors}
              />
            ))}
        </div>
      </div>
      {p.healthQuestionnaire && (
        <HealthQuestionnaireSection questionnaire={p.healthQuestionnaire} />
      )}

      {/* Contact Information */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          {t("Contact Information")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
          {fieldsConfig.contactInfo?.map((f) => (
            <PolicyField
              key={f.label}
              {...f}
              policy={p}
              editedPolicy={editedPolicy}
              isEditMode={isEditMode}
              onFieldChange={handleFieldChange}
              product={p.product}
              fieldErrors={fieldErrors}
            />
          ))}
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
              {t("Insured Person")} {idx + 2}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
              {/* Individual Policy Number - Full Width */}
              <div className="min-w-0">
                <div className="font-semibold">
                  {t("Individual Policy Number")}
                </div>
                <div className="text-sm text-[#6F6B7D] break-words">
                  {a.individualPolicyNumber || a.policyNumber || "-"}
                </div>
              </div>

              <div className="min-w-0">
                <div className="font-semibold">{t("First Name")}</div>
                {isEditMode && EDITABLE_FIELDS.includes("firstName") ? (
                  <input
                    type="text"
                    value={a.firstName}
                    onChange={(e) =>
                      handleApplicantChange(idx, "firstName", e.target.value)
                    }
                    className={`input-primary w-full ${applicantErrors[idx]?.firstName ? "border-red-500" : ""}`}
                    id={`applicant-${idx}-firstName`}
                  />
                ) : (
                  <div className="text-sm text-[#6F6B7D] break-words">
                    {a.firstName || "-"}
                  </div>
                )}
                {isEditMode && applicantErrors[idx]?.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(applicantErrors[idx].firstName)}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <div className="font-semibold">{t("Last Name")}</div>
                {isEditMode && EDITABLE_FIELDS.includes("lastName") ? (
                  <input
                    type="text"
                    value={a.lastName}
                    onChange={(e) =>
                      handleApplicantChange(idx, "lastName", e.target.value)
                    }
                    className={`input-primary w-full ${applicantErrors[idx]?.lastName ? "border-red-500" : ""}`}
                    id={`applicant-${idx}-lastName`}
                  />
                ) : (
                  <div className="text-sm text-[#6F6B7D] break-words">
                    {a.lastName || "-"}
                  </div>
                )}
                {isEditMode && applicantErrors[idx]?.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(applicantErrors[idx].lastName)}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                {isEditMode &&
                EDITABLE_FIELDS.includes("dateOfBirth") &&
                p.status === "SOLD" ? (
                  <DatePicker
                    id={`applicant-${idx}-dateOfBirth`}
                    label={t("Date of Birth")}
                    value={
                      a.dateOfBirth
                        ? (a.dateOfBirth as string).split("T")[0]
                        : ""
                    }
                    onChange={(val) =>
                      handleApplicantChange(idx, "dateOfBirth", val)
                    }
                    error={
                      applicantErrors[idx]?.dateOfBirth
                        ? t(applicantErrors[idx].dateOfBirth)
                        : undefined
                    }
                  />
                ) : (
                  <>
                    <div className="font-semibold">{t("Date of Birth")}</div>
                    <div className="text-sm text-[#6F6B7D] break-words">
                      {fmtDate(a.dateOfBirth)}
                    </div>
                  </>
                )}
              </div>

              <div className="min-w-0">
                <div className="font-semibold">
                  {t("Age on Effective Date")}
                </div>
                <div className="text-sm text-[#6F6B7D] break-words">
                  {calcAge(a.dateOfBirth, p.effectiveDate?.toString())}
                </div>
              </div>

              <div className="min-w-0">
                <div className="font-semibold">{t("Gender")}</div>
                {isEditMode && EDITABLE_FIELDS.includes("gender") ? (
                  <select
                    value={a.gender || ""}
                    onChange={(e) =>
                      handleApplicantChange(idx, "gender", e.target.value)
                    }
                    className={`input-primary w-full ${applicantErrors[idx]?.gender ? "border-red-500" : ""}`}
                    id={`applicant-${idx}-gender`}
                  >
                    <option value="">{t("Please select")}</option>
                    <option value="Male">{t("Male")}</option>
                    <option value="Female">{t("Female")}</option>
                    <option value="Non-Binary">{t("Non-Binary")}</option>
                    <option value="Undeclared">{t("Undeclared")}</option>
                  </select>
                ) : (
                  <div className="text-sm text-[#6F6B7D] break-words">
                    {t(a.gender || "")}
                  </div>
                )}
                {isEditMode && applicantErrors[idx]?.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(applicantErrors[idx].gender)}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <div className="font-semibold">
                  {t("Relationship to Primary Applicant")}
                </div>
                {isEditMode && EDITABLE_FIELDS.includes("relation") ? (
                  <select
                    className={`input-primary w-full cursor-pointer`}
                    name="relation"
                    value={a.relation || ""}
                    onChange={(e) =>
                      handleApplicantChange(idx, "relation", e.target.value)
                    }
                    id={`applicant-${idx}-relation`}
                  >
                    {RelationToPrimaryApplicant.map((relation) => (
                      <option key={relation.value} value={relation.value}>
                        {t(relation.label)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-[#6F6B7D] break-words">
                    {t(a.relation || "")}
                  </div>
                )}
                {isEditMode && applicantErrors[idx]?.relation && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(applicantErrors[idx].relation)}
                  </p>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-semibold">
                  {t("Coverage for Stable Pre-Existing Medical Condition")}
                </div>
                {isEditMode && EDITABLE_FIELDS.includes("PreExCoverage") ? (
                  <select
                    value={a.PreExCoverage || ""}
                    onChange={(e) =>
                      handleApplicantChange(
                        idx,
                        "PreExCoverage",
                        e.target.value,
                      )
                    }
                    className="input-primary w-full"
                  >
                    <option value="">{t("No")}</option>
                    <option value="yes">{t("Yes")}</option>
                  </select>
                ) : (
                  <div className="text-sm text-[#6F6B7D] break-words">
                    {a.PreExCoverage === "yes" ||
                    String(a.PreExCoverage) === "true"
                      ? t("Yes")
                      : t("No")}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-semibold">{t("Premium")}</div>
                <div className="text-sm break-words text-[#6F6B7D]">
                  {fmtCurrency(a.premium)}
                </div>
              </div>
            </div>
            {a.healthQuestionnaire && (
              <HealthQuestionnaireSection
                questionnaire={a.healthQuestionnaire}
              />
            )}
          </div>
        ))}

      {/* Coverage Details / Trip Information */}
      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          {t("Coverage Details")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
          {fieldsConfig.coverageDetails
            ?.filter((f) => {
              const fieldKey = Array.isArray(f.field) ? f.field[0] : f.field;
              if (fieldKey === "superVisaYears") {
                if (!isEditMode) return false;
                const sv =
                  editedPolicy.applicantOnSuperVisa ||
                  editedPolicy.superVisa ||
                  p.applicantOnSuperVisa ||
                  p.superVisa;
                return sv === "yes" || sv === "YES";
              }
              return true;
            })
            .map((f) => (
              <PolicyField
                key={f.label}
                {...f}
                policy={p}
                editedPolicy={editedPolicy}
                isEditMode={isEditMode}
                onFieldChange={handleFieldChange}
                product={p.product}
                fieldErrors={fieldErrors}
              />
            ))}
        </div>
      </div>

      {/* Beneficiary Information */}
      {fieldsConfig.beneficiaryInfo &&
        fieldsConfig.beneficiaryInfo.length > 0 && (
          <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
            <div className="text-primary uppercase font-semibold text-xl">
              {t("Beneficiary Information")}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm w-full capitalize">
              {fieldsConfig.beneficiaryInfo?.map((f) => (
                <PolicyField
                  key={f.label}
                  {...f}
                  policy={p}
                  editedPolicy={editedPolicy}
                  isEditMode={isEditMode}
                  onFieldChange={handleFieldChange}
                  product={p.product}
                  fieldErrors={fieldErrors}
                />
              ))}
            </div>
          </div>
        )}

      {/* Premium / Payment Info */}
      {(history?.length > 0 ||
        (paymentSchedule && paymentSchedule.length > 0)) && (
        <section className="border-b border-inputBorder py-4 space-y-4">
          <div className="uppercase text-primary font-semibold text-lg">
            {t("Premium / Payment Info")}
          </div>

          <div className="grid grid-cols-4 gap-x-4">
            <div className="min-w-0">
              <div className="font-medium">{t("Premium")}</div>
              <div className="break-words">
                {fmtCurrency(p?.premiumTotal || p?.premium)}
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-medium">{t("Payment Option")}</div>
              <div className="break-words">{p.paymentOption || "-"}</div>
            </div>
            <div className="min-w-0">
              <div className="font-medium">{t("Credit Card")}</div>
              {/* <div>{history[0]?.last4 ? `•••• ${history[0].last4}` : "-"}</div> */}

              <div className="min-w-0">
                {(() => {
                  // Priority: Policy.currentCard -> Most Recent Payment -> First Payment
                  const brand =
                    p.currentCardBrand ||
                    history[history.length - 1]?.brand ||
                    history[0]?.brand;
                  const last4 =
                    p.currentCardLast4 ||
                    history[history.length - 1]?.last4 ||
                    history[0]?.last4;
                  const name =
                    p.currentCardholderName ||
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
                          {t("Updated:")}{" "}
                          {fmtDate(p.currentCardUpdatedAt.toString())}
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-medium">{t("Date")}</div>
              <div className="break-words">
                {history[0]?.date ? fmtDate(history[0].date) : "-"}
              </div>
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
                    {t("Split Policy - Payments Covered by Parent Policy")}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/policy-detail/${p.parentPolicyId}`)
                    }
                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                  >
                    {t("View Original Policy Payment →")}
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
                <h3 className="font-semibold text-sm mb-3">
                  {t("Payment Schedule")}
                </h3>
                <PaymentScheduleTable
                  schedule={paymentSchedule || []}
                  loading={scheduleLoading}
                  error={scheduleError}
                  onProcessRefund={
                    p.status === "CANCELLED" ? handleRefund : undefined
                  }
                  cardHolderName={p.currentCardholderName}
                  cardLast4={p.currentCardLast4}
                  cardBrand={p.currentCardBrand}
                />
              </div>
            )}

          {/* Payment History Table */}
          {history.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-sm mb-3">
                {t("Payment History")}
              </h3>
              <div className="overflow-x-auto custom-scrollbar-x">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary text-white text-sm 2xl:text-base capitalize">
                    <tr>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        #
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        {t("Method")}
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        {t("Name")}
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        {t("Brand")}
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        {t("Last 4")}
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-right font-medium text-nowrap">
                        {t("Amount")}
                      </th>
                      {/* <th className="px-2 sm:px-3 py-1 sm:py-3 text-right font-medium text-nowrap">
                        Fee
                      </th> */}
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        {t("Status")}
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        {t("Date")}
                      </th>
                      <th className="px-2 sm:px-3 py-1 sm:py-3 text-left font-medium text-nowrap">
                        {t("Payment Type")}
                      </th>
                      {/* <th className="px-2 sm:px-3 py-1 sm:py-3 text-center font-medium text-nowrap">
                        Actions
                      </th> */}
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
                          {/* <td
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
                          </td> */}
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

      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          {t("Fulfillment")}
        </div>
        {fulError && <p className="text-red-600">{fulError}</p>}

        <div className="grid grid-cols-3 gap-x-4">
          <div>
            <label className="font-semibold text-base">{t("To")}</label>
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
              placeholder={t("Up to 5 emails; separated by ;")}
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              disabled={isEditMode}
            />
          </div>
          <div>
            <label className="font-semibold text-base">
              {t("Agent Email")}
            </label>
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
              {t("Preview Confirmation")}
            </button>
            <button
              onClick={() => sendMail(to, cc, agentEmail)}
              disabled={fulLoading}
              className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
            >
              {t("Send Confirmation")}
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

      <div className="flex flex-col gap-4 justify-between w-full border-b border-[#D8D8D8] pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          {t("Renewal")}
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
              <span>{t("Auto Renewal Notice")}</span>
            </div>
            <button
              onClick={handleViewRenewalNotice}
              className="px-4 py-2 hover:bg-gray-50/50 border border-gray-300 hover:border-gray-400 cursor-pointer transition-all delay-100"
            >
              {t("View Renewal Notice")}
            </button>
            <button
              onClick={handleSendRenewalNotice}
              className="bg-primary text-white py-2 sm:py-2 px-4 font-semibold hover:bg-[#2309A1] transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-70"
            >
              {t("Send Renewal Notice")}
            </button>
            <button
              onClick={handleIssueRelatedPolicy}
              className="px-3 py-2 bg-green-600 text-white cursor-pointer hover:bg-green-700 transition-all duration-200"
            >
              {t("Issue New Policy")}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 justify-between w-full pb-4">
        <div className="flex items-center gap-2 text-primary uppercase font-semibold text-xl">
          {t("Notes History")}
        </div>

        {notesLoading ? (
          <p>{t("Loading notes...")}</p>
        ) : notesError ? (
          <p className="text-red-600">{notesError}</p>
        ) : (
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {notes.length === 0 && (
              <li className="text-gray-500">{t("No notes yet.")}</li>
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
              {t("Add a Note")}
            </label>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={t("Enter note here")}
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
              {t("Add Note")}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 justify-between w-full pb-4">
        <div className="flex items-center gap-2 text-primary uppercase font-semibold text-xl">
          {t("Activity History")}
        </div>

        <PolicyActivityTimeline
          activities={activities}
          loading={activityLoading}
          error={activityError}
        />
      </div>

      <div className="flex flex-col gap-4 justify-between w-full pb-4">
        <div className="text-primary uppercase font-semibold text-xl">
          {t("Attachments")}
        </div>

        {attLoading ? (
          <p>{t("Loading attachments...")}</p>
        ) : attError ? (
          <p className="text-red-600">{attError}</p>
        ) : (
          <ul className="space-y-2">
            {attachments.length === 0 && (
              <li className="text-gray-500">{t("No attachments yet.")}</li>
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
                  {fmtDateDisplay(att.createdAt)}
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
                {t("Choose Files")}
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
              <label className="font-medium block mt-2">
                {t("Description")}
              </label>
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
              {t("Add Attachment")}
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
        isSuperVisa={p.applicantOnSuperVisa}
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
        originalEffectiveDate={fmtDate(p.effectiveDate?.toString())}
        newEffectiveDate={
          editedPolicy.effectiveDate || fmtDate(p.effectiveDate?.toString())
        }
        daysToRefund={refundData?.daysToRefund || 0}
        maxRefundable={refundData?.maxRefundable || 0}
        loading={modifyLoading}
      />

      <ChargeConfirmationModal
        isOpen={showChargeModal}
        onClose={() => setShowChargeModal(false)}
        onConfirm={handleChargeConfirm}
        chargeAmount={chargeData?.chargeAmount || 0}
        originalPremium={chargeData?.originalPremium || 0}
        newPremium={chargeData?.newPremium || 0}
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

      <ModificationConfirmModal
        isOpen={showModificationConfirmModal}
        onClose={() => setShowModificationConfirmModal(false)}
        onConfirm={handleModificationConfirm}
        loading={modifyLoading}
      />

      <MonthlyCatchUpModal
        isOpen={showMonthlyCatchUpModal}
        onClose={() => setShowMonthlyCatchUpModal(false)}
        onConfirm={handleMonthlyCatchUpConfirm}
        catchUpAmount={monthlyCatchUpModalData?.catchUpAmount ?? 0}
        oldMonthly={monthlyCatchUpModalData?.oldMonthly ?? 0}
        newMonthly={monthlyCatchUpModalData?.newMonthly ?? 0}
        paidRegularCount={monthlyCatchUpModalData?.paidRegularCount ?? 0}
        loading={modifyLoading}
      />

      {NotificationComponent}
    </div>
  );
};

export default PolicyDetailsPage;
