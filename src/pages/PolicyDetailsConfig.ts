import { PolicyDetail } from "../hooks/usePolicyDetail";
import { formatDate } from "../utils/dateUtils";
import {
  Countries,
  CanadaStates,
  DeductiblesSecureTravel,
  DeductiblesCanuckVoyage,
  ResidenceCountries,
  CoverageOptions,
} from "../utils/sharedConstants";

export const fmtDate = (iso?: string) => {
  if (!iso) return "-";
  const datePart = iso.split("T")[0];
  return datePart;
};

export const fmtDateDisplay = (iso?: string) => {
  if (!iso) return "-";
  return formatDate(iso);
};

export const calcAge = (dob?: string, ref?: string) => {
  if (!dob || !ref) return "-";
  const d1 = new Date(dob);
  const d2 = new Date(ref);
  let age = d2.getFullYear() - d1.getFullYear();
  if (d2 < new Date(d1.setFullYear(d1.getFullYear() + age))) age--;
  return age;
};

export const fmtCurrency = (v: any) =>
  v != null ? `${Number(v).toFixed(2)} CAD` : "-";

export interface FieldConfig {
  label: string;
  field: keyof PolicyDetail | (keyof PolicyDetail)[];
  type?: "text" | "email" | "date" | "select" | "number";
  transform?: (v: any, t: (key: string) => string) => any;
  options?: string[] | { value: string; label: string }[];
}

export const PRODUCT_FIELDS_CONFIG: Record<
  string,
  {
    policyInfo?: FieldConfig[];
    primaryInsured?: FieldConfig[];
    contactInfo?: FieldConfig[];
    coverageDetails?: FieldConfig[];
    beneficiaryInfo?: FieldConfig[];
  }
