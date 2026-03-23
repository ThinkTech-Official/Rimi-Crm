import { PolicyDetail } from "../hooks/usePolicyDetail";

export const fmtDate = (iso?: string) => {
  if (!iso) return "-";
  const datePart = iso.split("T")[0];
  return datePart;
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
  transform?: (v: any) => any;
  options?: string[];
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
      { label: "Sale Date", field: "dateIssued", transform: fmtDate },
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
        transform: fmtDate,
      },
      { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"] },
      {
        label: "Coverage for Stable Pre-Existing Medical Condition",
        field: "PreExCoverage",
        transform: (v: any) =>
          v === true || v === "true" || v === "yes" || v === "y" ? "Yes" : "No",
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
      { label: "Country", field: "countryCode" },
      { label: "Postal Code", field: "postalCode" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v) => (v ? `${v} Days` : "-"),
      },
      { label: "Policy Type", field: "policyType" },
      { label: "Country of Origin", field: "countryOfOrigin" },
      { label: "Destination Province", field: ["destination", "destinationProvince", "destProv"] },
      {
        label: "Are Applicants Currently in Canada?",
        field: ["applicantInCanada", "inCanada"],
      },
      {
        label: "Are Applicants Travelling on a Super Visa?",
        field: ["applicantOnSuperVisa", "superVisa"],
        type: "select",
        options: ["yes", "no"],
      },
      { label: "Deductible", field: "deductible" },
    ],
    beneficiaryInfo: [
      { label: "Name", field: "beneficiaryName" },
      { label: "Relationship to Insured", field: "beneficiaryRelation" },
    ],
  },
  SECURE_STUDY_RIMI_INTERNATIONAL_STUDENTS_TO_CANADA: {
    policyInfo: [
      { label: "Policy Number", field: "policyNumber" },
      { label: "Sale Date", field: "dateIssued", transform: fmtDate },
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
        transform: fmtDate,
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
      { label: "Legal Guardian Name", field: "legalGuardianName" },
      { label: "Address Line 1", field: "street" },
      { label: "Address Line 2", field: "street2" },
      { label: "City", field: "city" },
      { label: "Province", field: "province" },
      { label: "Country", field: "countryCode" },
      { label: "Postal Code", field: "postalCode" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v) => (v ? `${v} Days` : "-"),
      },
      { label: "Policy Type", field: "policyType" },
      { label: "Country of Origin", field: "countryOfOrigin" },
      { label: "Destination Province", field: ["destination", "destinationProvince", "destProv"] },
    ],
    beneficiaryInfo: [
      { label: "Name", field: "beneficiaryName" },
      { label: "Relationship to Insured", field: "beneficiaryRelation" },
    ],
  },
  RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL: {
    policyInfo: [
      { label: "Policy Number", field: "policyNumber" },
      { label: "Sale Date", field: "dateIssued", transform: fmtDate },
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
        transform: fmtDate,
      },
      { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"] },
      { label: "Premium", field: "primaryPremium", transform: fmtCurrency },
    ],
    contactInfo: [
      { label: "Email Address", field: "email", type: "email" },
      { label: "Phone Number", field: "phoneNumber" },
      { label: "Address Line 1", field: "street" },
      { label: "Address Line 2", field: "street2" },
      { label: "City", field: "city" },
      { label: "Province", field: "province" },
      { label: "Country", field: "countryCode" },
      { label: "Postal Code", field: "postalCode" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v) => (v ? `${v} Days` : "-"),
      },
      { label: "Policy Type", field: "policyType" },
      { label: "Destination Country", field: ["destination", "destinationCountry"] },
      { label: "Traveling Through US", field: ["travelingThroughUS", "applicantTravelThroughUs"] },
      { label: "US Travel Days", field: "usTravelDays" },
      { label: "Days Per Trip", field: "numberOfDaysPerTrip" },
      { label: "Deductible", field: "deductible" },
    ],
    beneficiaryInfo: [],
  },
  RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL: {
    policyInfo: [
      { label: "Policy Number", field: "policyNumber" },
      { label: "Sale Date", field: "dateIssued", transform: fmtDate },
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
        transform: fmtDate,
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
      { label: "Country", field: "countryCode" },
      { label: "Postal Code", field: "postalCode" },
    ],
    coverageDetails: [
      {
        label: "Effective Date",
        field: ["effectiveDate", "covEffDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Expiry Date",
        field: ["expiryDate", "covExpDate"],
        type: "date",
        transform: fmtDate,
      },
      {
        label: "Coverage Length",
        field: ["covLen", "coverageLength"],
        transform: (v) => (v ? `${v} Days` : "-"),
      },
      { label: "Policy Type", field: "policyType" },
      { label: "Country of Origin", field: "countryOfOrigin" },
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
        transform: (v) => (v ? "Yes" : "No"),
      },
      { label: "Trip Booking Date", field: "dateBooked", transform: fmtDate },
      { label: "Destination", field: ["destination", "destinationCountry"] },
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
    { label: "Sale Date", field: "dateIssued", transform: fmtDate },
    { label: "Status", field: "status" },
    { label: "Sales Channel", field: "salesChannel" },
    { label: "Language", field: "language" },
    { label: "Agent", field: "agentCode" },
  ],
  primaryInsured: [
     { label: "Individual Policy Number", field: ["primaryIndividualNumber", "individualPolicyNumber"] },
     { label: "First Name", field: "firstName" },
     { label: "Last Name", field: "lastName" },
     { label: "Date of Birth", field: "dateOfBirth", type: "date", transform: fmtDate },
  ],
  contactInfo: [
     { label: "Email Address", field: "email", type: "email" },
     { label: "Phone Number", field: "phoneNumber" },
     { label: "Address Line 1", field: "street" },
     { label: "Address Line 2", field: "street2" },
  ],
  coverageDetails: [
     { label: "Effective Date", field: "effectiveDate", type: "date", transform: fmtDate },
     { label: "Expiry Date", field: "expiryDate", type: "date", transform: fmtDate },
     { label: "Coverage Length", field: "covLen", transform: (v: any) => v ? `${v} Days` : "-" },
  ],
  beneficiaryInfo: [
     { label: "Name", field: "beneficiaryName" },
     { label: "Relationship to Insured", field: "beneficiaryRelation" },
  ]
};