> = {

  SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL: {
    policyInfo: [
      { label: "Policy Number", field: "policyNumber" },
      { label: "Sale Date", field: "dateIssued", transform: fmtDateDisplay },
      { label: "Status", field: "status" },
      { label: "Sales Channel", field: "salesChannel" },
      { label: "Language", field: "language" },
      { label: "Agent", field: "agentCode" },
    ],
    primaryInsured: [
      { label: "Individual Policy Number", field: ["primaryIndividualNumber", "individualPolicyNumber"] },
      { label: "First Name", field: "firstName" },
      { label: "Last Name", field: "lastName" },
      {
        label: "Date of Birth",
        field: "dateOfBirth",
        type: "date",
        transform: fmtDateDisplay,
      },
      { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"] },
      {
        label: "Coverage for Stable Pre-Existing Medical Condition",
        field: "PreExCoverage",
        transform: (v: any, t: any) =>
          v === true || v === "true" || v === "yes" || v === "y" ? t("Yes") : t("No"),
      },
      { label: "Premium", field: "primaryPremium", transform: fmtCurrency },
    ],
    contactInfo: [
      { label: "Email Address", field: "email", type: "email" },
      {
        label: "Additional Email Address",
        field: "additionalEmail",
        type: "email",
      },
      { label: "Phone Number", field: "phoneNumber" },
      { label: "Address Line 1", field: "street" },
      { label: "Address Line 2", field: "street2" },
      { label: "City", field: "city" },
      { label: "Province", field: "province" },
      { label: "Country", field: "countryCode", type: "select", options: ResidenceCountries },
      { label: "Postal Code", field: "postalCode" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v, t) => (v ? `${v} ${t("Days")}` : "-"),
      },
      { label: "Policy Type", field: "policyType" },
      { label: "Country of Origin", field: "countryOfOrigin", type: "select", options: Countries },
      { label: "Destination Province", field: ["destination", "destinationProvince", "destProv"], type: "select", options: CanadaStates },
      {
        label: "Are Applicants Currently in Canada?",
        field: ["applicantInCanada", "inCanada"],
        type: "select",
        options: [
          { value: "", label: "Please select..." },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ],
      },
      {
        label: "Are Applicants Travelling on a Super Visa?",
        field: ["applicantOnSuperVisa", "superVisa"],
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ],
      },
      {
        label: "Super Visa Duration",
        field: "superVisaYears",
        type: "select",
        options: [
          { value: "", label: "Please select..." },
          { value: "1", label: "1 year" },
        ],
      },
      {
        label: "Deductible",
        field: "deductible",
        type: "select",
        options: DeductiblesSecureTravel
      },
      { label: "Coverage", field: "coverage", type: "select", options: CoverageOptions },
    ],
    beneficiaryInfo: [
      { label: "Name", field: "beneficiaryName" },
      { label: "Relationship to Insured", field: "beneficiaryRelation" },
    ],
  },
  SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA: {
    policyInfo: [
      { label: "Policy Number", field: "policyNumber" },
      { label: "Sale Date", field: "dateIssued", transform: fmtDateDisplay },
      { label: "Status", field: "status" },
      { label: "Sales Channel", field: "salesChannel" },
      { label: "Language", field: "language" },
      { label: "Agent", field: "agentCode" },
    ],
    primaryInsured: [
      { label: "Individual Policy Number", field: ["primaryIndividualNumber", "individualPolicyNumber"] },
      { label: "First Name", field: "firstName" },
      { label: "Last Name", field: "lastName" },
      {
        label: "Date of Birth",
        field: "dateOfBirth",
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Gender",
        field: "gender",
        type: "select",
        options: ["Male", "Female", "Other"],
      },
      { label: "Premium", field: "primaryPremium", transform: fmtCurrency },
    ],
    contactInfo: [
      { label: "Email Address", field: "email", type: "email" },
      {
        label: "Additional Email Address",
        field: "additionalEmail",
        type: "email",
      },
      { label: "Phone Number", field: "phoneNumber" },
      { label: "Address Line 1", field: "street" },
      { label: "Address Line 2", field: "street2" },
      { label: "City", field: "city" },
      { label: "Province", field: "province" },
      { label: "Country", field: "countryOfOrigin", type: "select", options: Countries },
      { label: "Postal Code", field: "postalCode" },
      { label: "Legal Guardian Name", field: "legalGuardianName" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v, t) => (v ? `${v} ${t("Days")}` : "-"),
      },
      { label: "Policy Type", field: "policyType" },
      { label: "Country of Origin", field: "countryCode", type: "select", options: Countries },
      {
        label: "Destination Province",
        field: ["destination", "destinationProvince", "destProv"],
        type: "select",
        options: CanadaStates
      },
    ],
    beneficiaryInfo: [
      { label: "Name", field: "beneficiaryName" },
      { label: "Relationship to Insured", field: "beneficiaryRelation"},
    ],
  },
  RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL: {
    policyInfo: [
      { label: "Policy Number", field: "policyNumber" },
      { label: "Sale Date", field: "dateIssued", transform: fmtDateDisplay },
      { label: "Status", field: "status" },
      { label: "Sales Channel", field: "salesChannel" },
      { label: "Language", field: "language" },
      { label: "Agent", field: "agentCode" },
    ],
    primaryInsured: [
      { label: "Individual Policy Number", field: ["primaryIndividualNumber", "individualPolicyNumber"] },
      { label: "First Name", field: "firstName" },
      { label: "Last Name", field: "lastName" },
      {
        label: "Date of Birth",
        field: "dateOfBirth",
        type: "date",
        transform: fmtDateDisplay,
      },
      { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"] },
      { label: "Premium", field: "primaryPremium", transform: fmtCurrency },
    ],
    contactInfo: [
      { label: "Email Address", field: "email", type: "email" },
      { label: "Additional Email Address", field: "additionalEmail", type: "email" },
      { label: "Phone Number", field: "phoneNumber" },
      { label: "Address Line 1", field: "street" },
      { label: "Address Line 2", field: "street2" },
      { label: "City", field: "city" },
      { label: "Province", field: "province" },
      { label: "Country", field: "countryCode", type: "select", options: ResidenceCountries },
      { label: "Postal Code", field: "postalCode" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v, t) => (v ? `${v} ${t("Days")}` : "-"),
      },
      { label: "Policy Type", field: "policyType" },
      {
        label: "Destination Country",
        field: ["destination", "destinationCountry"],
        type: "select",
        options: Countries
      },
      { label: "Are Applicants Travelling Through US?", field: ["applicantTravelThroughUs", "applicantTravelThroughUs"], type: "select", options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ] },
      { label: "US Travel Days", field: "usTravelDays" },
      { label: "Days Per Trip", field: "numberOfDaysPerTrip" },
      {
        label: "Deductible",
        field: "deductible",
        type: "select",
        options: DeductiblesCanuckVoyage
      },
    ],
    beneficiaryInfo: [],
  },
  RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL: {
    policyInfo: [
      { label: "Policy Number", field: "policyNumber" },
      { label: "Sale Date", field: "dateIssued", transform: fmtDateDisplay },
      { label: "Status", field: "status" },
      { label: "Sales Channel", field: "salesChannel" },
      { label: "Language", field: "language" },
      { label: "Agent", field: "agentCode" },
    ],
    primaryInsured: [
      { label: "Individual Policy Number", field: ["primaryIndividualNumber", "individualPolicyNumber"] },
      { label: "First Name", field: "firstName" },
      { label: "Last Name", field: "lastName" },
      {
        label: "Date of Birth",
        field: "dateOfBirth",
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Gender",
        field: "gender",
        type: "select",
        options: ["Male", "Female", "Other"],
      },
      { label: "Premium", field: "primaryPremium", transform: fmtCurrency },
    ],
    contactInfo: [
      { label: "Email Address", field: "email", type: "email" },
      {
        label: "Additional Email Address",
        field: "additionalEmail",
        type: "email",
      },
      { label: "Phone Number", field: "phoneNumber" },
      { label: "Address Line 1", field: "street" },
      { label: "Address Line 2", field: "street2" },
      { label: "City", field: "city" },
      { label: "Province", field: "province" },
      { label: "Country", field: "countryOfOrigin", type: "select", options: Countries },
      { label: "Postal Code", field: "postalCode" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDateDisplay,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v, t) => (v ? `${v} ${t("Days")}` : "-"),
      },
      { label: "Country of Origin", field: "countryOfOrigin", type: "select", options: Countries },
      {
        label: "Province of Residence",
        field: ["provinceStateResidence", "province"],
      },
      {
        label: "Trip Cost",
        field: "tripCost",
        transform: (v) => (v != null ? `${Number(v).toFixed(2)} CAD` : "-"),
      },
      {
        label: "Trip Cancellation - Deluxe Option",
        field: "tripCancellationDeluxe",
        transform: (v, t) => (v ? t("Yes") : t("No")),
      },
      { label: "Trip Booking Date", field: "dateBooked", transform: fmtDateDisplay },
      {
        label: "Destination",
        field: ["destination", "destinationCountry"],
        type: "select",
        options: Countries
      },
    ],
  },
};

export const DEFAULT_FIELDS_CONFIG: {
  policyInfo: FieldConfig[];
  primaryInsured: FieldConfig[];
  contactInfo: FieldConfig[];
  coverageDetails: FieldConfig[];
  beneficiaryInfo: FieldConfig[];
} = {
  policyInfo: [
    { label: "Policy Number", field: "policyNumber" },
    { label: "Sale Date", field: "dateIssued", transform: fmtDateDisplay },
    { label: "Status", field: "status" },
    { label: "Sales Channel", field: "salesChannel" },
    { label: "Language", field: "language" },
    { label: "Agent", field: "agentCode" },
  ],
  primaryInsured: [
    { label: "Individual Policy Number", field: ["primaryIndividualNumber", "individualPolicyNumber"] },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Date of Birth", field: "dateOfBirth", type: "date", transform: fmtDateDisplay },
  ],
  contactInfo: [
    { label: "Email Address", field: "email", type: "email" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Address Line 1", field: "street" },
    { label: "Address Line 2", field: "street2" },
  ],
  coverageDetails: [
    { label: "Effective Date", field: "effectiveDate", type: "date", transform: fmtDateDisplay },
    { label: "Expiry Date", field: "expiryDate", type: "date", transform: fmtDateDisplay },
    { label: "Coverage Length", field: "covLen", transform: (v: any, t: any) => v ? `${v} ${t("Days")}` : "-" },
  ],
  beneficiaryInfo: [
    { label: "Name", field: "beneficiaryName" },
    { label: "Relationship to Insured", field: "beneficiaryRelation" },
  ]
};
